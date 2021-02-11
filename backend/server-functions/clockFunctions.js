const moment = require('moment-timezone'); 
require('moment-countdown');

function checkDiff(timer) {
    console.log(timer);
    var checkingLastDate = moment(timer, 'LLLL');
    const hora = moment().tz('America/Argentina/Buenos_Aires').format();
    const differenceInHoursBettween = checkingLastDate.diff(hora, 'minute');
    const multiplication = differenceInHoursBettween * 60000;
    //clockOutput(hora.slice(11, 19), countDownChecking);
    if (differenceInHoursBettween <= 0) {
      return [true, multiplication + 30000];
    } else {
      return [false, multiplication + 30000];
    }
}

module.exports = {
    checkDiff: checkDiff
}