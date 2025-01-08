<template>
  <div class="shop-home">
    <Navbar />
    <h1>Bienvenue dans la boutique DrMad !</h1>
    <p>Nous avons une vaste sélection de virus à vendre. Explorez notre magasin et faites votre choix !</p>
    <p>Accédez à votre compte ou commencez à acheter dès maintenant ! 
    </p>
    <!-- Affichage du panier si l'utilisateur est connecté -->
    <div v-if="isLoggedIn">
      <BasketList />
      <ShopOrders />
    </div>

    <!-- Affichage du formulaire de connexion si l'utilisateur n'est pas connecté -->
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
</style>
