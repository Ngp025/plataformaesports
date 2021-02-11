// React imports
import React, { Component } from 'react';
//import io from 'socket.io-client';
// Local vars declaration
var game = 'pes20';

// Local XJS imports
import htmlTemplates from '../../../../../methods/html/modules/community-module/player/tournament-menu/tournamentsTemplates';
import organizerClock from '../../../../../methods/vs-frames/organizerClock.js';

// LOCAL JS imports
import responsiveReload from '../clonable-code/tournaments/responsive-reload';
import materialiceInits from '../clonable-code/tournaments/modalsInit';
import enrollFunctions from '../clonable-code/tournaments/enrollFunctions';

// Local SCSS imports
import '../../../../../styles/games/pes20/pes-tournament.scss';
import '../../../../../styles/main/animations.scss';

/**
 * Leyenda:
 * 0 = Preparing, Esperando a recibir informacion
 * 1 = Torneo abierto
 * 2 = Cerro torneo
 * 3 = Torneo en curso
 * posible 4 = Torneo automatico
 **/

class PesTournament extends Component {
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
      rival: {},
      mainColor: 0,
      dayInfo: '',
      interval: setInterval(function tCheck() {
        PesTournament.prototype.timeDataCheck();
      }, 1000),
      myStopFunction: function myStopFunction() {
        clearInterval(this.interval);
      },
    };
    // Local "this" Binding
    enrollFunctions.unEnroll = enrollFunctions.unEnroll.bind(this);
    PesTournament.prototype.timeDataCheck = PesTournament.prototype.timeDataCheck.bind(
      this
    );
    PesTournament.prototype.supportNavHandler = PesTournament.prototype.supportNavHandler.bind(
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
            rival: res.rival,
          });
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
        //console.log('loading Data');
      } else {
        organizerClock.tournamentClock(
          this.state.tInfo.tStart,
          PesTournament.prototype.clockOutput
        );
      }
    }
  }
  clockOutput(serverTime, tournamentCountDown) {
    function choiceVisualClock(days, hours, mins, seconds) {
      if (days === '0') {
        if (hours === '0') {
          console.log(organizerClock.checkDiff(new Date(this.state.tStart))[0])
          if(organizerClock.checkDiff(new Date(this.state.tStart))[0]){
            console.log("checkDiff process")
            countDownLabel.innerText = "Comenzando..";           
            celCountDownLabel.innerText = "Comenzando..";}
            else{
              setTimeout(function () {
                countDownLabel.innerText = `Comienza en ${mins}:${seconds}`;
                celCountDownLabel.innerText = `Comienza en ${mins}:${seconds}`;
              }, 250);
            }
        } else {
          setTimeout(function () {
            countDownLabel.innerText = `En solo ${hours}:${mins}:${seconds}`;
            celCountDownLabel.innerText = `En solo ${hours}:${mins}:${seconds}`;
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
  // NAVIGATION HANDLERS
  supportNavHandler(supportNavData) {
    this.setState({
      supportNav: supportNavData,
    });
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
    var data = document.location.href;
    var IDTArray = data.split('-t_');
    var IDT = IDTArray[1].slice(0, 24);
    var IDU = JSON.parse(localStorage.userData)._id;
    var rivalIDU = this.state.rival.info ? this.state.rival.info.ID : 'none';
    //console.log(IDT)
    //const socket = io('www.plataformaesports.com')
    //    const socket = io()
    function checkInBtn() {
      console.log('Inicializando CheckIn Listener');

      setTimeout(() => {
        document.getElementById('sync-checkin').style.display = 'none';
        console.log(document.getElementById('sync-checkin'));
        (document.getElementById('send-checkIn').style.display = 'block'),
          document
            .getElementById('send-checkIn')
            .addEventListener('click', () => {
              console.log('click en clickBtn');
              socket.emit(IDT, ['checkOut', true, IDT, IDU, rivalIDU]);
              //
            });
        document.getElementById('sync-checkin').style.display = 'none';
      }, 5000);
    }
    /*socket.on(IDT, (data)=>{
      //console.log(data, "Antes del Switch")
      console.log(data, "<----- Data")
      switch(data[0]){
        case 'iTournament':
          if(data[2] === this.state.tInfo._id){
          var tInfo = this.state.tInfo
          var newTInfo = this.state.tInfo          
          for(const prop in tInfo){
            prop === 'iTournament' ? newTInfo[prop] = data[1] : ""
          } 
          setTimeout( ()=> {
            //this.setState({tInfo : newTInfo}),
            location.reload()
            //checkInBtn()
          }, 3000 );
          }    
          break
          case 'checkOut':
            console.log(data)
            if(data.includes(this.state.rival.info.ID)){
              setTimeout( ()=> location.reload(), Math.random()*10000)
            }
            break
      }
    })
    if(this.state.tInfo.iTournament === 0 || this.state.tInfo.iTournament === 3 ){
      checkInBtn()
    }
    */
    //console.log(this.state.tInfo.iTournament)

    /*
    socket.on('none', (data)=>{
      console.log(data, "data")
    }) */
    /*
    socket.on("rondaPerBattle", (data) => {
      console.log(data, "funcion del valor rondaPerBattle")
    })    
    socket.on("winners", (data) => {
      console.log(data, "funcion del valor rondaPerBattle")
    })
    */
  }
  componentWillUnmount() {
    //socket.emit('disconnect')

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
          this.state.rival,
          this.state.chatMessage,
          this.state.chatHistory,
          document.getElementById('chat-box'),
          this.state.navigation,
          this.state.tInfo.wallpaper,
          enrollFunctions.enroll,
          enrollFunctions.unEnroll,
          PesTournament.prototype.supportNavHandler,
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

export default PesTournament;
