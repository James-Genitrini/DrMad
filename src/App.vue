<template>
  <div id="app">
    <NavBarHome :titles="titles" @menu-clicked="menuClicked" />

    <!-- <img alt="Vue logo" src="./assets/peepo.gif"> -->
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

img {
  margin-left: 35%;
}

h1 {
  text-align: center;
}

hr {
  color: #303030;
  border: 1px solid #303030;
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

input {
  background-color: red;
}
</style>
