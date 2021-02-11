// React imports
import React, { Component } from 'react';

// Local vars declaration
var game = 'mobileL';

// Local XJS imports
import responsiveReload from '../clonable-code/tournaments/responsive-reload';
import htmlTemplates from '../../../../../methods/html/modules/community-module/player/tournament-menu/tournamentsTemplates';
import organizerClock from '../../../../../methods/vs-frames/organizerClock.js';

// LOCAL JS imports
import materialiceInits from '../clonable-code/tournaments/modalsInit';
import enrollFunctions from '../clonable-code/tournaments/enrollFunctions';

// Local SCSS imports
import '../../../../../styles/games/mobile-legend/mobileL-tournament.scss';
import '../../../../../styles/main/animations.scss';

/**
 * Leyenda:
 * 0 = Preparing, Esperando a recibir informacion
 * 1 = Torneo abierto
 * 2 = Cerro torneo
 * 3 = Torneo en curso
 * posible 4 = Torneo automatico
 **/

class MobileLTournament extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tInfo: {
        chatMessage: 'cargando',
        tournamentName: 'Cargando...',
        tDate: 'cargando', //dia que comenzo
        tStart: 'cargando', //hora que comenzo
        tAward: 'Cargando...', //premio
        tMain: [], // registrados, nickname, playstation ID y photo
        checked: [], //confirmados
        tBracket: [],
        server: 'Cargando...',
        cMax: 'Cargando...',
        isFinished: 'Cargando...',
        winners: {
          first: ``,
          second: ``,
          three: ``,
        },
        iTournament: 0,
        validTournament: '',
      },
      actualInstance: [],
      chatHistory: ['testmsg#12'],
      navigation: 'Cargando',
      supportNav: {},
      chatLoad: false,
      userEnrolled: '',
      userInActualBr: 'true',
      waitingOrg: false,
      checkOut: false,
      readyBattle: false,
      inTiebreak: {
        inTiebreak: false,
        readyBattle: false,
        waitingOrg: false,
        checkout: false,
      },
      teamExistent: {
        teamsName: '',
        player1: '',
        player2: '',
        player3: '',
        player4: '',
        player5: '',
        player6: '',
        player7: '',
        player8: '',
      },
      mainColor: 0,
      rival: {},
      dayInfo: '',
      interval: setInterval(function tCheck() {
        MobileLTournament.prototype.timeDataCheck();
      }, 1000),
      myStopFunction: function myStopFunction() {
        clearInterval(this.interval);
      },
    };
    // Local "this" Binding
    enrollFunctions.unEnroll = enrollFunctions.unEnroll.bind(this);
    MobileLTournament.prototype.timeDataCheck = MobileLTournament.prototype.timeDataCheck.bind(
      this
    );
    MobileLTournament.prototype.supportNavHandler = MobileLTournament.prototype.supportNavHandler.bind(
      this
    );
  }
  // GET TOURNAMENT INFO (tInfo)
  async tournamentInfo() {
    var data = document.location.href;
    var IDTArray = data.split('-t_');
    var IDT = IDTArray[1].slice(0, 24);
    if (localStorage.userData) {
      var IDU = JSON.parse(localStorage.userData)._id;
    } else {
      var IDU = 'sing-out';
    }
    if (IDT) {
      const response = await fetch(`/api/tournaments/${IDT}/${IDU}`);
      await response.json().then((res) => {
        if (!res.alert) {
          //console.log(res)
          this.setState({
            tInfo: res.tInfo,
            actualInstance: res.actualInstance,
            navigation: 'informacion',
            userEnrolled: res.userEnrolled,
            waitingOrg: res.waitingOrg,
            userInActualBr: res.userInActualBr,
            mainColor: res.mainColor,
            checkOut: res.checkOut,
            readyBattle: res.readyBattle,
            inTiebreak: res.inTiebreak,
            teamExistent: res.teamExistent,
            rival: res.rival,
          });
          organizerClock.reloadPerTimer(this.state.tInfo);
          //this.enrolledPlayers();
        } else {
          alert(res.alert);
          location.href = '/';
        }
        //support.tournamentSupport(this.output);
      });
    }
  }
  // CLOCK FUNCTIONS
  timeDataCheck() {
    if (!this.state.tInfo) {
    } else {
      if (this.state.tInfo.tStart === 'cargando') {
      } else {
        organizerClock.tournamentClock(
          this.state.tInfo.tStart,
          NbaTournament.prototype.clockOutput
        );
      }
    }
  }
  clockOutput(serverTime, tournamentCountDown) {
    function choiceVisualClock(days, hours, mins, seconds) {
      if (days === '0') {
        if (hours === '0') {
          setTimeout(function () {
            countDownLabel.innerText = `Comienza en ${mins}:${seconds}`;
            celCountDownLabel.innerText = `Comienza en ${mins}:${seconds}`;
          }, 250);
        } else {
          setTimeout(function () {
            countDownLabel.innerText = `Hoy en solo ${hours}:${mins}:${seconds}`;
            celCountDownLabel.innerText = `Hoy en solo ${hours}:${mins}:${seconds}`;
          }, 250);
        }
      } else {
        setTimeout(function () {
          countDownLabel.innerText = `Faltan ${days} días y ${hours}:${mins}:${seconds}`;
          celCountDownLabel.innerText = `Faltan ${days} días y ${hours}:${mins}:${seconds}`;
        }, 250);
      }
    }
    const clockLabel = document.getElementById('tournament-server-clock');
    const countDownLabel = document.getElementById('countDown');
    const celCountDownLabel = document.getElementById('countDown-cel');
    clockLabel.innerText = `${serverTime}`;
    var days = tournamentCountDown.days.toString();
    var hours = tournamentCountDown.hours.toString();
    var mins =
      tournamentCountDown.minutes.toString().length === 1
        ? `0${tournamentCountDown.minutes.toString()}`
        : tournamentCountDown.minutes.toString();
    var seconds =
      tournamentCountDown.seconds.toString().length === 1
        ? `0${tournamentCountDown.seconds.toString()}`
        : tournamentCountDown.seconds.toString();

    choiceVisualClock(days, hours, mins, seconds);
  }
  clockOutput(serverTime, tournamentCountDown) {
    function choiceVisualClock(days, hours, mins, seconds) {
      if (days === '0') {
        if (hours === '0') {
          setTimeout(function () {
            countDownLabel.innerText = `Comienza en ${mins}:${seconds}`;
            celCountDownLabel.innerText = `Comienza en ${mins}:${seconds}`;
          }, 250);
        } else {
          setTimeout(function () {
            countDownLabel.innerText = `Hoy en solo ${hours}:${mins}:${seconds}`;
            celCountDownLabel.innerText = `Hoy en solo ${hours}:${mins}:${seconds}`;
          }, 250);
        }
      } else {
        setTimeout(function () {
          countDownLabel.innerText = `Faltan ${days} días y ${hours}:${mins}:${seconds}`;
          celCountDownLabel.innerText = `Faltan ${days} días y ${hours}:${mins}:${seconds}`;
        }, 250);
      }
    }
    const clockLabel = document.getElementById('tournament-server-clock');
    const countDownLabel = document.getElementById('countDown');
    const celCountDownLabel = document.getElementById('countDown-cel');
    clockLabel.innerText = `${serverTime}`;
    var days = tournamentCountDown.days.toString();
    var hours = tournamentCountDown.hours.toString();
    var mins =
      tournamentCountDown.minutes.toString().length === 1
        ? `0${tournamentCountDown.minutes.toString()}`
        : tournamentCountDown.minutes.toString();
    var seconds =
      tournamentCountDown.seconds.toString().length === 1
        ? `0${tournamentCountDown.seconds.toString()}`
        : tournamentCountDown.seconds.toString();

    choiceVisualClock(days, hours, mins, seconds);
  }
  // MOUNTING COMPONENT
  componentDidMount() {
    // USSER LOGIN CHECK
    localStorage.userData ? '' : window.history.back();
    // RESPONSIVE RELOAD
    window.addEventListener('resize', () => {
      responsiveReload();
    });
    // LISTENERS MATERIALICE
    materialiceInits.modalRegen();
    materialiceInits.tooltipsInit();
    // GET GAME TOURNAMENT INFO
    this.tournamentInfo();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', () => this.navigationResize());
    document.removeEventListener('wheel', () => this.navigationWheel());
    document.removeEventListener('keydown', () => this.navigationKey());
    document.removeEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.loginModal');
      var instances = M.Modal.init(elems);
    });
    // Materialice Tooltip init
    document.removeEventListener('mouseover', function () {
      var elems = document.querySelectorAll('.tooltipped');
      var options = 0;
      var instance = M.Tooltip.getInstance(elem);
    });
    // Materialice Select
    document.removeEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('select');
      var instances = M.FormSelect.init(elems, 1);
    });

    var elems = document.querySelectorAll('.gameCard');
    for (var i = 0; i < elems.length; i++) {
      var elem = elems[i];
      var instance = M.Tooltip.getInstance(elem);
      instance.close();
    }

    document.removeEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.gamesModal');
      var instances = M.Modal.init(elems[0]);
      instances.destroy();
    });
    this.state.myStopFunction();
    location.reload();
  }
  render() {
    return (
      <div id={`${game}-tournament-main-wrapper`}>
        {htmlTemplates.classicTemplate(
          game,
          this.state.tInfo,
          this.state.actualInstance,
          document.getElementById('chat-box'),
          this.state.navigation,
          this.state.tInfo.wallpaper,
          enrollFunctions.enroll,
          enrollFunctions.unEnroll,
          MobileLTournament.prototype.supportNavHandler,
          this.state.supportNav,
          this.state.userEnrolled,
          this.openLogin,
          this.state.userInActualBr,
          this.state.waitingOrg,
          this.state.mainColor,
          this.state.checkOut,
          this.state.readyBattle,
          this.state.inTiebreak
        )}
      </div>
    );
  }
}

export default MobileLTournament;
