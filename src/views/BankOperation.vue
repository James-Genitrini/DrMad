<template>
    <div class="operation-wrapper">
        <h1>
            <slot name="title">Débit / Virement</slot>
        </h1>

        <div class="form-group">
            <label for="amount">Montant :</label>
            <input type="number" id="amount" v-model="amount" min="0" placeholder="Entrez le montant" />
        </div>

        <div class="form-group">
            <label>
                <input type="checkbox" v-model="isRecipient" />
                Destinataire
            </label>
        </div>

        <div v-if="isRecipient" class="form-group">
            <label for="recipient">Numéro de compte du destinataire :</label>
            <input type="text" id="recipient" v-model="recipient" placeholder="Entrez le numéro de compte du destinataire" />
        </div>

        <div class="form-group">
            <button @click="operationValidation({
                currentAccount: currentAccount,
                amount: amount,
                isRecipient: isRecipient,
                recipient: recipient,
            })">Valider</button>
        </div>

        <p v-if="message" class="success">{{ message }}</p>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
    name: 'BankOperation',

    data: () => ({
        amount: null,
        isRecipient: false,
        recipient: '',
    }),
    methods: {
        ...mapActions('bank', ['operationValidation']),
    },
    computed: {
        ...mapState('bank', ['currentAccount', 'message']),
    },
};
</script>

<style scoped>
.operation-wrapper {
    padding: 32px;
    background-color: #ffffff;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    margin: 20px auto;
    transition: ease-in-out 0.2s;
}

.operation-wrapper:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    transition: ease-in-out 0.2s;
}

h1 {
    font-size: 28px;
    font-weight: 600;
    color: #333;
    margin-bottom: 20px;
    text-align: center;
}

.form-group {
    margin-bottom: 20px;
}

label {
    font-size: 16px;
    color: #555;
    display: block;
    margin-bottom: 8px;
}

input[type="number"],
input[type="text"] {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 16px;
    color: #333;
    margin-top: 5px;
    transition: border-color 0.3s;
}

input[type="number"]:focus,
input[type="text"]:focus {
    border-color: #4CAF50;
    outline: none;
}
input[type="checkbox"] {
    width: 16px;
    height: 16px;
    margin-left: 8px;
    cursor: pointer;
    accent-color: #4CAF50;
}

button {
    width: 100%;
    padding: 12px;
    background-color: #429945;
    color: white;
    font-size: 18px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-weight: bold;
}

button:hover {
    background-color: #4CAF50;
}

button:focus {
    outline: 2px solid #4CAF50;
    outline-offset: 2px;
}

.success {
    color: #28a745;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    margin-top: 20px;
}
</style>
