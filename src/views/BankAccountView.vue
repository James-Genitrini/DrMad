<template>
  <div>
    <h1>Account Number</h1>

    <div>
      <label for="account-number">Account Number:</label>
      <input v-model="number" id="account-number" placeholder="Entrez un numéro de compte valide" />
    </div>

    <button
      @click="handleFetchAccountData"
    >
      Validate
    </button>
    <button @click="resetAccountNumber">Reset</button>

    <div v-if="accountNumberError === 1">
      <p><strong>Montant du compte :</strong> {{ accountAmount }}</p>

      <div v-if="accountTransactions.length > 0">
        <h3>Transactions :</h3>
        <ul>
          <li v-for="transaction in accountTransactions" :key="transaction.id">
            Gain/perte de {{ transaction.amount }} à la date du : {{ printProperDate(transaction.date.$date) }}
          </li>
        </ul>
      </div>
      <p v-else>Aucune transaction trouvée 😔</p>
    </div>

    <p v-else-if="accountNumberError === -1">
      Erreur : Compte non reconnu 😔
    </p>
  </div>
</template>

---

### **Script**

```javascript
<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "BankAccountView",
  data: () => ({
    number: "",
  }),
  computed: {
    ...mapState("bank", [
      "accountAmount",
      "accountTransactions",
      "accountNumberError",
    ]),
  },
  methods: {
    ...mapActions("bank", ["getAccountAmount", "getAccountTransactions"]),
    ...mapMutations("bank", ["updateAccountNumberError"]),
    
    async handleFetchAccountData() {
      try {
        await this.getAccountAmount(this.number);
        await this.getAccountTransactions(this.number);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    },

    printProperDate(date) {
      const dateObj = new Date(date);
      return `${dateObj.toLocaleDateString()} à ${dateObj.toLocaleTimeString()}`;
    },

    resetAccountNumber() {
      this.number = "";
      this.updateAccountNumberError(0);
    },
  },
};
</script>
