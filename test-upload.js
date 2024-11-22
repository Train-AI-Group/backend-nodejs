import fetch from 'node-fetch';

const walletAddress = 'na';
const privateKey = {
  key1: "use your key here",
  key2: "wdwd"
};
var data = 'Sample dataset to upload to Arweave';

const backendUrl = 'http://localhost:3000/auth/uploadText';

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
