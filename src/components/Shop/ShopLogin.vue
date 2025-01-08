<template>
    <div>
      <h1>Login</h1>
  
      <div>
        <label for="login">Login :</label>
        <input v-model="login" id="login" type="text" placeholder="Entrez votre login" />
      </div>
  
      <div>
        <label for="password">Password :</label>
        <input
          v-model="password"
          id="password"
          type="password"
          placeholder="Entrez votre mot de passe"
        />
      </div>
  
      <button @click="handleLogin">Login</button>
  
      <div v-if="shopUser">
        <p>Bienvenue, {{ shopUser.name }} !</p>
      </div>
  
      <div v-else>
        <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState, mapActions } from "vuex";
  
  export default {
    name: "ShopLoginView",
    data: () => ({
      login: "",
      password: "",
      errorMessage: "",
    }),
    computed: {
      ...mapState("shop", ["shopUser"]),
    },
    methods: {
      ...mapActions("shop", ["shopLogin"]),
      async handleLogin() {
        try {
          if (!this.login || !this.password) {
            this.errorMessage = "Veuillez remplir tous les champs.";
            return;
          }
  
          const response = await this.shopLogin({ login: this.login, password: this.password });
          if (!response) {
            this.errorMessage = "Échec de la connexion. Vérifiez vos informations.";
          } else {
            this.errorMessage = "";
          }
        } catch (error) {
          console.error(error);
          this.errorMessage = "Une erreur s'est produite lors de la connexion.";
        }
      },
    },
  };
  </script>
  
  <style scoped>
  div {
    margin-bottom: 10px;
  }
  button {
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
  }
  button:hover {
    background-color: #45a049;
  }
  </style>
  