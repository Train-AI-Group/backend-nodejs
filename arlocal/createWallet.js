import arweave from '../arweave.js';
import fs from 'fs';

export async function createWallet() {
  // Generate a new wallet
  const wallet = await arweave.wallets.generate();

  // Get the address from the wallet
  const address = await arweave.wallets.jwkToAddress(wallet);

  // Log the wallet information
  console.log('Wallet Address:', address);
  console.log('Private Key:', JSON.stringify(wallet));

  // Save the wallet JSON to a file
  const walletFilePath = './testWallet.json'; // You can specify a custom path
  fs.writeFileSync(
    walletFilePath,
    JSON.stringify({ address, privateKey: wallet }, null, 2)
  );

  console.log(`Wallet saved to ${walletFilePath}`);

  return { wallet, address };
}

// Run the function if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  createWallet();
}
