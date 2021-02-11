const mongoose = require('mongoose');

//INVESTIGAR CLASES EXPRESS
const TeamsSchema = new mongoose.Schema({
  //--------------- No Editable ------------
  creatorID: { type: String },
  game: { type: Array },
  reputation: {
    type: Object,
    default: {
      wins: { type: Number, default: 0 },
      lose: { type: Number, default: 0 },
      draw: { type: Number, default: 0 },
      //etc aqui ponemos el manejo de los puntos y sus extras
    },
  },
  //-------------- Editable ---------------
  captainID: { type: String },
  name: { type: String },
  logo: { type: String },
  public_id: { type: String },
  tournametsEnroll: { type: Array },
  // - - - - - - - Oficial
  player1: {
    type: Object,
    default: {
      nickname: { type: String },
      email: { type: String },
      image: { type: String },
      IDU: { type: String },
      capitan: { type: Boolean, default: false },
      verify: { type: Boolean, default: false },
    },
  },
  player2: {
    type: Object,
    default: {
      nickname: { type: String },
      email: { type: String },
      image: { type: String },
      IDU: { type: String },
      capitan: { type: Boolean, default: false },
      verify: { type: Boolean, default: false },
    },
  },
  player3: {
    type: Object,
    default: {
      nickname: { type: String },
      email: { type: String },
      image: { type: String },
      IDU: { type: String },
      capitan: { type: Boolean, default: false },
      verify: { type: Boolean, default: false },
    },
  },
  player4: {
    type: Object,
    default: {
      nickname: { type: String },
      email: { type: String },
      image: { type: String },
      IDU: { type: String },
      capitan: { type: Boolean, default: false },
      verify: { type: Boolean, default: false },
    },
  },
  player5: {
    type: Object,
    default: {
      nickname: { type: String },
      email: { type: String },
      image: { type: String },
      IDU: { type: String },
      capitan: { type: Boolean, default: false },
      verify: { type: Boolean, default: false },
    },
  },
  player6: {
    type: Object,
    default: {
      nickname: { type: String },
      email: { type: String },
      image: { type: String },
      IDU: { type: String },
      capitan: { type: Boolean, default: false },
      verify: { type: Boolean, default: false },
    },
  },
  player7: {
    type: Object,
    default: {
      nickname: { type: String },
      email: { type: String },
      image: { type: String },
      IDU: { type: String },
      capitan: { type: Boolean, default: false },
      verify: { type: Boolean, default: false },
    },
  },
  player8: {
    type: Object,
    default: {
      nickname: { type: String },
      email: { type: String },
      image: { type: String },
      IDU: { type: String },
      capitan: { type: Boolean, default: false },
      verify: { type: Boolean, default: false },
    },
  },
  player9: {
    type: Object,
    default: {
      nickname: { type: String },
      email: { type: String },
      image: { type: String },
      IDU: { type: String },
      capitan: { type: Boolean, default: false },
      verify: { type: Boolean, default: false },
    },
  },
  player10: {
    type: Object,
    default: {
      nickname: { type: String },
      email: { type: String },
      image: { type: String },
      IDU: { type: String },
      capitan: { type: Boolean, default: false },
      verify: { type: Boolean, default: false },
    },
  },
  player11: {
    type: Object,
    default: {
      nickname: { type: String },
      email: { type: String },
      image: { type: String },
      IDU: { type: String },
      capitan: { type: Boolean, default: false },
      verify: { type: Boolean, default: false },
    },
  },
  player12: {
    type: Object,
    default: {
      nickname: { type: String },
      email: { type: String },
      image: { type: String },
      IDU: { type: String },
      capitan: { type: Boolean, default: false },
      verify: { type: Boolean, default: false },
    },
  },
  player13: {
    type: Object,
    default: {
      nickname: { type: String },
      email: { type: String },
      image: { type: String },
      IDU: { type: String },
      capitan: { type: Boolean, default: false },
      verify: { type: Boolean, default: false },
    },
  },
  player14: {
    type: Object,
    default: {
      nickname: { type: String },
      email: { type: String },
      image: { type: String },
      IDU: { type: String },
      capitan: { type: Boolean, default: false },
      verify: { type: Boolean, default: false },
    },
  },
  player15: {
    type: Object,
    default: {
      nickname: { type: String },
      email: { type: String },
      image: { type: String },
      IDU: { type: String },
      capitan: { type: Boolean, default: false },
      verify: { type: Boolean, default: false },
    },
  },
  player16: {
    type: Object,
    default: {
      nickname: { type: String },
      email: { type: String },
      image: { type: String },
      IDU: { type: String },
      capitan: { type: Boolean, default: false },
      verify: { type: Boolean, default: false },
    },
  },
});

module.exports = Teams = mongoose.model('Teams', TeamsSchema);

//realizar protocolo de seguridad para que no se repitan el usuario en varios equipos
