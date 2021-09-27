const Users = require('../models/Users');
const CreateUser = require('./MongoCreateUser');
const DatabaseInfo = require('../MongoInfo');


exports.findUser = async function (id) {
    try {
        //await DatabaseInfo.mongoClient.connect();
        const db = await DatabaseInfo.mongoClient.db(DatabaseInfo.dbName);
        // set collection to users
        const col = db.collection("UserBalance");

        // Query for document, wait for promise so we can read it back
        const myDoc = await col.findOne({user_id: id});
        // Find one document
        //const myDoc = await col.findOne();

        if (myDoc) {
            // Print to the console
            //console.log(myDoc);
            return myDoc;
        }
        else {
            await CreateUser.createUser(id);
            const newDoc = await col.findOne({ user_id: id });
            //console.log(newDoc);
            return newDoc;
        }

    }
    catch (err) {
        console.log(err.stack);
    }
}