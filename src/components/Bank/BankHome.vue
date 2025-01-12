<template>
    <div class="bank-home">
      <nav>
        <div class="navbar">
          <button v-if="!isLoggedIn" @click="toggleLoginForm">Login</button>
          <button v-if="isLoggedIn" @click="logout">Déconnecter</button>
          <span v-if="isLoggedIn">{{ userName }}</span>
        </div>
      </nav>
       
      <h1>Bienvenue sur la banque</h1>
  
      <div v-if="showLoginForm" class="login-form">
        <input
          v-model="accountNumber"
          type="text"
          placeholder="Entrez le numéro de compte"
        />
        <button @click="login">Se connecter</button>
      </div>

  
      <div v-if="isLoggedIn" class="main-content">
        <div class="sidebar">
          <button @click="checkBalance">Solde</button>
          <button @click="makeTransfer">Débit / Virement</button>
          <button @click="viewHistory">Historique</button>
        </div>
  
        <div class="content">
            <h3 :hidden="balance" :style="{ color: balanceColor }">Bienvenue {{ accountNumber }}</h3>
            <h3 :hidden="!balance" :style="{ color: balanceColor }">Solde actuel : {{ balance || "vide" }} €</h3>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import bankService from '@/services/bankaccount.service';
  
  export default {
    name: 'BankHome',
    data() {
      return {
        isLoggedIn: false,
        showLoginForm: false,
        accountNumber: '',
        userName: '',
        currentAction: '',
        balance: null,
        balanceColor: '',
      };
    },
    methods: {
      toggleLoginForm() {
        this.showLoginForm = !this.showLoginForm;
      },
  
      async login() {
        if (!this.accountNumber) {
          alert("Veuillez entrer un numéro de compte.");
          return;
        }
  
        try {
          const response = await bankService.login(this.accountNumber);
  
          if (response.success) {
            this.isLoggedIn = true;
            this.userName = response.account.number;
            this.showLoginForm = false;
          } else {
            alert(response.message);
          }
        } catch (error) {
          alert("Erreur lors de la connexion. Veuillez réessayer.");
        }
      },
  
      logout() {
        const response = bankService.logout();
        if (response.success) {
          this.isLoggedIn = false;
          this.userName = '';
          this.accountNumber = '';
          this.balance = null;
          this.balanceColor = '';
        } else {
          alert(response.message);
        }
      },
  
      checkBalance() {
        this.getBalance();
      },
  
      async getBalance() {
        try {
          const response = await bankService.getAccountAmount(this.accountNumber);
          if (response.error === 0) {
            this.balance = response.data;
            this.balanceColor = this.balance >= 0 ? 'green' : 'red';
          } else {
            alert('Erreur lors de la récupération du solde');
          }
        } catch (error) {
          alert('Erreur lors de la récupération du solde');
        }
      },
  
      makeTransfer() {
        this.currentAction = "Débit ou Virement";
      },
  
      viewHistory() {
        this.currentAction = "Consultation de l'historique";
      },
    },
  };
  </script>
  
  <style scoped>
  .bank-home {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  
  .navbar {
    background-color: #333;
    color: white;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .navbar button {
    background-color: #4CAF50;
    border: none;
    padding: 10px;
    color: white;
    cursor: pointer;
  }
  
  .navbar button:hover {
    background-color: darkgreen;
  }
  
  .login-form {
    margin: 20px;
  }
  
  .login-form input {
    padding: 10px;
    margin-right: 10px;
  }
  
  .login-form button {
    padding: 10px;
    background-color: #4CAF50;
    border: none;
    color: white;
  }
  
  .main-content {
    display: flex;
    margin-top: 20px;
  }
  
  .sidebar {
    width: 200px;
    background-color: #f4f4f4;
    padding: 10px;
    display: flex;
    flex-direction: column;
  }
  
  .sidebar button {
    padding: 10px;
    margin-bottom: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  .sidebar button:hover {
    background-color: darkgreen;
  }
  
  .content {
    flex-grow: 1;
    padding: 20px;
  }
  
  h2 {
    color: #333;
  }
  </style>
  