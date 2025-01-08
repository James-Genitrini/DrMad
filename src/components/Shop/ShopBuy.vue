<template>
    <div class="shop-buy">
      <div class="left">
        <ItemsList 
          :data="items" 
          :fields="['name', 'price', 'promo']" 
          :item-check="true" 
          :checked="checked" 
          :item-button="itemButton" 
          @item-button-clicked="addToCart" />
      </div>
      <div class="right">
        <BasketList :cart="cart" />
      </div>
    </div>
  </template>
  
  <script>
  import ItemsList from '@/components/Shop/ItemsList.vue'; 
//   import BasketList from '@/components/Shop/BasketList.vue'; 
  import shopService from '@/services/shop.service'; 
  
  export default {
    name: 'ShopBuy',
    components: {
      ItemsList,
    //   BasketList
    },
    data() {
      return {
        items: [],
        checked: [], 
        itemButton: { show: true, text: 'Ajouter au panier' },
        cart: [] 
      };
    },
    async created() {
      await this.fetchItems();
    },
    methods: {
      async fetchItems() {
        try {
          const response = await shopService.getAllViruses();
          if (response.error === 0) {
            this.items = response.data; 
          } else {
            console.error("Erreur lors de la récupération des items:", response.data);
          }
        } catch (error) {
          console.error("Erreur lors du chargement des items:", error);
        }
      },
      addToCart({ index, quantity }) {
        const selectedItem = this.items[index];
        const cartItem = this.cart.find(item => item.id === selectedItem.id);
  
        if (cartItem) {
          cartItem.quantity += quantity; 
        } else {
          this.cart.push({ ...selectedItem, quantity }); 
        }
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  