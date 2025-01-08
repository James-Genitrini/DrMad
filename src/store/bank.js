import BankService from '../services/bankaccount.service'

export default {
  namespaced: true,
  state: () => ({
    accountAmount: 0,
    accountTransactions: [],
    accountNumberError: 0,
  }),
  mutations: {
    updateAccountAmount(state, amount) {
      state.accountAmount = amount
    },
    updateAccountTransactions(state, transactions) {
      state.accountTransactions = transactions
    },
    updateAccountNumberError(state, errorStatus) {
      state.accountNumberError = errorStatus
    },
  },
  actions: {
    async getAccountAmount({ commit }, number) {
      console.log('récupération du montant du compte');
      let accountAmount = await BankService.getAccountAmount(number)

      if (accountAmount.error === 0) {
        commit('updateAccountAmount', accountAmount.data)
        commit('updateAccountNumberError', 1) 
      } else {
        console.log(accountAmount.data)
        commit('updateAccountNumberError', -1) 
      }
    },
    async getAccountTransactions({ commit }, number) {
      console.log('récupération des transactions du compte');
      let transactions = await BankService.getAccountTransactions(number)

      if (transactions.error === 0) {
        commit('updateAccountTransactions', transactions.data)
        commit('updateAccountNumberError', 1) 
      } else {
        console.log(transactions.data)
        commit('updateAccountNumberError', -1) 
      }
    },
  },
}
