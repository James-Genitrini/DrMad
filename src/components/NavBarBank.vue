<template>
    <div class="navbar-bank">
      <div class="navbar-links">
        <router-link to="/bank/home" v-if="isAuthenticated">Home</router-link>
  
        <router-link to="/bank/buy" v-if="isAuthenticated">Boutique</router-link>
  
        <router-link to="/bank/orders" v-if="isAuthenticated">Mes Commandes</router-link>
    
        <router-link to="/shop/home" v-if="!isAuthenticated">Se connecter</router-link>
  
        <button v-if="isAuthenticated" @click="logout">Se déconnecter</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isAuthenticated: false
      }
    },
    created() {
      this.checkAuthentication();
    },
    methods: {
      checkAuthentication() {
        const user = localStorage.getItem('user');
        if (user) {
          this.isAuthenticated = true;
        } else {
          this.isAuthenticated = false;
        }
      },
      logout() {
        localStorage.removeItem('user');  
        this.isAuthenticated = false;
        this.$router.push('/');  
        location.reload();
      }
    }
  }
  </script>
  
  <style scoped>
  .navbar {
    background-color: #282c34;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .navbar-links {
    display: flex;
    gap: 15px;
  }
  
  .navbar-links a {
    color: white;
    text-decoration: none;
    font-size: 16px;
  }
  
  .navbar-links button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
  }
  
  .navbar-links button:hover {
    background-color: #45a049;
  }
  </style>
  