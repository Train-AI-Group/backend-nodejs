import arweave from '../arweave.js';
import { getDatabaseConnection } from "../database/connect.js"

const uploadZip = async (req, res) => {

  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  let { walletAddress, privateKey, field_of_study, domain, method, is_data_clean, dataset_name } = req.body;

  if (!walletAddress || !privateKey) {
    return res.status(400).json({ message: 'Wallet address, private key, and field_of_study, domain, method, is_data_clean, dataset_name are required.' });
  }

  try {
    const walletBalance = await arweave.wallets.getBalance(walletAddress);
    console.log(`Wallet balance: ${walletBalance}`);

    const arweaveKey = JSON.parse(privateKey);

    const transaction = await arweave.createTransaction({ data: req.file.buffer }, arweaveKey);

    console.log("created tx")
    console.log(`Transaction data size: ${transaction.data_size}`);


    if (parseInt(walletBalance) < parseInt(transaction.reward)) {
      console.log('Insufficient balance. Minting tokens... difd', parseInt(transaction.reward) - parseInt(walletBalance));
      await fetch(`http://localhost:1984/mint/${walletAddress}/1000000000000`, { method: 'POST' });
      console.log('Minted tokens successfully.');
    }


    // transaction.addTag('Content-Type', req.file.mimetype);
    transaction.addTag('File-Name', req.file.originalname);
    transaction.addTag('Wallet-Address', walletAddress);
    console.log(transaction)
    await arweave.transactions.sign(transaction, arweaveKey);
    // Upload the transaction to the Arweave network
    const uploader = await arweave.transactions.getUploader(transaction);
    while (!uploader.isComplete) {
      await uploader.uploadChunk();
      console.log(`${uploader.pctComplete}% uploaded...`);
    }
    // const arweaveResponse = await arweave.transactions.post(transaction);
    // arweave.api.get("mine")

    console.log(`Transaction ID: ${transaction.id}`);

    const dbConnection = getDatabaseConnection();
    const transactionsCollection = dbConnection.collection("transactions");
    const { acknowledged, insertedId } = await transactionsCollection.insertOne({ transaction_id: transaction.id, field_of_study, domain, method, is_data_clean, dataset_name })
    console.log(acknowledged, insertedId);

    if (!acknowledged) return res.status(500).send({
      error: 'Failed to add transaction to DB',
    });

    res.status(200).json({
      message: 'Dataset successfully uploaded to Arweave.',
      arweaveUrl: `https://localhost:1984/${transaction.id}`,
      // status: arweaveResponse.status,
    });
  } catch (error) {
    console.error('Error uploading dataset:', error);
    res.status(500).json({ message: 'Failed to upload dataset to Arweave.' });
  }
};

export default uploadZip;