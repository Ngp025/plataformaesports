const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//INVESTIGAR CLASES EXPRESS
const CustomerSchema = Schema(
  {
    //-------------- Manual ---------------
    //Email del jugador
    organizers: { type: Array }, //IDS y Nombres

    //Nombre del Jugador
    customer: { type: String }, //el cliente

    //--------------- Editable ------------
    //Game withpic
    gamesInfo: { type: Object },
    //Personalize
    personalize: { type: Object }, // edicion
  },
  {
    timestamps: true,
  }
);

module.exports = Customer = mongoose.model('Customer', CustomerSchema);
