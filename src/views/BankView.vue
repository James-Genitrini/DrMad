<template>
    <div class="bank-wrapper">
        <!-- Navbar -->
        <div class="navbar">
            <router-link v-for="link in links" :key="link.to" :to="link.to">
                <button v-if="currentAccount" class="menu-button disconnect-btn">{{ link.label }}</button>
                <button v-else class="menu-button connect-btn">{{ link.label }}</button>
            </router-link>
            <span v-if="currentAccount" class="account-number">
                Compte: {{ currentAccount.number }}
            </span>
        </div>
        
        <!-- Vertical Menu -->
        <VerticalMenu :items="menu" class="vertical-menu">
            <template v-slot:menu-title="{ label }">
                <div class="menu-title">{{ label }}</div>
            </template>
            <template v-slot:menu-link="{ label }">
                <button class="menu-button" :disabled="!currentAccount">{{ label }}</button>
            </template>
        </VerticalMenu>

        <div class="content">
            <h1 v-if="!currentAccount">Votre Banque préférée !</h1>
            <h1 v-else>Merci pour votre fidélité !</h1>
            <router-view>
                <template v-slot:account-amount>
                    Solde du compte:
                    <p class="amount">
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
            { type: "title", label: "Compte" },
            { type: "link", label: "Solde", to: "/bank/amount" },
            { type: "title", label: "Opérations" },
            { type: "link", label: "Débit/Virement", to: "/bank/operation" },
            { type: "title", label: "Transactions" },
            { type: "link", label: "Historique", to: "/bank/history" }
        ],
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
    color: white;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #333;
    border-bottom: 2px solid #4CAF50;
}

button {
    border-radius: 5px;
}

button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    opacity: 0.5;
}

button:disabled:hover {
    background-color: #9e9d9d;
    transform: none;
}

button:focus {
    outline: 2px solid #60e464;
    outline-offset: 2px;

}

.menu-button {
    background-color: #4CAF50;
    border: none;
    padding: 12px;
    color: white;
    cursor: pointer;
    width: 100%;
    text-align: left;
    margin-bottom: 10px;
    font-size: 16px;
    transition: background-color 0.3s ease;
}

.menu-button:hover :not(.disconnect-btn) {
    background-color: #3e8e41;
}

.disconnect-btn {
    background-color: #F44336;
    transition: all 0.3s ease;
}

.disconnect-btn:hover {
    background-color: #d32f2f;
    transform: translateY(-3px);
}

.connect-btn {
    background-color: #4CAF50;
    transition: all 0.3s ease;
}

.connect-btn:hover {
    background-color: #3e8e41;
    transform: translateY(-3px);
}

.vertical-menu {
    grid-area: menu;
    padding: 20px;
    height: 100%;
    overflow-y: auto;
    border: 2px solid grey;
}

.content {
    grid-area: content;
    padding: 20px;
    overflow-y: auto;
}

.account-number {
    font-size: 1.2rem;
    color: #4CAF50;
    font-weight: bold;
    margin-left: 20px;
}

.menu-title {
    font-size: 1.4rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 15px;
}

/* Amount Style */
.amount {
    font-size: 1.5rem;
    font-weight: bold;
    color: green;
    margin-top: 10px;
    text-align: center;
    transition: color 0.3s ease;
}

.amount:hover {
    color: #4CAF50;
}

/* Responsiveness */
@media (max-width: 768px) {
    .bank-wrapper {
        grid-template-columns: 1fr;
        grid-template-areas:
            "navbar"
            "menu"
            "content";
    }
    
    .navbar {
        flex-direction: column;
        align-items: flex-start;
        padding: 20px;
    }
    
    .vertical-menu {
        border-right: none;
        padding: 10px;
    }
    
    .content {
        padding: 15px;
    }
}
</style>
