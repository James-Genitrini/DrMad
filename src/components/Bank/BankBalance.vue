<template>
    <div>
      <h2>Solde</h2>
      <p>Votre solde actuel est : {{ currentBalance }} €</p>
    </div>
  </template>
  
  <script>
  export default {
    computed: {
      currentBalance() {
        return this.$store.state.currentAccount?.balance || 'Inconnu';
      },
    },
  };
  </script>
  