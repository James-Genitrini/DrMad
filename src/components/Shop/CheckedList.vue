<template>
  <div class="items">
    <ul>
      <li v-for="(item, index) in data" :key="index" style="display: flex; align-items: center;">
        <input
          v-if="itemCheck"
          type="checkbox"
          :checked="checked[index]"
          @change="toggleCheck(index)"
          style="margin-right: 10px;"
        />

        <span v-for="field in fields" :key="field" style="margin-right: 10px;">
          {{ item[field] }}
        </span>

        <input
          v-if="itemAmount"
          type="number"
          v-model="quantities[index]"
          min="1"
          style="width: 50px; margin-right: 10px;"
        />

        <button v-if="itemButton && itemButton.show" @click="handleItemButtonClick(index)" style="margin-left: auto;">
          {{ itemButton.text }}
        </button>
      </li>
    </ul>

    <button v-if="listButton && listButton.show" @click="handleListButtonClick" style="margin-top: 10px;">
      {{ listButton.text }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'CheckedList',
  props: {
    data: Array,
    fields: Array,
    itemCheck: Boolean,
    checked: Array,
    itemButton: Object,
    listButton: Object,
    itemAmount: Boolean,  
  },
  data() {
    return {
      quantities: Array(this.data.length).fill(1),     
    };
  },
  methods: {
    handleItemButtonClick(index) {
      const quantity = this.itemAmount ? this.quantities[index] || 1 : 1;
      this.$emit('item-button-clicked', { index, quantity });
    },
    handleListButtonClick() {
      const selectedItems = this.data
        .map((item, index) => ({
          index,
          quantity: this.itemAmount ? this.quantities[index] || 1 : 1
        }))
        .filter(item => this.checked[item.index]); 

      this.$emit('list-button-clicked', selectedItems);
    }
  }
}
</script>

<style scoped>
body {
  color: red;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

button {
  padding: 5px 10px;
  cursor: pointer;
  margin: 3px;
  font-size: 13px;
  border: 2px solid;
  border-radius: 5px;
  background-color: transparent !important;
  color: red;
}

button:hover {
  -webkit-box-shadow: 0px 0px 83px 15px;
  -moz-box-shadow: 0px 0px 83px 15px;
  box-shadow: 0px 0px 83px 15px;
  transition: all 0.5s ease-in;
}

input[type="number"] {
  width: 60px;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ddd;
  margin-right: 10px;
}

</style>
