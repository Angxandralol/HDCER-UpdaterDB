const ResponseHTTP = require("../models/responseHTTP");

const getData = async (url) => {
  const response = await fetch(url)
    .then((response) => {
      if (response.ok) {
        const data = response.json();
        const res = {
          responseHttp: new ResponseHTTP(200),
          data: data,
        }
        return res;
      } else {
        console.error("Error en la solicitud:", response.status);
        console.error("Descripcion:", response.statusText);
        const res = {
          responseHttp: new ResponseHTTP(500),
          data: undefined,
        }
        return res;
      }
    })
    .catch((error) => {
      console.log("--------------------------ERROR-----------------------");
      console.log("Ha ocurrido un error inesperado en la petición");
      console.log(error);
      console.log("-------------------------------------------------");
      if (error.name == "FetchError") {
        const res = {
          responseHttp: new ResponseHTTP(500),
          data: undefined,
        }
        return res;
      }
      else {
        const res = {
          responseHttp: new ResponseHTTP(500),
          data: undefined,
        }
        return res;
      }
    });

  return response;
};

module.exports = getData;
