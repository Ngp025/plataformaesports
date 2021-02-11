const SocketIO = require('socket.io');
const Tournament = require('../models/games/fifa-pes/tournaments');
// LOCAL VARS
var oldTournamentArray = [];
var intervalBreak = [false];
// LOCAL FUNCTIONS
async function loadTournamentList() {
  const tournaments = await Tournament.find({}, { iTournament: 1, _id: 1 });
  oldTournamentArray = tournaments;
}
// MAIN FUNCTION
async function socketIoInit(server) {
  const io = SocketIO(server);
  loadTournamentList();
  //await console.log(loadTournamentList(), '<-------------- Load tournament') //
  async function parseTournaments() {
    const tournaments = await Tournament.find({}, { iTournament: 1, _id: 1 });
    const load = false;
    function updatingData(i) {
      console.log('updatingData');
      tournaments[i]
        ? io.emit(tournaments[i].id, [
            'iTournament',
            tournaments[i].iTournament,
            tournaments[i]._id,
          ])
        : (load = true);
    }
    function updatingOldTournamentarray() {
      oldTournamentArray = tournaments;
      load = false;
      break;
    }
    if (oldTournamentArray !== tournaments) {
      for (var i = 0; oldTournamentArray.length > i; i++) {
        if (tournaments[i]) {
          tournaments[i].id === oldTournamentArray[i].id
            ? console.log('-- UPDATE NO NEED --')
            : updatingData(i);
          load ? updatingOldTournamentarray() : 'null';
        }
      }
    }
  }
  // OPEN CONNECTION LISTENER
  io.on('connection', (socket) => {
    var activeTournamentsId = [];
    console.log(socket.id, ' soket id');
    for (var z = 0; oldTournamentArray.length > z; z++) {
      activeTournamentsId.push(oldTournamentArray[z]._id);
    }
    for (var y = 0; activeTournamentsId.length > y; y++) {
      socket.on(activeTournamentsId[y], (data) => {
        console.log(data);
        io.emit(data[2], data);
      });
    }
  });

  console.log('IO listener open <----');
  if (intervalBreak[0] === false) {
    intervalBreak.pop();
    intervalBreak.push(true);
    //console.log(intervalBreak)
    setInterval(() => parseTournaments(), 5000);
  }
}

module.exports = socketIoInit;
