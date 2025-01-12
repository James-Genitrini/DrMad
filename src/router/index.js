import Vue from 'vue';
import VueRouter from 'vue-router';

// Importation des composants
import ShopView from '@/views/ShopView.vue';
import ShopHome from '../components/Shop/ShopHome.vue';
import ShopLogin from '../components/Shop/ShopLogin.vue';
import ShopBuy from '../components/Shop/ShopBuy.vue';
import ShopOrders from '../components/Shop/ShopOrders.vue';
import ShopPay from '../components/Shop/ShopPay.vue';

import BankView from '@/views/BankView.vue';
import BankHome from '../views/BankHome.vue';
import BankAmount from '@/views/BankAmount.vue';
import BankOperation from '@/views/BankOperation.vue';
import BankHistory from '@/views/BankHistory.vue';
import BankAccount from '@/views/BankAccount.vue';
import BankLogout from '@/views/BankLogout.vue';
Vue.use(VueRouter);

const routes = [
  {
    path: '/shop',
    component: ShopView,  
    children: [
      {
        path: '',
        redirect: 'home',
      },
      {
        path: 'home',
        component: ShopHome,
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
    path: '/bank',
    component: BankView,
    children: [
      {
        path: '',
        redirect: 'home',
      },
      {
        path: 'home',
        name: 'bankHome',
        component: BankHome,
      },
      {
        path: 'account',
        name: 'bankAccount',
        component: BankAccount,
      },
      {
        path: 'amount',
        name: 'bankAmount',
        component: BankAmount,
      },
      {
        path: 'operation',
        name: 'bankOperation',
        component: BankOperation,
      },
      {
        path: 'history',
        name: 'bankHistory',
        component: BankHistory,
      },
      {
        path: 'logout',
        name: 'bankLogout',
        component : BankLogout,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
})

// Censé" éviter la redirection vers la même page mais marche pas :/ 
router.beforeEach((to, from, next) => {
  if (to.path == from.path) {
    return next(false);
  }
  next();
});

export default router;
