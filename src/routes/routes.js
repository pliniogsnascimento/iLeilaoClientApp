import Login from 'views/Login/Login';
import Leilao from 'views/Leilao/Leilao';
import Lance from 'views/Lance/Lance';

const routes = [
  {
    path: '/',
    component: Login,
    exact: true
  },
  {
    path: '/leilao',
    component: Leilao,
    exact: true
  },
  {
    path: '/lance',
    component: Lance,
    exact: true
  }
];

export default routes;
