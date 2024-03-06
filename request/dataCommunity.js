require("dotenv").config();
const Community = require("../models/community");
const getData = require("../libs/getData");
const DataElements = require("./dataElement");
const ResponseHTTP = require("../models/responseHTTP");
const TodaysDate = require("../libs/todaysDate");
const URL = process.env.URL_SNMP;
const BASE_URL = process.env.URL_SNMP_ELEMENTS;
let err = [];

function CommunityModel(date, community, listElements) {
  const newCommunityModel = new Community({
    date: date,
    ip: community.ip,
    communityName: community.community,
    sysname: community.sysname,
    listInterfaces: listElements,
  });

  return newCommunityModel;
}

function NewListElementsError(community) {
  err.push(community);
}

async function NewListCommunities(listCommunities) {
  let newListCommunities = [];
  try {
    let date = TodaysDate();
    let i = 0;
    if (listCommunities) {
      while (i < listCommunities.length) {
        console.log(
          `${i}/${listCommunities.length} || URL: ${BASE_URL}ip=${listCommunities[i].ip}&community=${listCommunities[i].community}`
        );
        let listElements = await GetDataElements(
          listCommunities[i].ip,
          listCommunities[i].community
        );
        let newCommunityModel = CommunityModel(
          date,
          listCommunities[i],
          listElements
        );
        if ((!listElements) || (!listElements[0])) NewListElementsError(newCommunityModel);
        else newListCommunities.push(newCommunityModel);
        i++;
      }
      return newListCommunities;
    }
  } catch (error) {
    console.log("ERROR:", error);
    return newListCommunities;
  }
}

async function GetDataElements(ip, community) {
  let listElements = await DataElements(ip, community);
  if (listElements.responseHttp.code == 200) listElements = listElements.data;
  else listElements = [];
  return listElements;
}

async function GetDataCommunities() {
  let error;
  let listPromises = [];

  const promiseDB = new Promise((resolve, _reject) => {
    getData(URL).then((res) => {
      if (res.responseHttp.code == 500) return undefined;
      else resolve(res.data);
    });
  });

  listPromises.push(promiseDB);
  const listCommunities = await Promise.all(listPromises);
  if (error) return error;
  else return listCommunities;
}

async function DataCommunities() {
  const res = await GetDataCommunities();
  if (res) {
    let data = await NewListCommunities(res[0]);
    return {
      responseHttp: new ResponseHTTP(200),
      data: data
    }
  } else
    return {
      responseHttp: new ResponseHTTP(500),
      data: undefined,
    };
}

module.exports = DataCommunities;
module.exports.err = err;
