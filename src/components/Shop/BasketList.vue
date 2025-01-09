<template>
    <div class="basket-list">
        <div v-if="basket.length > 0">
            <div v-for="(item, index) in basket" :key="index" class="basket-item">
                <div>
                    <p>{{ item.item.name }} - {{ item.amount }} x {{ item.item.price }}€</p>
                    <button @click="removeFromBasket(item.item._id)">Supprimer</button>
                </div>
            </div>

            <p>Total : {{ calculateTotal() }}€</p>
            <button @click="clearBasket" class="clear-basket">Vider le panier</button>
        </div>
        
        <div v-else>
            <p>Votre panier est vide.</p>
        </div>

        <button @click="checkout" class="checkout" :disabled="basket.length === 0">Acheter</button>
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

                const response = await ShopService.createOrder(this.shopUser._id, order);
                console.log(response)
                console.log(response.data.uuid)
                if (response != undefined && response.data.uuid != undefined) {
                    this.clearBasket();
                    this.$router.push(`/shop/pay/${response.data.uuid}`);
                } else {
                    alert('Erreur lors de la création de la commande. Veuillez réessayer.');
                }
            } else {
                alert('Votre panier est vide ou lutilisateur est introuvable.');
            }
        },

        calculateTotal() {
            return this.basket.reduce((total, item) => {
                const itemTotalPrice = item.item.price * item.amount;

                const applicablePromo = item.item.promotion
                .filter(promo => item.amount >= promo.amount) 
                .sort((a, b) => b.amount - a.amount)[0]; 

                const discount = applicablePromo 
                ? (itemTotalPrice * applicablePromo.discount) / 100 
                : 0;

                return total + itemTotalPrice - discount;
            }, 0);
        },

    },
    async created() {
        const user = localStorage.getItem('user');
        if (user) {
            this.$store.commit('shop/setShopUser', JSON.parse(user));
            await this.$store.dispatch('shop/fetchBasket');
        }
    },
};
</script>

<style scoped>
.basket-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.basket-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

button {
    padding: 8px 12px;
    background-color: #ff5733;
    color: white;
    border: none;
    cursor: pointer;
}

button:hover {
    background-color: #ff3300;
}

.clear-basket, .checkout {
    margin-top: 20px;
}
</style>
