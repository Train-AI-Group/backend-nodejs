import arweave from '../arweave';

export async function getTransaction(transactionId) {
  try {
    const transaction = await arweave.transactions.get(transactionId);

    console.log('Transaction ID:', transaction.id);
    console.log('Transaction Owner:', transaction.owner);
    console.log('Transaction Data:', transaction.get('data', { decode: true, string: false }));
  } catch (error) {
    console.error('Error retrieving transaction:', error);
  }
}

// Run the function if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const transactionId = process.argv[2];

  if (!transactionId) {
    console.error('Please provide a transaction ID as an argument.');
    process.exit(1);
  }

  getTransaction(transactionId);
}
