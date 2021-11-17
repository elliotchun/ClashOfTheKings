const Users = require('../models/Users');
const DatabaseInfo = require('../MongoInfo');
const ExampleArtifact = require('../Items/Base/Artifacts/ExampleArtifact');
const ExampleWeapon = require('../Items/Base/Weapons/ExampleWeapon');
const ExampleUtility = require('../Items/Base/Utilities/ExampleUtility');

exports.createUser = async function (id) {
    try {
        //await DatabaseInfo.mongoClient.connect();
        const db = DatabaseInfo.mongoClient.db(DatabaseInfo.dbName);
        const col = db.collection('UserInventory');
        
        // Construct a document                                                                                                                                                              
        let userDocument = Users;
        userDocument.user_id = id;
        userDocument.balance = 0;
        userDocument.items = {
            weapons : {
                ExampleWeapon,
            },
            utilities : {
                
            },
            artifacts : {
                
            }
        };
        // Insert a single document, wait for promise so we can read it back
        const p = await col.insertOne(userDocument);
    }
    catch (err) {
        console.log(err.stack);
    }
}