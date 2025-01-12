<template>
  <div class="shop-buy">
    <div class="shop-buy-left">
      <h1>Liste des Virus</h1>

      <div class="filters">
        <input
          type="text"
          v-model="filters.name"
          placeholder="Rechercher par nom"
        />
        <input
          type="number"
          v-model.number="filters.maxPrice"
          placeholder="Prix max (€)"
          min="0"
        />
        <label>
          En Stock :
          <input
            type="checkbox"
            v-model="filters.inStock"
          />
        </label>
        <button @click="resetFilters">Réinitialiser</button>
      </div>

      <div class="card-container">
        <div v-if="filteredViruses.length">
          <div
            v-for="virus in filteredViruses"
            :key="virus.id"
            class="virus-card"
          >
            <div class="card-header">
              <h3>{{ virus.name }}</h3>
            </div>
            <div class="card-body">
              <p>{{ virus.description }}</p>
              <p><strong>{{ virus.price }} €</strong></p>
            </div>
            <div v-if="virus.promotion && virus.promotion.length">
              <p>Promotions :</p>
              <ul>
                <li v-for="promo in virus.promotion" :key="promo._id">
                  - {{ promo.discount }}% sur {{ promo.amount }} unités
                </li>
              </ul>
            </div>
            <div class="card-footer">
              <input type="checkbox" :value="virus" v-model="selectedViruses" @change="handleVirusSelectionChange(virus)" />

              <input
                v-if="isSelected(virus)"
                type="number"
                v-model="quantities[virus._id]"
                min="1"
                :max="10"
                placeholder="Quantité"
              />

              <button @click="addToBasket(virus)">Ajouter</button>
            </div>
          </div>
        </div>
        <div v-else>
          <p>Aucun virus ne correspond à vos critères...</p>
        </div>
      </div>

      <div v-if="selectedViruses.length">
        <button @click="addAllToBasket">Ajouter tout</button>
      </div>
    </div>

    <div class="shop-buy-right">
      <h1>Votre Panier</h1>

      <div class="card-container">
        <BasketList />
      </div>
    </div>
  </div>
</template>

<script>
import BasketList from '@/components/Shop/BasketList.vue';

export default {
  name: 'ItemsList',
  components: {
    BasketList,
  },
  data() {
    return {
      selectedViruses: [],
      quantities: {},
      filters: {
        name: '',
        maxPrice: null,
        inStock: false,
      },
    };
  },
  computed: {
    viruses() {
      return this.$store.state.shop.viruses;
    },
    basket() {
      return this.$store.state.shop.basket;
    },
    filteredViruses() {
      return this.viruses.filter(virus => {
        const matchesName = virus.name.toLowerCase().includes(this.filters.name.toLowerCase());
        const matchesPrice = this.filters.maxPrice === null || virus.price <= this.filters.maxPrice;
        const matchesStock = !this.filters.inStock || virus.stock > 0;
        return matchesName && matchesPrice && matchesStock;
      });
    },
  },
  methods: {
    addToBasket(virus) {
      const quantity = parseInt(this.quantities[virus._id]) || 1;
      const existingItem = this.$store.state.shop.basket.find(
        itemBasket => itemBasket.item._id === virus._id
      );

      if (existingItem) {
        existingItem.amount += quantity;
      } else {
        this.$store.commit('shop/addToBasket', { item: virus, amount: quantity });
      }
    },

    removeFromBasket(itemId) {
      this.$store.dispatch('shop/removeItemFromBasket', itemId);
    },

    clearBasket() {
      this.$store.dispatch('shop/clearBasket');
    },

    isSelected(virus) {
      return this.selectedViruses.includes(virus);
    },

    addAllToBasket() {
      this.selectedViruses.forEach(virus => {
        const quantity = this.quantities[virus._id] || 1;
        this.addToBasket(virus, quantity);
      });
    },

    handleVirusSelectionChange(virus) {
      if (!this.selectedViruses.includes(virus)) {
        this.$delete(this.quantities, virus._id); 
      } else {
        this.$set(this.quantities, virus._id, 1);
      }
    },

    resetFilters() {
      this.filters.name = '';
      this.filters.maxPrice = null;
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

.card-body ul {
  margin: 10px 0;
  padding-left: 20px;
  list-style-type: disc;
  color: #555;
}

input[type="number"] {
  width: 60px;
  padding: 5px;
  margin-top: 10px;
  text-align: center;
}

.filters {
  margin-bottom: 20px;
}

.filters input {
  margin-right: 10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
