import mine from '../arlocal/mine.js';
import arweave from '../arweave.js';
import testWallet from '../arlocal/testWallet.json' with { type: "json" };
import { getDatabaseConnection } from "../database/connect.js"

const uploadZip = async (req, res) => {

  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  let { walletAddress, field_of_study, domain, method, is_data_clean, dataset_name } = req.body;

  if (!walletAddress) {
    return res.status(400).json({ message: 'Wallet address, private key, and field_of_study, domain, method, is_data_clean, dataset_name are required.' });
  }

  try {
    const walletBalance = await arweave.wallets.getBalance(walletAddress);
    console.log(`Wallet balance: ${walletBalance}`);

    const arweaveKey = testWallet.privateKey;

    const transaction = await arweave.createTransaction({ data: req.file.buffer }, arweaveKey);
    await mine();
    console.log("created tx")
    console.log(`Transaction data size: ${transaction.data_size}`);


    if (parseInt(walletBalance) < parseInt(transaction.reward)) {
      const requiredFunds = parseInt(transaction.reward) - parseInt(walletBalance)
      console.log('Insufficient balance. Minting tokens... difd', requiredFunds);
      await fetch(`http://localhost:1984/mint/${walletAddress}/${requiredFunds}`, { method: 'GET' });
      console.log('Minted tokens successfully.');
    }


    // Add required metadata as transaction tags
    transaction.addTag('Content-Type', req.file.mimetype);
    transaction.addTag('File-Name', req.file.originalname);
    transaction.addTag('Wallet-Address', walletAddress);
    transaction.addTag('Field-Of-Study', field_of_study);
    transaction.addTag('Domain', domain);
    transaction.addTag('Method', method);
    transaction.addTag('Is-Data-Clean', is_data_clean.toString());
    transaction.addTag('Dataset-Name', dataset_name);

    console.log(transaction)
    await arweave.transactions.sign(transaction, arweaveKey);
    // // Upload the transaction to the Arweave network
    // const uploader = await arweave.transactions.getUploader(transaction);
    // while (!uploader.isComplete) {
    //   await uploader.uploadChunk();
    //   console.log(`${uploader.pctComplete}% uploaded...`);
    // }
    const arweaveResponse = await arweave.transactions.post(transaction);
    // arweave.api.get("mine")

    console.log(`Transaction ID: ${transaction.id}`);
    console.log(`Transaction status: ${arweaveResponse.status}`);

    const dbConnection = getDatabaseConnection();
    const transactionsCollection = dbConnection.collection("transactions");
    const { acknowledged, insertedId } = await transactionsCollection.insertOne({ transaction_id: transaction.id, time: new Date() })
    console.log('db', acknowledged, insertedId);

    if (!acknowledged) return res.status(500).send({
      error: 'Failed to add transaction to DB',
    });

    res.status(arweaveResponse.status).json({
      message: arweaveResponse.status !== 200 ? 'Some error occured while uploading to Arweave.': 'Dataset successfully uploaded to Arweave.',
      arweaveUrl: `https://localhost:1984/${transaction.id}`,
      status: arweaveResponse.status,
    });
  } catch (error) {
    console.error('Error uploading dataset:', error);
    res.status(500).json({ message: 'Failed to upload dataset to Arweave.' });
  }
};

export default uploadZip;