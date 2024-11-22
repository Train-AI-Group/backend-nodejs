import Arweave from 'arweave';
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

const uploadDataset = async (req, res) => {
  let { walletAddress, privateKey, data } = req.body;

  if (typeof data === 'string') {
    data = new TextEncoder().encode(data);
  }

  if (!walletAddress || !privateKey || !data) {
    return res.status(400).json({ message: 'Wallet address, private key, and dataset are required.' });
  }

  try {
    const walletBalance = await arweave.wallets.getBalance(walletAddress);
    console.log(`Wallet balance: ${walletBalance}`);

    const arweaveKey = privateKey;

    const transaction = await arweave.createTransaction({ data }, arweaveKey);

    transaction.addTag('Content-Type', 'text/plain');
    transaction.addTag('Wallet-Address', walletAddress);

    await arweave.transactions.sign(transaction, arweaveKey);
    const response = await arweave.transactions.post(transaction);
    console.log(`Transaction ID: ${transaction.id}`);

    res.json({
      message: 'Dataset successfully uploaded to Arweave.',
      transactionId: transaction.id,
    });
  } catch (error) {
    console.error('Error uploading dataset:', error);
    res.status(500).json({ message: 'Failed to upload dataset to Arweave.' });
  }
};


async function testWallet() {
  try {
    const { wallet, walletAddress } = await createArweaveWallet();
    const privateKey = wallet;

    console.log('Wallet Address:', walletAddress);
    console.log('Private Key:', JSON.stringify(privateKey));

    const data = 'Sample dataset to upload to Arweave';

    const backendUrl = 'http://localhost:3000/auth/uploadText';

    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ walletAddress, privateKey, data }),
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
