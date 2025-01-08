<template>
  <div class="items">
    <ul>
      <li v-for="(item, index) in data" :key="index" style="display: flex; align-items: center;">
        <input v-if="itemCheck" type="checkbox" :checked="checked[index]" @change="$emit('checked-changed', index)" style="margin-right: 10px;" />

        <span v-for="field in fields" :key="field" style="margin-right: 10px;">
          {{ item[field] }}
        </span>

        <input v-if="itemAmount" type="number" v-model="quantities[index]" min="1" style="width: 50px; margin-right: 10px;" />
        <button v-if="itemButton && itemButton.show" @click="$emit('item-button-clicked', { index, quantity: quantities[index] || 1 })" style="margin-left: auto;">
          {{ itemButton.text }}
        </button>
      </li>
    </ul>

    <button v-if="listButton && listButton.show" @click="$emit('list-button-clicked')" style="margin-top: 10px;">
      {{ listButton.text }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'ItemsList',
  props: {
    data: Array,
    fields: Array,
    itemCheck: Boolean,
    checked: Array,
    itemButton: Object,
    listButton: Object,
    itemAmount: Boolean
  },
  data() {
    return {
      quantities: [] 
    };
  }
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