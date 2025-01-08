<template>
    <div class="shop-buy">
      <!-- Section Liste des Virus -->
      <div class="shop-buy-left">
        <h1>Liste des Virus</h1>
  
        <!-- Wrapper pour le carré blanc contenant les virus -->
        <div class="card-container">
          <div v-if="viruses.length">
            <div
              v-for="virus in viruses"
              :key="virus.id"
              class="virus-card"
            >
              <div class="card-header">
                <h3>{{ virus.name }} {{ virus._id }}</h3>
              </div>
              <div class="card-body">
                <p>{{ virus.description }}</p>
                <p><strong>{{ virus.price }} €</strong></p>
              </div>
              <div class="card-footer">
                <button @click="addToBasket(virus)">Ajouter au panier</button>
              </div>
            </div>
          </div>
          <div v-else>
            <p>Les virus sont en cours de chargement...</p>
          </div>
        </div>
      </div>
  
      <!-- Section Panier -->
      <div class="shop-buy-right">
        <h1>Votre Panier</h1>
  
        <!-- Wrapper pour le carré blanc contenant le panier -->
        <div class="card-container">
          <div v-if="basket.length">
            <div
              v-for="item in basket"
              :key="item.item.id"
              class="basket-item"
            >
              <p>{{ item.item.name }} - {{ item.amount }} x {{ item.item.price }} €</p>
              <button @click="removeFromBasket(item.item._id)">Supprimer</button>
            </div>
            <button @click="clearBasket">Vider le panier</button>
          </div>
          <div v-else>
            <p>Le panier est vide.</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ShopBuy',
    computed: {
      viruses() {
        return this.$store.state.shop.viruses;
      },
      basket() {
        return this.$store.state.shop.basket;
      }
    },
    methods: {
      addToBasket(virus) {
        // console.log(JSON.parse(JSON.stringify(this.$store.state.shop.basket)));
        // console.log(virus._id);
        // console.log(this.$store.state.shop.basket.map(item => item.item._id));  // Affiche les IDs dans le panier
        const existingItem = this.$store.state.shop.basket.find(itemBasket => itemBasket.item._id === virus._id);
        console.log(existingItem !== undefined)
        if (existingItem !== undefined) {
            existingItem.amount += 1;
        } else {
            // console.log("boucle add")
            // console.log(virus)
            this.$store.commit('shop/addToBasket', { item: virus, amount: 1 });
          }
      },

      removeFromBasket(itemId) {
        console.log(itemId)
        this.$store.dispatch('shop/removeItemFromBasket', itemId);
      },
      clearBasket() {
        this.$store.dispatch('shop/clearBasket');
      }
    },
    created() {
      this.$store.dispatch('shop/getAllViruses');
    }
  }
  </script>
  
  <style scoped>
  .shop-buy {
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
  }
  
  .shop-buy-left,
  .shop-buy-right {
    width: 48%;
  }
  
  .card-container {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;
  }
  
  .virus-card,
  .basket-item {
    margin-bottom: 20px;
  }
  
  .virus-card {
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 15px;
    transition: transform 0.2s;
  }
  
  .virus-card:hover {
    transform: translateY(-5px);
  }
  
  .card-header h3 {
    font-size: 1.5em;
    color: #333;
  }
  
  .card-body {
    margin-top: 10px;
  }
  
  .card-footer {
    margin-top: 15px;
    text-align: center;
  }
  
  button {
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }
  
  button:hover {
    background-color: #45a049;
  }
  
  .shop-buy-right {
    padding-top: 20px;
  }
  
  .basket-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .basket-item button {
    background-color: #f44336;
  }
  
  .basket-item button:hover {
    background-color: #d32f2f;
  }
  </style>
  