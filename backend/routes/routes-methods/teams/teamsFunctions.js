function playersTeam(data) {
  var information = {
    arrayWithPlayers: [],
    arrayForFreeSpaces: [],
    whoNeedVerify: [],
    countHowManySpacesAreFree: 0,
    countHowManyNeedVerify: 0,
    emailsRegistered: [],
  };

  function clean_Info_Team(playersData) {
    //Como es un map lo que corre esta funcion, cada valor ya esta separado
    if (playersData.IDU) {
      //Pregunta si ya esta ocupado el valor
      if (playersData.IDU.length > 0) {
        //Quienes Estan ?
        information.arrayWithPlayers.push(playersData);
        //Pregunta si no se ha verificado
        if (!playersData.verify) {
          //Informacion para el front por no verificarse
          information.whoNeedVerify.push([
            playersData.nickname,
            playersData.email,
          ]);
          information.countHowManyNeedVerify + 1;
        }
        emailsRegistered.push(playersData.email);
      } else {
        //Estructuramos los valores dentro de los espacios libres
        information.arrayForFreeSpaces.push(playersData);
        //Los contamos
        information.countHowManySpacesAreFree + 1;
      }
    } else {
      //casos donde no se trabajan a los jugadores del team
    }
  }

  data.map(clean_Info_Team);

  return information;
}

function addNewValuesToSomeoneInTheTeam(
  teamActualsPlayersArr,
  email,
  nickname,
  verify
) {
  var existence = false;
  for (var i = 0; i < teamActualsPlayersArr.length; i++) {
    if (teamActualsPlayersArr[i].email === email) {
      teamActualsPlayersArr[i].nickname = nickname;
      teamActualsPlayersArr[i].verify = verify;
      existence = true;
    }
  }
  return [teamActualsPlayersArr, existence];
}

function reEstructureTeamInAArray(teamPlayers) {
  var team = [
    teamPlayers.player1,
    teamPlayers.player2,
    teamPlayers.player3,
    teamPlayers.player4,
    teamPlayers.player5,
    teamPlayers.player6,
    teamPlayers.player7,
    teamPlayers.player8,
  ];
  return team;
}

module.exports = {
  playersTeam,
  addNewValuesToSomeoneInTheTeam,
  reEstructureTeamInAArray,
};
