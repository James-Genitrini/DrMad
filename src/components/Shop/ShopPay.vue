<template>
    <div class="shop-pay">
      <div class="form-container">
        <label for="order-id">ID de la commande :</label>
        <input
          v-model="orderId"
          type="text"
          id="order-id"
          :placeholder="propsOrderId ? propsOrderId : 'Entrez l\'ID de la commande'"
        />
      </div>
      <button @click="payOrder">Payer</button>
    </div>
  </template>
  
  <script>
  import ShopService from '@/services/shop.service';
  
  export default {
    name: 'ShopPay',
    props: {
      propsOrderId: String
    },
    data() {
      return {
        orderId: this.propsOrderId || ''
      };
    },
    methods: {
      async payOrder() {
        try {
          if (this.orderId.trim() === '') {
            alert("Veuillez entrer un ID de commande !");
            return;
          }
  
          const user = this.$store.state.shop.shopUser;
  
          if (!user) {
            alert("Vous devez être connecté pour effectuer cette action.");
            return;
          }
  
          const response = await ShopService.payOrder(user.id, this.orderId);
          
          if (response.error === 0) {
            alert('Commande payée avec succès !');
            this.$router.push('/shop/orders'); 
          } else {
            alert('Commande introuvable ou déjà finalisée.');
          }
        } catch (error) {
          console.error('Erreur lors du paiement:', error);
          alert('Une erreur est survenue.');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .shop-pay {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .form-container {
    margin-bottom: 20px;
  }
  
  button {
    padding: 10px 20px;
    background-color: green;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: darkgreen;
  }
  </style>
  