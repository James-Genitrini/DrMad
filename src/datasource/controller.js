import { items, shopusers, bankaccounts, transactions } from './data'
import {v4 as uuidv4} from 'uuid'
/* controllers: les fonctions ci-dessous doivent mimer ce que renvoie l'API en fonction des requêtes possibles.

  Dans certains cas, ces fonctions vont avoir des paramètres afin de filtrer les données qui se trouvent dans data.js
  Ces paramètres sont généralement les mêmes qu'ils faudrait envoyer à l'API, mais pas forcément.

  Exemple 1 : se loguer auprès de la boutique
 */

function shopLogin(data) {
  if ((!data.login) || (!data.password)) return {error: 1, status: 404, data: 'aucun login/pass fourni'}
  // pour simplifier : test uniquement le login
  let user = shopusers.find(e => e.login === data.login)
  if (!user) return {error: 1, status: 404, data: 'login/pass incorrect'}
  // générer un uuid de session pour l'utilisateur si non existant
  if (!user.session) {
    user.session = uuidv4()
  }
  // retourne uniquement les champs nécessaires
  let u = {
    _id: user._id,
    name: user.name,
    login: user.login,
    email: user.email,
    session: user.session
  }
  return {error: 0, status: 200, data: u}
}

function getAllViruses() {
  return {error: 0, data: items}
}

function getAccountAmount(number) {
  if (!number) return {error: 1, status: 404, data: 'aucun numéro de compte fourni'}

  let account = bankaccounts.find(e => e.number === number)
  if (account) {
    return {error: 0, status: 200, data: account.amount}
  } else {
    return {error: 1, status: 404, data: 'compte non trouvé'}
  }
}

function getAccountTransactions(number) {
    if (!number) return {error: 1, status: 404, data: 'aucun numéro de compte fourni'}

    let account = bankaccounts.find(e => e.number === number)
    if (!account) {
        return {error: 1, status: 404, data: 'compte non trouvé'}
    }

    let listOfTransaction = transactions.filter(e => e.account === account._id)
    return {error: 0, status: 200, data: listOfTransaction.map(e => { return {amount: e.amount, date: e.date, uuid: e.uuid} })}
}


export default {
  shopLogin,
  getAllViruses,
  getAccountAmount,
  getAccountTransactions,
}