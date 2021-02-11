const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema(
  {
    IDO: { type: String },
    tournamentName: { type: String, required: true },
    customer: { type: String }, // proyecto por cliente (AMBA, CIUDAD, etc...)
    customerTitle: { type: String, default: 'CIUDAD ROSARIO' },
    cMax: { type: Number, default: 1024 }, //maxima cantidad de jugadores
    gMax: { type: Number }, // cantidad de ganadores
    server: { type: String }, // servidor
    tDate: { type: Date, required: true },
    tStart: { type: String, required: true },
    tAward: { type: String, requiered: true },
    tMain: {
      type: Array,
      default: [],
    }, /* user: { ID: ``, name: ``, nickname: `` , pic: `` }*/
    fase: { type: String,  default: "diaria" },
    faseBo: { type: String, default: "" },
    waSupport: { type: String },
    tPlataform: { type: String },
    tType: { type: String },
    game: { type: String },
    weeksDuration: { type: Number },
    imageMini: { type: String },
    imageOrga: { type: String },
    public_id: { type: String },
    vipMessage: { type: String, required: false, default: '0' },
    iTournament: { type: Number, default: 0 },
    checked: { type: Array, default: [] }, // Valor a revisar cuando hay 2 imagenes
    chatMessage: { type: Array, default: [] },
    /*chatMessage: {usser: ``, text: ``, time: ``, photo: ``}*/
    regulation: { type: String,
      default: 'El reglamento sera publicado en breve.' },
    // - - - - - - - - - - - VS
    ronda: { type: Number, default: 5 }, // en que ronda ban
    tBracket: { type: Array, default: [] },
    pe1024: { type: Array, default: [] },
    pe512: { type: Array, default: [] },
    pe256: { type: Array, default: [] },
    pe128: { type: Array, default: [] },
    pe64: { type: Array, default: [] },
    pe32: { type: Array, default: [] },
    pe16: { type: Array, default: [] },
    pe8: { type: Array, default: [] },
    pe4: { type: Array, default: [] },
    pe2: { type: Array, default: [] },
    tiebreak: { type: Array, default: [] },
    //---haciendo----
    timer: { type: Object,
      default: {
        timerPerGame: 59,
        timerPerVerify: 20,
        timerForCheckImages: 20,
        lastChangeVerify: '',
        lastChangeImage: '',
        lastChangeGame: '',
        lastChangeDate: '',
        autoPass: false,
      },
    },
    //---
    winners: { type: Object,
      default: {
        first: '',
        second: '',
        three: '',
        fourth: '',
        fifth: '',
      },
    },
    initial: { type: Array, default: [] }, // [ {day, lastTournament, winnersNeed, tStart, winnersIDs} , [01-05:  FORM2] ]
    mid: { type: Array, default: [] }, // [ ] debe ser 2, 4, 8, 16  o pasa a final
    final: { type: Array, default: [] },
    initialsRelatedsDays: { type: Array, default: [] },
    midsRelatedsDays: { type: Array, default: [] },
    //---------- Close
    validTournament: { type: Boolean, default: false },
    isFinished: { type: Boolean, default: false },
    reputation: { type: Number },
    lastTournament: { type: Boolean, default: false },
    //----------extra
    wallpaper: { type: String },
  },
  {
    timestamps: true,
  }
);

//-------------- Para cuando sea pago alguno
//A secondOption se le saca el dinero pero se le devuelve si no logran participar

module.exports = mongoose.model('Tournament', TaskSchema);
