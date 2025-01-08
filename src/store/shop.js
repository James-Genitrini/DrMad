import ShopService from '../services/shop.service'

export default {
  namespaced: true,
  state: () => ({
    viruses: [],
    shopUser: null,
    basket: [],  
    orders: [] 
  }),
  mutations: {
    updateViruses(state, viruses) {
      state.viruses = viruses
    },
    updateShopUser(state, user) {
      state.shopUser = user;
      if (!state.shopUser.orders) {
        this.$set(state.shopUser, 'orders', []);
      }
    },
    updateBasket(state, basket) {
      state.basket = basket
    },
    addToBasket(state, { item, quantity }) {
      const existingItem = state.basket.find(i => i.item.id === item.id);
      if (existingItem) {
        existingItem.amount += quantity;
      } else {
        state.basket.push({ item, amount: quantity });
      }
    },
  
    removeFromBasket(state, itemId) {
      state.basket = state.basket.filter(item => item.item.id !== itemId) 
    },
    clearBasket(state) {
      state.basket = []  
    },
    // Mutations pour gérer les commandes
    updateOrders(state, orders) {
      if (state.shopUser) {
        this.$set(state.shopUser, 'orders', orders);
      }
    },
    updateOrderStatus(state, { orderId, status }) {
      const order = state.shopUser.orders.find(o => o.uuid === orderId);
      if (order) {
        order.status = status;
      }
    },
  },
  actions: {
    async shopLogin({ commit }, data) {
      console.log('Login');
      let response = await ShopService.shopLogin(data);
      if (response.error === 0) {
        commit('updateShopUser', response.data);
        await this.dispatch('shop/fetchBasket');
      } else {
        console.log(response.data);
      }
    },
    async getAllViruses({ commit }) {
      console.log('Récupération des viruses');
      let response = await ShopService.getAllViruses();
      if (response.error === 0) {
        commit('updateViruses', response.data);
      } else {
        console.log(response.data);
      }
    },
    async fetchBasket({ commit, state }) {
      if (state.shopUser) {
        console.log('Récupération du panier');
        const response = await ShopService.getBasket(state.shopUser.id);
        if (response.error === 0) {
          commit('updateBasket', response.data);  
        } else {
          console.log(response.data);
        }
      }
    },
    async addItemToBasket({ commit }, { item, quantity }) {
      commit('addToBasket', { item, quantity });
    },  
    async removeItemFromBasket({ commit, state }, itemId) {
      commit('removeFromBasket', itemId);
      if (state.shopUser) {
        console.log('Mise à jour après suppression de l\'item');
        await ShopService.updateBasket(state.shopUser.id, state.basket);  
      }
    },
    async clearBasket({ commit, state }) {
      commit('clearBasket');
      if (state.shopUser) {
        console.log('Panier vidé');
        await ShopService.clearBasket(state.shopUser.id);  
      }
    },
    // Actions pour gérer les commandes
    async createOrder({ commit, state }) {
      if (state.shopUser && state.basket.length > 0) {
        console.log('Création d\'une commande');
        const orderData = {
          items: state.basket.map(item => ({
            item: {
              name: item.item.name,
              description: item.item.description,
              price: item.item.price,
              promotion: item.item.promotion || [],
              object: item.item.object,
            },
            amount: item.amount,
          })),
          total: state.basket.reduce((sum, item) => sum + (item.item.price * item.amount), 0),
        };

        const response = await ShopService.createOrder(state.shopUser.id, orderData);
        if (response.error === 0) {
          commit('clearBasket'); 
          commit('updateOrders', response.data.orders); 
          this.$router.push(`/shop/pay/${response.data.uuid}`); 
        } else {
          console.log('Erreur lors de la création de la commande', response.data);
        }
      }
    },
    async payOrder({ commit, state }, orderId) {
      const response = await ShopService.payOrder(state.shopUser.id, orderId);
      if (response.error === 0) {
        commit('updateOrderStatus', { orderId, status: 'finalized' });
        this.$router.push('/shop/orders'); 
      } else {
        console.log('Erreur lors du paiement', response.data);
      }
    },
    async cancelOrder({ commit, state }, orderId) {
      const response = await ShopService.cancelOrder(state.shopUser.id, orderId);
      if (response.error === 0) {
        commit('updateOrderStatus', { orderId, status: 'cancelled' });
      } else {
        console.log('Erreur lors de l\'annulation', response.data);
      }
    },
  },
};
