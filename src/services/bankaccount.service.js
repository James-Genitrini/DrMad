import LocalSource from '@/datasource/controller';

function getAccountAmount(number) {
  let response = null;
  try {
    response = getAccountAmountFromLocalSource(number);
  } catch (err) {
    response = { error: 1, status: 404, data: 'erreur réseau, impossible de récupérer les comptes' };
  }
  return response;
}

function getAccountAmountFromLocalSource(number) {
  return LocalSource.getAccountAmount(number);
}

function getAccountTransactions(number) {
  let response = null;
  try {
    response = getAccountTransactionsFromLocalSource(number);
  } catch (err) {
    response = { error: 1, status: 404, data: 'erreur réseau, impossible de récupérer les transactions' };
  }
  return response;
}


function getAccountTransactionsFromLocalSource(number) {
  return LocalSource.getAccountTransactions(number);
}

async function login(accountNumber) {
  try {
    const response = await LocalSource.loginWithAccountNumber(accountNumber);

    if (response.error === 0) {
      localStorage.setItem('sessionId', response.sessionId);
      return { success: true, message: response.message, account: response.account };
    } else {
      return { success: false, message: response.message };
    }
  } catch (error) {
    return { success: false, message: 'Erreur lors de la connexion' };
  }
}

function logout() {
  const sessionId = localStorage.getItem('sessionId');
  if (!sessionId) {
    return { success: false, message: 'Vous n\'êtes pas connecté' };
  }

  const response = LocalSource.logout(sessionId);
  if (response.error === 0) {
    localStorage.removeItem('sessionId');
    return { success: true, message: response.message };
  } else {
    return { success: false, message: 'Erreur lors de la déconnexion' };
  }
}

export default {
  getAccountAmount,
  getAccountTransactions,
  login,
  logout,
}