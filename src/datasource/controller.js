import bcrypt from 'bcryptjs'; // Importation de bcryptjs
import { items, shopusers, bankaccounts, transactions } from './data';
import { v4 as uuidv4 } from 'uuid';

// Fonction de connexion de l'utilisateur dans la boutique
function shopLogin(data) {
  if (!data.login || !data.password) {
    return { error: 1, status: 404, data: 'Aucun login/pass fourni' };
  }

  let user = shopusers.find(e => e.login === data.login);
  if (!user) {
    return { error: 1, status: 404, data: 'Login/pass incorrect' };
  }

  const isPasswordValid = bcrypt.compareSync(data.password, user.password);
  if (!isPasswordValid) {
    return { error: 1, status: 404, data: 'Login/pass incorrect' };
  }

  if (!user.session) {
    user.session = uuidv4();
  }

  let u = {
    _id: user._id,
    name: user.name,
    login: user.login,
    email: user.email,
    session: user.session
  };

  return { error: 0, status: 200, data: u };
}

// Récupère tous les virus disponibles
function getAllViruses() {
  return { error: 0, data: items };
}

// Récupère les détails d'un compte bancaire en utilisant le numéro de compte
function getAccount(data) {
  let number = data.number;
  if (!number) return;

  let id = getAccountId(number);
  if (id.error === 1) {
    return { error: 1, status: 404, data: 'Erreur dans la récupération de l\'id du compte' };
  }

  return getAccountById({ account_id: id.data });
}

// Récupère les détails d'un compte bancaire à partir de son ID
function getAccountById(data) {
  let account_id = data.account_id;
  if (!account_id) return;

  const account = bankaccounts.find(account => account._id === account_id);
  if (account) {
    return { error: 0, status: 200, data: account };
  }
  return { error: 1, status: 404, data: 'Aucun compte trouvé' };
}

// Récupère l'ID d'un compte à partir de son numéro
function getAccountId(number) {
  const account = bankaccounts.find(account => account.number === number);
  if (account) {
    return { error: 0, status: 200, data: account._id };
  }
  return { error: 1, status: 404, data: 'Compte non trouvé' };
}

// Récupère le solde d'un compte bancaire
function getAccountAmount(number) {
  if (!number) {
    return { error: 1, status: 404, data: 'Aucun numéro de compte fourni' };
  }

  let account = bankaccounts.find(account => account.number === number);
  if (account) {
    return { error: 0, status: 200, data: account.amount };
  }
  return { error: 1, status: 404, data: 'Compte non trouvé' };
}

// Récupère les transactions d'un compte bancaire en utilisant l'ID du compte
function getAccountTransactions(data) {
  let account_id = data.account_id;
  if (!account_id) return;

  const accountTransactions = transactions.filter(transaction => transaction.account === account_id);
  if (accountTransactions.length > 0) {
    return { error: 0, status: 200, data: accountTransactions };
  }
  return { error: 1, status: 404, data: 'Aucune transaction trouvée' };
}

// Récupère les transactions d'un compte en utilisant son numéro
function getAccountTransactionsByNumber(data) {
  let number = data.number;
  if (!number) return;

  const account_id = getAccountId(number);
  if (account_id.error === 1) {
    return { error: 1, status: 404, data: 'Erreur dans la récupération de l\'id du compte' };
  }

  return getAccountTransactions({ account_id: account_id.data });
}

// Valide une opération bancaire
function operationValidation(data) {
  let { currentAccount, amount, isRecipient, recipient } = data;

  if (!amount) {
    return { error: 1, status: 404, data: 'Le montant doit être renseigné' };
  }

  if (amount <= 0) {
    return { error: 1, status: 404, data: 'Le montant doit être supérieur à 0' };
  }

  let transaction = {
    _id: currentAccount._id,
    amount: -amount,
    account: currentAccount._id,
    date: { $date: new Date() },
    uuid: uuidv4()
  };

  if (isRecipient) {
    if (!recipient) {
      return { error: 1, status: 404, data: 'Le destinataire doit être renseigné' };
    }

    let recipientAccount = bankaccounts.find(acc => acc.number === recipient);
    if (!recipientAccount) {
      return { error: 1, status: 404, data: 'Le destinataire n\'existe pas' };
    }

    recipientAccount.amount += amount;
    transaction.destination = recipientAccount._id;
  }

  currentAccount.amount -= amount;
  transactions.push(transaction);

  return { error: 0, status: 200, data: transaction.uuid };
}

// Gestion du panier de l'utilisateur
function getUserBasket(userId) {
  const user = shopusers.find(u => u._id === userId);
  if (user && user.basket) {
    return { error: 0, data: user.basket };
  }
  return { error: 1, data: 'Panier introuvable' };
}

// Ajoute ou met à jour un article dans le panier de l'utilisateur
function updateUserBasket(userId, itemId, amount) {
  const user = shopusers.find(u => u._id === userId);
  if (!user) return { error: 1, data: 'Utilisateur introuvable' };

  if (!user.basket) {
    user.basket = { items: [] };
  }

  const itemIndex = user.basket.items.findIndex(item => item.item.toString() === itemId.toString());

  if (itemIndex >= 0) {
    user.basket.items[itemIndex].amount += amount;
  } else {
    user.basket.items.push({ item: itemId, amount });
  }

  return { error: 0, data: user.basket };
}

// Supprime un article du panier de l'utilisateur
function removeItemFromUserBasket(userId, itemId) {
  const user = shopusers.find(u => u._id === userId);
  if (!user || !user.basket) return { error: 1, data: 'Panier ou utilisateur introuvable' };

  user.basket.items = user.basket.items.filter(item => item.item.toString() !== itemId.toString());
  return { error: 0, data: user.basket };
}

// Vide le panier de l'utilisateur
function clearUserBasket(userId) {
  const user = shopusers.find(u => u._id === userId);
  if (!user) return { error: 1, data: 'Utilisateur introuvable' };

  user.basket = { items: [] };
  return { error: 0, data: user.basket };
}

// Ajoute une commande au panier de l'utilisateur
function addOrderToUser(userId, order) {
  const user = shopusers.find(u => u._id === userId);
  if (user) {
    user.orders.push(order);
    return { data: { uuid: order.uuid } };
  }
  return { error: 1, message: "Utilisateur non trouvé" };
}

// Effectue un paiement pour une commande
async function payOrder(userId, orderId, transactId) {
  try {
    const user = shopusers.find(u => u._id === userId);
    if (!user) {
      return { error: 1, message: "Utilisateur introuvable." };
    }

    const order = user.orders.find(o => o.uuid === orderId);
    if (!order) {
      return { error: 1, message: "Commande introuvable." };
    }

    const transaction = transactions.find(t => t.uuid === transactId);
    if (!transaction) {
      return { error: 1, message: "Transaction introuvable." };
    }

    if (transaction.amount !== -order.total) {
      return { error: 1, message: "Montant de la transaction invalide." };
    }

    order.status = 'finalized';
    return { error: 0, message: "Commande finalisée avec succès.", data: { uuid: orderId } };
  } catch (error) {
    console.error("Erreur lors du paiement de la commande:", error);
    return { error: 1, message: "Une erreur est survenue." };
  }
}

// Récupère toutes les commandes d'un utilisateur
function getOrders(userId) {
  const user = shopusers.find(u => u._id === userId);
  if (user === undefined) {
    return { error: 1, message: "Utilisateur introuvable." };
  }
  return { error: 0, data: user.orders };
}

// Annule une commande
function cancelOrder(userId, orderId) {
  const user = shopusers.find(u => u._id === userId);
  if (user === undefined) {
    return { error: 1, message: "Utilisateur introuvable." };
  }

  const order = user.orders.find(o => o.uuid === orderId);
  if (order === undefined) {
    return { error: 1, message: "Commande introuvable." };
  }

  order.status = 'cancelled';
  return { error: 0, message: "Commande annulée." };
}

// Récupère les détails d'une commande
async function getOrderDetails(userId, orderId) {
  try {
    const user = shopusers.find(u => u._id === userId);
    if (!user) {
      return { error: 1, message: 'Utilisateur introuvable' };
    }

    const order = user.orders.find(o => o.uuid === orderId);
    if (!order) {
      return { error: 1, message: 'Commande introuvable' };
    }

    return { error: 0, data: order };
  } catch (error) {
    console.error("Erreur lors de la récupération des détails de la commande:", error);
    return { error: 1, message: 'Erreur lors de la récupération des détails de la commande' };
  }
}

// Fonction de connexion via numéro de compte bancaire
function loginWithAccountNumber(number) {
  const account = bankaccounts.find(acc => acc.number === number);
  if (account) {
    const sessionId = generateSessionId();
    return { error: 0, message: 'Login réussi', sessionId: sessionId, account: account };
  } else {
    return { error: 1, message: 'Numéro de compte non trouvé' };
  }
}

// Génère un ID de session
function generateSessionId() {
  return 'session-' + Math.random().toString(36).substring(2, 15);
}

// Vérifie la validité d'une session
function getSession(sessionId) {
  if (sessionId) {
    return { error: 0, message: 'Session valide', sessionId: sessionId };
  } else {
    return { error: 1, message: 'Aucune session active' };
  }
}

// Déconnecte l'utilisateur
function logout(sessionId) {
  if (sessionId) {
    return { error: 0, message: 'Déconnexion réussie' };
  } else {
    return { error: 1, message: 'Aucune session active pour se déconnecter' };
  }
}

export default {
  shopLogin,
  getAllViruses,
  getAccountAmount,
  getAccountTransactions,
  operationValidation,
  getAccountTransactionsByNumber,
  getAccount,
  getAccountById,
  getAccountId,
  getUserBasket,
  updateUserBasket,
  removeItemFromUserBasket,
  clearUserBasket,
  addOrderToUser,
  payOrder,
  getOrders,
  cancelOrder,
  getOrderDetails,
  loginWithAccountNumber,
  getSession,
  logout,
};