const { client, ConnectDB, DisconnectDB, NAME_DB } = require("../utils/database");

async function GetAllData(nameCollection) {
  try {
    ConnectDB();
    const db = await client.db(NAME_DB);
    const coll = db.collection(nameCollection);
    const res = await coll.find({}).toArray();
    DisconnectDB();
    return res;
  } catch (error) {
    return error;
  }
}

async function GetCommunity(ip, community, nameCollection) {
  try {
    ConnectDB();
    const db = await client.db(NAME_DB);
    const coll = db.collection(nameCollection);
    const res = await coll.find({ ip: ip, communityName: community }).toArray();
    DisconnectDB();
    return res;
  } catch (error) {
    return error;
  }
}

async function GetInterface(idInterface, nameCollection) {
  try {
    ConnectDB();
    const db = await client.db(NAME_DB);
    const coll = db.collection(nameCollection);
    const res = await coll.find({ _id: idInterface }).toArray();
    DisconnectDB();
    return res;
  } catch (error) {
    return error;
  }
}


module.exports = { GetAllData, GetCommunity, GetInterface };
