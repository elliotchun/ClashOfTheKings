const { MongoClient } = require('mongodb');
const url = "mongodb+srv://dbUser:B2tmKqGEe8EWTvw@cluster0.h2pkw.mongodb.net/dbUser?retryWrites=true&w=majority";
const client = new MongoClient(url);

async function main() {
    try {
        await client.connect();
        await listDatabases(client);
    }
    catch (e) {
        console.error(e);
    }
    finally {
        await client.close();
    }
}
main().catch(console.error);

async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
