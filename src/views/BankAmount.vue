<template>
    <div class="bank-amount">
        <slot name="account-amount">
            <span class="amount">
                {{ currentAccount.amount | currency }}
            </span>
        </slot>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'BankAmount',

    computed: {
        ...mapState('bank', ['currentAccount']),
    },
};
</script>

<style scoped>
.bank-amount {
    padding: 20px;
    background-color: #2e2e2e;
    border-radius: 10px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    max-width: 1000px;
    margin: 30px auto;
    transition: all 0.3s ease;
    border: 1px solid #e0e7ff;
}

.bank-amount:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    transform: translateY(-3px);
}

.amount {
    font-size: 28px;
    font-weight: 600;
    color: #4a5568;
    text-align: center;
    letter-spacing: 0.5px;
    transition: color 0.3s ease;
}

.bank-amount:hover .amount {
    color: #044d02!important;
}

.amount::before {
    content: "€ ";
    font-size: 18px;
    font-weight: normal;
    color: #38a169;
}

</style>
