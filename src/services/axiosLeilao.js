import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://localhost:5000/'
  baseURL: 'http://ec2-52-87-210-164.compute-1.amazonaws.com/'
});

export default instance;