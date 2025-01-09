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

.shop-home > div {
  display: inline-block; /* Pour centrer horizontalement */
  text-align: left; /* Pour garder les éléments à gauche */
  max-width: 800px; /* Limite la largeur */
  padding: 20px; /* Espace autour des éléments */
  background-color: white; /* Fond blanc */
  border-radius: 8px; /* Coins arrondis */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Ombre légère autour de l'encadré */
  margin-top: 30px; /* Espacement entre les sections */
  width: 100%; /* Prend toute la largeur disponible dans un conteneur parent */
}

/* Optionnel : Si tu veux ajuster les marges internes des composants BasketList et ShopOrders */
.shop-home > div > * {
  margin-bottom: 20px;
}

</style>
