const express = require('express');
const orgRouter = express.Router();
const nodemailer = require('nodemailer');
const moment = require('moment');
const { emailPass } = require('../../../config/default.js');
const Repository = require('../../models/games/repository/repository.js');
const Tournament = require('../../models/games/fifa-pes/tournaments.js');
const Organizer = require('../../models/users/organizer.js');
const User = require('../../models/users/users.js');
const Customer = require('../../models/users/customer.js');
const Teams = require('../../models/users/teams');
const {
  changeNextBracket,
  botGenerator,
  bracketsMath,
  actualBracket,
  whenStartTournament,
  howManyWinnersNeedThisInstance,
  organizeBattlesInBrackets,
  removeItemFromArr,
} = require('../routes-methods/tournaments/tournamentsFunctions');
const {
  sendMailForEveryPlayerInsideTheTournament,
} = require('../routes-methods/mails/sendMessages.js');

// - - - - - - - - - - - - - - GET
//-> BAJANDO TORNEO
orgRouter.get('/:IDO/:game', async (req, res) => {
  var watchArr = [];
  var checkOrg = {};
  const { IDO, game } = req.params;
  var createClosed = false;

  // CASO
  //console.log(req.params, "PARAMS")
  const tournament = await Tournament.find({
    IDO: req.params.IDO /*tPlataform: 'PS4',*/,
    game: { $regex: req.params.game, $options: 'i' },
    isFinished: false,
  }).sort({ tDate: 1, tStart: 1 });
  if (
    (await Tournament.find({
      IDO: IDO,
      game: {
        $regex: game,
        $options: 'i',
      },
    }).countDocuments()) >
      0 ===
    true
  ) {
    if (tournament.length > 0) {
      createClosed = true;
      for (v = 0; v < tournament.length; v++) {
        watchArr.push(tournament[v]);
      }
    }
    const infoOrg = await Organizer.findOne(tournament.IDO, {
      battlesToCheck: 1,
    });
    checkOrg = await infoOrg.battlesToCheck;
  } else {
    createClosed = false;
  }
  //console.log(checkOrg, "checkOrg")
  //console.log(watchArr, '<---- whatchArr');
  //console.log(createClosed, 'CREATE');
  return res.json({ watchArr, createClosed, checkOrg });
});

orgRouter.get('/tournament-panel/:IDT/:isFinished', async (req, res) => {
  const { IDT, isFinished } = req.params;

  const tournament = await Tournament.find({
    _id: IDT /*tPlataform: 'PS4',*/,
    isFinished: isFinished,
  }).sort();

  var tournamentData = tournament[0];

  return res.json({ tournamentData });
});

//-> CAMBIANDO ESTADO DE TORNEO
orgRouter.get('/status/:IDT/:newbool', async (req, res) => {
  const { IDT, newbool } = req.params;
  console.log(newbool, `este es el bool!!!!!!!!!!!!!!!`);
  if ((await Tournament.find({ _id: IDT }).countDocuments()) > 0 === true) {
    await Tournament.findByIdAndUpdate(IDT, {
      iTournament: newbool,
    });
  } else {
    res.json({
      alert:
        'Estado en demora por favor verifique informacion o informenos del error.',
    });
  }

  return res.json({ status: 'listo' });
});
//-> CAMBIANDO ESTADO DE TORNEO - Automatizado
orgRouter.get(
  '/statusStart/:IDT/:newbool/:date/:instance/:lastTournament',
  async (req, res) => {
    const { IDT, newbool, date, instance, lastTournament } = req.params;
    const data = await Tournament.findOne(
      { _id: IDT },
      { tMain: 1, initial: 1, mid: 1, final: 1, _id: 0, tournamentName: 1 }
    );
    console.log(data.tMain, '<---- element to check');

    var gMaxToChange = 0;
    gMaxToChange = await howManyWinnersNeedThisInstance(
      instance,
      data,
      date,
      gMaxToChange
    );
    if (gMaxToChange.alert) {
      return res.json({ alert: gMaxToChange.alert });
    } else {
      const changeObj = bracketsMath(data.tMain.length, gMaxToChange);

      async function saveBrack(bracketShuffle, tMain, oldtMain) {
        var versusOrder = [];
        organizeBattlesInBrackets(tMain, bracketShuffle, versusOrder);

        await Tournament.findByIdAndUpdate(IDT, {
          tMain: [],
          ronda: changeObj.roundsNumber,
          tBracket: versusOrder,
          iTournament: newbool,
          cMax: changeObj.cMax,
          gMax: gMaxToChange,
          lastTournament: lastTournament,
        });
        await Repository.findByIdAndUpdate(
          { IDT: IDT },
          {
            $addToSet: { tMain: oldtMain },
          }
        );
      }

      var arrToChange = data.tMain;
      if (changeObj.peopleDifference > 0) {
        const usersOuts = [];
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'versusgamingcode@gmail.com',
            pass: emailPass,
          },
        });
        for (var y = 0; y < changeObj.peopleDifference; y++) {
          const userOut = await User.findOne(
            { _id: data.tMain[data.tMain.length - y - 1].ID },
            { email: 1, _id: 0, name: 1 }
          );

          var contentHTML = `	<h1> Buen dia  ${userOut.name}, </h1>
			<ul>
				<div>
				<p> Nos ha tocado informarle que el torneo ${data.tournamentName} ha comenzado! </p>
				<p> Pero desafortunadamente se le tuvo que retirar del mismo por temas logisticos </p>
				<p> De igual forma visitenos nuevamente, he ingresar a futuras competencias</p>
				<p> su futuro en los esports lo esta esperando </p>
				<p> y nosotros pensamos brindarle toda la ayuda que necesite.</p>
				<div />
			<ul>`;

          const sendMailToPlayers = await transporter.sendMail({
            from: "'Ciudad Esports' versusgamingcode@gmail.com",
            to: userOut.email,
            subject: 'Lo sentimos, problemas protocolares ',
            html: contentHTML,
          });
          usersOuts.push(`<li>${userOut.name}<li>`);
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
        const sendMailToOrganizer = await transporter.sendMail({
          from: "'Ciudad Esports' versusgamingcode@gmail.com",
          to: 'versusgamingcode@gmail.com',
          subject: ' Protocolo ',
          html: contentHTML2,
        });
      } else {
        if (changeObj.peopleDifference !== 0) {
          var difference = changeObj.peopleDifference * -1;
          //console.log('ADENTRO DEL CASO ADDBOT')
          //console.log(botsToAdd, 'Bots to add')
          const arrWithBots = await botGenerator(difference, arrToChange);
          arrToChange = arrWithBots;
        } else {
          //CASO IDEAL NO SE NECESITAN CAMBIOS
        }
      }

      for (var a = [], i = 0; i < arrToChange.length; ++i) a[i] = i;
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
      await saveBrack(respuesta, arrToChange, data.tMain);
    }
  }
);
//-> CAMBIANDO ESTADO DE TORNEO POR EL DE LA INSTANCIA SIGUIENTE
orgRouter.get('/clean/Save/:IDT', async (req, res) => {
  const { IDT } = req.params;
  const infoTournament = await Tournament.findOne(IDT, {
    initial: 1,
    mid: 1,
    final: 1,
    _id: 0,
    ronda: 1,
    tDate: 1,
    lastTournament: 1,
    cMax: 1,
    winners: 1,
    ronda: 1,
    gMax: 1,
    tBracket: 1,
    pe1024: 1,
    pe512: 1,
    pe256: 1,
    pe128: 1,
    pe64: 1,
    pe32: 1,
    pe16: 1,
    pe8: 1,
    pe4: 1,
    pe2: 1,
  });

  const infoToSaveInRepository = whenStartTournament(infoTournament);
  await Repository.findOneAndUpdate(
    { IDT: IDT },
    {
      $addToSet: { rounds: infoToSaveInRepository },
    }
  );

  if (infoTournament.lastTournament === false) {
    const todayIs = moment().format('MM DD');
    const month = todayIs[0] + todayIs[1];
    const day = todayIs[3] + todayIs[4];
    const option1 = month + day;
    const option2 = month + '-' + day;
    const option3 = month + ' ' + day;

    for (var x = 0; x < infoTournament.initial.length; x++) {
      if (infoTournament.initial[x].day === option1) {
        await Tournament.findOneAndUpdate(IDT, {
          tDate: option1,
          lastTournament: infoTournament.initial[x].lastTournament,
          gMax: infoTournament.initial[x].winnersNeed,
          tStart: infoTournament.initial[x].tStart,
        });
        return res.json({ status: 200, message: 'listo' });
      }
    }
    for (var y = 0; y < infoTournament.mid.length; y++) {
      if (infoTournament.mid[y].day === option1) {
        await Tournament.findOneAndUpdate(IDT, {
          tDate: option1,
          lastTournament: infoTournament.mid[y].lastTournament,
          gMax: infoTournament.mid[y].winnersNeed,
          tStart: infoTournament.mid[y].tStart,
        });
        return res.json({ status: 200, message: 'listo' });
      }
    }
    for (var z = 0; z < infoTournament.final.length; z++) {
      if (infoTournament.final[z].day === option1) {
        await Tournament.findOneAndUpdate(IDT, {
          tDate: option1,
          lastTournament: infoTournament.final[z].lastTournament,
          gMax: infoTournament.final[z].winnersNeed,
          tStart: infoTournament.final[z].tStart,
        });
        return res.json({ status: 200, message: 'listo' });
      }
    }
  } else {
    //Configurar Torneo listo para terminar o correr de manera aislada dependiendo de repuesta por back
    res.json({ alert: 'TORNEO LISTO PARA TERMINAR' });
  }
});
//-> BAJANDO TORNEO POR CALENDARIO
orgRouter.get('/calendar/:IDO/:game/:IDT', async (req, res) => {
  const { IDO, game, IDT } = req.params;
  const { tournamentFind } = req.body;
  var initial = tournamentFind.initial;
  var mid = tournamentFind.mid;
  var final = tournamentFind.final;

  if (tournamentFind !== {}) {
    const torneo = await Tournament.findOneAndUpdate(
      { _id: IDT, IDO: IDO, game: game },
      { initial: initial, mid: mid, final: final },
      { returnNewDocument: true, new: true }
    );
    res.json(torneo);
  } else {
    return res.json({ alert: 'Disculpe usted no tiene un torneo creado aun' });
  }
});
//-> ELIMINANDO EL TORNEO
orgRouter.get('/delete/:IDT/:IDO', async (req, res) => {
  const { IDT, IDO } = req.params;
  try {
    var tour = await Tournament.findById(req.params.IDT, { IDO: 1, _id: 0 });
    if (IDO === tour.IDO) {
      //await cloudinary.v2.uploader.destroy(publicId);
      await Tournament.findByIdAndRemove(IDT);
      await Repository.findOneAndRemove({ IDT: IDT });
      const organizer = await Organizer.findOne(
        { IDO },
        { IDTs: true, _id: false }
      );
      var arrayToClean = organizer.IDTs;
      removeItemFromArr(arrayToClean, IDT);
      await Organizer.findOneAndUpdate(
        { IDO },
        {
          $set: { IDTs: await arrayToClean },
        }
      );
      console.log('Torneo eliminado!');
      res.json({ alert: 'Torneo eliminado', status: 200 });
    } else {
      return res.json({
        alert:
          'Por favor use un Token correspondiente para eliminar este torneo.',
        status: 200,
      });
    }
  } catch {
    res.json({ alert: 'error 2' });
  }
});
//-> BUSCANDO EMAIL HE INFORMANDOLES DE LOS NUEVOS CAMBIOS
orgRouter.get('/emails/:IDT/load', async (req, res) => {
  console.log('RUN RUN RUN');
  const data = await Tournament.findById(
    {
      _id:
        '5f7b46c5e541a73b88d439f1' /*5f6ccf87a58f3b001c928b4b req.params.IDT*/,
    }, //<---- HABILITAR IDT CORRESPONDIENTE
    { tMain: 1, tBracket: 1, customer: 1 }
  );

  // ------ Para Los Emails Inicio---------
  /*
  var tBracketForExcel = [];
  for (var checkTmain = 0; checkTmain < data.tMain.length; checkTmain++) {
    // ----- FOR TEAMS
    // var team = await Teams.findOne({ _id: data.tMain[checkTmain].ID }, {player1: 1})
    //  if (team) {
    //    tBracketForExcel.push({
    //      email: team.player1.email,
    //      name: data.tMain[checkTmain].name,
    //      nickname: data.tMain[checkTmain].capitanName
    //   })
    

    // ----- FOR USERS
    var userEmail = await User.findOne(
      { _id: data.tMain[checkTmain].ID },
      { email: 1 }
    );
    if (userEmail) {
      tBracketForExcel.push({
        email: userEmail.email,
        name: data.tMain[checkTmain].name,
        nickname: data.tMain[checkTmain].nickname,
      });
    } else {
      console.log(data.tMain[checkTmain].ID);
    }
  }
  

  await Repository.findOneAndUpdate(
    { IDT: '5f7b46c5e541a73b88d439f1' },
    { tMain: tBracketForExcel }
  );
  */
  // ------ Para Los Emails Fin---------

  // -------------   Para los brackets

  var tBracketForExcel = [];
  for (var checkTmain = 0; checkTmain < data.tBracket.length; checkTmain++) {
    var inProcess = [];
    for (var vs = 0; vs < 2; vs++) {
      var userPush = {};
      console.log(checkTmain, 'AQUI');
      if (data.tBracket[checkTmain][vs].ID.includes('Bot')) {
        console.log(data.tBracket[checkTmain][vs].ID);
        userPush = {
          email: 'Bot para Completar Informacion ',
          nickname: data.tBracket[checkTmain][vs].nickname,
          name: data.tBracket[checkTmain][vs].name,
        };
        inProcess.push(userPush);
      } else {
        //console.log(data.tBracket[checkTmain][vs].ID)
        var userEmail = await User.findOne(
          { _id: data.tBracket[checkTmain][vs].ID },
          { email: 1 }
        );
        userPush = {
          email: '',
          nickname: data.tBracket[checkTmain][vs].nickname,
          name: data.tBracket[checkTmain][vs].name,
        };
        userEmail
          ? (userPush.email = userEmail.email)
          : (userPush.email = 'emaildeprueba@testeo.com');
        inProcess.push(userPush);
      }
    }
    tBracketForExcel.push({
      email: inProcess[1].email, //0 para la primera ronda 1 para la segunfa
      nickname: inProcess[1].nickname,
      name: inProcess[1].name,
    });
  }

  await Repository.findOneAndUpdate(
    { IDT: '5f7b46c5e541a73b88d439f1' },
    { tMain: tBracketForExcel }
  );

  // for send emails
  //sendMailForEveryPlayerInsideTheTournament(req.params.IDT, objToSend)

  return res.json({ array: tBracketForExcel });
});

// - - - - - - - - - - - - - - POST
//-> MONTANDO EL TORNEO
orgRouter.post('/', async (req, res) => {
  const obj = JSON.parse(JSON.stringify(req.body));
  console.log(req.body, 'BODY');

  //try {
  async function newTournament() {
    //var startDay = await moment(obj.tDate)._d;
    var startDay = await moment()._d;
    var tournament = {
      IDO: obj.IDO,
      customer: obj.customer,
      tournamentName: obj.tName,
      weeksDuration: obj.weeksDuration,
      server: obj.serverSelected,
      tDate: startDay,
      tStart: 'none',
      tAward: obj.tAward,
      tPlataform: obj.tPlataform,
      //tType: obj.tType,
      game: obj.game,
      wallpaper: obj.wallpaper,
      initial: [],
      mid: [],
      final: [],
    };
    var torne = await Tournament.create(tournament);
    console.log(torne._id, torne.game, 'Torneo creado');
    var repository = {
      IDT: torne._id,
    };
    await Repository.create(repository);
    // -------- Torneo hecho por organizador
    await Organizer.findByIdAndUpdate(
      { _id: obj.IDO },
      {
        $addToSet: { IDTs: torne._id },
      }
    );
    // -------- Torneos Disponibles
    //console.log(obj.customer, "CUSTOMER")
    const customerInfo = await Customer.findOne(
      { customer: obj.customer },
      { gamesInfo: 1 }
    );
    console.log(customerInfo);
    //var customerEditer = await ;
    customerInfo.gamesInfo[obj.game].IDTs.push(torne._id);
    //console.log(customerEditer);
    await Customer.findByIdAndUpdate(
      { _id: customerInfo._id },
      {
        gamesInfo: customerInfo.gamesInfo,
      }
    );
  }
  await newTournament();
  res.redirect(`/#/${obj.game}-organizer`), console.log(`listo`);
  //} catch {
  //	console.log(err)
  //	return res.json({ alert: 'please check every element.' });
  //}
});
//-> CARGANDO INSTANCIAS DE TORNEO
orgRouter.post('/uploadInstances/:IDT/:IDO', async (req, res) => {
  //leer todo el codigo
  const { IDT, IDO } = req.params;
  const {
    initial,
    mid,
    final,
    initialsRelatedsDays,
    midsRelatedsDays,
  } = req.body;

  var newtStart = '';

  async function firstIntance(instances) {
    var forTstart = '';
    function compareValues(key, order = 'asc') {
      return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
          // property doesn't exist on either object
          return 0;
        }

        const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
        const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];

        var ArrayA = varA.split('-');
        var ArrayB = varB.split('-');

        let comparison = 0;
        if (ArrayA[1] > ArrayB[1]) {
          comparison = 1;
        } else if (ArrayA[0] < ArrayB[0]) {
          comparison = -1;
        }

        return order === 'desc' ? comparison * -1 : comparison;
      };
    }

    instances.sort(compareValues('day'));

    forTstart = instances[0].day.split('-');
    console.log(forTstart);

    newtStart = `${2020}-${forTstart[1]}-${forTstart[0]}T${
      instances[0].tStart
    }:00`;
  }

  function lastInstanceCleanAndRun() {
    var iniLength = initial.length;
    var midLength = mid.length;
    var finLength = final.length;

    firstIntance(initial);

    if (iniLength > 0) {
      for (
        var howmanyInstanceI = iniLength - 1;
        howmanyInstanceI < iniLength;
        howmanyInstanceI++
      ) {
        midLength > 0
          ? (initial[howmanyInstanceI].lastInstance = false)
          : (initial[howmanyInstanceI].lastInstance = true);
      }
    }

    if (midLength > 0) {
      for (
        var howmanyInstanceM = midLength - 1;
        howmanyInstanceM < midLength;
        howmanyInstanceM++
      ) {
        finLength > 0
          ? (mid[howmanyInstanceM].lastInstance = false)
          : (mid[howmanyInstanceM].lastInstance = true);
      }
    }

    if (finLength > 0) {
      for (
        var howmanyInstanceF = finLength - 1;
        howmanyInstanceF < finLength;
        howmanyInstanceF++
      ) {
        final[howmanyInstanceF].lastInstance = true;
      }
    }
  }

  lastInstanceCleanAndRun();

  if ((await Organizer.find({ _id: IDO }).countDocuments()) > 0 === true) {
    if ((await Tournament.find({ _id: IDT }).countDocuments()) > 0 === true) {
      const iTournamentActual = await Tournament.findOne(
        { _id: IDT },
        { iTournament: true, _id: false }
      );
      console.log(iTournamentActual.iTournament, `<---- ACTUAL ITOURNAMENT`);
      if (iTournamentActual.iTournament === 0) {
        await Tournament.findOneAndUpdate(
          { _id: IDT },
          {
            tStart: newtStart,
            initial: initial,
            mid: mid,
            final: final,
            iTournament: 1,
            validTournament: true,
            initialsRelatedsDays: initialsRelatedsDays,
            midsRelatedsDays: midsRelatedsDays,
          }
        );
        return res.json({
          alert:
            '\n\n Felicitaciones se realizaron los cambios con exito! \n De aqui en adelante ya se puede inscribir jugadores al torneo.\n',
        });
      } else {
        await Tournament.findOneAndUpdate(
          { _id: IDT },
          {
            tStart: newtStart,
            initial: initial,
            mid: mid,
            final: final,
            validTournament: true,
            initialsRelatedsDays: initialsRelatedsDays,
            midsRelatedsDays: midsRelatedsDays,
          }
        );
        return res.json({
          alert: '\n Felicitaciones se realizaron los cambios con exito! \n ',
        });
      }
    } else {
      return res.json({
        alert:
          'No puede actualizar ya que no posee torneo en este momento \n\n Por favor actualize la pagina',
      });
    }
  } else {
    return res.json({
      alert:
        'No puede actualizar en este momento, \n\n Por favor informele a los programadores de este posible error. \n\n Error: Org 480',
    });
  }
});
//-> ENVIANDO CHAT AL TORNEO - - - - - - - - - - - - - EN REVISION - - - - - - - - - -- -
orgRouter.post('/sendMessage/:IDT', async (req, res) => {
  const message = req.body;
  const { IDT } = req.params;
  //UN ARRAY con objetos dentro .... solo pushea el objeto que se da

  await Tournament.findByIdAndUpdate(
    { _id: IDT },
    { $addToSet: { chatMessage: message } },
    { returnNewDocument: true, new: true },
    (err, doc) => {
      if (err) {
        console.log('Something wrong when updating data!');
      } else {
        const chatMessage = doc.chatMessage;
        console.log(chatMessage, '<--- Message');
      }
    }
  );
  res.json('Actualizado');
});
//-> CONFIRM WINNER ORGA
orgRouter.post('/confirWinner/:IDT', async (req, res) => {
  const obj = req.body;
  console.log(obj);
  const { IDT } = req.params;

  const resul = await Tournament.findOne(
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
      checked: true,
      initial: true,
      mid: true,
      final: true,
      cMax: true,
    }
  );
  console.log(resul, 'resul RONDAAAAAAA!!!!!');

  //REVISAR
  const bracketActive = actualBracket(resul);
  const battlesNumb = bracketActive.bracket.length / 2;
  for (var positionNumber = 0; positionNumber < battlesNumb; positionNumber++) {
    if (
      bracketActive.bracket[positionNumber][0].ID === obj.IDU ||
      bracketActive.bracket[positionNumber][1].ID === obj.IDU
    ) {
      console.log(bracketActive.bracket[positionNumber], 'Bracket VS');
      console.log(positionNumber, 'Numero o posicion en el array');
      saveInfo(
        bracketActive.bracket[positionNumber],
        bracketActive.position,
        positionNumber
      );
    }
  }

  async function saveInfo(bracketPosition, bracketToSafe, numberI) {
    const juego = bracketPosition;
    const arrsafe = [obj.IDU, finalUrl];
    juego.push(arrsafe);

    console.log(juego, 'BRACKET NUEVO');
    console.log(bracketToSafe, 'position ');

    if (bracketToSafe === 'tBracket') {
      const changeBracket = resul.tBracket;
      console.log(numberI, 'numberI');
      changeBracket.splice(numberI, 1, juego);
      await Tournament.findOneAndUpdate(
        { _id: IDT },
        { tBracket: changeBracket }
      );
      console.log('complete');
      return res.json({ status: 'complete' });
    }
    if (bracketToSafe === 'pe1024') {
      const changeBracket = resul.pe1024;
      console.log(numberI, 'numberI');
      changeBracket.splice(numberI, 1, juego);
      await Tournament.findOneAndUpdate(
        { _id: IDT },
        { pe1024: changeBracket }
      );
      console.log('complete');
      return res.json({ status: 'complete' });
    }
    if (bracketToSafe === 'pe512') {
      const changeBracket = resul.pe512;
      console.log(numberI, 'numberI');
      changeBracket.splice(numberI, 1, juego);
      await Tournament.findOneAndUpdate({ _id: IDT }, { pe512: changeBracket });
      console.log('complete');
      return res.json({ status: 'complete' });
    }
    if (bracketToSafe === 'pe256') {
      const changeBracket = resul.pe256;
      console.log(numberI, 'numberI');
      changeBracket.splice(numberI, 1, juego);
      await Tournament.findOneAndUpdate({ _id: IDT }, { pe256: changeBracket });
      console.log('complete');
      return res.json({ status: 'complete' });
    }
    if (bracketToSafe === 'pe128') {
      const changeBracket = resul.pe128;
      console.log(numberI, 'numberI');
      changeBracket.splice(numberI, 1, juego);
      await Tournament.findOneAndUpdate({ _id: IDT }, { pe128: changeBracket });
      console.log('complete');
      return res.json({ status: 'complete' });
    }
    if (bracketToSafe === 'pe64') {
      const changeBracket = resul.pe64;
      console.log(numberI, 'numberI');
      changeBracket.splice(numberI, 1, juego);
      await Tournament.findOneAndUpdate({ _id: IDT }, { pe64: changeBracket });
      console.log('complete');
      return res.json({ status: 'complete' });
    }
    if (bracketToSafe === 'pe32') {
      const changeBracket = resul.pe32;
      console.log(numberI, 'numberI');
      changeBracket.splice(numberI, 1, juego);
      await Tournament.findOneAndUpdate({ _id: IDT }, { pe32: changeBracket });
      console.log('complete');
      return res.json({ status: 'complete' });
    }
    if (bracketToSafe === 'pe16') {
      const changeBracket = resul.pe16;
      console.log(numberI, 'numberI');
      changeBracket.splice(numberI, 1, juego);
      await Tournament.findOneAndUpdate({ _id: IDT }, { pe16: changeBracket });
      console.log('complete');
      return res.json({ status: 'complete' });
    }
    if (bracketToSafe === 'pe8') {
      const changeBracket = resul.pe8;
      console.log(numberI, 'numberI');
      changeBracket.splice(numberI, 1, juego);
      await Tournament.findOneAndUpdate({ _id: IDT }, { pe8: changeBracket });
      console.log('complete');
      return res.json({ status: 'complete' });
    }
    if (bracketToSafe === 'pe4') {
      const changeBracket = resul.pe4;
      console.log(numberI, 'numberI');
      changeBracket.splice(numberI, 1, juego);
      await Tournament.findOneAndUpdate({ _id: IDT }, { pe4: changeBracket });
      console.log('complete');
      return res.json({ status: 'complete' });
    }
    if (bracketToSafe === 'pe2') {
      const changeBracket = resul.pe2;
      console.log(numberI, 'numberI');
      changeBracket.splice(numberI, 1, juego);
      await Tournament.findOneAndUpdate({ _id: IDT }, { pe2: changeBracket });
      console.log('complete');
      return res.json({ status: 'complete' });
    }
  }
});
//-> WINNER AND NEW POSITION
orgRouter.post('/vsWinner/:IDUP/:IDT', async (req, res) => {
  const { array } = req.body;
  const { IDUP, IDT } = req.params;
  var resul = {};
  var winnerAct = {};
  var upperArr = [];

  // En el bucle se coloca 2 porque representa las posiciones maximas
  // de los competidores en todos los arrays por default
  for (var p = 0; p < 2; p++) {
    if (IDT === array[p].ID) {
      winnerAct = array[p];
    }
  }

  if (
    (await Tournament.find({ _id: IDT /*req.obj.IDTM*/ }).countDocuments()) >
      0 ===
    true
  ) {
    resul = await Tournament.findById(
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
        cMax: true,
        checked: true,
        initial: true,
        mid: true,
        final: true,
        winners: true,
      }
    );
    //console.log(resul, 'Este es resul')
    const arrAndPosit = await changeNextBracket(resul, winnerAct, IDUP);
  } else {
    res.json({
      alert:
        'Disculpe no existe un torneo con estas caracteristicas \n Por favor actualizar pagina.',
    });
  }
});

// - - - - - - - - - - - - - - PUT
//-> EDITANDO EL TORNEO
orgRouter.put('/editElements/:IDT', async (req, res) => {
  const { tournamentName, cMax, tDate, tStart, tAward, server } = req.body;

  console.log(req.body);

  const result = await Tournament.findById(req.params.IDT);

  var name = String;
  var teams = Number;
  var date = Date;
  var start = String;
  var award = Number;
  var servidor = String;

  //ternarios
  tournamentName ? (name = tournamentName) : (name = result.tournamentName);
  cMax ? (teams = cMax) : (teams = teams = result.cMax);
  tDate ? (date = tDate) : (date = result.tDate);
  tStart ? (start = tStart) : (start = result.tStart);
  tAward ? (award = tAward) : (award = result.tAward);
  server ? (servidor = server) : (servidor = result.server);

  const nuevoTorneo = {
    tournamentName: name,
    cMax: teams,
    tDate: date,
    tStart: start,
    tAward: award,
    server: servidor,
  };

  await Tournament.findByIdAndUpdate(req.params.IDT, nuevoTorneo);

  res.json('Torneo Actualizado');
});

module.exports = orgRouter;
