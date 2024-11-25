import fs from 'fs';

export async function getWallet() {
  const jsonData = fs.readFileSync('./testWallet.json', 'utf8');

  // Parse the string into a JSON object
  const data = JSON.parse(jsonData);

  console.log('walletAddress:', data.address);
  console.log('privateKey(strinified):', JSON.stringify(data.privateKey));
}

// Run the function if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  getWallet();
}
