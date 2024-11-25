const fetch = require('node-fetch');

const walletAddress = 'na';
const privateKey = {
  key1: 'use your key here',
  key2: 'wdwd'
};

const transactionId = 'your_transaction_id_here';

const backendUrl = 'http://localhost:3000/auth/fetchDataset';

async function testFetchDataset() {
  try {
    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ transactionId })
    });

    const textResponse = await response.text();
    console.log('Raw response:', textResponse);

    const result = JSON.parse(textResponse);

    if (response.ok) {
      console.log('✅ Success:', result);
      console.log('Transaction Data:', result.transaction);
    } else {
      console.log('❌ Error:', result.message);
    }
  } catch (error) {
    console.error('❌ Request failed:', error.message);
  }
}

testFetchDataset();
