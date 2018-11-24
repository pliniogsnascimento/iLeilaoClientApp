FROM node:8.11.1 AS build
WORKDIR /home/app
COPY package.json /home/app/
RUN npm install --silent
COPY . /home/app
RUN npm run build

FROM httpd:2.4
ENV NODE_ENV development
COPY --from=build /home/app/build /usr/local/apache2/htdocs
