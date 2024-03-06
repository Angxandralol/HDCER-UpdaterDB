const { client, ConnectDB, DisconnectDB, NAME_DB} = require("../utils/database");

async function InsertOneCommunity(nameCollection, data) {
  try {
    ConnectDB();
    const db = await client.db(NAME_DB);
    const coll = db.collection(nameCollection);
    const res = await coll.insertOne(data);
    DisconnectDB();
    return res;
  } catch (error) {
    return error;
  }
}

module.exports = {InsertOneCommunity};