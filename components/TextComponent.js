import Arweave from 'arweave';
import { getDatabaseConnection } from "../database/connect.js"

const arweave = Arweave.init({
  host: 'localhost',
  port: 1984,
  protocol: 'http'
});

const uploadTextDataset = async (req, res) => {
  let { walletAddress, privateKey, data, field_of_study, domain, method, is_data_clean, dataset_name, image } = req.body;

  // if (typeof data === 'string') {
  //   const dataBuffer = Buffer.from(data, 'utf-8');
  // }

  if (!walletAddress || !privateKey || !data) {
    return res.status(400).json({ message: 'Wallet address, private key, and field_of_study, domain, method, is_data_clean, dataset_name, image and data are required.' });
  }

  try {
    const walletBalance = await arweave.wallets.getBalance(walletAddress);
    console.log(`Wallet balance: ${walletBalance}`);

    const arweaveKey = privateKey;
    console.log(typeof data)
    const transaction = await arweave.createTransaction({ data }, arweaveKey);

    console.log("created tx")

    transaction.addTag('Content-Type', 'text/plain');
    transaction.addTag('Wallet-Address', walletAddress);

    await arweave.transactions.sign(transaction, arweaveKey);
    const arweaveResponse = await arweave.transactions.post(transaction);

    console.log(`Transaction ID: ${transaction.id}`);

    const dbConnection = getDatabaseConnection();
    const transactionsCollection = dbConnection.collection("transactions");
    const { acknowledged, insertedId } = await transactionsCollection.insertOne({ transaction_id: transaction.id, field_of_study, domain, method, is_data_clean, dataset_name, image })
    console.log(acknowledged, insertedId);

    if (!acknowledged) return res.status(500).send({
      error: 'Failed to add transaction to DB',
    });

    res.status(200).json({
      message: 'Dataset successfully uploaded to Arweave.',
      arweaveUrl: `https://localhost:1984/${transaction.id}`,
      status: arweaveResponse.status,
    });
  } catch (error) {
    console.error('Error uploading dataset:', error);
    res.status(500).json({ message: 'Failed to upload dataset to Arweave.' });
  }
};

export { uploadTextDataset };