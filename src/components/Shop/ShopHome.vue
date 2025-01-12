<template>
  <div class="shop-home">
    <h2>Bienvenue sur la boutique DRMAD !</h2>

    <div v-if="isLoggedIn" class="bottom-section">
      <BasketList />
      <ShopOrders />
    </div>

    <div v-else>
      <ShopLogin />
    </div>
  </div>
</template>

<script>
import BasketList from '@/components/Shop/BasketList.vue'
import ShopLogin from '@/components/Shop/ShopLogin.vue'
import ShopOrders from '@/components/Shop/ShopOrders.vue'

export default {
  name: 'ShopHome',
  components: {
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

.content {
  margin-top: 20px;
  padding: 20px;
  background-color: #484848;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 50%; /* Prend 50% de la largeur */
  margin-left: auto;
  margin-right: auto; /* Centré horizontalement */
}

.bottom-section {
  margin-top: 40px;
  padding: 20px;
  background-color: #484848;
  border-top: 2px solid #484848;
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

.shop-home > div > * {
  margin-bottom: 20px;
}
</style>
