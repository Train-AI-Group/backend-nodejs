import arweave from '../arweave.js';
import fs from "fs"

export async function showBalance(walletAddress) {
    const balance = await arweave.wallets.getBalance(walletAddress);
    console.log("Wallet Balance: ", balance)
}

showBalance()

// Run the function if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    const walletPath = `${process.cwd()}/testWallet.json`;
    const wallet = JSON.parse(fs.readFileSync(walletPath, 'utf8'));
    console.log("-----showBalance.js-----")
    console.log(wallet.address)
    showBalance(wallet.address);
}