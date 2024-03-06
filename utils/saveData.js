const { CSVBackupCollection } = require("../libs/createCSV");
const { DeleteCollection } = require("../querys/delete");
const { GetAllData } = require("../querys/find");
const { InsertOneCommunity } = require("../querys/insert");
const GetListElementChanges = require("./getChanges");

async function SecretBackup(nameCollection) {
  try {
    let listBackupData = [];
    let i = 0;
    const backupData = await GetAllData(nameCollection);
    if (backupData && backupData.length != 0) {
      while (i < backupData.length) {
        listBackupData.push(backupData[i]);
        i++;
      }
      CSVBackupCollection(nameCollection, listBackupData);
    }
  } catch (error) {
    console.log(`No se pudo realizar el secret backup: ERROR: ${error}`);
  }
}

async function ResetCollection(nameCollection) {
  try {
    let res = await DeleteCollection(nameCollection);
    if (!res.acknowledged) console.log("FALLO AL BORRAR LA COLLECION");
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
}

function BackupFailInsert(name, list) {
  CSVBackupCollection(name, list);
}

async function MoveDataYesterdayToBeforeYesterday() {
  try {
    await SecretBackup("BeforeYesterday"); //antes de resetear deberias guardar en un csv
    let res = await ResetCollection("BeforeYesterday");
    if (res.acknowledged) {
      let dataYesterday = await GetAllData("Yesterday");
      if (dataYesterday) {
        let i = 0;
        let failInsert = [];
        while (i < dataYesterday.length) {
          res = await InsertOneCommunity("BeforeYesterday", dataYesterday[i]);
          if (res.ok == 0) {
            console.log("Error al insertar:", res);
            failInsert.push(listCommunities[i]);
          }
          i++;
        }
        if (failInsert.length != 0)
          BackupFailInsert("backupFailInserteBeforeYesterday", failInsert);
        return res;
      }
    }
    return res;
  } catch (error) {
    return error;
  }
}

async function AddNewDataYesterday(listCommunities) {
  try {
    let i = 0;
    let failInsert = [];
    while (i < listCommunities.length) {
      res = await InsertOneCommunity("Yesterday", listCommunities[i]);
      if (res.ok == 0) {
        console.log("Error al insertar:", res);
        failInsert.push(listCommunities[i]);
      }
      i++;
    }
    if (failInsert.length != 0) BackupFailInsert("Community", failInsert);
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function SaveElementsChanges(listChanges) {
  try {
    let res = await ResetCollection("ElementsChanges");
    if (res.acknowledged) {
      if (listChanges.length != 0) {
        let i = 0;
        while (i < listChanges.length) {
          res = await InsertOneCommunity("ElementsChanges", listChanges[i]);
          i++;
        }
      }
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function SaveAllDataYesterday(listCommunities) {
  try {
    let res = await ResetCollection("Yesterday");
    if (res.acknowledged) {
      let i = 0;
      let failInsert = [];
      while (i < listCommunities.length) {
        res = await InsertOneCommunity("Yesterday", listCommunities[i]);
        if (res.ok == 0) {
          console.log("Error al insertar:", res);
          failInsert.push(listCommunities[i]);
        }
        i++;
      }
      if (failInsert.length != 0) BackupFailInsert("Communities", failInsert);
      return res;
    } else return undefined;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = {
  SaveAllDataYesterday,
  AddNewDataYesterday,
  MoveDataYesterdayToBeforeYesterday,
  SaveElementsChanges
};
