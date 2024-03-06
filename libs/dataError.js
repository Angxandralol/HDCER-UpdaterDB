const { err } = require("../request/dataCommunity");

function GetListElementsError() {
  let listError = [];
  let i = 0;
  while (i < err.length) {
    let communityError = [err[i].ip, err[i].communityName, err[i].sysname];
    listError.push(communityError);
    i++;
  }

  return listError;
}

function GetListBackupCollection(dataCollection) {
  try {
    let listData = [];
    let i = 0;
    let ii = 0;
    while (i < dataCollection.length) {
      while (ii < dataCollection[i].listInterfaces.length) {
        let communityBackup = [
          dataCollection[i].ip,
          dataCollection[i].communityName,
          dataCollection[i].sysname,
          dataCollection[i].listInterfaces[ii].ifIndex,
          dataCollection[i].listInterfaces[ii].ifName,
          dataCollection[i].listInterfaces[ii].ifDescr,
          dataCollection[i].listInterfaces[ii].ifAlias,
          dataCollection[i].listInterfaces[ii].ifHighSpeed,
          dataCollection[i].listInterfaces[ii].ifOperStatus,
          dataCollection[i].listInterfaces[ii].ifAdminStatus,
          dataCollection[i].listInterfaces[ii].sysLocation,
        ];
        listData.push(communityBackup);
        ii++;
      }
      i++;
    }
    return listData;
  } catch (error) {
    return [];
  }
}

module.exports = { GetListElementsError, GetListBackupCollection };
