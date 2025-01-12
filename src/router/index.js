import Vue from 'vue';
import VueRouter from 'vue-router';

// Importation des composants
import ShopView from '@/views/ShopView.vue';
import ShopHome from '../components/Shop/ShopHome.vue';
import ShopLogin from '../components/Shop/ShopLogin.vue';
import ShopBuy from '../components/Shop/ShopBuy.vue';
import ShopOrders from '../components/Shop/ShopOrders.vue';
import ShopPay from '../components/Shop/ShopPay.vue';

import BankHome from '../components/Bank/BankHome.vue';
Vue.use(VueRouter);

const routes = [
  {
    path: '/shop',
    component: ShopView,  
    children: [
      {
        path: 'home',
        component: ShopHome,
        alias: '/', 
      },
      {
        path: 'buy',
        component: ShopBuy,
      },
      {
        path: 'orders',
        component: ShopOrders,
        meta: { requiresAuth: true },  
      },
      {
        path: 'login',
        component: ShopLogin,
      },
      {
        path: 'pay/:orderId',
        component: ShopPay,
      }
    ],
  },

  {
    path: '/bank/home',
    component: BankHome,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
