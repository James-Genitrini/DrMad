import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Import des modules
import shop from './shop'
import bank from './bank'

export default new Vuex.Store({
  modules: {
    shop, 
    bank, 
  },
})
