<template>
    <div class="basket-list">
    <div v-if="basket.length > 0">
        <div v-for="(item, index) in basket" :key="index" class="basket-item">
        <div>
            <p>{{ item.item.name }} - {{ item.amount }} x {{ item.item.price }}€</p>
            <button @click="removeFromBasket(item.item._id)">Supprimer</button>
        </div>
        </div>

        <button @click="clearBasket" class="clear-basket">Vider le panier</button>
    </div>
    
    <div v-else>
        <p>Votre panier est vide.</p>
    </div>

    <button @click="checkout" class="checkout">Acheter</button>
    </div>
</template>

<script>
import ShopService from '@/services/shop.service';
import { mapState } from 'vuex';

export default {
    name: 'BasketList',
    computed: {
    ...mapState('shop', ['basket', 'shopUser']),  
    },
    methods: {
    async removeFromBasket(itemId) {
        await this.$store.dispatch('shop/removeItemFromBasket', itemId);  
    },

    async clearBasket() {
        await this.$store.dispatch('shop/clearBasket');
    },

    async checkout() {  
        console.log(this.shopUser)
        console.log(this.basket.length)      
        if (this.shopUser && this.basket.length > 0) {
        const orderItems = this.basket.map(item => ({
            item: {
            name: item.item.name,
            description: item.item.description || '',
            price: item.item.price,
            promotion: item.item.promotion || [],
            object: item.item.object || '',
            },
            amount: item.amount,
        }));

        const order = {
            items: orderItems,
            total: this.calculateTotal(),  
        };

        const response = await ShopService.createOrder(this.shopUser.id, order);

        if (response && response.uuid) {
            this.clearBasket();
            this.$router.push(`/shop/pay/${response.uuid}`);  
        } else {
            console.error('Erreur lors de la création de la commande');
        }
        } else {
        console.error('Aucun utilisateur ou panier vide');
        }
    },

    calculateTotal() {
        return this.basket.reduce((total, item) => {
        const itemPrice = item.item.price * item.amount;
        const discount = item.item.promotion.reduce((acc, promo) => acc + (promo.discount * promo.amount), 0);
        return total + itemPrice - discount;
        }, 0);
    },
    },
    async created() {
        const user = localStorage.getItem('user');
        if (user) {
            this.$store.commit('shop/setShopUser', JSON.parse(user));
        }
    },
};
</script>

<style scoped>
.basket-list {
    display: flex;
    flex-direction: column;
}

.basket-item {
    display: flex;
    justify-content: space-between;
}

button {
    padding: 8px 12px;
    background-color: #ff5733;
    color: white;
    border: none;
    cursor: pointer;
    margin: 5px 0;
}

button:hover {
    background-color: #ff3300;
}

.clear-basket, .checkout {
    margin-top: 20px;
}

</style>
