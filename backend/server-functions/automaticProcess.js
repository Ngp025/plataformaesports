const moment = require('moment-timezone');
const { emailPass } = require('../../config/default.js');
const Tournament = require('../models/games/fifa-pes/tournaments');
const Repository = require('../models/games/repository/repository.js');
const Organizer = require('../models/users/organizer.js');
const User = require('../models/users/users.js');
const {
  bracketsMath,
  howManyWinnersNeedThisInstance,
  organizeBattlesInBrackets,
  botGenerator,
  actualBracket,
  checkLastPlayersCleanAndPrepare,
} = require('../routes/routes-methods/tournaments/tournamentsFunctions');

function whichListNeedIt(data, today, typeOfInstance) {
  var arrOfDaysToCheck = [];
  var IDwinnersArray = []; //array con arrays
  var listReturn = [];
  if (typeOfInstance === 'mid') {
    //Confirmando Dias relacionados a hoy
    for (
      var initialsConnected = 0;
      initialsConnected < data.initialsRelatedsDays;
      initialsConnected++
    ) {
      var arrPerDayToChecked = data.initialsRelatedsDays[
        initialsConnected
      ].split('_');
      if (today === arrPerDayToChecked[1]) {
        arrOfDaysToCheck.push(arrPerDayToChecked[0]);
      }
    }
    //Enviando Valores de ganadoners de hoy
    for (var checking = 0; checking < arrOfDaysToCheck.length; checking++) {
      for (var checkInitial = 0; checkInitial < data.initial; checkInitial++) {
        if (arrOfDaysToCheck[checking] === data.initial[checkInitial].day) {
          IDwinnersArray.push(data.initial[checkInitial].winnersIDs);
        }
      }
    }
  }
  if (typeOfInstance === 'final') {
    //Confirmando Dias relacionados a hoy
    for (
      var midConnected = 0;
      midConnected < data.midsRelatedsDays;
      midConnected++
    ) {
      var arrPerDayToChecked = data.midsRelatedsDays[midConnected].split('_');
      if (today === arrPerDayToChecked[1]) {
        arrOfDaysToCheck.push(arrPerDayToChecked[0]);
      }
    }
    //Enviando Valores de ganadoners de hoy
    for (var checking = 0; checking < arrOfDaysToCheck.length; checking++) {
      for (var checkMid = 0; checkMid < data.mid; checkMid++) {
        if (arrOfDaysToCheck[checking] === data.mid[checkMid].day) {
          IDwinnersArray.push(data.mid[checkMid].winnersIDs);
        }
      }
    }
  }
  if (IDwinnersArray.length > 0) {
    //Terminando armado de lista
    for (
      var beforePusher = 0;
      beforePusher < IDwinnersArray.length;
      beforePusher++
    ) {
      for (
        var pusher = 0;
        pusher < IDwinnersArray[beforePusher].length;
        pusher++
      ) {
        listReturn.push(IDwinnersArray[beforePusher][pusher]);
      }
    }
    //Enviando valor
    return listReturn;
  }
}

async function startTournament(
  dataInAuto,
  actualValuesT,
  objTime,
  actOrganizer
) {
  //actOrganizer aunque no esta siendo usado se le podra informar al organizador de que comenzo el torneo
  var newbool = 3; //<---- colocar valor dinamico si se desea que puedan volver a inscribirse en el proceso
  var listEditable = dataInAuto.tMain;
  var gMaxActualValue = 0;
  var whichInstance = actualValuesT[0];
  var date = actualValuesT[1];
  var dayMonthForCheck = objTime.dayMonthForCheck;
  var actualMoment = objTime.actualMoment;
  if (false) {
    //<---- Valor por si se desea que las personas puedan participar mas de una vez en el torneo
    var tMainOfRepository = await Repository.findOne(
      { IDT: dataInAuto._id },
      { tMain: true }
    );
    if (whichInstance === 'initial') {
      if (tMainOfRepository.tMain.length > 0) {
        listEditable = checkLastPlayersCleanAndPrepare(
          dataInAuto.tMain,
          tMainOfRepository.tMain
        );
      }
    }
    if (whichInstance === 'mid' || whichInstance === 'final') {
      listEditable = whichListNeedIt(
        dataInAuto,
        dayMonthForCheck,
        whichInstance
      );
    }
  }

  gMaxActualValue = howManyWinnersNeedThisInstance(
    whichInstance,
    dataInAuto,
    date,
    gMaxActualValue
  );
  if (listEditable.length > 0) {
    console.log('entra');
    if (gMaxActualValue.alert) {
      //ERROR!
      console.log('error');
      //error con informacion procesada
    } else {
      console.log('else');
      var changeObj = bracketsMath(listEditable.length, gMaxActualValue); //FALTA TRABAJAR LOS GMAX
      var arrToChange = listEditable;

      async function saveBrack(bracketWithPositionToUse, tMain, oldtMain) {
        var versusOrder = [];
        console.log(bracketWithPositionToUse, 'bracketWithPositionToUse');
        organizeBattlesInBrackets(tMain, bracketWithPositionToUse, versusOrder);
        var timer = {
          timerPerGame: dataInAuto.timer.timerPerGame,
          timerPerVerify: dataInAuto.timer.timerPerVerify,
          timerForCheckImages: dataInAuto.timer.timerForCheckImages,
          lastChangeVerify: '',
          lastChangeImage: '',
          lastChangeDate: '',
          autoPass: dataInAuto.timer.autoPass,
        };
        timer = await configureTimer(dataInAuto.timer, actualMoment, timer);

        console.log(timer, 'TIMER QUE SE GUARDA');
        await Tournament.findByIdAndUpdate(
          dataInAuto._id,
          {
            //tMain: [],
            ronda: changeObj.roundsNumber,
            tBracket: versusOrder,
            iTournament: newbool,
            cMax: changeObj.cMax,
            timer: timer,
            //lastTournament: lastTournament,
          },
          { returnNewDocument: true, new: true },
          (err, doc) => {
            //console.log("socket aqui")
            //socketIoProcess("iTournament", doc.iTournament)
          }
        );
        console.log('LISTO!');
        /* await Repository.findByIdAndUpdate(
          { IDT: data._id },
          {
            $addToSet: { tMain: oldtMain },
          }
          );
        */
      }

      if (changeObj.peopleDifference > 0) {
        //RETIRANDO JUGADOR

        for (var y = 0; y < changeObj.peopleDifference; y++) {
          const userOut = await User.findOne(
            { _id: listEditable[listEditable.length - y - 1].ID },
            { email: 1, _id: 0, name: 1 }
          );

          var contentHTML = `	<h1> Buen dia  ${userOut.name}, </h1>
          <ul>
            <div>
            <p> Nos ha tocado informarle que el torneo ${dataInAuto.tournamentName} ha comenzado! </p>
            <p> Pero desafortunadamente se le tuvo que retirar del mismo por temas logisticos </p>
            <p> De igual forma visitenos nuevamente, he ingresar a futuras competencias</p>
            <p> su futuro en los esports lo esta esperando </p>
            <p> y nosotros pensamos brindarle toda la ayuda que necesite.</p>
            <div />
          <ul>`;
          arrToChange.pop();
        }

        var contentHTML2 = `<h1> Informe post retiro de competidores </h1>
          <ul>	
            <div>
            <p> Nos ha tocado informarle ha varias personas de los cambios protocolares.</p>
            <p> Recuerde ver la bandeja de envios para confirmar las personas y asi estar al tanto, </p>
            <p> y buscar la manera mas apropiada de solucionar cualquier inconveniente, </p>
            <p> Como plataforma nos encanta recordarle que usted tiene la potestad de ayudar al competidor </p>
            <p> y si ve que son muchos los afectados puede solucionarlo con un nuevo torneo! :D  </p>
            <p> Asi ellos tendran una segunda oportunidad y usted mejor desempe;o como organizador, </p>
            <p> Muchisimas gracias por leer y recuerde que los Esports son mas que un deporte </p>
            <p> y usted mas que un simple organizador! </p>
            <div />
          <ul>`;
      } else {
        if (changeObj.peopleDifference !== 0) {
          //Botgenerator
          var difference = changeObj.peopleDifference * -1;
          const arrWithBots = await botGenerator(difference, arrToChange);
          arrToChange = arrWithBots;
        }
      }

      for (var a = [], i = 0; i < arrToChange.length; i++) a[i] = i;
      async function shuffle(array) {
        var tmp,
          current,
          top = array.length;
        if (top)
          while (--top) {
            current = Math.floor(Math.random() * (top + 1));
            tmp = array[current];
            array[current] = array[top];
            array[top] = tmp;
          }
        return array;
      }
      const respuesta = await shuffle(a);

      await saveBrack(respuesta, arrToChange, listEditable);
    }
  }
}

function cleanArrayOfNulls(array0) {
  //elimnador de
  if (array0) {
    var cleanArray = array0.filter(function () {
      return true;
    });
  }
  return cleanArray;
}

async function checkWhoPass(actualBracketInfo, preparedInfo) {
  var informationReturn = {
    usersWhoPassToNextRound: [],
    whichBattlesExistAndPass: [], //<---- Un array ya que solo se colocaran los que cumplan con la condicion de la foto si no ambos seran descalificados
    usersWhoPassToTiebreak: [],
    reportSpecialCase: [],
  };
  var IDT = preparedInfo.IDT;
  //-------Local Functions----------
  async function sendPerOrganizer(orgCheckThis, preparedInfo) {
    var IDO = preparedInfo.IDO;
    var game = preparedInfo.game;
    var battlesToCheck = {};
    var battlesToCheck = preparedInfo.actOrganizer.battlesToCheck;

    switch (game) {
      case 'fifa20':
        await Organizer.findOneAndUpdate(
          { _id: preparedInfo.IDO },
          {
            $addToSet: { 'battlesToCheck.$.fifa20': orgCheckThis },
          }
        );
        break;
      case 'pes20':
        await Organizer.findOneAndUpdate(
          { _id: preparedInfo.IDO },
          {
            $addToSet: { 'battlesToCheck.$.pes20': orgCheckThis },
          }
        );
        break;
      case 'lol':
        await Organizer.findOneAndUpdate(
          { _id: preparedInfo.IDO },
          {
            $addToSet: { 'battlesToCheck.$.lol': orgCheckThis },
          }
        );
        break;
      case 'mobileL':
        await Organizer.findOneAndUpdate(
          { _id: preparedInfo.IDO },
          {
            $addToSet: { 'battlesToCheck.$.mobileL': orgCheckThis },
          }
        );
        break;
      case 'GT':
        await Organizer.findOneAndUpdate(
          { _id: preparedInfo.IDO },
          {
            $addToSet: { 'battlesToCheck.$.GT': orgCheckThis },
          }
        );
        break;
      case 'NBA2K':
        await Organizer.findOneAndUpdate(
          { _id: preparedInfo.IDO },
          {
            $addToSet: { 'battlesToCheck.$.NBA2K': orgCheckThis },
          }
        );
        break;
    }
  }

  function checkBothWhoWin(check, player0, player1, numbersOfBattles) {
    if (check[0].includes(player0.ID)) {
      informationReturn.usersWhoPassToNextRound.push(player0);
      informationReturn.usersWhoPassToTiebreak.push(player1);
    } else if (check[0].includes(player1.ID)) {
      informationReturn.usersWhoPassToNextRound.push(player1);
      informationReturn.usersWhoPassToTiebreak.push(player0);
    }
    informationReturn.whichBattlesExistAndPass.push(numbersOfBattles);
  }

  function specialCase(userWRandom, userLRandom, numbersOfBattles) {
    informationReturn.reportSpecialCase.push(userWRandom);
    informationReturn.usersWhoPassToNextRound.push(userWRandom);
    informationReturn.usersWhoPassToTiebreak.push(userLRandom);
    informationReturn.whichBattlesExistAndPass.push(numbersOfBattles);
  }

  for (
    var numbersOfBattles = 0;
    numbersOfBattles < actualBracketInfo.length;
    numbersOfBattles++
  ) {
    var user0Info = actualBracketInfo[numbersOfBattles][0];
    var user1Info = actualBracketInfo[numbersOfBattles][1];

    if (actualBracketInfo[numbersOfBattles][3].length === 1) {
      //-------Verificando que posicion Gano y cual Perdio
      checkBothWhoWin(
        actualBracketInfo[numbersOfBattles][3],
        user0Info,
        user1Info,
        numbersOfBattles
      );
    } else {
      //Error de 2 Imagenes
      if (actualBracketInfo[numbersOfBattles][3].length > 1) {
        //CONFIRMAR POSICION DE IMAGEN PARA CULMINAR, QUEDARIA ALGO COMO
        var orgCheckThis = [];
        var importantInfoToSend = [
          actualBracketInfo[numbersOfBattles][3][0][2], //imagen de primer usuario
          actualBracketInfo[numbersOfBattles][3][1][2], //imagen de segundo usuario
          IDT,
          actualBracketInfo[numbersOfBattles][3][0][0], //ID de primera usuario
          actualBracketInfo[numbersOfBattles][3][1][0], //ID de segundo usuario
        ];
        orgCheckThis.push(importantInfoToSend);
        sendPerOrganizer(orgCheckThis, preparedInfo);
      }
      //Sin Subida de imagen
      if (actualBracketInfo[numbersOfBattles][3].length < 1) {
        // Con Verificacion pero sin competencia
        if (actualBracketInfo[numbersOfBattles][2].length === 1) {
          checkBothWhoWin(
            actualBracketInfo[numbersOfBattles][2],
            user0Info,
            user1Info,
            numbersOfBattles
          );
        }
        // ambos verificados pero sin subir imagen descalificados
        if (actualBracketInfo[numbersOfBattles][2].length > 1) {
          specialCase(user0Info, user1Info, numbersOfBattles);
          //use preparedinfo for report to organizer
        }
        if (actualBracketInfo[numbersOfBattles][2].length < 1) {
          specialCase(user0Info, user1Info, numbersOfBattles);
          //use preparedinfo for report to organizer
        }
      }
    }
  }
  //console.log(informationReturn, "informationReturn")
  return informationReturn;
}

// New Global function -----------------
async function configureTimer(timer, actualMoment, edit) {
  //----- local Function
  async function configureTimerPerBattle(verify, game, checkOrg, actualMoment) {
    //NOTA: no se coloca una diferencia de 3 horas ya que el calculo de diferencia corre segun la hora argentina
    var totalTime = verify + game + checkOrg;
    var toChange = actualMoment.clone();
    //var UTCarg = 3
    var newSt = await toChange
      .add(totalTime, 'm') /*.subtract(UTCarg, "h")*/
      .toDate();
    //var returTthis = newSt.split(' ')
    return newSt; //`${returTthis[0]}T${returTthis[1]}:00`;
  }

  edit['lastChangeVerify'] = await configureTimerPerBattle(
    timer.timerPerVerify,
    0,
    0,
    actualMoment
  );
  edit['lastChangeImage'] = await configureTimerPerBattle(
    timer.timerPerVerify,
    timer.timerPerGame,
    0,
    actualMoment
  );
  edit['lastChangeDate'] = await configureTimerPerBattle(
    timer.timerPerVerify,
    timer.timerPerGame,
    timer.timerForCheckImages,
    actualMoment
  );
  console.log(edit);
  return edit;
}

async function reportSpecialCaseToOrg(
  arrOfSpecialCase,
  preparedInfo,
  bracketKeySt,
  ronda
) {
  var informOfError = {
    winnerOfRound: {},
    round: ronda,
    bracket: bracketKeySt,
  };
  for (
    var winnersRandoms = 0;
    winnersRandoms < arrOfSpecialCase;
    winnersRandoms++
  ) {
    informOfError['winnerOfRound'] = arrOfSpecialCase[winnersRandoms];
    switch (preparedInfo.game) {
      case 'fifa20':
        await Organizer.findOneAndUpdate(
          { _id: preparedInfo.IDO },
          {
            $addToSet: { 'especialCase.$.fifa20': informOfError },
          }
        );
        break;
      case 'pes20':
        await Organizer.findOneAndUpdate(
          { _id: preparedInfo.IDO },
          {
            $addToSet: { 'especialCase.$.pes20': informOfError },
          }
        );
        break;
      case 'lol':
        await Organizer.findOneAndUpdate(
          { _id: preparedInfo.IDO },
          {
            $addToSet: { 'especialCase.$.lol': informOfError },
          }
        );
        break;
      case 'mobileL':
        await Organizer.findOneAndUpdate(
          { _id: preparedInfo.IDO },
          {
            $addToSet: { 'especialCase.$.mobileL': informOfError },
          }
        );
        break;
      case 'GT':
        await Organizer.findOneAndUpdate(
          { _id: preparedInfo.IDO },
          {
            $addToSet: { 'especialCase.$.GT': informOfError },
          }
        );
        break;
      case 'NBA2K':
        await Organizer.findOneAndUpdate(
          { _id: preparedInfo.IDO },
          {
            $addToSet: { 'especialCase.$.NBA2K': informOfError },
          }
        );
        break;
    }
  }
}

async function passRound(data, actualValuesT, objTime, actOrganizer, server) {
  var date = actualValuesT[1];
  var instance = actualValuesT[0];
  var lastInstanceFinishTournament = actualValuesT[2];
  var WinnersLengthPerIntance = actualValuesT[3];
  var gMaxActualValue = 0;
  var dayMonthForCheck = objTime.dayMonthForCheck;
  var timeActualMoment = objTime.actualMoment;
  var newWinners = data.winners;

  // Local Functions ---------
  async function upWinners(winners, newbool) {
    await Tournament.findByIdAndUpdate(
      data._id,
      {
        $set: { winners: winners, iTournament: newbool },
      },
      { returnNewDocument: true, new: true },
      (err, doc) => {
        //socket
        //activeSocket(doc.winners, "winners", doc.tMain)
      }
    );
  }

  async function saveForANextBracket(
    bracketWithPositionToUse,
    usersWhoPassToNextRound,
    positionOfActualBracket,
    usersWhoPassToTiebreak
  ) {
    var versusOrder = [];
    var roundNumber = data.ronda;
    var nextRound = roundNumber - 1;
    var tieBreakOrder = [];
    var timer = {
      timerPerGame: data.timer.timerPerGame,
      timerPerVerify: data.timer.timerPerVerify,
      timerForCheckImages: data.timer.timerForCheckImages,
      lastChangeVerify: '',
      lastChangeImage: '',
      lastChangeDate: '',
      autoPass: data.timer.autoPass,
    };

    timer = await configureTimer(data.timer, timeActualMoment, timer);

    organizeBattlesInBrackets(
      usersWhoPassToNextRound,
      bracketWithPositionToUse,
      versusOrder
    );
    if (usersWhoPassToTiebreak.length === 2 && roundNumber === 1) {
      organizeBattlesInBrackets(
        usersWhoPassToTiebreak,
        bracketWithPositionToUse,
        tieBreakOrder
      );
      tieBreakOrder = cleanArrayOfNulls(tieBreakOrder);
    }

    if (usersWhoPassToTiebreak.length === 1 && roundNumber === 1) {
      //pasar a ese usuario al 3er lugar de manera directa
      newWinners.three = usersWhoPassToTiebreak[0];
      await upWinners(newWinners, 3);
    }

    // ronda sera actualmente lo que diferenciara por bracket a cual se debe pasar
    // aunque es posible el uso con positionOfActualBracket
    versusOrder = cleanArrayOfNulls(versusOrder);

    if (roundNumber === 1) {
      if (
        usersWhoPassToTiebreak.length > 0 &&
        usersWhoPassToTiebreak.length < 3
      ) {
        await Tournament.findByIdAndUpdate(data._id, {
          ronda: nextRound,
          pe2: versusOrder,
          tiebreak: tieBreakOrder,
          timer: timer,
        });
      } else {
        await Tournament.findByIdAndUpdate(data._id, {
          ronda: nextRound,
          pe2: versusOrder,
          timer: timer,
        });
      }
    }
    if (roundNumber === 2) {
      await Tournament.findByIdAndUpdate(data._id, {
        ronda: nextRound,
        pe4: versusOrder,
        timer: timer,
      });
    }
    if (roundNumber === 3) {
      await Tournament.findByIdAndUpdate(data._id, {
        ronda: nextRound,
        pe8: versusOrder,
        timer: timer,
      });
    }
    if (roundNumber === 4) {
      await Tournament.findByIdAndUpdate(data._id, {
        ronda: nextRound,
        pe16: versusOrder,
        timer: timer,
      });
    }
    if (roundNumber === 5) {
      await Tournament.findByIdAndUpdate(data._id, {
        ronda: nextRound,
        pe32: versusOrder,
        timer: timer,
      });
    }
    if (roundNumber === 6) {
      await Tournament.findByIdAndUpdate(data._id, {
        ronda: nextRound,
        pe64: versusOrder,
        timer: timer,
      });
    }
    if (roundNumber === 7) {
      await Tournament.findByIdAndUpdate(data._id, {
        ronda: nextRound,
        pe128: versusOrder,
        timer: timer,
      });
    }
    if (roundNumber === 8) {
      await Tournament.findByIdAndUpdate(data._id, {
        ronda: nextRound,
        pe256: versusOrder,
        timer: timer,
      });
    }
    if (roundNumber === 9) {
      await Tournament.findByIdAndUpdate(data._id, {
        ronda: nextRound,
        pe512: versusOrder,
        timer: timer,
      });
    }
    if (roundNumber === 10) {
      await Tournament.findByIdAndUpdate(data._id, {
        ronda: nextRound,
        pe1024: versusOrder,
        timer: timer,
      });
    }
  }

  async function editInstanceWithWinners(
    list_Of_Users_Who_Pass_To_Next_Round,
    typeOfAction,
    actualBracketInfo
  ) {
    var initialEdit = data.initial;
    var midEdit = data.mid;
    var finalEdit = data.final;
    function check_Instance_For_Edit(instanceValue) {
      if (instanceValue.day === dayMonthForCheck) {
        instanceValue.winnersIDs = list_Of_Users_Who_Pass_To_Next_Round;
      } else {
        // no necesita actualizacion
      }
    }

    async function organizeWinners(forEditWinners) {
      var infoWhoPassTieBracket = {
        whoPassTieBracket: [],
        whichBattlesExistAndPass: [],
        usersWhoPassToNextRound: [],
      };

      //Primer y Segundo Lugar
      if (
        actualBracketInfo[0][0].ID ===
        list_Of_Users_Who_Pass_To_Next_Round[0].ID
      ) {
        forEditWinners.first = list_Of_Users_Who_Pass_To_Next_Round[0];
        forEditWinners.second =
          list_Of_Users_Who_Pass_To_Next_Round[0] === actualBracketInfo[0][0]
            ? actualBracketInfo[0][1]
            : actualBracketInfo[0][0];
      } else {
        if (
          actualBracketInfo[0][1].ID ===
          list_Of_Users_Who_Pass_To_Next_Round[0].ID
        ) {
          forEditWinners.first = list_Of_Users_Who_Pass_To_Next_Round[0];
          forEditWinners.second =
            list_Of_Users_Who_Pass_To_Next_Round[0] === actualBracketInfo[0][0]
              ? actualBracketInfo[0][1]
              : actualBracketInfo[0][0];
        }
      }

      //Tercer Lugar
      //Filtrando Informacion
      if (!forEditWinners.three) {
        if (data.tiebreak.length > 0) {
          for (var checktie = 0; checktie < data.tiebreak.length; checktie++) {
            var preparedInfo = {
              IDO: data.IDO,
              game: data.game,
              IDT: data._id,
              actOrganizer: actOrganizer,
            };
            infoWhoPassTieBracket = await checkWhoPass(
              data.tiebreak,
              preparedInfo
            );
          }

          if (infoWhoPassTieBracket.usersWhoPassToNextRound.length > 0) {
            forEditWinners.three =
              infoWhoPassTieBracket.usersWhoPassToNextRound[0];
          }
        }
      }

      return forEditWinners;
    }

    if (typeOfAction === 'everybody') {
      checkInstance(initialEdit, check_Instance_For_Edit);
      checkInstance(midEdit, check_Instance_For_Edit);
      checkInstance(finalEdit, check_Instance_For_Edit);

      await Tournament.findByIdAndUpdate(data._id, {
        //iTournament: 2,
        initial: initialEdit,
        mid: midEdit,
        final: finalEdit,
      });

      await Repository.findOneAndUpdate(
        { IDT: data._id },
        {
          $addToSet: { tMain: data.tMain },
        }
      );
      console.log('LISTO!');
    }
    if (typeOfAction === 'officialWinners') {
      //Declarando Informacion Necesario para Official Winners
      var newbool = 4;
      newWinners = await organizeWinners(newWinners);
      await upWinners(newWinners, newbool);

      // establecer el proceso para 3er lugar
    }
  }

  async function editBracketOrFinishIntance(
    infoWhoPass,
    actualBracketInfo,
    bracketKeySt
  ) {
    //Ganadores disponibles ?
    if (
      infoWhoPass.whichBattlesExistAndPass.length <= WinnersLengthPerIntance
    ) {
      if (!lastInstanceFinishTournament) {
        //instancia terminada
        await editInstanceWithWinners(
          infoWhoPass.usersWhoPassToNextRound,
          'everybody',
          actualBracketInfo
        );
      } else {
        //torneo terminado
        await editInstanceWithWinners(
          infoWhoPass.usersWhoPassToNextRound,
          'officialWinners',
          actualBracketInfo
        );
      }
    } else {
      await saveForANextBracket(
        infoWhoPass.whichBattlesExistAndPass,
        infoWhoPass.usersWhoPassToNextRound,
        bracketKeySt,
        infoWhoPass.usersWhoPassToTiebreak
      );
    }
  }
  //--------------------------

  gMaxActualValue = howManyWinnersNeedThisInstance(
    instance,
    data,
    date,
    gMaxActualValue
  );
  if (gMaxActualValue.alert) {
    console.log(
      'error con el nombre de la instancia por favor revise la base.'
    );
  } else {
    var functionInfoBracket = actualBracket(data);
    var actualBracketInfo = functionInfoBracket.bracket;
    var bracketKeySt = functionInfoBracket.position;
    var preparedInfo = {
      IDO: data.IDO,
      game: data.game,
      IDT: data._id,
      actOrganizer: actOrganizer,
    };
    var infoWhoPass = await checkWhoPass(actualBracketInfo, preparedInfo);
    if (infoWhoPass.reportSpecialCase.length > 0) {
      reportSpecialCaseToOrg(
        infoWhoPass.reportSpecialCase,
        preparedInfo,
        bracketKeySt,
        data.ronda
      );
    }
    editBracketOrFinishIntance(infoWhoPass, actualBracketInfo, bracketKeySt);
  }
}

function whatTimeIsIt() {
  //Optimize later when automaticProcess be finished
  const hora = moment().tz('America/Argentina/Buenos_Aires').format();
  var actual = hora.split('T');
  var actualArr = actual[0].split('-');
  const actualMins = parseInt(actual[1].slice(3, 5));
  const actualHours = parseInt(actual[1].slice(0, 2));
  const actualDays = parseInt(actualArr[2]);
  const actualMonth = parseInt(actualArr[1]);
  const actualYear = parseInt(actualArr[0]);
  var actualMoment = moment(
    `${actualYear}-${actualMonth}-${actualDays} ${actualHours}:${actualMins}`,
    'YYYY-MM-DD HH:mm'
  );

  return actualMoment;
}

function countDown_For_Start_PerTournament(infoPerTournament, theActualMoment) {
  var tStart = infoPerTournament.tStart.split('T');
  var tDateArr = tStart[0].split('-');
  const tStartYear = tDateArr[0];
  const tStartMonth = tDateArr[1];
  const tStartDays = tDateArr[2];
  const tStartHours = parseInt(tStart[1].slice(0, 2));
  const tStartMins = parseInt(tStart[1].slice(3, 5));
  var tournamentStart = moment(
    `${tStartYear}-${tStartMonth}-${tStartDays} ${tStartHours}:${tStartMins}`,
    'YYYY-MM-DD HH:mm'
  );
  var daysDif = tournamentStart.diff(theActualMoment, 'days');
  var hoursDif = tournamentStart.diff(theActualMoment, 'hours');
  var minsDif = tournamentStart.diff(theActualMoment, 'mins');
  var countDownCheck = [daysDif, hoursDif, minsDif];
  console.log(countDownCheck);
  return countDownCheck;
}

async function checkInstance(intanceTocheck, callback) {
  if (intanceTocheck.length > 0) {
    await intanceTocheck.map(callback);
  }
}

async function diferenciandoProcesos(
  tournamentInfo,
  objTime,
  numberOfProcess,
  actOrganizer
) {
  var changeThis = [];
  var timeToCheck = objTime.dinamicInfo;
  var dayMonthForCheck = objTime.dayMonthForCheck;
  //------ LOCAL FUNCTIONS
  function check_Instance_Day_And_LastTournament_Per_Instance(instance) {
    //Como es un map lo que corre esta funcion cada instancia ya esta separada
    var pass = false;
    var actualInstance = '';
    var actualDate = '';
    var actualLastInstance = instance.lastInstance;
    if (instance.day === dayMonthForCheck && instance.winnersIDs.length < 1) {
      pass = true; //Esto condiciona la funciones futuras ya que si existe algun ganador en la instancia el valor ya no corre
      actualDate = instance.day;
      actualInstance = instance.instance;
      actualWinner = instance.winnersNeed;
      arrSpecify = [
        actualInstance,
        actualDate,
        actualLastInstance,
        actualWinner,
        pass,
      ];
      changeThis.push(arrSpecify);
    }
  }
  //--------
  // Proceso de inscripcion
  if (numberOfProcess === 1) {
    if (timeToCheck[0] <= 0 && timeToCheck[1] <= 0 && timeToCheck[2] <= 0) {
      await checkInstance(
        tournamentInfo.initial,
        check_Instance_Day_And_LastTournament_Per_Instance
      );
      await checkInstance(
        tournamentInfo.mid,
        check_Instance_Day_And_LastTournament_Per_Instance
      );
      await checkInstance(
        tournamentInfo.final,
        check_Instance_Day_And_LastTournament_Per_Instance
      );
    }

    for (var autoOn = 0; autoOn < changeThis.length; autoOn++) {
      // no ingresan valores si no existe instancia que comenzar
      if (changeThis[autoOn][4] === true) {
        //condicional de seguridad
        await startTournament(
          tournamentInfo,
          changeThis[autoOn],
          objTime,
          actOrganizer
        );
        //console.log(await startTournament(tournamentInfo, changeThis[autoOn], objTime, actOrganizer), "funcion nico")
      }
    }
  }

  //Proceso de brackets
  if (numberOfProcess === 2) {
    if (timeToCheck[0] <= 0 && timeToCheck[1] <= 0) {
      if (tournamentInfo.initial.length > 0) {
        await checkInstance(
          tournamentInfo.initial,
          check_Instance_Day_And_LastTournament_Per_Instance
        );
      }
      if (tournamentInfo.mid.length > 0) {
        await checkInstance(
          tournamentInfo.mid,
          check_Instance_Day_And_LastTournament_Per_Instance
        );
      }
      if (tournamentInfo.final.length > 0) {
        await checkInstance(
          tournamentInfo.final,
          check_Instance_Day_And_LastTournament_Per_Instance
        );
      }
    }

    //console.log(changeThis, "changeThis")
    for (var autoOn = 0; autoOn < changeThis.length; autoOn++) {
      if (changeThis[autoOn][4] === true) {
        passRound(tournamentInfo, changeThis[autoOn], objTime, actOrganizer);
      }
    }

    if (dayMonthForCheck === tournamentInfo.timer.lastChangeDate) {
      //<--- incorporar caso cuando corre la ultima instancia ?
    }
  }
}

function countDown_Per_Bracket(timer, actualMoment) {
  var lastChangeDate = timer.lastChangeDate;
  var checkingLastDate = moment(lastChangeDate, 'LLLL');
  var differenceInHoursBettween = checkingLastDate.diff(actualMoment, 'hours');
  var differenceInMinsBettween = checkingLastDate.diff(actualMoment, 'minutes');
  var countDownInside = [differenceInHoursBettween, differenceInMinsBettween];
  console.log(countDownInside, 'countDownInside');
  console.log(lastChangeDate, 'lastChangeDate');
  return countDownInside;
}
// -------------------------------

async function automaticProcess(server) {
  // local vars
  console.log('Corriendo AutomaticProcess');
  var actualMoment = whatTimeIsIt();
  var momentArr = actualMoment.format('DD-MM-YYYY HH:mm').split('T');
  var dayMonthForCheck = momentArr[0].slice(0, 5);
  var objTime = {
    dayMonthForCheck: dayMonthForCheck,
    actualMoment: actualMoment,
    dinamicInfo: '',
  };

  await Tournament.find(
    { validTournament: true, isFinished: false },
    async (req, arrAllTourn) => {
      //iTournament: 1 && 2 && 0
      var actOrganizer = {
        _id: '',
        battlesToCheck: {},
      };
      for (var i = 0; i < arrAllTourn.length; i++) {
        //Fase de inscripciones
        if (arrAllTourn[i].IDO !== actOrganizer._id) {
          var actOrganizer = await Organizer.findOne(
            { _id: arrAllTourn[i].IDO },
            { battlesToCheck: 1, _id: 1 }
          );
        }
        if (
          arrAllTourn[i].iTournament === 1 ||
          arrAllTourn[i].iTournament === 2
        ) {
          var countDownCheck = countDown_For_Start_PerTournament(
            arrAllTourn[i],
            actualMoment
          );
          objTime.dinamicInfo = countDownCheck;
          //var iTournament = await diferenciandoProcesos(arrAllTourn[i], objTime, 1, actOrganizer)
          diferenciandoProcesos(arrAllTourn[i], objTime, 1, actOrganizer);
        }
        // Fase de competencia
        if (arrAllTourn[i].iTournament === 3) {
          var countDownPerBracket = countDown_Per_Bracket(
            arrAllTourn[i].timer,
            actualMoment
          );
          objTime.dinamicInfo = countDownPerBracket;
          diferenciandoProcesos(arrAllTourn[i], objTime, 2, actOrganizer);
        }
      }
    }
  );
}

module.exports = {
  automaticProcess,
  countDown_Per_Bracket,
  whatTimeIsIt,
};
