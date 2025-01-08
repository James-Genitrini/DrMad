<template>
    <div>
      <h2>Acheter des produits</h2>
      <div v-if="items.length > 0">
        <h3>Articles disponibles</h3>
        <div class="product-list">
          <div class="product" v-for="item in items" :key="item.id">
            <h4>{{ item.name }}</h4>
            <p>Prix: {{ item.price }}€</p>
            <p>Stock: {{ item.stock }} disponible(s)</p>
            <button 
              :disabled="item.stock <= 0"
              @click="addToCart(item)">
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Aucun produit disponible pour le moment.</p>
      </div>
      
      <!-- Affichage du panier (optionnel) -->
      <div v-if="cart.length > 0">
        <h3>Votre panier</h3>
        <ul>
          <li v-for="(item, index) in cart" :key="index">
            {{ item.name }} - {{ item.price }}€
          </li>
        </ul>
        <button @click="proceedToCheckout">Procéder au paiement</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ShopBuy',
    data() {
      return {
        items: [
          { id: 1, name: 'Virus A', price: 100, stock: 10 },
          { id: 2, name: 'Virus B', price: 150, stock: 5 },
          { id: 3, name: 'Virus C', price: 200, stock: 0 },
        ],
        cart: [],
      };
    },
    methods: {
      // Ajouter un produit au panier
      addToCart(item) {
        if (item.stock > 0) {
          this.cart.push(item);
          item.stock -= 1; // Réduit le stock du produit
        }
      },
      // Procéder au paiement
      proceedToCheckout() {
        alert('Procéder au paiement...');
        // Redirection vers la page de paiement (ShopPay)
        this.$router.push({ name: 'shop-pay', params: { orderId: '12345' } });
      },
    },
  };
  </script>
  
  <style scoped>
  .product-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
  }
  
  .product {
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-align: center;
  }
  
  button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
  }
  
  button:disabled {
    background-color: #ccc;
  }
  </style>
  