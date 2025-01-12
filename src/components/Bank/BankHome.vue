<template>
    <div class="bank-home">
      <!-- Navbar avec bouton Login ou Déconnecter -->
      <nav>
        <div class="navbar">
          <button v-if="!isLoggedIn" @click="toggleLoginForm">Login</button>
          <button v-if="isLoggedIn" @click="logout">Déconnecter</button>
          <span v-if="isLoggedIn">{{ userName }}</span>
        </div>
      </nav>
  
      <!-- Formulaire de login -->
      <div v-if="showLoginForm" class="login-form">
        <input
          v-model="accountNumber"
          type="text"
          placeholder="Entrez le numéro de compte"
        />
        <button @click="login">Se connecter</button>
      </div>
  
      <!-- Contenu principal, seulement visible si l'utilisateur est connecté -->
      <div v-if="isLoggedIn" class="main-content">
        <div class="sidebar">
          <button @click="checkBalance">Solde</button>
          <button @click="makeTransfer">Débit / Virement</button>
          <button @click="viewHistory">Historique</button>
        </div>
  
        <div class="content">
          <!-- Ici, tu peux afficher le contenu en fonction de l'action -->
          <h2 v-if="currentAction">Action en cours : {{ currentAction }}</h2>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'BankHome',
    data() {
      return {
        isLoggedIn: false,       // Variable pour savoir si l'utilisateur est connecté
        showLoginForm: false,    // Affichage du formulaire de login
        accountNumber: '',       // Pour stocker le numéro de compte
        userName: '',            // Le nom de l'utilisateur une fois connecté
        currentAction: '',       // L'action en cours, à afficher dans le contenu
      };
    },
    methods: {
      // Méthode pour ouvrir/fermer le formulaire de login
      toggleLoginForm() {
        this.showLoginForm = !this.showLoginForm;
      },
  
      // Méthode pour se connecter
      login() {
        if (!this.accountNumber) {
          alert("Veuillez entrer un numéro de compte.");
          return;
        }
  
        // Logique de validation de compte
        if (this.accountNumber === "12345") { // Par exemple, vérifier un compte statique
          this.isLoggedIn = true;
          this.userName = "Utilisateur #12345"; // Récupère le nom de l'utilisateur en fonction du compte
          this.showLoginForm = false;  // Ferme le formulaire de login
        } else {
          alert("Compte introuvable. Essayez à nouveau.");
        }
      },
  
      // Méthode pour se déconnecter
      logout() {
        this.isLoggedIn = false;
        this.userName = '';  // Réinitialiser le nom de l'utilisateur
        this.accountNumber = '';  // Réinitialiser le numéro de compte
      },
  
      // Méthodes pour chaque bouton dans l'encadré
      checkBalance() {
        this.currentAction = "Vérification du solde";
        // Ici, tu peux appeler un service pour obtenir le solde du compte
      },
  
      makeTransfer() {
        this.currentAction = "Débit ou Virement";
        // Ici, tu peux appeler un service pour effectuer un transfert ou un débit
      },
  
      viewHistory() {
        this.currentAction = "Consultation de l'historique";
        // Ici, tu peux appeler un service pour récupérer l'historique des transactions
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
  