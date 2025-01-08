import ShopService from '../services/shop.service'
import Vue from 'vue'

export default {
  namespaced: true,
  state: () => ({
    viruses: [],
    shopUser: null,
    basket: [],
  }),
  mutations: {
    setShopUser(state, user) {
      state.shopUser = user;
    },
    updateViruses(state, viruses) {
      state.viruses = viruses
    },
    updateShopUser(state, user) {
      console.log('Utilisateur mis à jour:', user);
      Vue.set(state, 'shopUser', user);
      state.isAuthenticated = true;
    },
    updateBasket(state, basket) {
      state.basket = basket
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },  
    addToBasket(state, { item, amount }) {
      const existingItem = state.basket.find(i => i.item._id === item.id)
      console.log("Amount",amount)
      if (existingItem) {
        existingItem.amount += 1
      } else {
        state.basket.push({ item, amount: amount })
      }
    },
    removeFromBasket(state, itemId) {
      // console.log(itemId)
      state.basket = state.basket.filter(item => item.item._id !== itemId)
    },
    clearBasket(state) {
      state.basket = []
    },
  },
  actions: {
    created() {
      const user = localStorage.getItem('user');
      if (user) {
        this.$store.commit('shop/setShopUser', JSON.parse(user));  
      }
    },    
    async shopLogin({ commit }, data) {
      console.log('Login');
      let response = await ShopService.shopLogin(data);
      if (response.error === 0) {
        localStorage.setItem('user', JSON.stringify(response.data));
        commit('updateShopUser', response.data);
        await this.dispatch('shop/fetchBasket');
        return true;
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
    async addItemToBasket({ commit, state }, { item, quantity }) {
      commit('addToBasket', { item, quantity });
      if (state.shopUser) {
        console.log('Mise à jour du panier');
        await ShopService.updateBasket(state.shopUser._id, state.basket);
      }
    },
    async removeItemFromBasket({ commit, state }, itemId) {
      // console.log(itemId)
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
    loadUserFromLocalStorage({ commit }) {
      const user = localStorage.getItem('user');
      if (user) {
        commit('setShopUser', JSON.parse(user));  // Charge l'utilisateur dans Vuex
      }
    },
  
  },
}
