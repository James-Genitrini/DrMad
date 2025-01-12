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



function getAccountTransactions(number) {
  if (!number) {
    return { error: 1, status: 404, data: 'aucun numéro de compte fourni' }
  }

  let account = bankaccounts.find(e => e.number === number)
  if (!account) {
    return { error: 1, status: 404, data: 'compte non trouvé' }
  }

  let listOfTransaction = transactions.filter(e => e.account === account._id)
  return { error: 0, status: 200, data: listOfTransaction.map(e => { 
    return { amount: e.amount, date: e.date, uuid: e.uuid } 
  })}
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



function payOrder(userId, orderId) {
  console.log(userId, orderId)
  const user = shopusers.find(u => u._id === userId);
  
  if (user === undefined) {
    return { error: 1, message: "Utilisateur introuvable." };
  }

  const order = user.orders.find(o => o.uuid === orderId);
  
  if (order === undefined) {
    return { error: 1, message: "Commande introuvable." };
  }

  order.status = 'finalized';

  return { error: 0, message: "Commande finalisée.", data: { uuid: orderId } };
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

    return { error: 0, data: order };  // Retourne les détails de la commande
  } catch (error) {
    console.error("Erreur lors de la récupération des détails de la commande:", error);
    return { error: 1, message: 'Erreur lors de la récupération des détails de la commande' };
  }
}

export default {
  shopLogin,
  getAllViruses,
  getAccountAmount,
  getAccountTransactions,
  getUserBasket,
  updateUserBasket,
  removeItemFromUserBasket,
  clearUserBasket,
  addOrderToUser,
  payOrder,
  getOrders,
  cancelOrder,
  getOrderDetails,
}