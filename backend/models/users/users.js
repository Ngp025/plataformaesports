const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    // ---------------- Login
    nickname: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      //required: true,
      unique: true,
      match: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    },
    email_verified: {
      type: Boolean,
      default: false,
    },
    picture: {
      type: String,
    },
    provider: {
      type: String,
      default: 'null',
    },
    language: {
      type: String,
      default: 'es',
    },
    teams: { type: Array, default: [] },

    // ---------------- Info del settings
    name: {
      type: String,
    },
    lastname: {
      type: String,
    },
    gender: {
      type: String,
    },
    born: {
      type: String,
    },
    phone: {
      type: String,
      default: '',
    },
    address: {
      type: String,
    },
    document: {
      type: String,
      default: 0,
    },
    nicknamesHistory: {
      type: Array,
    },    
    club: {
      type: String,
      default: '',
    },
    passportID: {
      type: String,
      default: 'null',
    },
    password: {
      type: String,
    },
    token: {
      type: String,
      default: '33vs33',
    },
    temporaryPassword: {
      type: String,
    },
    tempToken: {
      type: String,
    },
    //----------------- Info de Api
    apiLol: {
      id: {
        type: String,
      },
      accountId: {
        type: String,
      },
      puuid: {
        type: String,
      },
      name: {
        type: String,
      },
      profileIconId: {
        type: String,
      },
      revisionDate: {
        type: String,
      },
      summonerLevel: {
        type: String,
      },
    },
    // ---------------- Para Menos de 16

    tutorsName: {
      type: String,
      default: ' - ',
    },

    tutorsDocument: {
      type: String,
      default: ' - ',
    },

    // ---------------- Vista de favoritos
    fViews: {
      type: Array,
      default: [],
    },

    // ---------------- Terminos y Condiciones
    termAgreed: {
      type: Boolean,
      default: false,
    },
    customerReg: {
      type: String,
      default: 'Plataforma Esport',
    },
    /*
     *iPinfo: {
     *	type: Object,
     *	default: {},
     *},
     */
  },
  {
    //Creado y usado el dia
    timestamps: true,
  }
);

module.exports = User = mongoose.model('users', UserSchema);
