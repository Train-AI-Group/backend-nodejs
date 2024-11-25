import { createWallet } from './createWallet.js';
import { addFunds } from './addFunds.js';
import { showBalance } from './showBalance.js';

(async () => {
  await createWallet();
  await addFunds();
  await addFunds();
  await addFunds();
  await addFunds();
  await showBalance();
})();
