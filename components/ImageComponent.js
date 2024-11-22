import fetch from 'node-fetch';
import Arweave from 'arweave';

const arweave = Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https',
});

const uploadImageDataset = async (req, res) => {
    try {
        const { walletAddress, privateKey, data, metadata } = req.body;

        if (!walletAddress || !privateKey || !data || !metadata) {
            return res.status(400).send({
                error: 'Missing walletAddress, privateKey, metadata, or data in request body',
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