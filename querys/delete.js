const { client, ConnectDB, DisconnectDB, NAME_DB } = require("../utils/database");

async function DeleteCollection(nameCollection) {
  try {
    ConnectDB();
    const db = await client.db(NAME_DB);
    const coll = db.collection(nameCollection);
    const res = await coll.deleteMany({});
    DisconnectDB();
    return res;
  } catch (error) {
    return error;
  }
}

async function DeleteOneCommunity(idCommunity) {
  try {
    ConnectDB();
    const db = await client.db(NAME_DB);
    const coll = db.collection("Communities");
    const res = await coll.deleteOne({ _id: idCommunity });
    DisconnectDB();
    return res;
  } catch (error) {
    return error;
  }
}

module.exports = { DeleteCollection, DeleteOneCommunity };
