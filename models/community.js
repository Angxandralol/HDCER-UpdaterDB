const { Schema, model } = require("mongoose");
const { ElementSchema } = require("./element");

const CommunitySchema = new Schema(
    {
      date: {
        type: String,
        required: [true, "La fecha es requerida"],
        trim: true
      },
      ip: {
        type: String,
        required: [true, "La ip es requerida"],
        trim: true,
      },
      communityName: {
        type: String,
        required: [true, "El nombre de la comunidad es requerido"],
        trim: true,
      },
      sysname: {
        type: String,
        required: [true, "Sysname requerido"],
        trim: true,
      },
      listInterfaces: {
        type: [ElementSchema],
        default: undefined,
      }
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );
  
module.exports = model("Community", CommunitySchema);
module.exports.CommunitySchema = CommunitySchema;