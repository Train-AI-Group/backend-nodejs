import { arGql, GQLUrls } from "ar-gql"
import arweave from '../arweave.js';

const fetchUserDataset = async (req, res) => {
   let { walletAddress } = req.body;
   const goldsky = arGql({ endpointUrl: GQLUrls.goldsky });
   if (!walletAddress) {
      return res.status(400).json({ message: 'walletAddress is required.' });
   }
   
   try {
      const queryObject = `
           query {
             transactions(
               owners: ["${walletAddress}"],
             ) {
               edges {
                 node {
                   id
                 }
               }
             }
           }
         `;

      const result = await goldsky.run(queryObject);
      const transactionIds = result.data.transactions.edges.map(edge => edge.node.id);
      // console.log("transactionIds : ", transactionIds);

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
      console.error('Error fetching dataset:', error);
      res.status(500).json({ message: 'Failed to fetch dataset from Arweave.' });
   }
};

export { fetchUserDataset };