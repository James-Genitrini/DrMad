<template>
    <div class="history-wrapper">
        <h1>
            <slot name="title">Opérations passées</slot>
        </h1>
        <label for="periodFilter">Filtrer par période : </label>
        <input type="checkbox" v-model="periodFilter" id="periodFilter">
        <div v-if="periodFilter">
            <label for="start">Du :</label>
            <input type="date" id="start" v-model="start" />
            <label for="end">Au :</label>
            <input type="date" id="end" v-model="end" />
        </div>
        
        <div v-if="filteredTransactions.length === 0">
            <p>Aucune transaction récente à afficher.</p>
        </div>

        <DataTable 
            v-else
            :items="filteredTransactions" 
            :headers="headers" 
            :itemCheck="true" 
            :itemButton="true"
            :tableButton="true" 
            @itemClicked="showTransactionDetails" 
            @tableClicked="showSelectedTransactions">
            <template #item-button>
                Détails
            </template>
            <template #table-button>
                Voir UUIDs
            </template>
        </DataTable>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import DataTable from '@/components/DataTable.vue';

export default {
    name: 'BankHistory',
    components: {
        DataTable,
    },
    data: () => ({
        periodFilter: false,
        start: '',
        end: '',
        headers: [
            { label: "Montant", name: "amount" },
            { label: "Date", name: "date" },
            { label: "Source/Destinataire", name: "direction" },
        ],
    }),
    computed: {
        ...mapState('bank', ['currentAccount', 'accountTransactions']),
        filteredTransactions() {
            if (!Array.isArray(this.formatedTransactions)) {
                return [];
            }

            if (this.periodFilter) {
                return this.formatedTransactions.filter(transaction => {
                    return (!this.start || transaction.date >= this.start) &&
                           (!this.end || transaction.date <= this.end);
                });
            }

            return this.formatedTransactions;
        },
        formatedTransactions() {
            if (!Array.isArray(this.accountTransactions)) {
                return [];
            }
            return this.accountTransactions.map(transaction => ({
                ...transaction,
                date: transaction.date.$date,
                direction: transaction.amount < 0 ? 'S (source)' : 'D (destinataire)',
            }));
        },
        account_id() {
            return this.currentAccount?._id || '';
        },
    },
    methods: {
        ...mapActions('bank', ['getTransactions']),
        showTransactionDetails(item) {
            alert(`Transaction UUID: ${item.uuid}`);
        },
        showSelectedTransactions(selectedItems) {
            if (!selectedItems.length) {
                return alert('Aucune transaction sélectionnée');
            }
            alert(`UUIDs des transactions sélectionnées : ${selectedItems.map(item => item.uuid).join(', ')}`);
        },
    },
    mounted() {
        this.getTransactions({ account_id: this.account_id });
    },
};
</script>

<style scoped>
.history-wrapper {
    padding: 20px;
    background-color: #2e2e2e;
    border: 1px solid #e0e7ff;
    border-radius: 10px;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
    max-width: 1200px;
    margin: 30px auto;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.history-wrapper:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.history-wrapper h1 {
    font-size: 26px;
    font-weight: 600;
    margin-bottom: 16px;
    color: #5b616d;
}

label {
    font-size: 15px;
    color: #555;
    margin-right: 8px;
}

input[type="checkbox"] {
    width: 20px;
    height: 20px;
    margin-left: 8px;
    cursor: pointer;
    accent-color: #4CAF50;
}

input[type="date"] {
    padding: 8px 14px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 14px;
    color: #333;
    margin-right: 8px;
    margin-bottom: 12px;
    transition: border-color 0.3s;
}

input[type="date"]:focus {
    border-color: #4CAF50;
    outline: none;
}

.history-wrapper .period-filters {
    margin: 16px 0;
    padding: 16px;
    background-color: #fff;
    border: 1px solid #e0e7ff;
    border-radius: 8px;
}

button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #3e8e41;
}

button:focus {
    outline: 2px solid #60e464;
    outline-offset: 2px;
}

button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

button:disabled:hover {
    background-color: #ccc!important;
}

button:disabled:focus {
    outline: none;
}

p {
    font-size: 16px;
    color: #555;
    margin-top: 16px;
}

</style>
