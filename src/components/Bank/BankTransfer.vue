<template>
    <div>
      <h2>Débit/Virement</h2>
      <input v-model="amount" type="number" placeholder="Montant" />
      <div>
        <label>
          <input type="checkbox" v-model="isTransfer" />
          Destinataire
        </label>
      </div>
      <div v-if="isTransfer">
        <input v-model="recipientAccount" placeholder="Numéro du destinataire" />
      </div>
      <button @click="submitTransaction">Valider</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        amount: 0,
        isTransfer: false,
        recipientAccount: '',
      };
    },
    methods: {
      submitTransaction() {
      },
    },
  };
  </script>
  