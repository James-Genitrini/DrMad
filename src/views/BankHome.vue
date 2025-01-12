<template>
  <div>
    <h1>Home</h1>
    <p>
      Bienvenue à la banque 
      <span v-if="currentAccount">{{ currentAccount.number }}</span>
      <span v-else> <br> Connectez-vous pour voir vos informations.</span>
    </p>
  </div>
</template>

<script>
export default {
  computed: {
    currentAccount() {
      return this.$store.state.bank.currentAccount;
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 2rem;
  color: #333;
}

p {
  font-size: 1.2rem;
  color: #555;
}

span {
  font-weight: bold;
  color: #007bff;
}
</style>
