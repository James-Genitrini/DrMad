<template>
    <div>
      <NavBarShop />
      
      <div class="main-content">
        <router-view />
      </div>
    </div>
  </template>
  
  <script>
  import NavBarShop from '@/components/NavBarShop.vue';  
  
  export default {
    name: 'WrapperComponent',
    components: {
      NavBarShop,
    },
  };
  </script>
  
  <style scoped>
  .main-content {
    margin-top: 50px; 
  }
  </style>
  