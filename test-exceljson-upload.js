import Arweave from 'arweave';
import fs from 'fs';
import fetch from 'node-fetch';

const arweave = Arweave.init({
  host: 'testnet.arweave.net',
  port: 443,
  protocol: 'https',
});

async function createArweaveWallet() {
  try {
    const wallet = await arweave.wallets.generate();
    const walletAddress = await arweave.wallets.jwkToAddress(wallet);
    return { wallet, walletAddress };
  } catch (error) {
    console.error('Error creating wallet:', error);
  }
}

const fileToBase64 = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) reject(err);
      const base64Data = data.toString('base64');
      resolve(base64Data);
    });
  });
};

async function testWallet() {
  try {
    const { wallet, walletAddress } = await createArweaveWallet();
    const privateKey = wallet;

    console.log('Wallet Address:', walletAddress);
    console.log('Private Key:', JSON.stringify(privateKey));

    const filePath = './package-lock.json';
    const fileBase64 = await fileToBase64(filePath);

    const payload = {
      walletAddress,
      privateKey: JSON.stringify(privateKey),
      file: fileBase64,
      dataType: 'json'
    };

    const backendUrl = 'http://localhost:3000/auth/uploadDataSet';

    console.log(JSON.stringify(payload));
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const textResponse = await response.text();
    console.log('Raw response:', textResponse);

    const result = JSON.parse(textResponse);

    if (response.ok) {
      console.log('Success:', result.message);
      console.log('Transaction ID:', result.transactionId);
    } else {
      console.log('Error:', result.message);
    }
  } catch (error) {
    console.error('Request failed:', error);
  }
}

testWallet();
