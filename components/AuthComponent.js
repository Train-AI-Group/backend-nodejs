const Arweave = require('arweave');
const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https',
});

const uploadDataset = async (req, res) => {
  var { walletAddress, privateKey, data } = req.body;
  if (typeof data === 'string') {
    data = new TextEncoder().encode(data);
  }sssssssss 

  if (!walletAddress || !privateKey || !data) {
    return res.status(400).json({ message: 'Wallet address, private key, and dataset are required.' });
  }

  try {
    const arweaveKey = await arweave.wallets.jwkToAddress(privateKey);
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

module.exports = { uploadDataset };
