import BankService from '../services/bankaccount.service'

export default {
  namespaced: true,
  state: () => ({
    accountAmount: 0,
    accountTransactions: [],
    accountNumberError: 0,
    currentAccount: null,
  }),
  mutations: {
    updateAccount(state, account) {
      state.currentAccount = account;
    },
    updateAccountAmount(state, amount) {
      state.accountAmount = amount
    },
    updateAccountTransactions(state, transactions) {
      state.accountTransactions = transactions
    },
    updateAccountNumberError(state, errorStatus) {
      state.accountNumberError = errorStatus
    },
    updateCurrentAccount(state, account) {
      state.currentAccount = account
    },
    clear(state) {
      state.accountAmount = 0
      state.accountTransactions = []
      state.accountNumberError = 0
      state.currentAccount = null
    }
  },
  actions: {
    async getAccount({ commit }, number) {
      const response = await BankService.getAccount({ number: number });
      if (response.error === 0) {
        commit('updateAccountNumberError', 1);
        commit('updateAccount', response.data);
      } else {
        commit('updateAccountNumberError', -1);
        console.error(response.data);
      }
    },
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
    async getAccountTransactionsByNumber({ commit }, number) {
      console.log('récupération des transactions du compte');
      let transactions = await BankService.getAccountTransactionsByNumber(number)

      if (transactions.error === 0) {
        commit('updateAccountTransactions', transactions.data)
        commit('updateAccountNumberError', 1) 
      } else {
        console.log(transactions.data)
        commit('updateAccountNumberError', -1) 
      }
    },

    async getTransactions({ commit }, data) {
      const response = await BankService.getAccountTransactions(data);
      if (response.error === 0) {
        commit('updateAccountTransactions', response.data);
      } else {
        commit('updateAccountNumberError', -1);
        console.error(response.data);
      }
    },
    async bankLogout ({ commit }) {
      try {
        commit('clear')
      } catch (err) {
        console.error(err)
      }
    },
  },
}
