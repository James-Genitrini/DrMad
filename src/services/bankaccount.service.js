import LocalSource from '@/datasource/controller';

async function handleLocalSourceRequest(callback, errorMessage) {
  let response = null;
  try {
    response = await callback();
  } catch (err) {
    response = { error: 1, status: 404, data: errorMessage };
  }
  return response;
}

function getAccountFromLocalSource(number) {
  return LocalSource.getAccount(number);
}

function getAccountAmountFromLocalSource(number) {
  return LocalSource.getAccountAmount(number);
}

function getAccountTransactionsFromLocalSource(number) {
  return LocalSource.getAccountTransactions(number);
}

async function validateOperationFromLocalSource(data) {
  return LocalSource.operationValidation(data);
}

async function getAccountTransactionsByNumberFromLocalSouce(data) {
  return LocalSource.getAccountTransactionsByNumber(data);
}

async function getAccountAmount(number) {
  return handleLocalSourceRequest(() => getAccountAmountFromLocalSource(number), 'Erreur réseau, impossible de récupérer les comptes');
}

async function getAccount(number) {
  return handleLocalSourceRequest(() => getAccountFromLocalSource(number), 'Erreur réseau, impossible de récupérer les comptes');
}

async function getAccountTransactions(number) {
  return handleLocalSourceRequest(() => getAccountTransactionsFromLocalSource(number), 'Erreur réseau, impossible de récupérer les transactions');
}

async function getAccountTransactionsByNumber(data) {
  return handleLocalSourceRequest(() => getAccountTransactionsByNumberFromLocalSouce(data), 'Erreur réseau, impossible de récupérer le détail du compte');
}

async function operationValidation(data) {
  return handleLocalSourceRequest(() => validateOperationFromLocalSource(data), 'Erreur réseau, impossible de valider l\'opération');
}

async function login(accountNumber) {
  try {
    const response = await LocalSource.loginWithAccountNumber(accountNumber);
    if (response.error === 0) {
      localStorage.setItem('sessionId', response.sessionId);
      return { success: true, message: response.message, account: response.account };
    }
    return { success: false, message: response.message };
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
  operationValidation,
  getAccountAmount,
  getAccountTransactions,
  getAccountTransactionsByNumber,
  getAccount,
  login,
  logout,
}
