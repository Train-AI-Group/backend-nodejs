import { createWallet } from 'arweavekit/wallet'
exports.getWallet = (req, res) => {
    const address = req.body.address;
    if (!address) {
    const wallet = createWallet({seedPhrase: true,
        environment: 'local'});
        // return res.status(400).json({ error: "Address is required" });
    }
    res.json({ address: address });
};
