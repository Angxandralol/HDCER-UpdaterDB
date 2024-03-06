const { GetAllData, GetCommunity } = require("../querys/find");

function NewElementChange(community, oldInterface, newInterface) {
  let newElement = {
    ip: community.ip,
    communityName: community.communityName,
    sysname: community.sysname,
    oldInterface: oldInterface,
    newInterface: newInterface,
  };

  return newElement;
}

function searchInterface(listInterfaces, nameInterface) {
  let i = 0;
  let interface;
  while (i < listInterfaces.length) {
    if (listInterfaces[i].ifName == nameInterface) {
      interface = listInterfaces[i];
      break;
    }
    i++;
  }

  return interface;
}

async function GetListElementChanges() {
  const dataBeforeYesterday = await GetAllData("BeforeYesterday");
  let listChanges = [];
  let i = 0;
  while (i < dataBeforeYesterday.length) {
    let ii = 0;
    while (ii < dataBeforeYesterday[i].listInterfaces.length) {
      let beforeYesterdayInterface = dataBeforeYesterday[i].listInterfaces[ii];
      let dataYesterday = await GetCommunity(
        dataBeforeYesterday[i].ip,
        dataBeforeYesterday[i].communityName,
        "Yesterday"
      );
      if (dataYesterday) {
        if (dataYesterday[0].listInterfaces) {
          let yesterdayInterface = searchInterface(
            dataYesterday[0].listInterfaces,
            dataBeforeYesterday[i].listInterfaces[ii].ifName
          );
          if (yesterdayInterface) {
            if (
              beforeYesterdayInterface.ifIndex == yesterdayInterface.ifIndex
            ) {
              let newElement = NewElementChange(
                dataYesterday[0],
                beforeYesterdayInterface,
                yesterdayInterface
              );
              listChanges.push(newElement);
            }
          } //el else de aqui, serian los elementos que se les cambió el nombre
        }
      }
      ii++;
    }
    i++;
  }

  return listChanges;
}

module.exports = GetListElementChanges;
