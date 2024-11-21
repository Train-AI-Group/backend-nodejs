import fetch from 'node-fetch';

const walletAddress = 'your-wallet-address';
const privateKey = {
  "kty": "RSA",
  "e": "AQAB",
  "n": "your-public-key-modulus",
};
const data = 'Sample dataset to upload to Arweave';

const backendUrl = 'http://localhost:3000/auth/upload';

async function testUpload() {
  try {
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ walletAddress, privateKey, data }),
    });

    const textResponse = await response.text();
    console.log("Raw response:", textResponse);

    const result = JSON.parse(textResponse);

    if (response.ok) {
      console.log('Success:', result.message);
      console.log('Transaction ID:', result.transactionId);
    } else {
      console.log('Error:', result.message);
    }
  } catch (error) {
    console.error('Request failed', error);
  }
}

testUpload();
