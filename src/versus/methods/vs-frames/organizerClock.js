import moment from 'moment-timezone';
require('moment-countdown');

function tournamentClock(tStart, clockOutput) {
  var tStartDateArr = tStart.split('T')[0].split('-');
  var tStartHoursArr = tStart.split('T');
  function horaNow() {
    const hora = moment().tz('America/Argentina/Buenos_Aires').format();
    const tStartHours = parseInt(tStartHoursArr[1].slice(0, 2));
    const tStartMins = parseInt(tStartHoursArr[1].slice(3, 5));
    const tStartDays = parseInt(tStartDateArr[2]);
    const tStartMonth = parseInt(tStartDateArr[1]);
    const tStartYear = parseInt(tStartDateArr[0]);
    var countDownChecking = moment(
      `${tStartYear}-${tStartMonth}-${tStartDays} ${tStartHours}:${tStartMins}`
    ).countdown();
    clockOutput(hora.slice(11, 19), countDownChecking);
  }
  horaNow(), 1000;
}

function checkDiff(timer) {
  var checkingLastDate = moment(timer, 'LLLL');
  const hora = moment().tz('America/Argentina/Buenos_Aires').format();
  const differenceInHoursBettween = checkingLastDate.diff(hora, 'minute');
  const multiplication = differenceInHoursBettween;
  //clockOutput(hora.slice(11, 19), countDownChecking);
  if (differenceInHoursBettween < 1) {
    return [true, multiplication + 30000];
  } else {
    return [false, multiplication + 30000];
  }
}

function whatTimeIsIt() {
  console.log('DENTRO DE WHATTIMEISIT');
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

async function reloadPerTimer(tounamentInfo) {
  function reloadFunction(milisecondTime) {
    console.log(milisecondTime, typeof milisecondTime, 'corriendo');
    setTimeout(function () {
      location.reload();
    }, milisecondTime);
  }

  if (tounamentInfo.timer === 'load') {
  } else {
    switch (tounamentInfo.iTournament) {
      case 1 || 2:
        //Comienzo de Torneo
        const startTournamentCheck = checkDiff(new Date(tounamentInfo.tStart));
        console.log(startTournamentCheck, '<--- value');
        startTournamentCheck[0] === false
          ? reloadFunction(startTournamentCheck[1])
          : '';
        break;
      case 3:
        //tiempo limite de verificado
        const verifyCheck = checkDiff(
          new Date(tounamentInfo.timer.lastChangeVerify)
        );
        if (verifyCheck[0] === false) {
          console.log(verifyCheck, 'verifyCheck');
          reloadFunction(verifyCheck[1]);
        } else {
          const upImageCheck = checkDiff(
            new Date(tounamentInfo.timer.lastChangeImage)
          );
          if (upImageCheck[0] === false) {
            console.log(upImageCheck, 'upImageCheck');
            reloadFunction(upImageCheck[1]);
          } else {
            const finishProcessCheck = checkDiff(
              new Date(tounamentInfo.timer.lastChangeDate)
            );
            console.log(finishProcessCheck, 'finishProcessCheck');
            finishProcessCheck[0] === false
              ? reloadFunction(finishProcessCheck[1])
              : '';
          }
        }
        //tiempo limite de revision de imagenes

        break;
    }
  }
}

var organizerClock = {
  tournamentClock: tournamentClock,
  whatTimeIsIt: whatTimeIsIt,
  reloadPerTimer: reloadPerTimer,
  checkDiff : checkDiff
};

export default organizerClock;
