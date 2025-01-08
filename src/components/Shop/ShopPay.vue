<template>
    <div>
      <h2>Paiement de la commande</h2>
      <p>Commande ID : {{ orderId }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: "ShopPay",
    props: {
      orderId: {
        type: String,
        required: true,
      },
    },
  };
  </script>
  