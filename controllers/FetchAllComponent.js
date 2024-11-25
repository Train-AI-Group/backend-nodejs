import arweave from '../arweave.js';

const fetchAllDataset = async (req, res) => {
  let { transactionIds } = req.body;

  if (!Array.isArray(transactionIds) || transactionIds.length === 0) {
    return res.status(400).json({ message: 'An array of transaction IDs is required.' });
  }

  try {
    const transactions = await Promise.all(
      transactionIds.map(async (transactionId) => {
        try {
          const transaction = await arweave.transactions.get(transactionId);
          return transaction;
        } catch (error) {
          console.error(`Error fetching transaction ${transactionId}:`, error);
          return { transactionId, error: 'Failed to fetch transaction.' };
        }
      })
    );

    res.json({ transactions });
  } catch (error) {
    console.error('Error fetching datasets:', error);
    res.status(500).json({ message: 'Failed to fetch datasets from Arweave.' });
  }
};

export { fetchAllDataset };