<template>
    <div class="shop-login">
      <h1>Connexion à la boutique</h1>
      <input type="text" v-model="username" placeholder="Nom d'utilisateur" />
      <input type="password" v-model="password" placeholder="Mot de passe" />
      <button @click="handleLogin">Se connecter</button>
      <p v-if="loginError" class="error">Erreur de connexion, essayez à nouveau.</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        loginError: false
      }
    },
    methods: {
      async handleLogin() {
        const data = {
          username: this.username,
          password: this.password,
        }
        const response = await this.$store.dispatch('shop/shopLogin', data)
        if (!response.error) {
          this.$router.push('/shop/home')
        } else {
          this.loginError = true
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .shop-login {
    text-align: center;
    margin-top: 50px;
  }
  
  input {
    margin: 10px;
    padding: 10px;
    width: 200px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  
  .error {
    color: red;
    margin-top: 10px;
  }
  </style>
  ``
  