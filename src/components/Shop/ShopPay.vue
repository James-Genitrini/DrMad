<template>
  <div class="shop-pay">
    <div class="form-container">
      <label for="order-id">ID de la commande :</label>
      <input
        v-model="orderId"
        type="text"
        id="order-id"
        :placeholder="propsOrderId ? propsOrderId : 'Entrez l\'ID de la commande'"
      /> <br>

      <label for="transact-id">ID de la transaction :</label>
      <input
        v-model="transactId"
        type="text"
        id="transact-id"
        :placeholder="'Entrez l\'ID de la transaction'"
      /> <br>

      <button @click="fetchOrderDetails">Voir les détails de la commande</button>
    </div>

    <div v-if="orderDetails">
      <h3>Détails de la commande</h3>
      <ul>
        <li v-for="(item, index) in orderDetails.items" :key="index">
          <p><strong>Produit:</strong> {{ item.item.name }}</p>
          <p><strong>Prix:</strong> {{ item.item.price }}€</p>
          <p><strong>Quantité:</strong> {{ item.amount }}</p>
        </li>
      </ul>
      <p><strong>Total:</strong> {{ orderDetails.total }}€</p>
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
    propsOrderId: String,
  },
  data() {
    return {
      orderId: this.propsOrderId || '', 
      transactId: '',
      orderDetails: null,  
    };
  },
  computed: {
    ...mapState({
      shopUser: (state) => state.shop.shopUser,
    }),
  },
  methods: {
    async fetchOrderDetails() {
      try {
        if (this.orderId.trim() === '') {
          alert("Veuillez entrer un ID de commande !");
          return;
        }

        const user = this.shopUser;

        if (!user) {
          alert("Vous devez être connecté pour voir les détails de la commande.");
          return;
        }

        const response = await ShopService.getOrderDetails(user._id, this.orderId); 

        if (response.error === 0) {
          this.orderDetails = response.data;  
        } else {
          alert(response.message);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des détails de la commande:", error);
      }
    },

    async payOrder() {
      console.log('payOrder appelé'); 

      try {
        if (this.orderId.trim() === '') {
          alert("Veuillez entrer un ID de commande !");
          return;
        }

        if (this.transactId.trim() === '') {
          alert("Veuillez entrer un ID de transaction !");
          return;
        }

        const user = this.shopUser;

        console.log(this.orderId)
        console.log(this.transactId)
        console.log(user._id)
        if (user === undefined) {
          alert("Vous devez être connecté pour effectuer cette action.");
          return;
        }
        const response = await ShopService.payOrder(user._id, this.orderId, this.transactId);

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
  }
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
  margin-top: 20px;
}

button:hover {
  background-color: darkgreen;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

ul li {
  margin-bottom: 10px;
}
</style>
