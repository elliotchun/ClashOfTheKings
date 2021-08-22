const Users = require('../models/Users');
const CreateUser = require('./MongoCreateUser');
const { db } = require('../index');


exports.findUser = async function (id) {
    try {
        // set collection to users
        const col = db.collection("UserBalance");

        // Query for document, wait for promise so we can read it back
        const p = await col.find({user_id: id});
        // Find one document
        const myDoc = await col.findOne();

        if (myDoc) {
            // Print to the console
            console.log(myDoc);
            return myDoc;
        }
        else {
            await CreateUser.createUser(id);
        }

    } catch (err) {
        console.log(err.stack);
    }
}