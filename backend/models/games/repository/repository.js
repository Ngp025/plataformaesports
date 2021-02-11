const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RepositorySchema = new Schema(
  {
    IDT: { type: String, required: true },
    rounds: {
      //array con arrays
      type: Array,
      default: [],
    },
    tMain: {
      //array con arrays
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);
//-------------- Para cuando sea pago alguno
//A secondOption se le saca el dinero pero se le devuelve si no logran participar

module.exports = mongoose.model('Repository', RepositorySchema);
