<template>
  <div class="shop-orders">
    <h1>Mes Commandes</h1>
    <div v-if="orders.length === 0">Aucune commande trouvée.</div>
    <div v-for="order in orders" :key="order.uuid" class="order-item">
      <div>
        <span><strong>Montant :</strong> {{ order.total }} €</span><br>
        <span><strong>Status :</strong> {{ order.status }}</span><br>
        <!-- <span><strong>Uuid :</strong> {{ order.uuid }}</span> -->
      </div>
      <div v-if="order.status === 'waiting_payment'">
        <button @click="payOrder(order.uuid)">Payer</button>
        <button @click="cancelOrder(order.uuid)">Annuler</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';  
import ShopService from '@/services/shop.service';

export default {
  name: 'ShopOrders',
  data() {
    return {
      orders: [],
    };
  },
  computed: {
    ...mapState({
      shopUser: (state) => state.shop.shopUser,
    }),
  },
  async created() {
    if (this.shopUser) {
      // console.log(this.shopUser)
      await this.fetchOrders();  
    } else {
      console.error("Utilisateur non connecté.");
    }
  },
  methods: {
    async fetchOrders() {
      try {
        // console.log(this.shopUser);
        const response = await ShopService.getOrders(this.shopUser._id);
        if (response.error === 0) {
          this.orders = response.data;
        } else {
          console.error("Erreur lors du chargement des commandes", response.data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des commandes", error);
      }
    },
    async payOrder(orderId) {
      this.$router.push(`/shop/pay/${orderId}`);
    },
    async cancelOrder(orderId) {
      const response = await ShopService.cancelOrder(this.shopUser._id, orderId);
      if (response.error === 0) {
        const orderIndex = this.orders.findIndex(order => order.uuid === orderId);
        if (orderIndex !== -1) {
          this.orders[orderIndex].status = 'cancelled';
        }
      } else {
        alert('Erreur lors de l\'annulation de la commande');
      }
    },
  },
};
</script>

<style scoped>
.shop-orders {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.order-item {
  background-color: #f4f4f4;
  margin: 10px;
  padding: 15px;
  width: 80%;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

button {
  margin: 5px;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
