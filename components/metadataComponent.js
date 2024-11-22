import { getDatabaseConnection } from "./../database/connect.js";

const updateMetadata = async (req, res) => {
    console.log(req.body);

    const { transaction_id, field_of_study, domain, method, is_data_clean, dataset_name, image } = req.body;

    // validation
    if (!transaction_id || !field_of_study || !domain || !method || !is_data_clean || !dataset_name || !image)
        return res.status(400).json({ message: 'transaction_id, field_of_study, domain, method, is_data_clean, dataset_name, image are required.' });

    try {
        const dbConnection = getDatabaseConnection();
        const datasetMetadatasCollection = dbConnection.collection("datasetMetadatas");
        const { matchedCount, modifiedCount } = await datasetMetadatasCollection.updateOne({ transaction_id }, { $set: { field_of_study, domain, method, is_data_clean, dataset_name, image } });
        console.log(matchedCount, modifiedCount)
        if (!matchedCount || !modifiedCount) return res.status(500).send({
            error: 'Failed to update metadata',
        });
        return res.json({ message: 'Metadata added successfully!' })
    } catch (error) {
        console.error('Error in addMetadata:', error);
        return res.status(500).send({
            error: 'Failed to add metadata',
            details: error.message,
        });
    }
}

export { updateMetadata }