const express = require('express');
const router = express.Router();
const Tournament = require('../../models/games/fifa-pes/tournaments.js');
const User = require('../../models/users/users.js');
const Repository = require('../../models/games/repository/repository.js');
const Teams = require('../../models/users/teams.js');
const Customer = require('../../models/users/customer.js');
const cloudinary = require('cloudinary');
const fs = require('fs-extra');
const { cloudinaryConfig } = require('../../../config/default.js');
const {
  checkImage,
  actualBracket,
  checkOutPerPlayer1x1,
  preparingAndReady,
  checkLastPlayersCleanAndPrepare,  
  checkWhereWeAre,
  remplaceBattleInModel
} = require('../routes-methods/tournaments/tournamentsFunctions');
const {
  sendMailForEveryPlayerInsidetheTeam,
} = require('../routes-methods/mails/sendMessages');
const { 
  actualIntanceIdentify
} = require("../../server-functions/automaticProcessTest")

cloudinary.config({
  cloud_name: cloudinaryConfig.cldName,
  api_key: cloudinaryConfig.key,
  api_secret: cloudinaryConfig.secret,
});

//  - - - - -  GET
//-> ACTUALIZADOR
router.get('/updater/:IDT', async (req, res) => {
  const data = await Tournament.findById(
    { _id: req.params.IDT },
    { iTournament: 1 }
  );

  return res.json(data.iTournament);
});
//-->Eliminando ID de Torneo
router.get('/UnEnroll/:IDT/:ID', async (req, res) => {
  const { ID, IDT } = req.params;
  var IDU = ID;
  var can = true
  // //console.log(IDU, ' AQUI EL EQUIPO A INSCRIBIR ');
  // //console.log(IDT, ' AQUI EL TORNEO A BUSCAR ');

  const arrData = await Tournament.findById(
    { _id: IDT },
    { tMain: 1, game: 1  }
  );
  //---- Caso especial de equipos
  const arr = arrData.tMain;
  if (arrData.game === 'lol' || arrData.game === 'mobileL') {
    if (
      (await Teams.findOne({ captainID: ID }, { _id: 1 }).countDocuments()) >
        0 ===
      true
    ) {
      var infoTeam = await Teams.findOne({ captainID: ID }, { _id: 1, reputation: 1, player1: 1,
      player2: 1, player3: 1, player4: 1, player5: 1, player6: 1, player7: 1, player8: 1, tournametsEnroll: 1 });
      IDU = infoTeam._id.toString();
      if(infoTeam.tournametsEnroll.includes(IDT)){
        if(infoTeam.reputation.wins > 0 || infoTeam.reputation.lose > 0 || infoTeam.reputation.draw > 0 ){} else {
          var teamPlayersToCheck = [infoTeam.player1.email,
            infoTeam.player2.email,
            infoTeam.player3.email,
            infoTeam.player4.email,
            infoTeam.player5.email,
            infoTeam.player6.email,
            infoTeam.player7.email,
            infoTeam.player8.email,
          ]
          for(var emailCheck=0; emailCheck < teamPlayersToCheck.length; emailCheck++){
            if (
              (await User.findOne({ email: teamPlayersToCheck[emailCheck] }, { _id: 1 }).countDocuments()) >
                0 ===
              true
            ) {
              await User.findOneAndUpdate(
                { email: teamPlayersToCheck[emailCheck] },
                {
                  $pull: { teams: IDU },
                }
              );
            }
          } 
          await Teams.findByIdAndRemove(IDU);
          console.log(teamPlayersToCheck, "teamPlayersToCheck")
        }
      } else {
        can = false
      }
    } else {
      can = false
    }
  }
  
  if(can){
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].ID === IDU) {
        await Tournament.findByIdAndUpdate(
          { _id: IDT, game: req.params.game },
          { $pull: { tMain: arr[i] } },
          { returnNewDocument: true, new: true },
          (err, doc) => {
            if (err) {
              //console.log('Something wrong when updating data!');
              res.json(
                'Es posible que el Torneo ya finalizo porfavor actualice o vuelva a ingresar con su usuario.'
              );
            } else {
              const tMain = doc.tMain;
              //console.log(tMain, `este es tMain`);
              return res.json(tMain);
            }
          }
        );
        break;
      } else {
        //console.log('not enroll please check UnEnroll');
      }
    }  
  } else {
    return res.json({alert: "Lo sentimos su usuario no se escuentra autorizado para desinscribir el equipo."})
  }
});
//-> SOLICITANDO INFORMACION DE TORNEO - Tournaments Pages
router.get('/:IDT/:ID', async (req, res) => {
  const { IDT, ID } = req.params;
  var IDU = ID;
  var actualArrBr = [];
  var renderTDay = [];
  var mainColor = '';
  var userEnrolled = false;
  var userInActualBr = '';
  var waitingOrg = false;
  var checkOut = false;
  var readyBattle = false;
  var waitingOrgTiebreak = false;
  var checkoutTiebreak = false;
  var rival = {
    rivalInfo: {},
    rivalReady: false,
    userNickname: ""
  };
  var forTiebreaks = {
    inTiebreak: false,
    readyBattle: false,
    waitingOrg: false,
  }; 
  var teamExistent = {
    teamsName: '',
    player1: '',
    player2: '',
    player3: '',
    player4: '',
    player5: '',
    player6: '',
    player7: '',
    player8: '',
  };
  var teamsCapitan = false;
  var arrReady = [];
  var arrReadytie = [];
  var actualInstance = {} 

  if (IDT === undefined || IDT === 'undefined' || IDT === '') {
    return res.json({
      alert:
        '\n\n Disculpe, \n no esta buscando ningun torneo en este momento o sucedio un error de carga de informacion.',
    });
  }
  if (IDT.length > 24 || IDT.length < 24) {
    return res.json({ alert: "\n Disculpe, \n error revise el link e intente nuevamente desde la plataforma.", message: 'load' });
  } else {
    if ((await Tournament.find({ _id: IDT }).countDocuments()) > 0 === true) {
      var todayRun = await Tournament.findById({ _id: IDT });
      renderTDay.push(todayRun);
      actualInstance = await actualIntanceIdentify(IDT)
      console.log(actualInstance)
      //---- Configuracion Especial para Equipos
      if (todayRun.game === 'lol' || todayRun.game === 'mobileL') {
        const userInfo = await User.findOne(
          { _id: req.params.ID },
          { teams: 1, _id: 0 }
        );
        var IDTeam = '0ed00fee00d0f000b000a000';
        var valuesIntMain = Object.values(todayRun.tMain);
        //------ IDTeam exist in the tournament or enroll ?
        for (
          var checkTeamInclude = 0;
          checkTeamInclude < userInfo.teams.length;
          checkTeamInclude++
        ) {
          for (
            var checkInsideTheTournament = 0;
            checkInsideTheTournament < valuesIntMain.length;
            checkInsideTheTournament++
          ) {
            if (
              valuesIntMain[checkInsideTheTournament].ID ===
              userInfo.teams[checkTeamInclude]
            ) {
              IDTeam = userInfo.teams[checkTeamInclude];
              userEnrolled = true;
              break;
            }
          }
        }

        if (
          (await Teams.findById(IDTeam, { _id: 1 }).countDocuments()) > 0 ===
          true
        ) {
          var infoTeam = await Teams.findOne(
            { _id: IDTeam },
            {
              _id: 1,
              player1: 1,
              player2: 1,
              player3: 1,
              player4: 1,
              player5: 1,
              player6: 1,
              player7: 1,
              player8: 1,
              name: 1,
              captainID: 1,
            }
          );

          if (infoTeam.capitanID === ID) {
            teamsCapitan = true;
          }

          IDU = await infoTeam._id.toString();
          teamExistent = {
            teamsName: infoTeam.name,
            player1: infoTeam.player1,
            player2: infoTeam.player2,
            player3: infoTeam.player3,
            player4: infoTeam.player4,
            player5: infoTeam.player5,
            player6: infoTeam.player6,
            player7: infoTeam.player7,
            player8: infoTeam.player8,
          };
        }
      }
      var customInfo = await Customer.findOne(
        { customer: todayRun.customer },
        { personalize: 1 }
      );
      mainColor = await customInfo.personalize.mainColor;
      const actualInfo = actualBracket(todayRun);
      const actualBr = await actualInfo.bracket;
      const tiebreak = await todayRun.tiebreak;
      actualArrBr.push(actualBr);

      //inscripto?
      if (userEnrolled === false) {
        for (var r = 0; r < todayRun.tMain.length; r++) {
          if (IDU === todayRun.tMain[r].ID) {
            userEnrolled = true;
            break;
          }
        }
      }

      //compitiendo?
      if (actualBr.length !== 0) {
        for (var s = 0; s < actualBr.length; s++) {
          if (IDU === actualBr[s][0].ID || IDU === actualBr[s][1].ID) {
            userInActualBr = true;
            waitingOrg = checkImage(actualBr[s], IDU, waitingOrg);
            checkOut = checkOutPerPlayer1x1(actualBr[s], IDU, checkOut);
            actualBr[s][0].ID === IDU
              ? (arrReady = preparingAndReady(
                  actualBr[s],
                  actualBr[s][0],
                  actualBr[s][1]
                ))
              : (arrReady = preparingAndReady(
                  actualBr[s],
                  actualBr[s][1],
                  actualBr[s][0]
                ));
            readyBattle = arrReady[0];
            rival = arrReady[1];
            break;
          } else {
            userInActualBr = false;
          }
        }
      } else {
        userInActualBr = false;
      }

      //desempate?
      if (tiebreak.length !== 0) {
        for (var howMany = 0; howMany < tiebreak.length; howMany++) {
          if (
            IDU === tiebreak[howMany][0].ID ||
            IDU === tiebreak[howMany][1].ID
          ) {
            forTiebreaks.inTiebreak = true;
            forTiebreaks.waitingOrg = checkImage(
              tiebreak[howMany],
              IDU,
              waitingOrgTiebreak
            );
            checkOut = checkOutPerPlayer1x1(
              tiebreak[howMany],
              IDU,
              checkoutTiebreak
            );
            tiebreak[howMany][0].ID === IDU
              ? (arrReadytie = preparingAndReady(
                  tiebreak[howMany],
                  tiebreak[howMany][0],
                  tiebreak[howMany][1]
                ))
              : (arrReadytie = preparingAndReady(
                  tiebreak[howMany],
                  tiebreak[howMany][1],
                  tiebreak[howMany][0]
                ));
            forTiebreaks.readyBattle = arrReadytie[0];
            rival = arrReadytie[1];
            break;
          } else {
            forTiebreaks.inTiebreak = false;
          }
        }
      }

      if (
        userInActualBr === false ||
        userInActualBr === true //<--- caso de emergencia
      ) {
        console.log(userEnrolled, 'THIS IS RIVAL');
        res.json({
          tInfo: renderTDay[0],
          userEnrolled: userEnrolled,
          waitingOrg: waitingOrg, //a;adir en front    <--- esperan respuesta al subir la  foto
          userInActualBr: userInActualBr,
          mainColor: mainColor, //a;adir en front    <--- el usuario paso el bracket ?
          checkOut: checkOut,
          readyBattle: readyBattle,
          inTiebreak: forTiebreaks,
          teamExistent: teamExistent,
          teamsCapitan: teamsCapitan,
          rival: rival,
          actualInstance: actualInstance[0]
        });
      } else {
        res.json({
          alert: 'Error: Procesos afectados por alteracion de datos disculpe.',
        });
      }
    } else {
      return res.json({
        alert:
          '\n\n Disculpe, \n Este link no corresponde a informacion valida porfavor intente desde nuevamente desde la plataforma.',
      });
    }
  }
});
//-> BUSCANDO TORNEO MENSUALES
router.get('/information/personalize/:customer', async (req, res) => {
  const dinamicsCustomerInfo = await Customer.findOne(
    { customer: req.params.customer },
    {
      gamesInfo: 1,
      personalize: 1,
    }
  );
  const namesTournament = await Tournament.find(
    { customer: req.params.customer, validTournament: true },
    { game: 1 }
  ).sort({ game: 1 });
  const customerGames = dinamicsCustomerInfo.gamesInfo;
  var gameListJson = require('../../../src/jsons/gamesList.json');

  var customerGameResponse = [];
  var personalize = await dinamicsCustomerInfo.personalize;

  for (const parsingCustomerGame in customerGames) {
    for (const dataBaseGame in gameListJson) {
      if (parsingCustomerGame === dataBaseGame) {
        var IDsPerGame = [];
        //revision de si esta corriendo el torneo ... posicion posible para function filterPerGame
        for (
          var checkedActID = 0;
          checkedActID < namesTournament.length;
          checkedActID++
        ) {
          // filtro por juego
          if (parsingCustomerGame === namesTournament[checkedActID].game) {
            var existenciaTheId = customerGames[parsingCustomerGame].IDTs.map(
              (e) => {
                return e.IDTs;
              }
            ).indexOf(namesTournament[checkedActID]._id);
            existenciaTheId !== -1
              ? ''
              : IDsPerGame.push(namesTournament[checkedActID]._id);
          }
        }

        var matchedGame = {
          responseData: {
            IDTs: IDsPerGame,
            customersImage: customerGames[parsingCustomerGame].customersImage,
            gameKey: parsingCustomerGame,
          },
          gameListData: {
            defaultImg: gameListJson[parsingCustomerGame].defaultImg,
            news: gameListJson[parsingCustomerGame].news,
            offer: gameListJson[parsingCustomerGame].offer,
            displayName: gameListJson[parsingCustomerGame].displayName,
          },
        };
        customerGameResponse.push(matchedGame);
      }
    }
  }

  return res.json({ customerGameResponse, personalize });
});
//-> REPORTAR EMPATE
router.get('/draw/:IDT/:IDU/:forRound/:game',async (req,res) => {
  
  const { IDT, IDU, forRound, game } = req.params 
  var actual = await checkWhereWeAre(IDT , forRound)  
  var bracketAct = actual[0]

  async function reportDarw(bracketPosition, bracketToSafe, numberI){
    var juego = bracketPosition;
    juego[5].bool = true
    bracketAct.splice(numberI, 1, juego);

    await remplaceBattleInModel(bracketToSafe, bracketAct, IDT)    
  }

  for (var i = 0; i < bracketAct.length; i++) {
    if (bracketAct[i][0].ID === IDU || bracketAct[i][1].ID === IDU) {
      reportDarw(bracketAct[i], actual[1], i);
    }
  }

  console.log("listo")
  return res.json({status:200})

})

//  - - - - -  POST
//-> SUBIENDO IMAGEN DEL VS Y HACIENDO CHECKOUT POR PARTIDA
router.post('/finalRound/:Dinamic/:forRound', async (req, res) => {
  const { Dinamic, forRound } = req.params;
  var obj = JSON.parse(JSON.stringify(req.body));
  console.log(obj, "OBJ")
  const arrsafe = [obj.IDU, obj.nickname];

  var tInfoSearched = await Tournament.findOne(
    { _id: obj.IDT },
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
  var bracketAct = [];

  if (forRound === 'normal') {
    var actualInfo = actualBracket(tInfoSearched);
    bracketAct = actualInfo.bracket;
  } else if (forRound === 'tiebreak') {
    bracketAct = tInfoSearched.tiebreak;
  }

  async function loadImage(){
    if(req.file.path){
      var result = await cloudinary.v2.uploader.upload(
        req.file.path,
        { folder: `Customers/${obj.customer}/Tournaments/${obj.game}` },
        function (error, result) {
          ////console.log(result, error, "<----- PULIR Y TRABAJAR CON ERROR 244 API/TOURNAMENT/FINALROUND");
        }
      );
      var splitedUrl = result.secure_url.split('/');
      var editImageToBetterForm = 'q_auto/c_scale,w_600/';
      var finalUrl =
        splitedUrl[0] +
        '/' +
        splitedUrl[1] +
        '/' +
        splitedUrl[2] +
        '/' +
        splitedUrl[3] +
        '/' +
        splitedUrl[4] +
        '/' +
        splitedUrl[5] +
        '/' +
        editImageToBetterForm +
        splitedUrl[6] +
        '/' +
        splitedUrl[7] +
        '/' +
        splitedUrl[8] +
        '/' +
        splitedUrl[9] +
        '/' +
        splitedUrl[10] +
        '/' +
        splitedUrl[11];
      arrsafe.push(finalUrl);
      await fs.unlink(req.file.path);
    } else {
      return res.json({alert: "Disculpe debe colocar una imagen para proseguir"})
    }
  }

  async function saveInfo(bracketPosition, bracketToSafe, numberI) {
    var juego = bracketPosition;

    function cambiarValor(valorABuscar, valorViejo, valorNuevo, my_array) {
      my_array.forEach(function (elemento) { // recorremos el array
      
         //asignamos el valor del elemento dependiendo del valor a buscar, validamos que el valor sea el mismo y se reemplaza con el nuevo. 
        elemento[valorABuscar] = elemento[valorABuscar] == valorViejo ? valorNuevo : elemento[valorABuscar]
      })
    }

    function checkAndModify(){
      console.log("PASANDO")
      var options = [juego[4].lifes]
      for (var etiqueta in juego[4].lifes) {
        var newValue = juego[4].lifes[etiqueta] - 1 
        if(etiqueta === obj.rivalID) {
          if(juego[4].lifes[etiqueta] === 1){
            cambiarValor(obj.rivalID, juego[4].lifes[etiqueta], newValue, options)
            juego[4].lifes = options[0]
            juego[3].push(arrsafe);             
          } else {
            cambiarValor(obj.rivalID, juego[4].lifes[etiqueta], newValue, options)
            juego[4].lifes = options[0]
            juego[4].shotPic.push(arrsafe);
          }         
        }
        console.log(typeof juego[4].lifes[etiqueta], juego[4].lifes[etiqueta], "newValue")
      }
      console.log(juego[4].lifes, "juego[4].lifes")
    }
    //necesito que siempre que se suba una imagen se suba que conoce la persona como draw (true or false) 
    async function Draw(){
      if(juego[5] === obj.draw){  
        console.log("KNOW DRAW")      
        loadImage()
        juego[5] = false
        checkAndModify()
      } else {
        console.log("DONT KNOW DRAW")      
        pass = false
        req.file.path ? await fs.unlink(req.file.path) : ""
        //return res.json({alert: "disculpe se informo de un empate si por lo contrario no hubo alguno \n comunicarse con el organizador para estar al tanto y facilitar proceso."})
      }
    }

    if (Dinamic === 'UpImage') { 
      if(obj.lifes > 0){
        if(juego[5].bool){
          Draw()
        } else {
          loadImage()
          checkAndModify()
        }
      } else {
        return res.json({alert: "Por favor evite jugar con los valores del Front"})
      }      
    } else {
      if(juego[2].includes(arrsafe)){        
       }else{
        juego[2].push(arrsafe);
      }      
    }

    bracketAct.splice(numberI, 1, juego);

    if (bracketToSafe === 'tBracket') {
      await Tournament.findOneAndUpdate(
        { _id: obj.IDT },
        { tBracket: bracketAct }
      );

      return res
        .status(200)
        .redirect(`/#/${obj.game}-tournament/-t_${obj.IDT}`);
    }
    if (bracketToSafe === 'pe1024') {
      await Tournament.findOneAndUpdate(
        { _id: obj.IDT },
        { pe1024: bracketAct }
      );

      return res
        .status(200)
        .redirect(`/#/${obj.game}-tournament/-t_${obj.IDT}`);
    }
    if (bracketToSafe === 'pe512') {
      await Tournament.findOneAndUpdate(
        { _id: obj.IDT },
        { pe512: bracketAct }
      );

      return res
        .status(200)
        .redirect(`/#/${obj.game}-tournament/-t_${obj.IDT}`);
    }
    if (bracketToSafe === 'pe256') {
      await Tournament.findOneAndUpdate(
        { _id: obj.IDT },
        { pe256: bracketAct }
      );

      return res
        .status(200)
        .redirect(`/#/${obj.game}-tournament/-t_${obj.IDT}`);
    }
    if (bracketToSafe === 'pe128') {
      await Tournament.findOneAndUpdate(
        { _id: obj.IDT },
        { pe128: bracketAct }
      );

      return res
        .status(200)
        .redirect(`/#/${obj.game}-tournament/-t_${obj.IDT}`);
    }
    if (bracketToSafe === 'pe64') {
      await Tournament.findOneAndUpdate({ _id: obj.IDT }, { pe64: bracketAct });

      return res
        .status(200)
        .redirect(`/#/${obj.game}-tournament/-t_${obj.IDT}`);
    }
    if (bracketToSafe === 'pe32') {
      await Tournament.findOneAndUpdate({ _id: obj.IDT }, { pe32: bracketAct });

      return res
        .status(200)
        .redirect(`/#/${obj.game}-tournament/-t_${obj.IDT}`);
    }
    if (bracketToSafe === 'pe16') {
      await Tournament.findOneAndUpdate({ _id: obj.IDT }, { pe16: bracketAct });

      return res
        .status(200)
        .redirect(`/#/${obj.game}-tournament/-t_${obj.IDT}`);
    }
    if (bracketToSafe === 'pe8') {
      await Tournament.findOneAndUpdate({ _id: obj.IDT }, { pe8: bracketAct });

      return res
        .status(200)
        .redirect(`/#/${obj.game}-tournament/-t_${obj.IDT}`);
    }
    if (bracketToSafe === 'pe4') {
      await Tournament.findOneAndUpdate({ _id: obj.IDT }, { pe4: bracketAct });

      return res
        .status(200)
        .redirect(`/#/${obj.game}-tournament/-t_${obj.IDT}`);
    }
    if (bracketToSafe === 'pe2') {
      await Tournament.findOneAndUpdate({ _id: obj.IDT }, { pe2: bracketAct });

      return res
        .status(200)
        .redirect(`/#/${obj.game}-tournament/-t_${obj.IDT}`);
    }
    if (bracketToSafe === 'tiebreak') {
      await Tournament.findOneAndUpdate(
        { _id: obj.IDT },
        { tiebreak: bracketAct }
      );

      return res
        .status(200)
        .redirect(`/#/${obj.game}-tournament/-t_${obj.IDT}`);
    }
  }

  for (var i = 0; i < bracketAct.length; i++) {
    if (bracketAct[i][0].ID === obj.IDU || bracketAct[i][1].ID === obj.IDU) {
      if (forRound === 'normal') {
        saveInfo(bracketAct[i], actualInfo.position, i);
      }
      if (forRound === 'tiebreak') {
        saveInfo(bracketAct[i], 'tiebreak', i);
      }
    }
  }
});
//-> MENSAJE GLOBAL POR TORNEO  -- Mensaje por zona
router.post('/vipMessage/:IDT', async (req, res) => {
  const { newVipMessage } = req.body;

  await Tournament.findByIdAndUpdate(
    { _id: req.params.IDT },
    { vipMessage: newVipMessage },
    { returnNewDocument: true, new: true },
    (err, doc) => {
      if (err) {
      } else {
        const vipMessage = doc.vipMessage;
        return res.json(vipMessage).status(200);
      }
    }
  );
});
//-> ACTUALIZADOR DE CHECKED
router.post('/actualizarCheck', async (req, res) => {
  const obj = req.body;
  const tInfoSearched = await Tournament.findOne(
    { _id: obj.IDT },
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
    }
  );

  const actualInfo = actualBracket(tInfoSearched);
  const actualBr = actualInfo.bracket;
  const position = actualInfo.position;

  function saveInfo(bracketVS, position, i) {
    const conf1 = tInfoSearched.checked.includes(`${bracketVS[0].ID}`);
    const conf2 = tInfoSearched.checked.includes(`${bracketVS[1].ID}`);

    if (conf1 === true && conf2 === true) {
      return res.json({ vs: true, message: 'Listo', status: 200 });
    } else {
      return res.json({ vs: false, message: 'Listo', status: 200 });
    }
  }

  for (var i = 0; i < actualBr.length; i++) {
    if (actualBr[i][0].ID === obj.IDU || actualBr[i][1].ID === obj.IDU) {
      saveInfo(actualBr[i], position, i);
    }
  }
});

//  - - - - -  PUT
//-> INSCRIBIENDO  A TORNEO
router.put('/enroll/:IDT/:whoEnroll', async (req, res) => {
  var { IDT, whoEnroll } = req.params;
  var main = {};
  var valueArr = Object.values(req.body.inputsValue);
  var keysArr = Object.keys(req.body.inputsValue);
  var toSend = {};
  var IDTeam = '';
  var objToCheckInfo = {
    valueArr: valueArr,
    keysArr: keysArr,
    whoSend: '',
    customer: req.body.customer,
    teamActual: [],
    teamName: '',
    preExistentAccount: [],
  };
  console.log(req.body, "req.body")
  
  if (whoEnroll === 'user') {
    if (
      (await User.find({ _id: req.body.IDU }, { _id: 1 }).countDocuments()) >
        0 ===
      true
    ) {    
      await User.findByIdAndUpdate(
        { _id: req.body.IDU },
        {
          nickname: valueArr[0],
          $addToSet: { nicknamesHistory: valueArr[0] },
        }
      );
      main = {
        //ID, name, nickname y photo
        ID: req.body.IDU,
        name: req.body.name,
        nickname: valueArr[0],
        pic: req.body.picture,
      };
    }
  }
  if (whoEnroll === 'team') {
    var defaultObj = {
      nickname: '',
      email: '',
      image: '',
      IDU: '',
      capitan: false,
      verify: false,
    };
    var team = {
      player1: defaultObj,
      player2: defaultObj,
      player3: defaultObj,
      player4: defaultObj,
      player5: defaultObj,
      player6: defaultObj,
      player7: defaultObj,
      player8: defaultObj,
      player9: defaultObj,
      player10: defaultObj,
      player11: defaultObj,
      player12: defaultObj,
      player13: defaultObj,
      player14: defaultObj,
      player15: defaultObj,
      player16: defaultObj,
      name: '',
      captainID: '',
      logo: '',
      game: '',
    };

    function checkPreExistent(teamInfo, whereSafeInfo) {
      keysOfActualTeamArr = Object.keys(teamInfo);
      valuesOfActualTeamArr = Object.values(teamInfo);
      ////console.log(teamInfo)
      for (
        var teamSize = 0;
        teamSize < valuesOfActualTeamArr.length;
        teamSize++
      ) {
        if (keysOfActualTeamArr[teamSize].includes(`player`)) {
          if (valueArr.includes(valuesOfActualTeamArr[teamSize].email)) {
            whereSafeInfo.push(valuesOfActualTeamArr[teamSize].email);
          }
        }
      }
    }

    if ( //FALTA CUANDO UN EQUIPO YA EXISTE Y GANO
      (await Teams.find({ captainID: req.body.captainID }).countDocuments()) >
        0 ===
      true
    ) {
      var teamInfo = await Teams.findOne(
        { captainID: req.body.captainID },
        {
          _id: 1,
          name: 1,
          logo: 1,
          player1: 1,
          player2: 1,
          player3: 1,
          player4: 1,
          player5: 1,
          player6: 1,
          player7: 1,
          player8: 1,
        }
      );
      main = {
        //ID, teamsName, capitanName y pic
        ID: teamInfo._id.toString(),
        name: req.body.inputsValue.teamName,
        capitanName: req.body.name,
        pic: teamInfo.logo,
      };
      console.log(req.body, "teamInfo.name")
      checkPreExistent(teamInfo, objToCheckInfo.teamActual);
      IDTeam = teamInfo._id;
      objToCheckInfo.teamName = teamInfo.name;
    } else {
      //------------ Armando team
      console.log(valueArr[i], "valueArr[i]")
      for (var i = 0; i < valueArr.length; i++) {
        if (keysArr[i].includes('player')) {
          if(i === 2){}else {
            if (keysArr[i] === 'player1') {
              team[keysArr[i]] = {
                nickname: valueArr[i].trim(),
                email: req.body.email.trim(),
                image: req.body.picture,
                capitan: true,
                verify: true,
              };
            } else {
              team[keysArr[i-1]] = {
                nickname: '',
                email: valueArr[i].trim(),
                image: req.body.picture,
                IDU: '',
                capitan: false,
                verify: false,
              };
            }
          }
        }
      }
      team['captainID'] = req.body.captainID;
      team['logo'] = req.body.picture;
      team['game'] = [req.body.game];
      team['name'] = req.body.inputsValue.teamName;

      //--- Creando Equipo
      await Teams.create(team).then((newteamcreated) => {
        IDTeam = newteamcreated._id.toString();
      });
      main = {
        ID: IDTeam,
        name: req.body.inputsValue.teamName,
        capitanName: req.body.name,
        pic: req.body.picture,
      };
      toSend['IDTeam'] = IDTeam;
      objToCheckInfo.teamName = team.name;
    }

    async function checkInfoOfEveryPlayer() {
      for (var i = 0; i < valueArr.length; i++) {
        if (keysArr[i].includes(`player`)) {
          if(i === 2){}else{
            if (
              (await User.find({ email: valueArr[i].trim() }).countDocuments()) > 0 ===
              true
            ) {
              objToCheckInfo.preExistentAccount.push(valueArr[i].trim());
            }
          }
        }
      }

      await User.findByIdAndUpdate(
        { _id: req.body.captainID },
        {
          $addToSet: { teams: IDTeam },
        },
        { returnNewDocument: true, new: true },
        (err, doc) => {
          objToCheckInfo.whoSend = doc.email;
        }
      );
    }

    await checkInfoOfEveryPlayer();
    //------ Enviar Mensaje a Jugadores ---- //
    sendMailForEveryPlayerInsidetheTeam(IDTeam, objToCheckInfo);
  }

  //------ Proceso indentificatorio dentro del Bracket
  if (main !== {}) {
    if ((await Tournament.find({ _id: IDT }).countDocuments()) > 0 === true) {
      var data = await Tournament.findById(
        { _id: IDT },
        { tMain: 1, cMax: 1, iTournament: 1 }
      );
      var automatic = data.tMain.length + 1;
      if(data.tMain.includes(main)){ 
        res.json({
          alert:
            'Por favor actulizar la pagina ya que su usuario ya se encuentra registrado.',
        });
      }else{
        if (true) {
          //<---- Valor por si se desea que las personas puedan participar mas de una vez en el torneo
          if (
            (await Repository.find({ IDT: IDT }, { tMain: 1 }).countDocuments()) >
              0 ===
            true
          ) {
            var tMainOfRepository = await Repository.findOne(
              { IDT: IDT },
              { tMain: 1 }
            );
            var tMainToUse = checkLastPlayersCleanAndPrepare(
              data.tMain,
              tMainOfRepository.tMain
            );
            automatic = tMainToUse.length + 1;
          }
        }
        var close = data.iTournament;
        
        if (data.cMax === automatic) {
          if (IDTeam !== '') {
            await Teams.findByIdAndUpdate(
              { _id: IDTeam },
              {
                $addToSet: { tournametsEnroll: IDT },
              }
            );
          }

          await Tournament.findByIdAndUpdate(
            { _id: IDT },
            { $addToSet: { tMain: main }, $set: { iTournament: 2 } },
            { returnNewDocument: true, new: true },
            (err, doc) => {
              if (err) {
                res.json({
                  alert:
                    'Es posible que el Torneo ya finalizo porfavor actualice o vuelva a ingresar con su usuario.',
                });
              } else {
                return res.json(doc.tMain); 
              }
            }
          );
        } else {
          if (close === 1) {
            if (IDTeam !== '') {
              await Teams.findByIdAndUpdate(
                { _id: IDTeam },
                {
                  $addToSet: { tournametsEnroll: IDT },
                }
              );
            }
            await Tournament.findByIdAndUpdate(
              { _id: IDT },
              { $addToSet: { tMain: main } },
              { returnNewDocument: true, new: true },
              (err, doc) => {
                if (err) {
                  res.json({
                    alert:
                      'Es posible que el Torneo ya finalizo porfavor actualice o vuelva a ingresar con su usuario.',
                  });
                } else {
                  return res.json(doc.tMain);
                }
              }
            );
          } else {
            return res.json({
              alert:
                'Por favor actualiza la pagina seguramente ya culmino el proceso de inscripción \n de lo contrario informanos para estar al tanto de su error.',
            });
          }
        };
      };
    } else {
      res.json({
        alert:
          'Por favor actulizar la pagina para continuar ya que hubo un inconveniente.',
      });
    }
  } else {
    res.json({
      alert:
        'Disculpe por favor vuelve a iniciar sesion al parecer hubo un error con la informacion obtenida.',
    });
  }
});

module.exports = router;

/*
 * Leyenda:
 * 0 = Preparing, Esperando a recibir informacion
 * 1 = Torneo abierto
 * 2 = Cerro torneo
 * 3 = Torneo en curso
 * posible 4 = Torneo automatico
 */
