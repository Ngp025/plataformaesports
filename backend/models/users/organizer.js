const mongoose = require('mongoose');

const OrganizerSchema = new mongoose.Schema(
  {
    user: {
      type: String,
    },
    password: {
      type: String,
    },
    IDTs: {
      type: Array,
      default: [],
    },
    token: {
      type: String,
    },
    game: {
      type: Array,
    },
    customer: {
      type: String,
    },
    template: {
      type: String,
    },
    email: {
      type: String,
    },
    battlesToCheck: {
      type: Object,
      default: {
        fifa20: [],
        pes20: [],
        GT: [],
        lol: [],
        mobileL: [],
        NBA2K: [],
      },
    },
    especialCase: {
      type: Object,
      default: {
        fifa20: [],
        pes20: [],
        GT: [],
        lol: [],
        mobileL: [],
        NBA2K: [],
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Organizer = mongoose.model('Organizer', OrganizerSchema);
