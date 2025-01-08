<template>
    <div>
      <h1>Boutique</h1>
      <!-- <router-view> affichera les vues enfant en fonction de la route -->
      <router-view name="shopmain"></router-view>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ShopView',
  }
  </script>
  