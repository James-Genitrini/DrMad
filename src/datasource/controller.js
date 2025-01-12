import bcrypt from 'bcryptjs'; // Importation de bcryptjs
import { items, shopusers, bankaccounts, transactions } from './data'
import { v4 as uuidv4 } from 'uuid'

function shopLogin(data) {
  if (!data.login || !data.password) {
    return { error: 1, status: 404, data: 'aucun login/pass fourni' }
  }

  let user = shopusers.find(e => e.login === data.login)
  if (!user) {
    return { error: 1, status: 404, data: 'login/pass incorrect' }
  }

  const isPasswordValid = bcrypt.compareSync(data.password, user.password);
  if (!isPasswordValid) {
    return { error: 1, status: 404, data: 'login/pass incorrect' }
  }

  if (!user.session) {
    user.session = uuidv4()
  }

  let u = {
    _id: user._id,
    name: user.name,
    login: user.login,
    email: user.email,
    session: user.session
  }

  return { error: 0, status: 200, data: u }
}



function getAllViruses() {
  return { error: 0, data: items }
}

function getAccount(data) {
  let number = data.number
  if (number == null || number == "")
    return
  let id = getAccountId(number)
  if (id.error === 1) {
    return { error: 1, status: 404, data: 'Error in recovering account id' }
  }
  return getAccountById({ account_id: id.data })
}

function getAccountById(data) {
  let account_id = data.account_id
  if (account_id == null || account_id == "")
    return
  for (let i = 0; i < bankaccounts.length; i++) {
    if (bankaccounts[i]["_id"] === account_id) {
      return { error: 0, status: 200, data: bankaccounts[i] }
    }
  }
  return { error: 1, status: 404, data: 'No matching accounts found' }
}

function getAccountId(number) {
  if (number == "")
    return
  for (let i = 0; i < bankaccounts.length; i++) {
    if (bankaccounts[i]["number"] === number) {
      return { error: 0, status: 200, data: bankaccounts[i]["_id"] }
    }
  }
  return { error: 1, status: 404, data: 'nw' }
}

function getAccountAmount(number) {
  if (!number) {
    return { error: 1, status: 404, data: 'aucun numéro de compte fourni' }
  }
  let account = bankaccounts.find(e => e.number === number)
  if (account) {
    return { error: 0, status: 200, data: account.amount }
  } else {
    return { error: 1, status: 404, data: 'compte non trouvé' }
  }
}

function getAccountTransactions(data) {
  let account_id = data.account_id
  if (account_id == null || account_id == "")
    return
  let account_transactions = []
  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i]["account"] === account_id) {
      account_transactions.push(transactions[i])
    }
  }
  if (account_transactions.length > 0) {
    return { error: 0, status: 200, data: account_transactions }
  }
  return { error: 1, status: 404, data: 'No matching transactions found' }
}

function getAccountTransactionsByNumber(data) {
  let number = data.number
  if (number == null, number == "") {
    return
  }
  let account_id = getAccountId(number)
  if (account_id.error === 1) {
    return { error: 1, status: 404, data: 'Error in recovering account id' }
  }
  return getAccountTransactions({ account_id: account_id.data })
}

function operationValidation(data) {
  let currentAccount = data.currentAccount
  let amount = data.amount
  let isRecipient = data.isRecipient

  if (!amount) {
    alert("Erreur : Le montant doit être renseigné.");
    return { error: 1, status: 404, data: 'Le montant doit être renseigné.' };
  }

  if (amount <= 0) {
    alert("Erreur : Le montant doit être supérieur à 0.");
    return { error: 1, status: 404, data: 'Le montant doit être supérieur à 0.' };
  }

  let transaction = {
    '_id': currentAccount._id,
    'amount': -amount,
    'account': currentAccount._id,
    'date': { $date: new Date() },
    'uuid': uuidv4()
  }
  if (isRecipient) {
    // Si le destinataire est renseigné
    let recipient_number = data.recipient
    if (!recipient_number) {
      alert("Erreur : Le destinataire doit être renseigné.");
      return { error: 1, status: 404, data: 'Le destinataire doit être renseigné.' };
    }

    // On récupère le compte du destinataire
    let recipient = null;
    for (let i = 0; i < bankaccounts.length; i++) {
      if (bankaccounts[i].number === recipient_number) {
        recipient = bankaccounts[i];
        break;
      }
    }

    if (!recipient) {
      alert("Erreur : Le destinataire n'existe pas.");
      return { error: 1, status: 404, data: 'Le destinataire n\'existe pas.' };
    }

    // On ajout l'argent sur le compte du destinataire (si il existe)
    recipient.amount += amount;
    transaction['destination'] = recipient._id;
  }
  // On retire l'argent du compte du payeur
  currentAccount.amount -= amount;

  // On ajoute la transaction
  transactions.push(transaction);

  return { error: 0, status: 200, data: transaction.uuid };
}


function getUserBasket(userId) {
  const user = shopusers.find(u => u._id === userId);
  if (user && user.basket) {
    return { error: 0, data: user.basket };
  } else {
    return { error: 1, data: 'Panier introuvable' };
  }
}



function updateUserBasket(userId, itemId, amount) {
  const user = shopusers.find(u => u._id === userId);
  if (!user) {
    return { error: 1, data: 'Utilisateur introuvable' };
  }

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



function removeItemFromUserBasket(userId, itemId) {
  const user = shopusers.find(u => u._id === userId);
  if (!user || !user.basket) {
    return { error: 1, data: 'Panier ou utilisateur introuvable' };
  }

  // Filtre l'item à supprimer
  user.basket.items = user.basket.items.filter(item => item.item.toString() !== itemId.toString());

  return { error: 0, data: user.basket };
}



function clearUserBasket(userId) {
  const user = shopusers.find(u => u._id === userId);
  if (!user) {
    return { error: 1, data: 'Utilisateur introuvable' };
  }

  user.basket = { items: [] }; // Vide le panier
  return { error: 0, data: user.basket };
}




function addOrderToUser(userId, order) {
  const user = shopusers.find(u => u._id === userId);
  if (user) {
    user.orders.push(order);  
    return { data: { uuid: order.uuid } };  
  }
  return { error: 1, message: "Utilisateur non trouvé" };
}



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
    console.error("Erreur lors du paiement de la commande :", error);
    return { error: 1, message: "Une erreur est survenue." };
  }
}




function getOrders(userId) {
  // console.log(userId)
  const user = shopusers.find(u => u._id === userId);
  // console.log("User récupérer:",user)
  if (user === undefined) {
    return { error: 1, message: "Utilisateur introuvable." };
  }
  // console.log(user.orders)
  return { error: 0, data: user.orders };
}



function cancelOrder(userId, orderId) {
  // console.log(userId, orderId);
  const user = shopusers.find(u => u._id === userId);
  console.log("user cancel", user);
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


function loginWithAccountNumber(number) {
  const account = bankaccounts.find(acc => acc.number === number);

  if (account) {
    const sessionId = generateSessionId();
    return { error: 0, message: 'Login réussi', sessionId: sessionId, account: account };
  } else {
    return { error: 1, message: 'Numéro de compte non trouvé' };  
  }
}

function generateSessionId() {
  return 'session-' + Math.random().toString(36).substring(2, 15);
}

function getSession(sessionId) {
  if (sessionId) {
    return { error: 0, message: 'Session valide', sessionId: sessionId };
  } else {
    return { error: 1, message: 'Aucune session active' };
  }
}

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
}