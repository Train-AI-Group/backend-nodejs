import Arweave from 'arweave';
import XLSX from 'xlsx';

const arweave = Arweave.init({
  host: 'testnet.arweave.net',
  port: 443,
  protocol: 'https',
});

const uploadXlsxAndJSonDataset = async (req, res) => {
  let { walletAddress, privateKey, file, dataType } = req.body;

  if (!file || !walletAddress || !privateKey || !dataType) {
    return res.status(400).json({ message: 'Wallet address, private key, file, and data type are required.' });
  }

  try {
    const fileBuffer = Buffer.from(file, 'base64');
    let data;

    // If the file is JSON, parse it
    if (dataType === 'json') {
      data = JSON.parse(fileBuffer.toString('utf8'));
      data = JSON.stringify(data);
    } 
    // If the file is Excel, process it
    else if (dataType === 'excel') {
      const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
      const sheetNames = workbook.SheetNames;
      const sheet = workbook.Sheets[sheetNames[0]];
      data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      data = JSON.stringify(data);
    } 
    else {
      return res.status(400).json({ message: 'Unsupported data type. Please specify either "json" or "excel".' });
    }

    // Get wallet balance (optional)
    const walletBalance = await arweave.wallets.getBalance(walletAddress);
    console.log(`Wallet balance: ${walletBalance}`);

    // Upload the data to Arweave
    const arweaveKey = privateKey;
    const transaction = await arweave.createTransaction({ data: new TextEncoder().encode(data) }, arweaveKey);
    
    // Add tags for metadata
    transaction.addTag('Content-Type', dataType === 'json' ? 'application/json' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    transaction.addTag('Wallet-Address', walletAddress);

    await arweave.transactions.sign(transaction, arweaveKey);
    const response = await arweave.transactions.post(transaction);

    console.log(`Transaction ID: ${transaction.id}`);

    // Return the response to the client
    res.json({
      message: 'Dataset successfully uploaded to Arweave.',
      transactionId: transaction.id,
    });
  } catch (error) {
    console.error('Error uploading dataset:', error);
    res.status(500).json({ message: 'Failed to upload dataset to Arweave.' });
  }
};

export { uploadXlsxAndJSonDataset };
