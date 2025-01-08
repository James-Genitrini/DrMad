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



export default {
  shopLogin,
  getAllViruses,
  getAccountAmount,
  getAccountTransactions,
}