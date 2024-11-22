const fetch = require('node-fetch');

const backendUrl = 'http://localhost:3000/auth/uploadImage';

const walletAddress = 'na';
const privateKey = {
  key1: "use your key here",
  key2: "wdwd"
};

async function testImageUpload() {
  try {
    const data = "https://www.w3schools.com/w3images/fjords.jpg"; 
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
      console.log('✅ Success:', result);
      console.log('Transaction ID:', result.transactionId);
      console.log('Arweave URL:', result.arweaveUrl);
    } else {
      console.log('❌ Error:', result.error);
    }
  } catch (error) {
    console.error('❌ Request failed:', error.message);
  }
}

testImageUpload();
