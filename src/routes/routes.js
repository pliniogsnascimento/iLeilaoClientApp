import Login from 'views/Login/Login';
import Leilao from 'views/Leilao/Leilao';
import Lance from 'views/Lance/Lance';
import Register from 'views/Register/Register';

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
    path: '/register-me',
    component: Register,
    exact: true
  },
  {
    path: '/lance',
    component: Lance,
    exact: true
  }
];

export default routes;
