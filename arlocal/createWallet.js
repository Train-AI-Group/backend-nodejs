import Arweave from 'arweave';
import fs from 'fs';

const arweave = Arweave.init({
    host: 'localhost',  // Use 'arweave.net' for mainnet
    port: 1984,         // Use 443 for mainnet
    protocol: 'http',   // Use 'https' for mainnet
});

export async function createWallet() {
    // Generate a new wallet
    const wallet = await arweave.wallets.generate();

    // Get the address from the wallet
    const address = await arweave.wallets.jwkToAddress(wallet);

    // Log the wallet information
    console.log('Wallet Address:', address);
    console.log('Wallet Key:', JSON.stringify(wallet, null, 2));

    // Save the wallet JSON to a file
    const walletFilePath = './testWallet.json'; // You can specify a custom path
    fs.writeFileSync(walletFilePath, JSON.stringify({ address, privateKey: wallet }, null, 2));

    console.log(`Wallet saved to ${walletFilePath}`);

    return { wallet, address };
}

// Run the function if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    createWallet();
}
