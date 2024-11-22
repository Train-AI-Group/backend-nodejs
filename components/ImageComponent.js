import fetch from 'node-fetch';
import Arweave from 'arweave';

const arweave = Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https',
});

const uploadImageDataset = async (req, res) => {
    try {
        const { walletAddress, privateKey, data, field_of_study, domain, method, is_data_clean, dataset_name, image } = req.body;

        if (!walletAddress || !privateKey || !data || !field_of_study, domain, method, is_data_clean, dataset_name, image) {
            return res.status(400).send({
                error: 'Missing walletAddress, privateKey, field_of_study, domain, method, is_data_clean, dataset_name, image or data in request body',
            });
        }

        const response = await fetch(data);
        if (!response.ok) {
            return res.status(400).send({ error: 'Failed to fetch data from the provided URL' });
        }
        const bufferData = await response.buffer();

        const wallet = {
            address: walletAddress,
            privateKey: Uint8Array.from(Object.values(privateKey)),
        };
        const transaction = await arweave.createTransaction(
            { data: bufferData },
            wallet
        );

        transaction.addTag('App-Name', 'YourAppName');
        transaction.addTag('Content-Type', response.headers.get('content-type') || 'application/octet-stream');

        await arweave.transactions.sign(transaction, wallet);
        const arweaveResponse = await arweave.transactions.post(transaction);

        const dbConnection = getDatabaseConnection();
        const transactionsCollection = dbConnection.collection("transactions");
        const doc = await transactionsCollection.insertOne({ field_of_study, domain, method, is_data_clean, dataset_name, image })
        console.log(doc);

        if (!doc) return res.status(500).send({
            error: 'Failed to add transaction to DB',
        });

        return res.status(200).json({
            transactionId: transaction.id,
            arweaveUrl: `https://arweave.net/${transaction.id}`,
            status: arweaveResponse.status,
        });
    } catch (error) {
        console.error('Error in uploadDataset:', error);
        return res.status(500).send({
            error: 'Failed to upload data to Arweave',
            details: error.message,
        });
    }
};

export { uploadImageDataset };