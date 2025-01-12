<template>
  <div class="navbar">
    <div class="navbar-links">
      <router-link to="/shop/home" v-if="isAuthenticated">Home</router-link>

      <router-link to="/shop/buy" v-if="isAuthenticated">Boutique</router-link>

      <router-link to="/shop/orders" v-if="isAuthenticated">Mes Commandes</router-link>

      <router-link to="/shop/login" v-if="!isAuthenticated">Se connecter</router-link>

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
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 20px;
}

.navbar-links {
  display: flex;
  justify-content: space-around;
  gap: 15px;
  width: 50%; 
  background-color: #f0f0f0; 
  padding: 15px;
  border-radius: 15px; 
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); 
}

.navbar-links a {
  color: #282c34;
  text-decoration: none;
  font-size: 16px;
}

.navbar-links button {
  background-color: #4CAF50;
  color: #ffffff;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
}

.navbar-links button:hover {
  background-color: #45a049;
}
</style>
