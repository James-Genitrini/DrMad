<template>
    <div class="logout-wrapper">
        <h2>Déconnexion en cours...</h2>
        <p>Nous vous déconnectons, un instant...</p>
        <div class="spinner"></div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import router from '../router';

export default {
    name: 'BankLogout',
    methods: {
        ...mapActions('bank', ['bankLogout']),

        async logout() {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                await this.bankLogout();
                router.push('/bank/home');
            } catch (error) {
                console.error('Échec de la déconnexion:', error);
                router.push('/bank/home');
            }
        },
    },
    mounted() {
        this.logout();
    },
};
</script>

<style scoped>
.logout-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-color: #2e2e2e;
    border-radius: 8px;
    max-width: 600px;
    margin: 40px auto;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
    text-align: center;
}

h2 {
    font-size: 1.5rem;
    color: #4a5568;
    font-weight: bold;
}

p {
    font-size: 1rem;
    color: #4a5568;
    margin-bottom: 20px;
}

.spinner {
    border: 8px solid #f3f3f3;
    border-top: 8px solid #4CAF50;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>
