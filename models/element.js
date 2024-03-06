const { ObjectId } = require("mongodb");
const { Schema, model } = require("mongoose");

const ElementSchema = new Schema(
    {
      ifIndex: {
        type: String,
        required: [true, "El índice del elemento es requerido"],
        unique: true,
        trim: true,
      },
      ifName: {
        type: String,
        required: [true, "El nombre del elemento es requerido"],
        trim: true,
      },
      ifDescr: {
        type: String,
        required: [true, "La descripción del elemento es requerida"],
        trim: true,
      },
      ifAlias: {
        type: String,
        required: [true, "El alias del elemento es requerido"],
        trim: true,
      },
      ifHighSpeed: {
        type: String,
        required: [true, "El high speed es requerido"],
        trim: true,
      },
      ifOperStatus: {
        type: String,
        required: [true, "El estatus del operador es requerido"],
        trim: true,
      },
      ifAdminStatus: {
        type: String,
        required: [true, "El estatus del admin es requerido"],
        trim: true,
      },
      sysLocation: {
        type: String,
        required: [true, "SysLocation requerido"],
        trim: true,
      },
    },
    {
      timestamps: true,
    }
  );
  
  module.exports = model("Element", ElementSchema);
  module.exports.ElementSchema = ElementSchema;
  
