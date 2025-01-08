<template>
    <div>
      <h1>Account number</h1>
  
      <span>Account number</span><input v-model="number">
      <button :disabled="!isValidAccountNumber" @click="getAccountAmount(number); getAccountTransactions(number)">click me 🔥</button>
      <button @click="resetAccountNumber">reset</button>
      
      <div v-if="accountNumberError === 1">
        <p>{{accountAmount}}</p>
        <div v-if="accountTransactions.length > 0">
          <ul>
            <li v-for="transaction in accountTransactions" :key="transaction.id">
              Gain/perte de {{transaction.amount}} à date du : {{ printProperDate(transaction.date.$date) }}
            </li>
          </ul>
        </div>
        <p v-else>y'a pas</p>
      </div>
      <p v-else-if="accountNumberError === -1">Abanon connais pas 😔</p>
    </div>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'
export default {
  name: 'BankAccountView',
  data: () => ({
    number: '',
  }),
  computed: {
    ...mapState(['accountAmount', 'accountTransactions', 'accountNumberError']),
    isValidAccountNumber() {
      const regex = /^[A-Za-z0-9]{22}-\d{7}$/;
      return regex.test(this.number);
    }
  },
  methods: {
    ...mapActions(['getAccountAmount', 'getAccountTransactions']),
    ...mapMutations(['updateAccountNumberError']),
    printProperDate: (date) => {
      let dateObj = new Date(date)
      return dateObj.toDateString() + ' at ' + dateObj.toLocaleTimeString()
    },
    resetAccountNumber() {
      this.number = '';
      this.updateAccountNumberError(0);
    }
  }
}
</script>
