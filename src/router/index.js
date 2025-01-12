import Vue from 'vue';
import VueRouter from 'vue-router';

// Importation des composants
import WrapperComponent from '@/components/WrapperComponent.vue';  
import ShopHome from '../components/Shop/ShopHome.vue';
import ShopLogin from '../components/Shop/ShopLogin.vue';
import ShopBuy from '../components/Shop/ShopBuy.vue';
import ShopOrders from '../components/Shop/ShopOrders.vue';

import BankHome from '../components/Bank/BankHome.vue';
import BankAccount from '../components/Bank/BankAccount.vue';
import BankTransfer from '../components/Bank/BankTransfer.vue';
Vue.use(VueRouter);

const routes = [
  {
    path: '/shop',
    component: WrapperComponent,  
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
      }
    ],
  },

  {
    path: '/bank/home',
    component: BankHome,
  },
  {
    path: '/bank/account',
    name: 'bankAccount',
    component: BankAccount,
  },
  {
    path: '/bank/transfer',
    name: 'bankTransfer',
    component: BankTransfer,
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
