<template>
    <div class="bank-account-wrapper">
        <h1>Se connecter</h1>
        <span>Numero de compte : </span>
        <br>
        <br>
        <p v-if="numberError && !(accountNumberError == -1)">
            Veuillez entrer un numéro de compte.
        </p>
        <p v-if="accountNumberError == -1">
            Numero de compte invalide
        </p>
        <input v-model="number" placeholder="Format FRXXXXXXxxxxxxxxxxxxxx-xxxxxxx "> <br>
        <button @click="login(number)">Valider</button> <br>
        <button @click="goBackHome" class="back">Retour</button>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import router from '../router'

export default {
    name: 'BankAccountView',
    data: () => ({
        number: '',
        numberError: false,
    }),
    computed: {
        ...mapState('bank', ['currentAccount', 'accountNumberError']),
    },
    methods: {
        ...mapActions('bank', ['getAccount']),
        async login(number) {
            if (!number) {
                this.numberError = true;
                return;
            }
            
            this.numberError = false;

            await this.getAccount(number)
            if (this.currentAccount)
                router.push('/bank/amount')
        },

        goBackHome() {
            this.numberError = false;
            router.push('/bank/home')
        }
    }
}
</script>

<style scoped>
.back {
    background-color: #f44336;
}

.back:hover {
    background-color: #d32f2f;
}

div {
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
}

h1 {
    text-align: center;
    color: #4CAF50;
}

input {
    padding: 10px;
    width: calc(100% - 22px);
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
}

button {
    padding: 10px 15px;
    margin: 10px auto;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}

button:hover {
    background-color: #45a049;
}

p {
    color: red;
    font-size: 16px;
}
</style>
