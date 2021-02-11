const mongoose = require('mongoose');

// AQUI SE COLOCA LA URL DE MONGODB ATLAS
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
  function (err, res) {
    if (err) {
      console.log(err, 'Unable to connect to the server. check database.js');
    } else {
      console.log('DB is connected');
    }
  }
);

module.exports = mongoose;
