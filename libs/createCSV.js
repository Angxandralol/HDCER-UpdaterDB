const fs = require("fs");
const { stringify } = require("csv-stringify");

function CreateCSV(list, stringifier, writableStream) {
  for (let i = 0; i < list.length; i++) {
    stringifier.write(list[i]);
  }
  stringifier.pipe(writableStream);
}

function DeleteCSV(path) {
  fs.unlink(path, (error) => {
    return error;
  });
}

function CSVNodosMissing() {
  const filename = "Lists_Of_Nodes_Missing.csv";
  const writableStream = fs.createWriteStream(filename);
  const { GetListElementsError } = require("./dataError");
  const columns = ["ip", "Community", "Sysname"];
  const stringifier = stringify({ header: true, columns: columns });
  const path = "./Lists_Of_Nodes_Missing.csv";

  let deleteError;

  fs.access(path, fs.constants.F_OK, (error) => {
    if (error) deleteError = DeleteCSV(path);
  });
  if (!deleteError) {
    let listElementsError = GetListElementsError();
    CreateCSV(listElementsError, stringifier, writableStream);
  } else
    console.log(
      `AVISO: Error al eliminar el antiguo archivo. Descripción: ${deleteError}`
    );
}

function CSVBackupCollection(nameCollection, dataCollection) {
  const filename = `backup-${nameCollection}.csv`;
  const writableStream = fs.createWriteStream(filename);
  const { GetListBackupCollection } = require("./dataError");
  const columns = [
    "ip",
    "Community",
    "Sysname",
    "ifIndex",
    "ifName",
    "ifDescr",
    "ifAlias",
    "ifHighSpeed",
    "ifOperStatus",
    "ifAdminStatus",
    "syslocation",
  ];
  const stringifier = stringify({ header: true, columns: columns });
  const path = `../backup-${nameCollection}.csv`;

  let deleteError;
  fs.access(path, fs.constants.F_OK, (error) => {
    if (error) deleteError = DeleteCSV(path);
  });
  if (!deleteError) {
    let listElements = GetListBackupCollection(dataCollection);
    CreateCSV(listElements, stringifier, writableStream);
  } else
    console.log(
      `AVISO: Error al eliminar el antiguo archivo. Descripción: ${deleteError}`
    );
}

module.exports = { CSVNodosMissing, CSVBackupCollection };
