<template>
  <div id="app">
    <NavBar :titles="titles" @menu-clicked="menuClicked" />

    <img alt="Vue logo" src="./assets/peepo.gif">
    <h1>Welcome to Peepo's app</h1>

    <router-view></router-view>
  </div>


</template>

<script>
import NavBar from "@/components/NavBar.vue";
import { mapActions } from 'vuex'

export default {
  name: 'App',

  components: {
    NavBar
  },
  data: () => ({
    titles: [
      { text: 'Viruses', color: 'red' },
      { text: 'Compte Bancaire', color: 'blue' },
      { text: 'Login', color: 'green' }
    ]
  }),
  methods: {
    ...mapActions(['getAllViruses']),
    menuClicked(index) {
      console.log(index + ' clicked')
      if (index === 0) { this.$router.push('/shop/items'); }
      else if (index === 1) { this.$router.push('/bank/account'); }
      else if (index === 2) { this.$router.push(('/shop/login')); }
    }
  },
  mounted() {
    this.getAllViruses()
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
  /* border: 1px solid #f1f1f1; */
}

::-webkit-scrollbar-thumb:hover {
  background-color: #555;
  border-radius: 10px;
}

input {
  background-color: red;
}

</style>