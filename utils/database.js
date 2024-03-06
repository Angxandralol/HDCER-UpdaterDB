require("dotenv").config();
const { MongoClient } = require("mongodb");
const URI = process.env.URI;
const NAME_DB = process.env.NAME_BASE;

const client = new MongoClient(URI);

async function ConnectDB() {
  try {
    await client.connect();
  } catch (error) {
    console.error("Mongodb Error:", error.message);
  }
}

function DisconnectDB() {
  client.close();
}

module.exports = { ConnectDB, DisconnectDB };
module.exports.client = client;
module.exports.NAME_DB = NAME_DB;
