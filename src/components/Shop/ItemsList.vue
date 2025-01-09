<template>
  <div class="items-list">
    <CheckedList
      :data="viruses"
      :fields="['name', 'price', 'promotion']"
      :itemCheck="true"
      :checked="checked"
      :itemAmount="true"
      :itemButton="{ show: true, text: 'Ajouter au panier' }"
      :listButton="{ show: true, text: 'Ajouter tout au panier' }"
      @item-button-clicked="addItemToBasket"
      @list-button-clicked="addSelectedItemsToBasket"
      @update:checked="updateChecked"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import CheckedList from './CheckedList.vue';

export default {
  name: 'ItemsList',
  components: { CheckedList },
  data() {
    return {
      checked: [], 
    };
  },
  computed: {
    ...mapState('shop', ['viruses', 'basket']),
  },
  methods: {
    updateChecked(newChecked) {
      this.checked = newChecked;
    },
    addItemToBasket({ index, quantity }) {
      const virus = this.viruses[index];
      const existingItem = this.basket.find(item => item.item._id === virus._id);

      if (existingItem) {
        this.$store.commit('shop/updateBasketQuantity', {
          itemId: virus._id,
          amount: quantity,
        });
      } else {
        this.$store.commit('shop/addToBasket', {
          item: virus,
          amount: quantity,
        });
      }
    },
    addSelectedItemsToBasket(selectedItems) {
      selectedItems.forEach(({ index, quantity }) => {
        this.addItemToBasket({ index, quantity });
      });

      this.checked = this.checked.map(() => false);
    },
  },
  created() {
    this.checked = Array(this.viruses.length).fill(false);
  },
};
</script>

<style scoped>
.items-list {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.item-checkbox {
  margin-right: 10px;
}

.item-details {
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.item-price {
  font-size: 14px;
  color: #4CAF50;
  font-weight: bold;
}

.item-promo {
  font-size: 12px;
  color: #FF5722;
  text-transform: uppercase;
  font-weight: bold;
}

.item-quantity {
  width: 60px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-left: 10px;
}

.item-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.item-button:hover {
  background-color: #45a049;
}

.list-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  width: 100%;
  transition: background-color 0.3s ease;
}

.list-button:hover {
  background-color: #0056b3;
}

@media screen and (max-width: 768px) {
  .items-list {
    padding: 15px;
  }

  .item-details {
    flex-direction: column;
    align-items: flex-start;
  }

  .item-quantity {
    margin-top: 10px;
  }

  .item-name, .item-price, .item-promo {
    margin-bottom: 5px;
  }
}
</style>