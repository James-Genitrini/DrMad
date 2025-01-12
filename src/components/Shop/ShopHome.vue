<template>
  <div class="shop-home">
    <Navbar />
    <h1>Bienvenue dans la boutique DrMad !</h1>
    <p>Nous avons une vaste sélection de virus à vendre. Explorez notre magasin et faites votre choix !</p>
    <p>Accédez à votre compte ou commencez à acheter dès maintenant ! 
    </p>
    <div v-if="isLoggedIn">
      <BasketList />
      <ShopOrders />
    </div>

    <div v-else>
      <ShopLogin />
    </div>
  </div>
</template>

<script>
// import Navbar from '@/components/NavBar.vue'
import BasketList from '@/components/Shop/BasketList.vue'
import ShopLogin from '@/components/Shop/ShopLogin.vue'
import ShopOrders from '@/components/Shop/ShopOrders.vue'

export default {
  name: 'ShopHome',
  components: {
    // Navbar,
    BasketList,
    ShopLogin,
    ShopOrders
  },
  data() {
    return {
      isLoggedIn: false, 
    };
  },
  mounted() {
    this.isLoggedIn = !!localStorage.getItem('user');  
  }
}
</script>

<style scoped>
.shop-home {
  text-align: center;
  margin-top: 50px;
}

h1 {
  font-size: 2.5em;
  color: #484848;
}

p {
  font-size: 1.2em;
  color: #484848;
}

.shop-home > div {
  margin-top: 30px;
}

.shop-home > div {
  display: inline-block; 
  text-align: left; 
  max-width: 800px; 
  padding: 20px; 
  background-color: white; 
  border-radius: 8px; 
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 30px;
  width: 100%; 
}

/* Optionnel : Si tu veux ajuster les marges internes des composants BasketList et ShopOrders */
.shop-home > div > * {
  margin-bottom: 20px;
}

</style>
