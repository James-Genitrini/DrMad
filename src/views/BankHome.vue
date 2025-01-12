<template>
  <div class="home-wrapper">
    <h1>🔥 Bienvenue 🔥</h1>
    <p>
      Chez la DrMad's bank !
      <span v-if="currentAccount">{{ currentAccount.number }}</span>
      <span v-else> <br> Connectez-vous pour voir vos informations.</span>
    </p>
    <button v-if="!currentAccount" class="login-btn" @click="handleLogin">Me connecter</button>
  </div>
</template>

<script>
export default {
  computed: {
    currentAccount() {
      return this.$store.state.bank.currentAccount;
    }
  },
  methods: {
    handleLogin() {
      this.$router.push('/bank/account');
    }
  }
}
</script>

<style scoped>
.home-wrapper {
  padding: 30px;
  background-color: #2e2e2e;
  border-radius: 12px;
  max-width: 800px;
  margin: 40px auto;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.home-wrapper:hover {
  transform: translateY(-5px); /* Effet de légère élévation au survol */
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);
}

h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #4a5568;
  margin-bottom: 20px;
}

p {
  font-size: 1.25rem;
  color: #4a5568;
  line-height: 1.6;
}

span {
  font-weight: 600;
  color: #4CAF50;
  display: inline-block;
  margin-top: 10px;
}

span + span {
  color: #FF6347; /* Rouge pour l'élément qui indique qu'il faut se connecter */
}

.login-btn {
  padding: 12px 24px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  margin-top: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.login-btn:hover {
  background-color: #45a049;
  transform: translateY(-2px); /* Effet de légère élévation au survol */
}

.login-btn:focus {
  outline: 2px solid #60e464;
  outline-offset: 2px;
}

.login-btn:active {
  background-color: #389e3d;
  transform: translateY(1px); /* Effet de pression sur le bouton */
}
</style>
