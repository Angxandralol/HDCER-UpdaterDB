require("dotenv").config();
const Element = require("../models/element");
const getData = require("../libs/getData");
const ResponseHTTP = require("../models/responseHTTP");
const { ObjectId } = require("mongodb");
const BASE_URL = process.env.URL_SNMP_ELEMENTS;

function ElementModel(
  ifIndex,
  ifName,
  ifDescr,
  ifAlias,
  ifHighSpeed,
  ifOperStatus,
  ifAdminStatus,
  sysLocation
) {
  const newElementModel = new Element({
    ifIndex: ifIndex,
    ifName: ifName,
    ifDescr: ifDescr,
    ifAlias: ifAlias,
    ifHighSpeed: ifHighSpeed,
    ifOperStatus: ifOperStatus,
    ifAdminStatus: ifAdminStatus,
    sysLocation: sysLocation,
  });

  return newElementModel;
}

function NewListElements(listElements) {
  let newListElements = [];
  let i = 0;
  if (listElements && !listElements.error) {
    while (i < listElements.ifOids.ifIndex.length) {
      let newElementModel = ElementModel(
        listElements.ifOids.ifIndex[i],
        listElements.ifOids.ifName[i],
        listElements.ifOids.ifDescr[i],
        listElements.ifOids.ifAlias[i],
        listElements.ifOids.ifHighSpee[i],
        listElements.ifOids.ifOperstatus[i],
        listElements.ifOids.ifAdminStatus[i],
        listElements.sysOids.syslocation
      );
      newListElements.push(newElementModel);
      i++;
    }
    return newListElements;
  }
  else return [];
}

async function GetDataElements(ip, community){
  let URL = `${BASE_URL}ip=${ip}&community=${community}`;
  let listPromises = [];

  const promiseDB = new Promise((resolve, _reject) => {
    getData(URL).then((res) => {
      if (res.responseHttp.code == 500) return undefined;
      else resolve(res.data);
    });
  });

  listPromises.push(promiseDB);
  const listElements = await Promise.all(listPromises);
  return listElements;
}

async function DataElements(ip, community) {
  let res = await GetDataElements(ip, community);
  if (res) {
    res = {
      responseHttp: new ResponseHTTP(200),
      data: NewListElements(res[0]),
    }
  }
  else {
    res = {
      responseHttp: new ResponseHTTP(500),
      data: undefined,
    }
  };
  return res;
}

module.exports = DataElements;
