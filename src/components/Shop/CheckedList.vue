<template>
  <div class="items">
    <ul>
      <li v-for="(item, index) in data" :key="index" style="display: flex; align-items: center;">
        <!-- Case à cocher -->
        <input v-if="itemCheck" type="checkbox" :checked="checked[index]" @change="$emit('checked-changed', index)"
          style="margin-right: 10px;" />

        <!-- Affichage des champs -->
        <span v-for="field in fields" :key="field" style="margin-right: 10px;">
          {{ item[field] }}
        </span>

        <!-- Champ de quantité si itemAmount est true -->
        <input v-if="itemAmount" type="number" v-model="quantities[index]" min="1" style="width: 50px; margin-right: 10px;" />

        <!-- Bouton d'ajout au panier -->
        <button v-if="itemButton && itemButton.show" @click="handleItemButtonClick(index)" style="margin-left: auto;">
          {{ itemButton.text }}
        </button>
      </li>
    </ul>

    <!-- Bouton pour ajouter tous les items sélectionnés -->
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
    itemAmount: Boolean,  // Nouvelle prop pour gérer l'affichage des quantités
  },
  data() {
    return {
      quantities: []  // Tableau pour stocker les quantités de chaque item
    }
  },
  methods: {
    handleItemButtonClick(index) {
      // Si itemAmount est activé, on prend la quantité associée, sinon la valeur par défaut 1
      const quantity = this.itemAmount ? this.quantities[index] || 1 : 1;
      this.$emit('item-button-clicked', { index, quantity });
    },
    handleListButtonClick() {
      // Envoi des données de tous les items sélectionnés et leurs quantités
      const selectedItems = this.data
        .map((item, index) => ({
          index,
          quantity: this.itemAmount ? this.quantities[index] || 1 : 1
        }))
        .filter(item => this.checked[item.index]);  // Filtrer les items sélectionnés

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
</style>
