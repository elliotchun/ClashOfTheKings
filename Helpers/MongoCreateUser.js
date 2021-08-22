const Users = require('../models/Users');
const { db } = require('../index');


exports.createUser = async function (id) {
    try {
        // set collection to users
        const col = db.collection("UserBalance");

        // Construct a document                                                                                                                                                              
        let userDocument = Users;
        userDocument.user_id = id;
        userDocument.balance = 0;

        // Insert a single document, wait for promise so we can read it back
        const p = await col.insertOne(userDocument);
        // Find one document
        const myDoc = await col.findOne();
        // Print to the console
        console.log(myDoc);


    } catch (err) {
        console.log(err.stack);
    }
}