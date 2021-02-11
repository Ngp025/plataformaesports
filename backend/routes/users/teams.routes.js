const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary');
const fs = require('fs-extra');
const Teams = require('../../models/users/teams.js');
const User = require('../../models/users/users.js');
const {
  playersTeam,
  reEstructureTeamInAArray,
  addNewValuesToSomeoneInTheTeam,
} = require('../routes-methods/teams/teamsFunctions');

//Registrando Team
router.post('/register', async (req, res) => {
  var { newTeam } = req.body;

  if (
    !newTeam.creatorID ||
    !newTeam.name ||
    !newTeam.email ||
    !newTeam.logo ||
    !newTeam.game
  ) {
    console.log('ERROR');
    res
      .status(200)
      .json('ERROR por modificacion de front posiblemente mal intencionada.');
  } else {
    console.log(newTeam);
    await Teams.findOne({ email: newUser.email })
      .then((team) => {
        if (!team) {
          const newTeamToSave = {
            creatorID: newTeam.creatorID,
            name: newTeam.name,
            email: newTeam.email,
            logo: newTeam.logo,
            game: [newTeam.game],
          };

          Teams.create(newTeamToSave)
            .then((newteamcreated) => {
              const TeamInfo = {
                _id: newteamcreated._id,
                creatorID: newTeam.creatorID,
                name: newTeam.name,
                email: newTeam.email,
                logo: newTeam.logo,
                game: newteamcreated.game,
              };

              return res.json(TeamInfo);
            })
            .catch((err) => {
              console.log(err);
              res.send({ 'error: ': err });
            });
        } else {
          return res.status(409).json({
            message: 'Email already exists',
          });
        }
      })
      .catch((err) => {
        return res.send('error: ' + err);
      });
  }
});

//Agregando nuevo jugador del Equipo
router.post('/addMembers/:IDTeam', async (req, res) => {
  console.log(req.body, 'Body user');
  const { IDTeam } = req.params;
  var arrayWithNewTeam = [];
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
  };

  const teamsData = await Teams.findOne(
    { _id: IDTeam },
    {
      player1: 1,
      player2: 1,
      player3: 1,
      player4: 1,
      player5: 1,
      player6: 1,
      player7: 1,
      player8: 1,
      player9: 1,
      player10: 1,
      player11: 1,
      player12: 1,
      player13: 1,
      player14: 1,
      player15: 1,
      player16: 1,
    }
  ).sort(1);

  //check_Infomation_Of_The_Team
  var infoForMoreDetails = playersTeam(teamsData);
  function assemblingObjet(value) {
    var regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    var objectForFinalResult = {};
    if (regex.test(value) === true) {
      objectForFinalResult['email'] = value;
    } else {
      var num = 0;
      var string = `optional${num}`;
      objectForFinalResult[string] = value;
      num++;
    }
    arrayWithNewTeam.push(objectForFinalResult);
  }

  req.body.team.map(assemblingObjet);

  console.log(arrayWithNewTeam, 'objeto ya armado');

  function finalEditStructure(
    actualTeam,
    newPlayer,
    howManyExisteAtThisMoment
  ) {
    switch (howManyExisteAtThisMoment) {
      case 0:
        team;
        break;
      case 1:
        team.player1 = actualTeam[0];
        team.player2 = newPlayer;
        break;
      case 2:
        team.player1 = actualTeam[0];
        team.player2 = actualTeam[1];
        team.player3 = newPlayer;
        break;
      case 3:
        team.player1 = actualTeam[0];
        team.player2 = actualTeam[1];
        team.player3 = actualTeam[2];
        team.player4 = newPlayer;
        break;
      case 4:
        team.player1 = actualTeam[0];
        team.player2 = actualTeam[1];
        team.player3 = actualTeam[2];
        team.player4 = actualTeam[3];
        team.player5 = newPlayer;
        break;
      case 5:
        team.player1 = actualTeam[0];
        team.player2 = actualTeam[1];
        team.player3 = actualTeam[2];
        team.player4 = actualTeam[3];
        team.player5 = actualTeam[4];
        team.player6 = newPlayer;
        break;
      case 6:
        team.player1 = actualTeam[0];
        team.player2 = actualTeam[1];
        team.player3 = actualTeam[2];
        team.player4 = actualTeam[3];
        team.player5 = actualTeam[4];
        team.player6 = actualTeam[5];
        team.player7 = newPlayer;
        break;
      case 7:
        team.player1 = actualTeam[0];
        team.player2 = actualTeam[1];
        team.player3 = actualTeam[2];
        team.player4 = actualTeam[3];
        team.player5 = actualTeam[4];
        team.player6 = actualTeam[5];
        team.player7 = actualTeam[6];
        team.player8 = newPlayer;
        break;
      case 8:
        team.player1 = actualTeam[0];
        team.player2 = actualTeam[1];
        team.player3 = actualTeam[2];
        team.player4 = actualTeam[3];
        team.player5 = actualTeam[4];
        team.player6 = actualTeam[5];
        team.player7 = actualTeam[6];
        team.player8 = actualTeam[7];
        team.player9 = newPlayer;
        break;
      case 9:
        team.player1 = actualTeam[0];
        team.player2 = actualTeam[1];
        team.player3 = actualTeam[2];
        team.player4 = actualTeam[3];
        team.player5 = actualTeam[4];
        team.player6 = actualTeam[5];
        team.player7 = actualTeam[6];
        team.player8 = actualTeam[7];
        team.player9 = actualTeam[8];
        team.player10 = newPlayer;
        break;
      case 10:
        team.player1 = actualTeam[0];
        team.player2 = actualTeam[1];
        team.player3 = actualTeam[2];
        team.player4 = actualTeam[3];
        team.player5 = actualTeam[4];
        team.player6 = actualTeam[5];
        team.player7 = actualTeam[6];
        team.player8 = actualTeam[7];
        team.player9 = actualTeam[8];
        team.player10 = actualTeam[9];
        team.player11 = newPlayer;
        break;
      case 11:
        team.player1 = actualTeam[0];
        team.player2 = actualTeam[1];
        team.player3 = actualTeam[2];
        team.player4 = actualTeam[3];
        team.player5 = actualTeam[4];
        team.player6 = actualTeam[5];
        team.player7 = actualTeam[6];
        team.player8 = actualTeam[7];
        team.player9 = actualTeam[8];
        team.player10 = actualTeam[9];
        team.player11 = actualTeam[10];
        team.player12 = newPlayer;
        break;
      case 12:
        team.player1 = actualTeam[0];
        team.player2 = actualTeam[1];
        team.player3 = actualTeam[2];
        team.player4 = actualTeam[3];
        team.player5 = actualTeam[4];
        team.player6 = actualTeam[5];
        team.player7 = actualTeam[6];
        team.player8 = actualTeam[7];
        team.player9 = actualTeam[8];
        team.player10 = actualTeam[9];
        team.player11 = actualTeam[10];
        team.player12 = actualTeam[11];
        team.player13 = newPlayer;
        break;
      case 13:
        team.player1 = actualTeam[0];
        team.player2 = actualTeam[1];
        team.player3 = actualTeam[2];
        team.player4 = actualTeam[3];
        team.player5 = actualTeam[4];
        team.player6 = actualTeam[5];
        team.player7 = actualTeam[6];
        team.player8 = actualTeam[7];
        team.player9 = actualTeam[8];
        team.player10 = actualTeam[9];
        team.player11 = actualTeam[10];
        team.player12 = actualTeam[11];
        team.player13 = actualTeam[12];
        team.player14 = newPlayer;
        break;
      case 14:
        team.player1 = actualTeam[0];
        team.player2 = actualTeam[1];
        team.player3 = actualTeam[2];
        team.player4 = actualTeam[3];
        team.player5 = actualTeam[4];
        team.player6 = actualTeam[5];
        team.player7 = actualTeam[6];
        team.player8 = actualTeam[7];
        team.player9 = actualTeam[8];
        team.player10 = actualTeam[9];
        team.player11 = actualTeam[10];
        team.player12 = actualTeam[11];
        team.player13 = actualTeam[12];
        team.player14 = actualTeam[13];
        team.player15 = newPlayer;
        break;
      case 15:
        team.player1 = actualTeam[0];
        team.player2 = actualTeam[1];
        team.player3 = actualTeam[2];
        team.player4 = actualTeam[3];
        team.player5 = actualTeam[4];
        team.player6 = actualTeam[5];
        team.player7 = actualTeam[6];
        team.player8 = actualTeam[7];
        team.player9 = actualTeam[8];
        team.player10 = actualTeam[9];
        team.player11 = actualTeam[10];
        team.player12 = actualTeam[11];
        team.player13 = actualTeam[12];
        team.player14 = actualTeam[13];
        team.player15 = actualTeam[14];
        team.player16 = newPlayer;
        break;
    }
    infoForMoreDetails.arrayWithPlayers.push(newPlayer);
    howManyExisteAtThisMoment + 1;
    return team;
  }

  var howManyExisteAtThisMoment = infoForMoreDetails.arrayWithPlayers.length;
  var WhoNeedEmail = [];
  for (
    var passForNewPlayers = 0;
    passForNewPlayers < arrayWithNewTeam.length;
    passForNewPlayers++
  ) {
    if (
      !infoForMoreDetails.emailsRegistered.includes(
        arrayWithNewTeam[passForNewPlayers].email
      )
    ) {
      WhoNeedEmail.push(arrayWithNewTeam[passForNewPlayers].email);
      team = finalEditStructure(
        infoForMoreDetails.arrayWithPlayers,
        arrayWithNewTeam[passForNewPlayers],
        howManyExisteAtThisMoment
      );
    }
  }

  //-------Proceso de enviar emails
  console.log(
    'Waiting: Active el guardado silenciado para culminar la operacion '
  );
  /*
  await Teams.findByIdAndUpdate(
    req.params.IDTeam,
    {
      $set: {
        player1: team.player1,
        player2: team.player2,
        player3: team.player3,        
        player4: team.player4,        
        player5: team.player5,
        player6: team.player6,        
        player7: team.player7,
        player8: team.player8,        
        player9: team.player9,        
        player10: team.player10,        
        player11: team.player11,
        player12: team.player12,
        player13: team.player13,
        player14: team.player14,
        player15: team.player15,
        player16: team.player16,
      },
    },
    { returnNewDocument: true, new: true },
    (err, doc) => {
      if (err) {
        console.log('Something wrong when change info!');
        res.json({
          alert: 'Error al agregar player en el equipo.',
        });
      } else {
        console.log(doc);
        res.json(doc);
      }
    }
  );
  */
});

// Ingresando Imagen a Team
router.post('/changeLogo/:IDTeam/:IDU', async (req, res) => {
  console.log(req.body);
  console.log(req.file, 'Info de imagen');

  const { IDU, IDTeam } = req.params;
  const team = await Teams.findOne({ _id: IDTeam }, { name: 1, public_id: 1 });
  if (team.public_id) {
    const resultOfCleanImage = await cloudinary.v2.uploader.destroy(
      photo.public_id
    );
    console.log(resultOfCleanImage);
  }
  const result = await cloudinary.v2.uploader.upload(
    req.file.path,
    { folder: `Teams/logo/${team.name}` },
    function (error, result) {
      console.log(
        result,
        error,
        '<----- PULIR Y TRABAJAR CON ERROR 244 API/TOURNAMENT/FINALROUND'
      );
    }
  ); //subiendo imagen

  await Teams.findByIdAndUpdate(req.params.IDTeam, {
    $set: {
      logo: result.secure_url,
      public_id: result.public_id,
    },
  });

  await fs.unlink(req.file.path); //eliminando imagen de upload

  return res.redirect(`/`), console.log(`listo`);
});

//Descartando Jugador del equipo
router.post('/goodBye/:IDTeam', async (req, res) => {
  const { email, verify, totalPlayers } = req.body;
  const { IDTeam } = req.params;
  var error = false;
  var newTeam = [];

  for (var i = 0; i < totalPlayers.length; i++) {
    if (totalPlayers[i].email === email && totalPlayers[i].capitan === false) {
      defaultObj = {
        nickname: '',
        email: '',
        image:
          'https://res.cloudinary.com/versus/image/upload/v1595611777/Statics_images/drifuik2xv66qqq7iuu9.png',
        IDU: '',
        capitan: false,
        verify: false,
      };
      newTeam.push(defaultObj);
    } else {
      newTeam.push(totalPlayers[i]);
    }
    if (totalPlayers[i].email === email && totalPlayers[i].capitan === true) {
      error = true;
    }
  }

  if (!error) {
    if (verify) {
      await User.findOneAndUpdate(
        { email: email },
        {
          $pull: { teams: IDTeam },
        }
      );
    }
    await Teams.findOneAndUpdate(
      { _id: req.params.IDTeam },
      {
        player1: newTeam[0],
        player2: newTeam[1],
        player3: newTeam[2],
        player4: newTeam[3],
        player5: newTeam[4],
        player6: newTeam[5],
        player7: newTeam[6],
        player8: newTeam[7],
        /*player9: newTeam[8], player10: newTeam[9],
      player11: newTeam[10], player12: newTeam[11], 
      player13: newTeam[12], player14: newTeam[13], 
      player15: newTeam[14], player16: newTeam[15],*/
      }
    );
    res.json({ message: '¡Cambio realizado con exito! Muchas gracias' });
  } else {
    res.json({ alert: 'Disculpe no se puede eliminar al capitan inscripto.' });
  }
});

// Editando Team
router.put('/editTeam/:IDTeam', async (req, res) => {
  console.log(req.body, 'edit team');

  await Teams.findByIdAndUpdate(
    req.params.IDTeam,
    {
      $set: {
        name: req.body.name,
        //email: req.body.email,
        captainID: req.body.captainID,
      },
    },
    { returnNewDocument: true, new: true },
    (err, doc) => {
      if (err) {
        console.log('Something wrong when change info!');
        res.json({
          alert: 'Error la edificion de perfil no pudo ser completada',
        });
      } else {
        const teamInfo = {
          captainID: doc.captainID,
          name: doc.name,
          logo: doc.logo,
          game: doc.game,
        };
        console.log(doc);
        res.json(teamInfo);
      }
    }
  );
});

// Borrando Team
router.get('/delete/:IDTeam/:creatorID', async (req, res) => {
  const { IDTeam, creatorID } = req.params;
  try {
    var team = await Teams.findById(req.params.IDTeam, {
      creatorID: 1,
      _id: 0,
    });
    if (creatorID === team.creatorID) {
      //await cloudinary.v2.uploader.destroy(publicId);
      if (team.public_id) {
        const result = await cloudinary.v2.uploader.destroy(photo.public_id);
        console.log(result);
      }
      await Teams.findByIdAndRemove(IDTeam);
      console.log('Equipo eliminado!');
      res.json({ message: 'Equipo eliminado', status: 200 });
    } else {
      return res.json({
        alert:
          'Por favor recuerde que solo el creador del equipo puede eliminar el Equipo aunque si esta en el equipo puede retirarse y buscar otro de su preferencia.',
        status: 200,
      });
    }
  } catch {
    res.json({ alert: 'error 2' });
  }
});

//Accepto Team
router.get('/userAccept/:IDTeam/:email', async (req, res) => {
  console.log('PASANDO');
  const { IDTeam, email } = req.params;

  var userNickname = await User.findOne(
    { email: email },
    { nickname: 1, _id: 1 }
  );

  var teamPlayers = await Teams.findById(IDTeam, {
    player1: 1,
    player2: 1,
    player3: 1,
    player4: 1,
    player5: 1,
    player6: 1,
    player7: 1,
    player8: 1,
    _id: 0,
  });

  var teamArr = reEstructureTeamInAArray(teamPlayers);
  const teamArrWithTwoValues = addNewValuesToSomeoneInTheTeam(
    teamArr,
    email,
    userNickname.nickname,
    true
  );

  const theUserExist = teamArrWithTwoValues[1];
  const newTeamArr = teamArrWithTwoValues[0];
  if (theUserExist) {
    await Teams.findOneAndUpdate(
      { _id: IDTeam },
      {
        player1: newTeamArr[0],
        player2: newTeamArr[1],
        player3: newTeamArr[2],
        player4: newTeamArr[3],
        player5: newTeamArr[4],
        player6: newTeamArr[5],
        player7: newTeamArr[6],
        player8: newTeamArr[7],
      }
    );

    await User.findOneAndUpdate(
      { email: email },
      {
        $addToSet: { teams: IDTeam },
      }
    );

    res.json({ message: 'Sucess' });
  } else {
    res.json({
      alert:
        'Disculpe por los momentos no se encuentra registrado en el equipo, hable con su capitan he intentelo mas tarde.',
    });
  }
});

module.exports = router;
