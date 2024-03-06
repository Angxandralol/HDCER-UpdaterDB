const clear = require("clear-console");
const DataCommunities = require("./request/dataCommunity");
const AlertError = require("./libs/alertError");
const { CSVNodosMissing } = require("./libs/createCSV");
const {
  SaveAllDataYesterday,
  MoveDataYesterdayToBeforeYesterday,
  SaveElementsChanges
} = require("./utils/saveData");
const GetListElementChanges = require("./utils/getChanges");

async function BackupDataYesterdayYesterday() {
  let res = await MoveDataYesterdayToBeforeYesterday();
  return res;
}

async function GetDataTaccess() {
  let res = await DataCommunities();
  if (res.responseHttp.code != 200) AlertError(res.responseHttp);
  return res;
}

async function UpdateData(data) {
  let res = await SaveAllDataYesterday(data);
  if (res && res.acknowledged) {
    console.log("ACTUALIZADOR COMPLETADO!");
  } else console.log("Error al guardar los datos de ayer");
}

async function Main() {
  let newData = await GetDataTaccess();
  if (newData.data) {
    let res = await BackupDataYesterdayYesterday();
    if (res.acknowledged) {
      console.log("Backup realizado!");
      CSVNodosMissing();
      await UpdateData(newData.data);
      let listChanges = await GetListElementChanges();
      await SaveElementsChanges(listChanges);
      console.log("Finalizado!");
    } else {
      console.log(
        "El backup de la data no pudo ser realizado, por ende se abortó la operación"
      );
    }
  } else console.log("No se pudo obtener la data de Taccess");
}

Main();