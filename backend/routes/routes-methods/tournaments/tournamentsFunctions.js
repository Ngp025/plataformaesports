const Tournament = require('../../../models/games/fifa-pes/tournaments.js');
//Subio la imagen  de la partida
function checkImage(tDinamicBracket, IDUP, waitingOrg) {
  //console.log(tDinamicBracket, "<---tDinamicBracket for of Images")
  if (tDinamicBracket[3][0]) {
    for (var p = 0; p < tDinamicBracket[3].length; p++) {
      var bool = tDinamicBracket[3][p].includes(IDUP);
      bool === true ? (waitingOrg = true) : console.log('pasando por el for');
    }
  }
  if (waitingOrg === true) {
    return waitingOrg;
  } else {
    return false;
  }
}

function checkOutPerPlayer1x1(tDinamicBracket, IDUP, checkOut) {
  //console.log(tDinamicBracket, "<---tDinamicBracket in checkOut ")
  if (tDinamicBracket[2][0]) {
    //console.log("dentro de checkout IF")
    for (var verify = 0; verify < tDinamicBracket[2].length; verify++) {
      var bool = tDinamicBracket[2][verify].includes(IDUP);
      bool === true ? (checkOut = true) : console.log('pasando por el for');
    }
  }

  if (checkOut === true) {
    return checkOut;
  } else {
    return false;
  }
}

function preparingAndReady(tDinamicBracket, userComplete, rivalComplete) {
  var userID = userComplete.ID
  var rival = rivalComplete.ID;
  var battle = {
    info: rivalComplete,
    ready: false,
    userNickname: userComplete.nickname,
    draw: tDinamicBracket[5].bool
  };
  if (tDinamicBracket[2][0]) {
    var check0 = false;
    var check1 = false;
    var userIn = false;
    for (
      var checkInfo = 0;
      checkInfo < tDinamicBracket[2].length;
      checkInfo++
    ) {
      if (check0 === false) {
        userIn = tDinamicBracket[2][checkInfo].includes(userID);
        userIn ? (check0 = true) : 'null';
      }
      if (check1 === false) {
        battle.ready = tDinamicBracket[2][checkInfo].includes(rival);
        battle.ready ? (check1 = true) : 'null';
      }
    }

    if (userIn === true && battle.ready === true) {
      return [true, battle];
    } else {
      return [false, battle];
    }
  } else {
    return [false, battle];
  }
}

function changeNextBracket(resul, winnerAct, IDUP) {
  var n = Number;

  switch (resul.ronda) {
    case 0:
      return ['Caso pe2!'];
      break;
    case 1:
      if (resul.cMax === 4) {
        var position = 'tBracket';
        for (var i = 0; i < 2; i++) {
          if (
            resul.tBracket[i][0].ID === IDUP ||
            resul.tBracket[i][1].ID === IDUP
          ) {
            if (i % 2 == 0) {
              n = i / 2;
              resul.pe2[n][0] = winnerAct;
            } else {
              n = i / 2 - 0.5;
              resul.pe2[n][1] = winnerAct;
            }
          }
        }
        const info = {
          nextBrackets: resul.pe2,
          position: 'pe2',
        };
        return info;
      } else {
        var position = 'pe4';
        for (var i = 0; i < 2; i++) {
          if (resul.pe4[i][0].ID === IDUP || resul.pe4[i][1].ID === IDUP) {
            if (i % 2 == 0) {
              n = i / 2;
              resul.pe2[n][0] = winnerAct;
            } else {
              n = i / 2 - 0.5;
              resul.pe2[n][1] = winnerAct;
            }
          }
        }
        return [resul.pe2, 'pe2'];
      }
      break;
    case 2:
      if (resul.cMax === 8) {
        var position = 'tBracket';
        for (var i = 0; i < 4; i++) {
          if (
            resul.tBracket[i][0].ID === IDUP ||
            resul.tBracket[i][1].ID === IDUP
          ) {
            if (i % 2 == 0) {
              n = i / 2;
              resul.pe4[n][0] = winnerAct;
            } else {
              n = i / 2 - 0.5;
              resul.pe4[n][1] = winnerAct;
            }
          }
        }
        return [resul.pe4, 'pe4'];
      } else {
        var position = 'pe8';
        for (var i = 0; i < 4; i++) {
          if (resul.pe8[i][0].ID === IDUP || resul.pe8[i][1].ID === IDUP) {
            if (i % 2 == 0) {
              n = i / 2;
              resul.pe4[n][0] = winnerAct;
            } else {
              n = i / 2 - 0.5;
              resul.pe4[n][1] = winnerAct;
            }
          }
        }
        return [resul.pe4, 'pe4'];
      }
      break;
    case 3:
      if (resul.cMax === 16) {
        var position = 'tBracket';
        for (var i = 0; i < 8; i++) {
          if (
            resul.tBracket[i][0].ID === IDUP ||
            resul.tBracket[i][1].ID === IDUP
          ) {
            if (i % 2 == 0) {
              n = i / 2;
              resul.pe8[n][0] = winnerAct;
            } else {
              n = i / 2 - 0.5;
              resul.pe8[n][1] = winnerAct;
            }
          }
        }
        return [resul.pe8, 'pe8'];
      } else {
        var position = 'pe16';
        for (var i = 0; i < 8; i++) {
          if (resul.pe16[i][0].ID === IDUP || resul.pe16[i][1].ID === IDUP) {
            if (i % 2 == 0) {
              n = i / 2;
              resul.pe8[n][0] = winnerAct;
            } else {
              n = i / 2 - 0.5;
              resul.pe8[n][1] = winnerAct;
            }
          }
        }
        return [resul.pe8, 'pe8'];
      }
      break;
    case 4:
      if (resul.cMax === 32) {
        var position = 'tBracket';
        for (var i = 0; i < 16; i++) {
          if (
            resul.tBracket[i][0].ID === IDUP ||
            resul.tBracket[i][1].ID === IDUP
          ) {
            if (i % 2 == 0) {
              n = i / 2;
              resul.pe16[n][0] = winnerAct;
            } else {
              n = i / 2 - 0.5;
              resul.pe16[n][1] = winnerAct;
            }
          }
        }
        return [resul.pe16, 'pe16'];
      } else {
        var position = 'pe32';
        for (var i = 0; i < 16; i++) {
          if (resul.pe32[i][0].ID === IDUP || resul.pe32[i][1].ID === IDUP) {
            if (i % 2 == 0) {
              n = i / 2;
              resul.pe16[n][0] = winnerAct;
            } else {
              n = i / 2 - 0.5;
              resul.pe16[n][1] = winnerAct;
            }
          }
        }
        return [resul.pe16, 'pe16'];
      }
      break;
    case 5:
      if (resul.cMax === 64) {
        var position = 'tBracket';
        for (var i = 0; i < 32; i++) {
          if (
            resul.tBracket[i][0].ID === IDUP ||
            resul.tBracket[i][1].ID === IDUP
          ) {
            if (i % 2 == 0) {
              n = i / 2;
              resul.pe32[n][0] = winnerAct;
            } else {
              n = i / 2 - 0.5;
              resul.pe32[n][1] = winnerAct;
            }
          }
        }
        return [resul.pe32, 'pe32'];
      } else {
        var position = 'pe64';
        for (var i = 0; i < 32; i++) {
          if (resul.pe64[i][0].ID === IDUP || resul.pe64[i][1].ID === IDUP) {
            console.log(i, ' numero o posicion en el array');
            if (i % 2 == 0) {
              n = i / 2;
              resul.pe32[n][0] = winnerAct;
            } else {
              n = i / 2 - 0.5;
              resul.pe32[n][1] = winnerAct;
            }
          }
        }
        return [resul.pe32, 'pe32'];
      }
      break;
    case 6:
      if (resul.cMax === 128) {
        var position = 'tBracket';
        for (var i = 0; i < 64; i++) {
          if (
            resul.tBracket[i][0].ID === IDUP ||
            resul.tBracket[i][1].ID === IDUP
          ) {
            //console.log(resul.tBracket[i], ' Bracket VS');
            console.log(i, ' numero o posicion en el array');
            if (i % 2 == 0) {
              n = i / 2;
              resul.pe64[n][0] = winnerAct;
            } else {
              n = i / 2 - 0.5;
              resul.pe64[n][1] = winnerAct;
            }
          }
        }
        return [resul.pe64, 'pe64'];
      } else {
        var position = 'pe128';
        for (var i = 0; i < 64; i++) {
          if (resul.pe128[i][0].ID === IDUP || resul.pe128[i][1].ID === IDUP) {
            console.log(i, ' numero o posicion en el array');
            if (i % 2 == 0) {
              n = i / 2;
              resul.pe64[n][0] = winnerAct;
            } else {
              n = i / 2 - 0.5;
              resul.pe64[n][1] = winnerAct;
            }
          }
        }
        return [resul.pe64, 'pe64'];
      }
      break;
    case 7:
      if (resul.cMax === 256) {
        var position = 'tBracket';
        for (var i = 0; i < 128; i++) {
          if (
            resul.tBracket[i][0].ID === IDUP ||
            resul.tBracket[i][1].ID === IDUP
          ) {
            //console.log(resul.tBracket[i], ' Bracket VS');
            console.log(i, ' numero o posicion en el array');
            if (i % 2 == 0) {
              n = i / 2;
              resul.pe128[n][0] = winnerAct;
            } else {
              n = i / 2 - 0.5;
              resul.pe128[n][1] = winnerAct;
            }
          }
        }
        return [resul.pe128, 'pe128'];
      } else {
        var position = 'pe256';
        for (var i = 0; i < 128; i++) {
          if (resul.pe256[i][0].ID === IDUP || resul.pe256[i][1].ID === IDUP) {
            console.log(i, ' numero o posicion en el array');
            if (i % 2 == 0) {
              n = i / 2;
              resul.pe128[n][0] = winnerAct;
            } else {
              n = i / 2 - 0.5;
              resul.pe128[n][1] = winnerAct;
            }
          }
        }
        return [resul.pe128, 'pe128'];
      }
      break;
    case 8:
      if (resul.cMax === 512) {
        var position = 'tBracket';
        for (var i = 0; i < 256; i++) {
          if (
            resul.tBracket[i][0].ID === IDUP ||
            resul.tBracket[i][1].ID === IDUP
          ) {
            //console.log(resul.tBracket[i], ' Bracket VS');
            console.log(i, ' numero o posicion en el array');
            if (i % 2 == 0) {
              n = i / 2;
              resul.pe256[n][0] = winnerAct;
            } else {
              n = i / 2 - 0.5;
              resul.pe256[n][1] = winnerAct;
            }
          }
        }
        return [resul.pe256, 'pe256'];
      } else {
        var position = 'pe512';
        for (var i = 0; i < 256; i++) {
          if (resul.pe512[i][0].ID === IDUP || resul.pe512[i][1].ID === IDUP) {
            console.log(i, ' numero o posicion en el array');
            if (i % 2 == 0) {
              n = i / 2;
              resul.pe256[n][0] = winnerAct;
            } else {
              n = i / 2 - 0.5;
              resul.pe256[n][1] = winnerAct;
            }
          }
        }
        return [resul.pe256, 'pe256'];
      }
      break;
    case 9:
      if (resul.cMax === 1024) {
        var position = 'tBracket';
        for (var i = 0; i < 512; i++) {
          if (
            resul.tBracket[i][0].ID === IDUP ||
            resul.tBracket[i][1].ID === IDUP
          ) {
            //console.log(resul.tBracket[i], ' Bracket VS');
            console.log(i, ' numero o posicion en el array');
            if (i % 2 == 0) {
              n = i / 2;
              resul.pe512[n][0] = winnerAct;
            } else {
              n = i / 2 - 0.5;
              resul.pe512[n][1] = winnerAct;
            }
          }
        }
        return [resul.pe512, 'pe512'];
      } else {
        var position = 'pe1024';
        for (var i = 0; i < 512; i++) {
          if (
            resul.pe1024[i][0].ID === IDUP ||
            resul.pe1024[i][1].ID === IDUP
          ) {
            console.log(i, ' numero o posicion en el array');
            if (i % 2 == 0) {
              n = i / 2;
              resul.pe512[n][0] = winnerAct;
            } else {
              n = i / 2 - 0.5;
              resul.pe512[n][1] = winnerAct;
            }
          }
        }
        return [resul.pe512, 'pe512'];
      }
      break;
    case 10:
      if (resul.cMax === 2048) {
        var position = 'tBracket';
        for (var i = 0; i < 1024; i++) {
          if (
            resul.tBracket[i][0].ID === IDUP ||
            resul.tBracket[i][1].ID === IDUP
          ) {
            //console.log(resul.tBracket[i], ' Bracket VS');
            console.log(i, ' numero o posicion en el array');
            if (i % 2 == 0) {
              n = i / 2;
              resul.pe1024[n][0] = winnerAct;
            } else {
              n = i / 2 - 0.5;
              resul.pe1024[n][1] = winnerAct;
            }
          }
        }
        return [resul.pe1024, 'pe1024'];
      } else {
        var position = 'pe2048';
        for (var i = 0; i < 1024; i++) {
          if (
            resul.pe2048[i][0].ID === IDUP ||
            resul.pe2048[i][1].ID === IDUP
          ) {
            console.log(i, ' numero o posicion en el array');
            if (i % 2 == 0) {
              n = i / 2;
              resul.pe1024[n][0] = winnerAct;
            } else {
              n = i / 2 - 0.5;
              resul.pe1024[n][1] = winnerAct;
            }
          }
        }
        return [resul.pe1024, 'pe1024'];
      }
      break;
  }
}

function botGenerator(toAdd, arr) {
  const bots = require('../../../../src/jsons/bots.json');

  for (var i = 0; i < toAdd; i++) {
    var botsLength = bots.length - 1;
    var botNumber = Math.floor(botsLength * Math.random());
    arr.push(bots[botNumber]);
    bots.splice(botNumber, 1);
  }

  return arr;
}

function removeItemFromArr(arrToClean, item) {
  var i = arrToClean.indexOf(item);

  if (i !== -1) {
    arrToClean.splice(i, 1);
  }
}

function bracketsMath(peopleEntry, winners) {
  console.log('entra');
  // Set the autocomplete Percentage
  const autocompletePercent = 0.8;
  const fullTournamentPercent = 1.6; //1.49; autocompletePercent * 2;
  var outputCoefficient = [peopleEntry];
  var cMax = [2];
  var roundsNumber = 0;
  console.log(outputCoefficient, 'outputCoefficient');
  function entryCheck(entryToCheck) {
    //Math.ceil() redondea hacia arriba y da el valor mayor de excel
    //Math.floor() redondea hacia abajo y da el valor menor de excel
    if (
      Math.ceil(entryToCheck) < fullTournamentPercent &&
      Math.ceil(entryToCheck) > autocompletePercent
    ) {
      return false;
    } else {
      return true;
    }
  }

  //console.log(outputCoefficient[0], "outputCoefficient[0]")
  for (var i = 0; entryCheck(outputCoefficient[0]); i++) {
    //console.log(entryCheck(outputCoefficient[0]), "entryCheck(outputCoefficient[0]) dentro")
    var newEntry = outputCoefficient[0] / 2;
    outputCoefficient.pop();
    outputCoefficient.push(newEntry);
    var actualCMax = i === 0 ? cMax[0] : cMax[0] * 2;
    cMax.pop();
    cMax.push(actualCMax);
    roundsNumber = i;
  }

  var peopleDifference = peopleEntry - cMax;
  const peopleDifResult =
    Math.sign(peopleDifference) === -1
      ? `Se agregaron ${peopleDifference} bots para completar los brackets`
      : `Se debera cancelar la inscripcion de ${
          peopleDifference * -1
        } personas`;
  console.log(roundsNumber, 'roundNumber');

  var bracketsMath = {
    peopleEntry: peopleEntry,
    outputCoefficient: outputCoefficient[0],
    roundsNumber: roundsNumber,
    stopIn: winners === 2
      ? roundsNumber
      : winners === 4
      ? roundsNumber - 1
      : roundsNumber - 2,
    cMax: cMax[0],
    peopleDifference: peopleDifference,
    peopleDifResult: peopleDifResult,
  };
  console.log(bracketsMath, 'bracketsMath');
  return bracketsMath;
}

function actualBracket(obj) {
  switch (obj.ronda) {
    case 0:
      if (obj.cMax === 2) {
        const info = {
          bracket: obj.tBracket,
          position: 'tBracket',
        };
        return info;
      } else {
        const info = {
          bracket: obj.pe2,
          position: 'pe2',
        };
        return info;
      }
      break;
    case 1:
      if (obj.cMax === 4) {
        const info = {
          bracket: obj.tBracket,
          position: 'tBracket',
        };
        return info;
      } else {
        const info = {
          bracket: obj.pe4,
          position: 'pe4',
        };
        return info;
      }
      break;
    case 2:
      if (obj.cMax === 8) {
        const info = {
          bracket: obj.tBracket,
          position: 'tBracket',
        };
        return info;
      } else {
        const info = {
          bracket: obj.pe8,
          position: 'pe8',
        };
        return info;
      }
      break;
    case 3:
      if (obj.cMax === 16) {
        const info = {
          bracket: obj.tBracket,
          position: 'tBracket',
        };
        return info;
      } else {
        const info = {
          bracket: obj.pe16,
          position: 'pe16',
        };
        return info;
      }
      break;
    case 4:
      if (obj.cMax === 32) {
        const info = {
          bracket: obj.tBracket,
          position: 'tBracket',
        };
        return info;
      } else {
        const info = {
          bracket: obj.pe32,
          position: 'pe32',
        };
        return info;
      }
      break;
    case 5:
      if (obj.cMax === 64) {
        const info = {
          bracket: obj.tBracket,
          position: 'tBracket',
        };
        return info;
      } else {
        const info = {
          bracket: obj.pe64,
          position: 'pe64',
        };
        return info;
      }
      break;
    case 6:
      if (obj.cMax === 128) {
        const info = {
          bracket: obj.tBracket,
          position: 'tBracket',
        };
        return info;
      } else {
        const info = {
          bracket: obj.pe128,
          position: 'pe128',
        };
        return info;
      }
      break;
    case 7:
      if (obj.cMax === 256) {
        const info = {
          bracket: obj.tBracket,
          position: 'tBracket',
        };
        return info;
      } else {
        const info = {
          bracket: obj.pe256,
          position: 'pe256',
        };
        return info;
      }
      break;
    case 8:
      if (obj.cMax === 512) {
        const info = {
          bracket: obj.tBracket,
          position: 'tBracket',
        };
        return info;
      } else {
        const info = {
          bracket: obj.pe512,
          position: 'pe512',
        };
        return info;
      }
      break;
    case 9:
      if (obj.cMax === 1024) {
        const info = {
          bracket: obj.tBracket,
          position: 'tBracket',
        };
        return info;
      } else {
        const info = {
          bracket: obj.pe1024,
          position: 'pe1024',
        };
        return info;
      }
      break;
    case 10:
      if (obj.cMax === 2048) {
        const info = {
          bracket: obj.tBracket,
          position: 'tBracket',
        };
        return info;
      }
      break;
  }
}

function randomToken(HowManyLengths) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < HowManyLengths; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function whenStartTournament(tournamentInfo) {
  var infoToSaveInRepository = [`${infoTournament.tDate}`];
  const arrayForMoveInfo = [
    tournamentInfo.tBracket,
    tournamentInfo.pe2,
    tournamentInfo.pe4,
    tournamentInfo.pe8,
    tournamentInfo.pe16,
    tournamentInfo.pe32,
    tournamentInfo.pe64,
    tournamentInfo.pe128,
    tournamentInfo.pe256,
    tournamentInfo.pe512,
    tournamentInfo.pe1024,
  ];
  infoToSaveInRepository.push(tournamentInfo.winners);
  const checking = bracketsMath(tournamentInfo.cMax);

  for (
    var numbersOfValuesPushed = 0;
    numbersOfValuesPushed < checking.roundsNumber;
    numbersOfValuesPushed++
  ) {
    infoToSaveInRepository.push(arrayForMoveInfo[numbersOfValuesPushed]);
  }

  return infoToSaveInRepository;
}

function howManyWinnersNeedThisInstance(instace, data, date, gMaxToChange) {
  if (instace === 'initial') {
    for (var x = 0; x < data.initial.length; x++) {
      if (data.initial[x].day === date) {
        gMaxToChange = data.initial[x].winnersNeed;
      }
    }
  } else {
    if (instace === 'mid') {
      for (var x = 0; x < data.mid.length; x++) {
        if (data.mid[x].day === date) {
          gMaxToChange = data.mid[x].winnersNeed;
        }
      }
    } else {
      if (instace === 'final') {
        for (var x = 0; x < data.final.length; x++) {
          if (data.final[x].day === date) {
            gMaxToChange = data.final[x].winnersNeed;
          }
        }
      } else {
        gMaxToChange = { alert: 'Por favor no juege con los datos del front.' };
      }
    }
  }
  return gMaxToChange;
}

function organizeBattlesInBrackets(playersList, bracketShuffle, versusOrder, lifes) {
  var dinamicArray = []; 
  var botEmergency = 
  {
    "ID": "Bot116",
    "name": "Guenas724",
    "nickname": "Guenas726",
    "pic": "https://res.cloudinary.com/versus/image/upload/v1585336078/avatars/s9dhdle2fkgciavfjkya.png"
  }
  for (var i = 0; i < playersList.length; i++) {
    //console.log(bracketShuffle[i], `Bracket aleatorio`);
    if (playersList[bracketShuffle[i]] !== playersList[bracketShuffle[i + 1]]) {
      if (i % 2) {
      } else {   
        playersList[bracketShuffle[i]].ID 
        ? "" : console.log(i) 
        playersList[bracketShuffle[i + 1]] ? "" : playersList[bracketShuffle[i + 1]] = botEmergency
        var json = {
          lifes: {},
          shotPic: dinamicArray
        }
        var draw = {
          bool: false
        }
        json.lifes[`${playersList[bracketShuffle[i]].ID}`] = lifes
        json.lifes[`${playersList[bracketShuffle[i + 1]].ID}`] = lifes
        var playerIndex = [
          playersList[bracketShuffle[i]], //<- jugador
          playersList[bracketShuffle[i + 1]] , //<- jugador
          dinamicArray, //<- verificado
          dinamicArray, //<- imagen
          json, //<- lifes + imagen
          draw
        ];
        versusOrder.push(playerIndex);
      }
    }
  }
}

function checkLastPlayersCleanAndPrepare(
  listOfActualPlayers,
  tMainOfRepository
) {
  var forProcess = [];
  for (var i = 0; i < listOfActualPlayers.length; i++) {
    var igual = false;
    for (
      var insideTMain = 0;
      insideTMain < tMainOfRepository.length;
      insideTMain++
    ) {
      for (
        var checkInfoInside = 0;
        (checkInfoInside < tMainOfRepository[insideTMain].length) & !igual;
        checkInfoInside++
      ) {
        if (
          listOfActualPlayers[i].ID ===
          tMainOfRepository[insideTMain][checkInfoInside].ID
        )
          igual = true;
      }
    }
    if (!igual) forProcess.push(listOfActualPlayers[i]);
  }
  //console.log(forProcess, 'forProcess');
  return forProcess;
}

async function checkWhereWeAre(IDT , forRound){
  var tInfoSearched = await Tournament.findOne(
    { _id: IDT },
    {
      ronda: true,
      tBracket: true,
      pe1024: true,
      pe512: true,
      pe256: true,
      pe128: true,
      pe64: true,
      pe32: true,
      pe16: true,
      pe8: true,
      pe4: true,
      pe2: true,
      tiebreak: true,
      winners: true,
      cMax: true,
      initial: true,
      mid: true,
      final: true,
    }
  );

  if (forRound === 'normal') {
    var actualInfo = actualBracket(tInfoSearched);
    return [actualInfo.bracket, actualInfo.position];
  } else if (forRound === 'tiebreak') {
    return [tInfoSearched.tiebreak, 'tiebreak'];
  }
 
}

async function remplaceBattleInModel(bracketToSafe, bracketAct, IDT){
  if (bracketToSafe === 'tBracket') {
    await Tournament.findOneAndUpdate(
      { _id: IDT },
      { tBracket: bracketAct }
    );
  }
  if (bracketToSafe === 'pe1024') {
    await Tournament.findOneAndUpdate(
      { _id: IDT },
      { pe1024: bracketAct }
    );
  }
  if (bracketToSafe === 'pe512') {
    await Tournament.findOneAndUpdate(
      { _id: IDT },
      { pe512: bracketAct }
    );
  }
  if (bracketToSafe === 'pe256') {
    await Tournament.findOneAndUpdate(
      { _id: IDT },
      { pe256: bracketAct }
    );
  }
  if (bracketToSafe === 'pe128') {
    await Tournament.findOneAndUpdate(
      { _id: IDT },
      { pe128: bracketAct }
    );
  }
  if (bracketToSafe === 'pe64') {
    await Tournament.findOneAndUpdate({ _id: IDT }, { pe64: bracketAct });
  }
  if (bracketToSafe === 'pe32') {
    await Tournament.findOneAndUpdate({ _id: IDT }, { pe32: bracketAct });
  }
  if (bracketToSafe === 'pe16') {
    await Tournament.findOneAndUpdate({ _id: IDT }, { pe16: bracketAct });
  }
  if (bracketToSafe === 'pe8') {
    await Tournament.findOneAndUpdate({ _id: IDT }, { pe8: bracketAct });
  }
  if (bracketToSafe === 'pe4') {
    await Tournament.findOneAndUpdate({ _id: IDT }, { pe4: bracketAct });
  }
  if (bracketToSafe === 'pe2') {
    await Tournament.findOneAndUpdate({ _id: IDT }, { pe2: bracketAct });
  }
  if (bracketToSafe === 'tiebreak') {
    await Tournament.findOneAndUpdate(
      { _id: IDT },
      { tiebreak: bracketAct }
    );
  }
}

module.exports = {
  checkImage,
  actualBracket,
  changeNextBracket,
  botGenerator,
  bracketsMath,
  randomToken,
  whenStartTournament,
  howManyWinnersNeedThisInstance,
  organizeBattlesInBrackets,
  checkOutPerPlayer1x1,
  preparingAndReady,
  checkLastPlayersCleanAndPrepare,
  removeItemFromArr,  
  checkWhereWeAre,
  remplaceBattleInModel
};
