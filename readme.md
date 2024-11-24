
# Express Backend for Train AI

To successfully run this backend You should have node.js and npx



## Steps to run

Install arlocal
        
    npx install arlocal
    
Run arlocal
    
    npx arlocal --verbose

Keep this arlocal instance alive in a seperate terminal

Open a new terminal through your BE root directory /arlocal where files to create a wallet, add funds to wallet and show wallet are:

* Run to Create Wallet, add Funds Show balance and get Wallet details
    
    node index.js

Open a new terminal and In your root directory

Run the BE Express Server here

First,

Install project dependencies

    npm i

Then,

Run BE Server

    node index.js

Keep the Server Running here

Your BE is ready to serve requests

Note: The requests you will be making from postman or any client will land here.
This BE will call the mainnet or testnet (incase of dev and testing, which is arlocal instance running in your seperate terminal)
## API Reference

#### Get all items

```http
  GET /api/auth/upload
```
This converts the zip file to buffer and creates a transaction, expect status in response object
Following is a successful response object.
```json
{
    "message": "Dataset successfully uploaded to Arweave.",
    "arweaveUrl": "https://localhost:1984/3QxpbLh_OsGtZAsQJ_1lkb_VFimsA_2-K0IbWez5rJE",
    "status": 200
}
```

#### Get transaction

In the ~/backend-nodejs/arlocal terminal instance.
 
```
node getTransaction.js [transactionId]
```

