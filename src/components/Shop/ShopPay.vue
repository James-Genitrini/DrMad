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
import { mapState } from 'vuex';

export default {
  name: 'ShopPay',
  props: {
    propsOrderId: String
  },
  data() {
    return {
      orderId: this.propsOrderId || '',  // Valeur par défaut via props
    };
  },
  computed: {
    ...mapState({
      shopUser: (state) => state.shop.shopUser,
    }),
  },
  methods: {
    async payOrder() {
      try {
        if (this.orderId.trim() === '') {
          alert("Veuillez entrer un ID de commande !");
          return;
        }

        const user = this.shopUser;

        if (user === undefined) {
          alert("Vous devez être connecté pour effectuer cette action.");
          return;
        }

        const response = await ShopService.payOrder(user._id, this.orderId);
        
        if (response.error === 0) {
          console.log('Commande payée avec succès !');
          this.$router.push('/shop/orders'); 
        } else {
          console.log('Commande introuvable ou déjà finalisée.');
        }
      } catch (error) {
        console.error('Erreur lors du paiement:', error);
      }
    }
  },
  mounted() {
    if (this.$route.params.orderId) {
      this.orderId = this.$route.params.orderId;
    }
  },
}
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
