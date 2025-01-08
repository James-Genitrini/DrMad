import Vue from 'vue';
import VueRouter from 'vue-router';

import ShopHome from '../components/Shop/ShopHome.vue';
import ShopLogin from '../components/Shop/ShopLogin.vue';
import ShopBuy from '../components/Shop/ShopBuy.vue';
import ShopPay from '../components/Shop/ShopPay.vue';
import ShopOrders from '../components/Shop/ShopOrders.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/shop',
    component: ShopHome,
    alias: '/shop/home',
    beforeEnter: (to, from, next) => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        // Si l'utilisateur est connecté, il peut accéder à la page
        next();
      } else {
        // Sinon, redirige vers la page de login
        next('/shop/login');
      }
    }
  },
  {
    path: '/shop/login',
    name: 'shoplogin',
    component: ShopLogin
  },
  {
    path: '/shop/buy',
    name: 'shopbuy',
    component: ShopBuy,
    beforeEnter: (to, from, next) => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        next();
      } else {
        next('/shop/login');
      }
    }
  },
  {
    path: '/shop/pay/:orderId',
    name: 'shopPay',
    component: ShopPay,
    props: true,
    beforeEnter: (to, from, next) => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        next();
      } else {
        next('/shop/login');
      }
    }
  },
  {
    path: '/shop/orders',
    name: 'shoporders',
    component: ShopOrders,
    beforeEnter: (to, from, next) => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        next();
      } else {
        next('/shop/login');
      }
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
