<template>
  <div>
    <h1>Les virus</h1>
    <hr />
    <h2 style="text-align: center">Filtres</h2>

    <span>Filtres :</span>
    <label for="filterpriceactive">par prix</label>&nbsp;
    <input type="checkbox" v-model="filterPriceActive" id="filterpriceactive" />
    <label for="filternameactive">par nom</label>&nbsp;
    <input type="checkbox" v-model="filterNameActive" id="filternameactive" />
    <label for="filterstockactive">par stock</label>&nbsp;
    <input type="checkbox" v-model="filterStockActive" id="filterstockactive" />

    <hr />

    <div v-if="filterPriceActive">
      <h2>Filtrer les virus par prix</h2>
      <label for="filterprice">Prix inférieur à :</label>
      <input type="number" v-model="priceFilter" id="filterprice" />
    </div>

    <div v-if="filterNameActive">
      <h2>Filtrer les virus par nom</h2>
      <label for="filtername">Nom contient :</label>
      <input type="text" v-model="nameFilter" id="filtername" />
    </div>

    <div v-if="filterStockActive">
      <h2>Filtrer les virus en stock</h2>
      <label for="filterstock">En stock :</label>
      <input type="checkbox" v-model="filterByStock" id="filterstock" />
    </div>

    <div v-if="filteredViruses.length === 0">
      <p>Aucun virus à afficher.</p>
    </div>
    <CheckedList
      v-else
      :data="filteredViruses"
      :fields="['name', 'price']"
      :itemCheck="true"
      :checked="checkedViruses"
      :itemButton="{ show: true, text: 'Voir Détails' }"
      :listButton="{ show: true, text: 'Voir Virus Cochés' }"
      @checked-changed="onCheckedChanged"
      @item-button-clicked="onItemButtonClicked"
      @list-button-clicked="onListButtonClicked"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import CheckedList from "../components/CheckedList.vue";

export default {
  name: "VirusesView",
  components: {
    CheckedList,
  },
  data() {
    return {
      priceFilter: 0,
      nameFilter: "",
      filterByStock: false,
      filterPriceActive: false,
      filterNameActive: false,
      filterStockActive: false,
      checkedViruses: [],
    };
  },
  computed: {
    ...mapState("shop", ["viruses"]), // Mapping du module 'shop'

    filteredViruses() {
      let viruses = this.viruses;

      // Ajoute des logs pour debug
      console.log("Virus avant filtres :", viruses);

      if (this.filterPriceActive && this.priceFilter > 0) {
        viruses = viruses.filter((v) => v.price <= this.priceFilter);
      }

      if (this.filterNameActive && this.nameFilter) {
        viruses = viruses.filter((v) => v.name.includes(this.nameFilter));
      }

      if (this.filterStockActive && this.filterByStock) {
        viruses = viruses.filter((v) => v.stock > 0);
      }

      console.log("Virus après filtres :", viruses);
      return viruses;
    },
  },
  methods: {
    onCheckedChanged(index) {
      const isChecked = this.checkedViruses.includes(index);

      if (isChecked) {
        this.checkedViruses = this.checkedViruses.filter((i) => i !== index);
      } else {
        this.checkedViruses.push(index);
      }
    },

    onItemButtonClicked(index) {
      const virus = this.filteredViruses[index];
      alert(
        `Nom: ${virus.name}\nStock: ${virus.stock}\nEn vente: ${
          virus.isAvailable ? "Oui" : "Non"
        }`
      );
    },

    onListButtonClicked() {
      const selectedViruses = this.checkedViruses.map(
        (i) => this.filteredViruses[i]
      );
      const virusNames = selectedViruses.map((v) => v.name).join(", ");
      alert(`Virus sélectionnés : ${virusNames}`);
    },
  },
  mounted() {
    this.$store.dispatch("shop/getAllViruses");
  },
};
</script>

<style scoped>
</style>
