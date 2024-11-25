import arweave from '../arweave.js';
import fs from 'fs';

export async function createAndPostTransaction(wallet, data) {
  console.log('*************');
  console.log(data);
  console.log('*************');
  try {
    const transaction = await arweave.createTransaction(
      { data },
      wallet.privateKey
    );

    await arweave.transactions.sign(transaction, wallet.privateKey);
    console.log('signed');
    console.log(transaction);
    // const response = await arweave.transactions.post(transaction);

    console.log('Transaction ID:', transaction.id);
    console.log('Response Status:', response.status);

    return transaction.id;
  } catch (error) {
    console.error('Error creating transaction:', error);
  }
}

// Run the function if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const walletPath = `${process.cwd()}/testWallet.json`;
  const data = process.argv[2] || 'Hello_Arlocal!';
  if (!walletPath) {
    console.error('Please provide the path to the wallet JSON file.');
    process.exit(1);
  }

  const wallet = JSON.parse(fs.readFileSync(walletPath, 'utf8'));
  createAndPostTransaction(wallet, data);
}
