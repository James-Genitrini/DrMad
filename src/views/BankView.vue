<template>
    <div class="bank-wrapper">
        <div class="navbar">
            <router-link v-for="link in links" :key="link.to" :to="link.to">
                <button class="menu-button">{{ link.label }}</button>
            </router-link>
            <!-- Si l'utilisateur est connecté, afficher son numéro de compte -->
            <span v-if="currentAccount" class="account-number">
                Compte: {{ currentAccount.number }}
            </span>
        </div>
        <VerticalMenu :items="menu" class="vertical-menu">
            <template v-slot:menu-title="{ label }">
                <div class="menu-title">{{ label }}</div>
            </template>
            <template v-slot:menu-link="{ label }">
                <button class="menu-button" :disabled="!currentAccount">{{ label }}</button>
            </template>
        </VerticalMenu>
        <div class="content">
            <h1>Banque</h1>
            <router-view>
                <template v-slot:account-amount>
                    Solde du compte:
                    <p v-if="0" class="amount">
                        {{ currentAccount.amount }}
                    </p>
                    <p v-else class="amount"> 
                        {{ currentAccount.amount }}
                    </p>
                </template>
            </router-view>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import VerticalMenu from "@/components/VerticalMenu.vue";

export default {
    name: 'BankView',
    components: {
        VerticalMenu,
    },
    data: () => ({
        menu: [
            { type: "title", label: "Opérations" },
            { type: "link", label: "Solde", to: "/bank/amount" },
            { type: "link", label: "Débit/Virement", to: "/bank/operation" },
            { type: "title", label: "États" },
            { type: "link", label: "Historique", to: "/bank/history" }
        ],
        showIds: false,
    }),
    computed: {
        ...mapState('bank', ['currentAccount']),
        links() {
            return this.currentAccount
                ? [{ label: "Déconnexion", to: "/bank/logout" }]
                : [{ label: "Connexion", to: "/bank/account" }];
        },
    },
};
</script>

<style scoped>
.amount {
    color: green!important;
    font-weight: bold!important;
}

.bank-wrapper {
    display: grid;
    grid-template-rows: auto 1fr;
    grid-template-columns: 20% 1fr;
    grid-template-areas:
        "navbar navbar"
        "menu content";
    height: 90vh;
}

.navbar {
    grid-area: navbar;
    background-color: #333;
    color: white;
    padding: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.menu-button {
    background-color: #4CAF50;
    border: none;
    padding: 10px;
    color: white;
    cursor: pointer;
    width: 100%;
    text-align: left;
    margin-bottom: 10px;
}

.menu-button:hover {
    background-color: #45a049;
}

.vertical-menu {
    grid-area: menu;
}

.content {
    grid-area: content;
    padding: 20px;
    background-color: #333;
    overflow-y: auto;
}

.account-number {
    font-size: 1.2rem;
    color: #4CAF50;
    font-weight: bold;
    margin-left: 20px;
}
</style>
