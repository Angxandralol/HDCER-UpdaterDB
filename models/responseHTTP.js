class ResponseHTTP {
  #code;
  #name;
  #description;

  constructor(code) {
    this.#code = code;
    if (code == 200) {
      this.#name = "OK";
      this.#description = "La solicitud ha tenido éxito";
    }
    if (code == 204) {
      this.#name = "No content";
      this.#description = "La petición se ha completado con éxito, pero su respuesta no tiene ningún contenido";
    }
    if (code == 400) {
      this.#name = "Bad Request";
      this.#description = "El servidor no pudo interpretar la solicitud gracias a una sintaxis inválida";
    }
    if (code == 404) {
      this.#name = "Not Found";
      this.#description = "No se pudo encontrar el contenido solicitado";
    }
    if (code == 500) {
      this.#name = "Internal Server Error";
      this.#description = "Se ha encontrado una situación inesperada en el servidor";
    }
  }

  get code() {
    return this.#code;
  }
  get name() {
    return this.#name;
  }
  get description() {
    return this.#description;
  }
}

module.exports = ResponseHTTP;