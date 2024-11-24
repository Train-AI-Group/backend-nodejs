import arweave from '../arweave.js';

const fetchDataset = async (req, res) => {
   let { transactionId } = req.body;

   if (!transactionId) {
      return res.status(400).json({ message: 'Transaction ID is required.' });
   }

   try {
      const transaction = await arweave.transactions.get(transactionId);
      // console.log("transaction : ", transaction);

      res.json({ transaction });
   } catch (error) {
      console.error('Error fetching dataset:', error);
      res.status(500).json({ message: 'Failed to fetch dataset from Arweave.' });
   }
};

export { fetchDataset };

