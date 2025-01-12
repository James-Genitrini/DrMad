<template>
    <div>
      <h2 v-if="!currentAccount">Connexion à Mon Compte</h2>
      <h2 v-else>Déconnexion du Compte</h2>
  
      <div v-if="!currentAccount">
        <input v-model="accountNumber" placeholder="Numéro de compte" />
        <button @click="login">Valider</button>
      </div>
  
      <div v-else>
        <p>Compte : {{ currentAccount.accountNumber }}</p>
        <button @click="logout">Se Déconnecter</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        accountNumber: '',
        currentAccount: null, 
      };
    },
    methods: {
      login() {
        const account = this.$store.getters.getBankAccount(this.accountNumber);
        if (account) {
          this.currentAccount = account;
          this.$store.dispatch('setCurrentAccount', account);
        } else {
          alert('Compte non trouvé !');
        }
      },
      logout() {
        this.currentAccount = null;
        this.$store.dispatch('clearCurrentAccount');
      },
    },
  };
  </script>
  