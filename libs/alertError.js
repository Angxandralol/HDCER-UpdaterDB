function AlertError(error){
    console.log("ERROR");
    console.log("CODE:", error.code);
    console.log("NAME:", error.name);
    console.log("DESCRIPTION:", error.description);
}

module.exports = AlertError;