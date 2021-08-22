const { MongoClient } = require("mongodb");
const Users = require('../models/Users');
const CreateUser = require('./MongoCreateUser');
const url = "mongodb+srv://dbUser:B2tmKqGEe8EWTvw@cluster0.h2pkw.mongodb.net/dbUser?retryWrites=true&w=majority";

const client = new MongoClient(url);

const dbName = "CotK";


exports.findUser = async function (id) {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);

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
            CreateUser.createUser(id);
        }

    } catch (err) {
        console.log(err.stack);
    }

    finally {
        await client.close();
    }
}