<template>
    <div class="shop-login">
      <h1>Connexion à la boutique </h1>
      <input type="text" v-model="login" placeholder="Nom d'utilisateur" />
      <input type="password" v-model="password" placeholder="Mot de passe" />
      <button @click="handleLogin">Se connecter</button>
      <p v-if="loginError" class="error">Erreur de connexion, essayez à nouveau.</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        login: '',
        password: '',
        loginError: false
      }
    },
    methods: {
      async handleLogin() {
        const data = {
          login: this.login,
          password: this.password,
        }
        console.log(data)
        const response = await this.$store.dispatch('shop/shopLogin', data)

        if (!response.error) {
          this.$router.push('/shop/home')
          location.reload();
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
  