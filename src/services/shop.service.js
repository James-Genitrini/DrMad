import LocalSource from "@/datasource/controller";
import { v4 as uuidv4 } from 'uuid';  

async function shopLoginFromLocalSource(data) {
  // récupération auprès de la source locale
  return LocalSource.shopLogin(data)
}
/*
async function shopLoginFromAPI(data) {
  // a écrire quand l'API est fonctionnelle
  return {}
}
 */

async function getAllVirusesFromLocalSource() {
  // récupération auprès de la source locale
  return LocalSource.getAllViruses()
}

/*
async function getAllVirusesFromAPI() {
  // a écrire quand l'API est fonctionnelle
  return {}
}
*/

async function shopLogin(data) {
  let response = null;
  try {
    response = await shopLoginFromLocalSource(data); 

    if (response.error === 0) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }

  } catch (err) {
    response = {
      error: 1,
      status: 404,
      data: 'Erreur réseau, impossible de se connecter. Veuillez réessayer.'
    };
  }

  return response;
}


async function getAllViruses() {
  let response = null;
  try {
    response = await getAllVirusesFromLocalSource()
  }
  catch(err) {
    response = {error: 1, status: 404, data: 'erreur réseau, impossible de récupérer la liste des viruses'  }
  }
  return response
}


async function getBasket(userId) {
  try {
    const response = await LocalSource.getUserBasket(userId); // Appel à controller.js
    return response;
  } catch (error) {
    return { error: 1, data: 'Erreur lors de la récupération du panier' };
  }
}


async function updateBasket(userId, itemId, amount) {
  try {
    const response = await LocalSource.updateUserBasket(userId, itemId, amount);
    return response;
  } catch (error) {
    return { error: 1, data: 'Erreur lors de la mise à jour du panier' };
  }
}



async function removeItemFromBasket(userId, itemId) {
  try {
    const response = await LocalSource.removeItemFromUserBasket(userId, itemId); // Appel à controller.js
    return response;
  } catch (error) {
    return { error: 1, data: 'Erreur lors de la suppression de l\'item du panier' };
  }
}




async function clearBasket(userId) {
  try {
    const response = await LocalSource.clearUserBasket(userId); // Appel à controller.js
    return response;
  } catch (error) {
    return { error: 1, data: 'Erreur lors de la suppression du panier' };
  }
}



async function createOrder(userId, order) {
  const total = order.total;
  const uuid = uuidv4();  
  const date = new Date();

  const orderWithDetails = {
    ...order,
    total,
    date,
    status: 'waiting_payment',
    uuid,
  };

  return LocalSource.addOrderToUser(userId, orderWithDetails);
}



async function payOrder(userId, orderId) {
  try {
    const response = await LocalSource.payOrder(userId, orderId);
    return response;
  } catch (error) {
    console.error("Erreur lors du paiement de la commande :", error);
    return { error: 1, message: "Une erreur est survenue." };
  }
}



async function getOrders(userId) {
  try {
    const response = await LocalSource.getOrders(userId);
    return response;
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes:", error);
    return { error: 1, message: "Erreur lors de la récupération des commandes." };
  }
}



async function cancelOrder(userId, orderId) {
  try {
    const response = await LocalSource.cancelOrder(userId, orderId);
    return response;
  } catch (error) {
    console.error("Erreur lors de l'annulation de la commande:", error);
    return { error: 1, message: "Erreur lors de l'annulation de la commande." };
  }
}


async function getOrderDetails(userId, orderId){
  try {
    const response = await LocalSource.getOrderDetails(userId, orderId);
    return response;
  } catch (error) {
    console.error("Erreur récupération des détails");
    return { error: 1}
  }
}

export default {
  shopLogin,
  getAllViruses,
  getBasket,
  updateBasket,
  removeItemFromBasket,
  clearBasket,
  createOrder,
  payOrder,
  getOrders,
  cancelOrder,
  getOrderDetails
}