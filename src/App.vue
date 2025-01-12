<template>
  <div id="app">
    <NavBarHome :titles="titles" @menu-clicked="menuClicked" />

    <h1>Welcome to Peepo's app</h1>

    <router-view></router-view>
  </div>
</template>

<script>
import NavBarHome from "@/components/NavBarHome.vue";  

export default {
  name: 'App',
  components: {
    NavBarHome
  },
  data() {
    return {
      titles: [
        { text: 'Boutique', color: 'green' },
        { text: 'Bank', color: 'blue' },
      ]
    };
  },
  methods: {
    menuClicked(index) {
      if (index === 0) {
        this.$router.push('/shop/login');  
      } else if (index === 1) {
        this.$router.push('/bank/login');  
      }
    }
  }
};
</script>

<style>
body {
  padding: 5px;
  font-family: 'Bungee' !important;
  background-color: #222223;
  color: #484848;
}

h1 {
  text-align: center;
  color: white;
  font-size: 2.5em;
  margin-top: 50px;
}

hr {
  color: #303030;
  border: 1px solid #303030;
}

#app {
  text-align: center;
  margin-top: 30px;
}

.navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.navbar-buttons {
  display: flex;
  gap: 20px;
}

.navbar-button {
  background-color: white;
  color: #484848;
  padding: 15px 30px;
  font-size: 1.2em;
  font-weight: bold;
  border-radius: 25px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.navbar-button:hover {
  background-color: #f1f1f1;
  transform: scale(1.05);
}

.navbar-button:active {
  transform: scale(1);
}

::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background-color: #222223;
}

::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #555;
  border-radius: 10px;
}
</style>
