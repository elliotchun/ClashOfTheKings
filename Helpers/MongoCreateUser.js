const Users = require('../models/Users');
const DatabaseInfo = require('../MongoInfo');


exports.createUser = async function (id) {
    try {
        await DatabaseInfo.mongoClient.connect();
        const db = DatabaseInfo.mongoClient.db(DatabaseInfo.dbName);
        const col = db.collection("UserBalance");

        // Construct a document                                                                                                                                                              
        let userDocument = Users;
        userDocument.user_id = id;
        userDocument.balance = 0;

        // Insert a single document, wait for promise so we can read it back
        const p = await col.insertOne(userDocument);
    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await DatabaseInfo.mongoClient.close();
    }
}