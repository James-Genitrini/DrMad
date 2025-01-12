<template>
  <div class="shop-buy">
    <div class="shop-buy-left">
      <h1>Liste des Virus</h1>
      <ItemsList
        :data="viruses"
        :fields="['name', 'description', 'price']"
        :itemButton="{ show: true, text: 'Ajouter au panier' }"
        @item-button-clicked="handleAddToBasket"
      />
    </div>
  </div>
</template>

<script>
import ItemsList from './ItemsList.vue';

export default {
  name: 'ShopBuy',
  components: {
    ItemsList,
  },
  computed: {
    viruses() {
      return this.$store.state.shop.viruses;
    },
    basket() {
      return this.$store.state.shop.basket.map(item => ({
        ...item,
        amount: `${item.amount} x ${item.item.price} €`,
      }));
    },
  },
  methods: {
    handleAddToBasket({ index }) {
      const virus = this.viruses[index];
      const existingItem = this.$store.state.shop.basket.find(
        item => item.item._id === virus._id
      );
      if (existingItem) {
        existingItem.amount += 1;
      } else {
        this.$store.commit('shop/addToBasket', { item: virus, amount: 1 });
      }
    },
    handleRemoveFromBasket({ index }) {
      const itemId = this.basket[index].item._id;
      this.$store.dispatch('shop/removeItemFromBasket', itemId);
    },
    clearBasket() {
      this.$store.dispatch('shop/clearBasket');
    },
  },
  created() {
    this.$store.dispatch('shop/getAllViruses');
  },
};
</script>

<style scoped>
.shop-buy {
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
}

.shop-buy-left {
  width: 100%; 
}

.card-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

h1 {
  text-align: center;
}
</style>
