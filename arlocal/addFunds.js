import axios from 'axios';
import fs from "fs"

export async function addFunds(address) {
  console.log(address, "add")
  try {
    const response = await axios.get(`http://localhost:1984/mint/${address}/14067094920`);
    console.log(`Funds added to wallet: ${address}`);
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error adding funds:', error.message);
  }
}

// Run the function if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const walletPath = `${process.cwd()}/testWallet.json`;
  const wallet = JSON.parse(fs.readFileSync(walletPath, 'utf8'));

  addFunds(wallet.address);
}
