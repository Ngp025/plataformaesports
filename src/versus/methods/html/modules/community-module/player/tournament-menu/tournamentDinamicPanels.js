import React from 'react';

import customerUrl from './customerUrl'
import organizerClock from '../../../../../vs-frames/organizerClock.js';

function clockOutput(serverTime, tournamentCountDown) {
  function choiceVisualClock(days, hours, mins, seconds) {
    if (days === '0') {
      if (hours === '0') {
        setTimeout(function () {
          countDownLabel.innerText = `${mins}:${seconds}`;
          celCountDownLabel.innerText = `${mins}:${seconds}`;
        }, 250);
      } else {
        setTimeout(function () {
          countDownLabel.innerText = `${hours}:${mins}:${seconds}`;
          celCountDownLabel.innerText = `${hours}:${mins}:${seconds}`;
        }, 250);
      }
    } else {
      setTimeout(function () {
        countDownLabel.innerText = ` ${days} días y ${hours}:${mins}:${seconds}`;
        celCountDownLabel.innerText = ` ${days} días y ${hours}:${mins}:${seconds}`;
      }, 250);
    }
  }
  //const clockLabel = document.getElementById('tournament-server-clock');
  const countDownLabel = document.getElementById('t-countDown');
  //console.log(countDownLabel)
  const celCountDownLabel = document.getElementById('countDown-cel');
  //clockLabel.innerText = `${serverTime}`;
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

function waSupport(waSupport){
return waSupport.length > 3 ? 
    (<div id="waSupport-content" className="waSupport-content" style={{position: 'absolute' , bottom: "5px"}}>
      <img id="waIcon" className="waIcon" src={"https://res.cloudinary.com/versus/image/upload/v1600113647/Assets/Tournament2.0/xr4uzbrud64cnbmqp7eg.png"}></img>
      <label id="waSupport-text" className="waSupport-text">Grupo de soporte :</label>
      <a id="waSupport" className="waSupport" href={waSupport} target="_blank">
        click aquí
      </a>
    </div>)
       : "" 
}

function returnBack() {
  window.location.assign('#/');
}

function confirmFunction(unEnroll) {
  var booleanConfirm = confirm(
    ' ¿ Seguro que desea anular inscripción ? \nActualmente las inscripciones se encuentran cerradas, si se retira no podra inscribirse a esta fase del torneo.'
  );
  if (booleanConfirm === true) {
    unEnroll();
  }
}

function calendar(tInfo) {
  var initialDayInput = tInfo.tDate.split('T')[0].split('-')[2];
  var initialMonthNumberInput = tInfo.tDate.split('T')[0].split('-')[1];
  var weeksDurationInput = tInfo.weeksDuration;
  var initialsRelatedsDays = tInfo.initialsRelatedsDays;
  var midsRelatedsDays = tInfo.midsRelatedsDays;
  var isRender = document.getElementsByClassName('panel-button');

  let options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  var parseDate = new Date(tInfo.tDate);
  var nameDay = parseDate.toLocaleDateString('es-MX', options).slice(0, 3);
  switch (nameDay) {
    case 'lun':
      var startDayFix = 0;
      break;
    case 'mar':
      var startDayFix = 1;
      break;
    case 'mié':
      var startDayFix = 2;
      break;
    case 'jue':
      var startDayFix = 3;
      break;
    case 'vie':
      var startDayFix = 4;
      break;
    case 'sáb':
      var startDayFix = 5;
      break;
    case 'dom':
      var startDayFix = 6;
      break;
    default:
      var startDayFix = 0;
      break;
  }
  // Parse inputs
  var initialMonthNumber =
    initialMonthNumberInput == 0
      ? initialMonthNumberInput
      : parseInt(initialMonthNumberInput);
  var initialDay =
    initialDayInput == 0 ? initialDayInput : parseInt(initialDayInput);
  var weeksDuration =
    weeksDurationInput == 0 ? weeksDurationInput : parseInt(weeksDurationInput);
  if (initialDay > 0 && initialMonthNumber > 0 && weeksDuration > 0) {
    var tournamentInitial = tInfo.initial;
    var tournamentMid = tInfo.mid;
    var tournamentFinal = tInfo.final;
    // Local Vars
    var organizerPanel = document.getElementById('calendar');
    // console.log(organizerPanel)
    var buttonsRender = [];
    var initialMonthString =
      initialMonthNumber.toString().length === 1
        ? `0${initialMonthNumber}`
        : initialMonthNumber.toString();
    var monthsToGenerate = Math.ceil(weeksDuration / 4) + 1;
    // Local methods
    function monthDays(month) {
      if (
        month === '04' ||
        month === '06' ||
        month === '09' ||
        month === '11'
      ) {
        return 30;
      } else {
        if (month === '02') {
          return 28;
        } else {
          return 31;
        }
      }
    }
    function nextMonth(actMonthNumber) {
      if (actMonthNumber >= 12) {
        var nextMonth =
          (actMonthNumber - 11).toString().length === 1
            ? `0${actMonthNumber - 11}`
            : (actMonthNumber - 11).toString();
        return nextMonth;
      } else if (actMonthNumber < 12) {
        var nextMonth =
          (actMonthNumber + 1).toString().length === 1
            ? `0${actMonthNumber + 1}`
            : (actMonthNumber + 1).toString();
        return nextMonth;
      }
    }
    function customDay(dayInfo) {
      var panelButton = document.createElement('div');
      panelButton.setAttribute('id', `${dayInfo.day}`);
      panelButton.setAttribute('class', `${dayInfo.instance}`);
      var relatedNextDays = [];
      panelButton.setAttribute('name', JSON.stringify(dayInfo));
      panelButton.value = dayInfo;
      panelButton.innerText = `${dayInfo.day}`;
      panelButton.addEventListener('click', () => {
        alert('Esta funcion esta en desarrollo, lo sentimos');
      });
      var buttonLabel = document.createElement('label');
      buttonLabel.setAttribute('class', 'button-label');

      switch (dayInfo.instance) {
        case 'mid':
          for (var i = 0; i < midsRelatedsDays.length; i++) {
            if (midsRelatedsDays[i].split('_')[0] === dayInfo.day) {
              relatedNextDays.push(midsRelatedsDays[i].split('_')[1]);
              buttonLabel.style.backgroundColor = '#497039';
            }
          }
          break;
        case 'initial':
          for (var i = 0; i < initialsRelatedsDays.length; i++) {
            if (initialsRelatedsDays[i].split('_')[0] === dayInfo.day) {
              relatedNextDays.push(initialsRelatedsDays[i].split('_')[1]);
              buttonLabel.style.backgroundColor = '#ffb74d';
            }
          }
          break;
      }

      buttonLabel.setAttribute('id', `button-label-${dayInfo.day}`);
      buttonLabel.innerText = relatedNextDays.toString();
      relatedNextDays[0] ? '' : (buttonLabel.style.display = 'none');

      panelButton.appendChild(buttonLabel);
      organizerPanel.appendChild(panelButton);
    }
    function createDayButton(i, month) {
      var panelButton = document.createElement('div');
      var completeDate =
        i.toString().length === 1
          ? `0${i}-${month}`
          : `${i.toString()}-${month}`;
      var emptyData = {
        day: completeDate,
        instance: 'none',
        lastTournament: false,
        winnersNeed: 1,
        tStart: '',
        winnersIDs: [],
        nextInstance: [],
        prevInstance: [],
      };
      panelButton.setAttribute('id', completeDate);
      panelButton.setAttribute('class', 'panel-button none');
      panelButton.value = emptyData;
      panelButton.innerText = completeDate;
      //panelButton.addEventListener('click', () => alert('Estamos desarrollando este panel vuelva mas arde')
      organizerPanel.appendChild(panelButton);
    }
    function createFixDayButton(i, month) {
      var panelButton = document.createElement('div');
      var completeDate =
        i.toString().length === 1
          ? `0${i}-${month}`
          : `${i.toString()}-${month}`;
      var emptyData = {
        day: completeDate,
        instance: 'none',
        lastTournament: false,
        winnersNeed: 1,
        tStart: '',
        winnersIDs: [],
        nextInstance: [],
        prevInstance: [],
      };
      panelButton.setAttribute('id', completeDate);
      panelButton.setAttribute('class', 'panel-button fix');
      panelButton.value = emptyData;
      panelButton.innerText = completeDate;
      organizerPanel.appendChild(panelButton);
    }
    // Main Functionality
    function grid(gridNumber, dayFix) {
      if (dayFix) {
        var prevMonth = parseInt(nextMonth(initialMonthNumber)) - 2;
        var prevMonthString =
          prevMonth.toString().length === 1
            ? `0${prevMonth}`
            : prevMonth.toString();
        var prevMonthDays = monthDays(prevMonthString);
        // console.log(initialDay)
        // console.log(prevMonthDays)
        // console.log(dayFix)
        for (var i = 0; dayFix > i; i++) {
          if (initialDay - dayFix + i < 1) {
            var z = initialDay - dayFix + i;
            createFixDayButton(prevMonthDays + z, prevMonthString);
          } else {
            createFixDayButton(initialDay - dayFix + i, initialMonthString);
          }
        }
      }
      function renderMonth(startDay, monthString, monthDays) {
        var i = 0;
        while (buttonsRender.length < gridNumber) {
          if (startDay + i >= 1 && startDay + i < 10) {
            var dayToValidate = `0${startDay + i}-${monthString}`;
          } else {
            var dayToValidate = `${startDay + i}-${monthString}`;
          }
          var isCustomDay = [false];
          // Initial Matchs
          var s = 0;
          while (s < tournamentInitial.length) {
            var validationIni = tournamentInitial[s].day === dayToValidate;
            if (validationIni) {
              isCustomDay.pop();
              isCustomDay.push(true);
              customDay(tournamentInitial[s]);
            }
            s = s + 1;
          }
          // Mid Matchs
          var m = 0;
          while (m < tournamentMid.length) {
            var validationMid = tournamentMid[m].day === dayToValidate;
            if (validationMid) {
              isCustomDay.pop();
              isCustomDay.push(true);
              customDay(tournamentMid[m]);
            }
            m = m + 1;
          }
          // Finals Matchs
          var z = 0;
          while (z < tournamentFinal.length) {
            var validationFinal = tournamentFinal[z].day === dayToValidate;
            if (validationFinal) {
              isCustomDay.pop();
              isCustomDay.push(true);
              customDay(tournamentFinal[z]);
            }
            z = z + 1;
          }
          // Month Break
          if (startDay + i > monthDays) {
            break;
          }
          buttonsRender.push(i);
          // Is Custom Day Check.
          isCustomDay[0] ? '' : createDayButton(startDay + i, monthString);
          i++;
        }
      }
      for (var w = 0; w < monthsToGenerate; w++) {
        w === 0
          ? renderMonth(
              initialDay,
              nextMonth(initialMonthNumber + w - 1),
              monthDays(initialMonthString)
            )
          : renderMonth(
              1,
              nextMonth(initialMonthNumber + w - 1),
              monthDays(nextMonth(initialMonthNumber + w - 1))
            );
      }
    }
    if (isRender.length === 0) {
      startDayFix === 0
        ? grid(7 * weeksDuration)
        : grid(7 * weeksDuration, startDayFix);
      // Function trigger
    }
  }
}

function centerDiv(
  tInfo,
  actualInstance,
  rival,
  chatMessage,
  chatHistory,
  enroll,
  unEnroll,
  userEnrolled,
  openLogin,
  userInActualBr,
  waitingOrg,
  mainColor,
  checkOut,
  readyBattle,
  forTiebreaks
) {
  //// console.log(userEnrolled, '<---------------- USER ENROLLED')
  if (localStorage.userData) {
    var IDU = JSON.parse(localStorage.userData)._id;
  } else {
    var IDU = 'sing-out';
  }

  function enrolledLoad() {
    document.getElementById('center-div-1').style.background = '#212433';
  }

  function taskDivs() {
    // Customer URL VAR

    var iTournament = tInfo.iTournament;
      // Timer Verify
      /*
      if(iTournament === 3){ 
        function automaticReload(){
          console.log("automatic Reload is running")
          clearInterval(tournamentPanelInterval)
          setTimeout(()=>{ location.reload()}, 5000)
          var panelCountDown = document.getElementById("countdown")
        }
  
        if(tInfo.tStart === "cargando"){console.log("cargando")}else{
          var tournamentPanelInterval = setInterval(function tCheck() {
          //console.log(new Date(tInfo.tStart), "parse tstart")
          //console.log(organizerClock.checkDiff(new Date(tInfo.tStart))[0])
          //organizerClock.checkDiff(new Date(tInfo.tStart))[0] ? automaticReload() : console.log("check difff falseee")
          //organizerClock.checkDiff(new Date(tInfo.tStart))[0] ? "" : automaticReload()
            }, 1000)
        }
      }
      */
    // End of timer Verify
    // Panel de Inscripcion de usuario
    // Usuario Inscripto
    function userIsEnrolled() {
      return (
        <div
          id='enrolled-wrapper'
          className='dyn-main-wrapper animatedO opacity'
          onLoad={enrolledLoad()}>
          <img
            id='user-picture'
            className='user-picture'
            src={localStorage.picture}
            style={{
              border: `1px solid rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`,
            }}
          />
          <label
            id='userEnrolled-state'
            className='user-state'
            style={{
              background: `rgba(${mainColor.red}, ${mainColor.green}, ${mainColor.blue}, 0.9)`,
            }}>
            Panel de torneo - Esperando inicio
          </label>
          <div id='enrolled-wrapper-task-content' className='task-content'>
            <label id='user-enrolled-info-1' className='user-info-1'>
              REGISTRO EXITOSO, PRONTO RECIBIRÁ INFORMACIÓN A SU MAIL
            </label>
            <p
              title='versus information'
              id='user-enrolled-info-2'
              className='user-info-2'>
              Toda la información del torneo sera enviada a su mail antes que comience. ¡Muchas gracias!
            </p>
            {tInfo.waSupport ? waSupport(tInfo.waSupport) : ""}
            <label
              id='unenroll'
              className='unEnroll'
              style={{
                color: `rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`,
              }}
              onClick={() => unEnroll()}>
              Anular inscripción
            </label>
          </div>
        </div>
      ) /* : (
        <div
          id='enrroled-close-tournament'
          className='dyn-main-wrapper animatedO opacity'
          onLoad={enrolledLoad()}>
          <img
            id='user-picture'
            className='user-picture'
            src={localStorage.picture}
            style={{
              border: `1px solid rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`,
            }}
          />
          <label
            id='userEnrolled-state'
            className='user-state'
            style={{
              background: `rgba(${mainColor.red}, ${mainColor.green}, ${mainColor.blue}, 0.9)`,
            }}>
            Panel de torneo - Espera
          </label>
          <div
            id='enrroled-close-tournament-task-content'
            className='task-content'>
            <label id='register-state' className='user-info-1'>
              REGISTRO EXITOSO, PRONTO RECIBIRÁ INFORMACIÓN AL MAIL
            </label>
            <p
              title='Espere pronto comenzara el torneo'
              id='register-user-info'
              className='user-info-2'>
              La información de contacto de tu siguiente rival aparecerá aquí 10
              minutos antes del horario inicial del torneo.
            </p>
            <label
              id='unenroll'
              className='unEnroll'
              style={{
                color: `rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`,
              }}
              onClick={() => confirmFunction(unEnroll)}>
              Anular inscripción
            </label>
          </div>
        </div>
      ); */
    }
    // Usuario Sin Inscribir
    function userIsNotEnrolled() {
      return(
        <div id='enroll-content' className='dyn-main-wrapper animatedO opacity'>
          <label
            id='enroll-username-info '
            className='user-state'
            style={{
              display: window.innerWidth <= 1024 ? 'none' : 'block',
              background: `rgba(${mainColor.red}, ${mainColor.green}, ${mainColor.blue}, 0.9)`,
            }}>
            {localStorage.name
              ? `Panel de torneo - Inscripción`
              : 'Inicia sesión para comenzar'}
          </label>
          {localStorage.picture ? (
            <img
              id='user-picture'
              className='user-picture'
              src={localStorage.picture}
              style={{
                border: `1px solid rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`,
              }}
            />
          ) : (
            ''
          )}
          <div id='enroll-content-task-content' className='task-content'>
            <label
              id='wellcome-tournament-panel'
              className='wellcome'
              style={{
                display: `${
                  window.innerWidth <= 1024 ? 'none' : 'inline-block'
                }`,
              }}>
              Inscríbase aquí para guardar su cupo en el torneo ¡Bienvenido!
            </label>
            <form>
              <button
                id='enroll-button'
                className='enroll modal-trigger lowGradeButton'
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
                data-target='enroll-form'
                style={{
                  border: `solid 2px rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`,
                }}
                onMouseOver={() => {
                  event.target.style.backgroundColor = `rgba(${mainColor.red}, ${mainColor.green}, ${mainColor.blue}, 0.9)`;
                }}
                onMouseLeave={() => {
                  event.target.style.backgroundColor = `rgba(${mainColor.red}, ${mainColor.green}, ${mainColor.blue}, 0)`;
                }}>
                Inscribirse al torneo
              </button>
            </form>
          </div>
        </div>
      );
    }
    // Verificacion de competencia CHECK IN
    function userCheckIn() {
      // Timer Verify
      /*
      function automaticReload(){
        console.log("corriendo automatic reload")
        clearInterval(tournamentPanelInterval)
        document.getElementById('t-countDown').style.display = "none"
        document.getElementById('countDown-tittle').innerText = "Espere 30 segundos por favor"
        setTimeout(()=>{ location.reload()}, 5000)
      }  

      var tournamentPanelInterval = setInterval(function tCheck() {
        //console.log(tInfo.timer.lastChangeGame, "aqui")
        if(organizerClock.checkDiff(new Date(tInfo.timer.lastChangeGame))[0])
          { setTimeout(function checkingDiff(){
            organizerClock.checkDiff(new Date(tInfo.timer.lastChangeGame))[0] ? automaticReload() : console.log("checkDifFalse")
          }, 2000)}
          else{
            console.log("checkDIff FALSE")
            organizerClock.tournamentClock(
              tInfo.timer.lastChangeVerify,
              clockOutput
            );
          }
        }, 1000)
        */
      // End of timer Verify
      var inTiebreakPostValue = 'normal';
      if (forTiebreaks.inTiebreak) {
        inTiebreakPostValue = 'tiebreak';
      }
      return (
        <div
          id='check-in'
          className='dyn-main-wrapper animatedO opacity'
          onLoad={enrolledLoad()}>
          <label
            id='userEnrolled-state'
            className='user-state'
            style={{
              background: `rgba(${mainColor.red}, ${mainColor.green}, ${mainColor.blue}, 0.9)`,
            }}>
            {`${localStorage.name} valida si estas listo`}
          </label>
          {localStorage.picture ? (
            <img
              id='user-picture'
              className='user-picture'
              src={localStorage.picture}
            />
          ) : (
            ''
          )}
          <div id='task-content' className='task-content'>
            <div id='user-box' className='user-box'>
              <div id='tittle-div' className='tittle-div'>
                <label id='checkin-tittle' className='checkin-tittle'>
                  PASO 1 -{' '}
                  <label id='tittle-desc' className='tittle-desc'>
                    VALIDESE Y ESPERE A QUE SU RIVAL VALIDE
                  </label>{' '}
                </label>
              </div>
              <div id='user-1-div' className='user-div'>
                <label id='user-1' className='user-1'>
                  {rival.userNickname} - {' '}
                  <label
                    id='user-1-check'
                    className='user-1-check'
                    style={{ color: `${checkOut ? 'green' : 'red'}` }}>{`${
                    checkOut ? 'Validado' : 'Sin validar'
                  }`}</label>
                </label>
              </div>
              <div id='user-2-div' className='user-div'>
                <label id='user-2' className='user-2'>
                  {rival.info.nickname} - {' '}
                  <label
                    id='user-2-check'
                    className='user-2-check'
                    style={{
                      color: `${rival.ready ? 'green' : 'red'}`,
                    }}>{`${`${
                    rival.ready ? 'Validado' : 'Sin validar'
                  }`}`}</label>
                </label>
              </div>
              {tInfo.waSupport ? waSupport(tInfo.waSupport) : ""}
            </div>
            <div id='checkin-form' className='checkin-form-box'>
              <label
                id='sync-checkin'
                onAnimationEnd={()=>{setTimeout(()=> {
                  document.getElementById("send-checkIn").style.display = "block";
                  document.getElementById("countDown-tittle").style.display = "block";
                  document.getElementById("sync-checkin").style.display = "none";
                } , 100)}}
                className='sync-checkin disappear disappearA'>
                Sincronizando...
              </label>
              <button
                //style={{ display: 'none' }}
                id='send-checkIn'
                className='send-results animatedO opacity'
                style={{display: "none" ,background: `rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})` , border: `1px solid rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`}}
                /* document.getElementById("send-checkIn").style.display = "block" */
                onClick={async () => {
                  if(checkOut){
                    location.reload()
                  }else{
                    await fetch(
                      `/api/tournaments/finalRound/verify/${inTiebreakPostValue}`,
                      {
                        method: 'POST',
                        body: JSON.stringify({
                          IDU: JSON.parse(localStorage.userData)._id,
                          IDT: tInfo._id,
                          game: tInfo.game,
                          nickname: localStorage.name,
                        }),
                        headers: {
                          Accept: 'application/json',
                          'Content-Type': 'application/json',
                        },
                      }
                    ).then(() => {
                      location.reload();
                    });
                  }
                }}
                type='submit'>
                {`${checkOut ? "Actualizar" : "Validar"}`}
              </button>
              <label id='countDown-tittle' className='countDown-tittle animatedO opacity' style={{display: "none"}}>
                Tiempo restante:{' '}
                <label id='t-countDown' className='countDown' >
                  Cargando..
                </label>
              </label>
            </div>
          </div>
        </div>
      );
    }    
    // Panel de torneo para subir IMAGEN
    function userImageUpload() {
      var inTiebreakPostValue = 'normal';
      if (forTiebreaks.inTiebreak) {
        inTiebreakPostValue = 'tiebreak';
      }
        //--------fetch----
        async function draw(){
          var IDU = JSON.parse(localStorage.userData)._id;
          await fetch(`/api/tournaments/draw/${tInfo._id}/${IDU}/${inTiebreakPostValue}/${tInfo.game}`)
          .then((res) => res.json())
          .then((json) => json.alert ? alert(json.alert) : location.reload())         
        }
      return (
        <div
          id='upload-image'
          className='dyn-main-wrapper animatedO opacity'
          onLoad={enrolledLoad()}>
          <label
            id='userEnrolled-state'
            className='user-state'
            style={{
              background: `rgba(${mainColor.red}, ${mainColor.green}, ${mainColor.blue}, 0.9)`,
            }}>
            {localStorage.name} HORA DE COMPETIR
          </label>
          <img
            id='user-picture'
            style={{border: `1px solid rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`}}
            className='user-picture'
            src={localStorage.picture}
          />
          <div id='task-content' className='task-content'>
            <div id='upload-image' className='upload-box'>
              <div id='tittle-div' className='tittle-div'>
                <label id='upload-tittle' className='upload-tittle'>
                  PASO 3 -{' '}
                  <label id='tittle-desc' className='tittle-desc'>
                    ENVIA LAS IMAGENES SI GANASTE O LAS DE DESEMPATE
                  </label>{' '}
                </label>
              </div>
              
              <label 
                  id="tie-button"
                  className="tie-button"
                  //style={{border: `1px solid rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`}}
                 /* onClick={() => {
                    var tieConfirmed = confirm("Si usted declara empate no podrá declarar otro resultado. ¿Desea continuar?") 
                    if(tieConfirmed){
                      console.log("is confirmed")
                      draw()
                    }else{
                      console.log("not confirmed")
                    }
                  }}*/>
                  En caso de empate se jugara un partido normal a gol de oro ( el primero que mete el gol gana) y se debe adjuntar una prueba del desempate. {` `}
                </label>
              <label id="winner-label" className="winner-label">Envia la prueba a soporte.plataformaesports@gmail.com</label>
                {/*
              <form
                id='submit-results'
                className='submit-results'
                role='form'
                action={`/api/tournaments/finalRound/UpImage/${inTiebreakPostValue}`}
                method='POST'
                encType='multipart/form-data'>
                <input
                  name='IDU'
                  type='hidden'
                  value={JSON.parse(localStorage.userData)._id}
                />
                <input id="IDT-hidden" name='IDT' type='hidden' value={tInfo._id} />
                <input id="customer-hidden" name='customer' type='hidden' value={tInfo.customer} />
                <input id="game-hidden" name='game' type='hidden' value={tInfo.game} />
                <input
                  id="nickname-hidden"
                  name='nickname'
                  type='hidden'
                  value={localStorage.name}
                />
                <input id="hidden-lifes" name="lifes" type="hidden" value={actualInstance.lifes} ></input>
                <input id="hidden-rival" name="rivalID" type="hidden" value={rival.info.ID} ></input>
                <input id="hidden-draw" name="draw" type="hidden" value={rival.draw.bool} ></input>
                <div id='custom-file' className='custom-file'>
                  <input
                    type='file'
                    name='image'
                    onChange={()=>{document.getElementById("send-results").disabled = false ; 
                    var confirmed = confirm("Recuerde que debe subir la foto solo si usted es el GANADOR, la falta de veracidad en la imagen puede generar su descalificación directa de este y futuros torneos");
                    confirmed ? "" : location.reload()
                    }}
                    id='inputGroupFile02'
                    placeholder='Select'
                    className='select-file'
                    aria-describedby='inputGroupFileAddon02'
                    style={{background: `rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`, border: `1px solid rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`, cursor: "pointer"}}
                  />
                </div>
                <button
                  id='send-results'
                  className='send-results'
                  type='submit'
                  disabled
                  style={{background: `rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`, border: `1px solid rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`, color: "white"}}>
                  SUBIR IMAGEN DE VICTORIA
                </button>
                <label id='countDown-tittle' className='countDown-tittle'>
                  Tiempo restante:
                  <label id='t-countDown' className='countDown'>
                    {' '}
                    Cargando..
                  </label>
                </label>
                <div id="loading-content" className="loading-content">
                    <label id="loading-text" className="loading-text">Espere 30 segundos por favor</label>
                </div>
              </form>
                    */}
            </div>
          </div>
        </div>
      );
    }
    // Usuario durante la partida
    function usersArePlaying() {
      return (
        <div id='check-in' className='dyn-main-wrapper animatedO opacity'>
          <label
            id='userEnrolled-state'
            className='user-state'
            style={{
              background: `rgba(${mainColor.red}, ${mainColor.green}, ${mainColor.blue}, 0.9)`,
            }}>
            {`${localStorage.name} Coordiná la partida con tu rival`}
          </label>
          {localStorage.picture ? (
            <img
              id='user-picture'
              style={{border: `1px solid rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`}}
              className='user-picture'
              src={localStorage.picture}
            />
          ) : (
            ''
          )}
          <div id='task-content' className='task-content'>
            <div id='user-box' className='user-box'>
              <div id='tittle-div' className='tittle-div'>
                <label id='checkin-tittle' className='checkin-tittle'>
                  PASO 3 -{' '}
                  <label id='tittle-desc' className='tittle-desc' style={{color: "green"}}>
                  EN BREVES APARECERÁN LOS NUEVOS CRUCES
                  </label>{' '}
                </label>
              </div>
              {/* 
              <div id='user-1-div' className='user-div' >
                
                <label id='user-1' className='user-1' style={{borderBottom: `1px solid rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`}}>
                  Tu : {rival.userNickname}
                </label>
              </div>
              <div id='user-2-div' className='user-div'>
                <label id='user-2' className='user-2' style={{borderBottom: `1px solid rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`}}>
                  Rival : {rival.info.nickname}
                </label>
              </div>*/}
            </div>
           
            {/*<label id='countDown-tittle' className='countDown-tittle'>
              Tiempo restante:
              <label id='countDown' className='countDown'>
                {' '}
                Cargando..
              </label>
            </label>*/}             
             {tInfo.waSupport ? waSupport(tInfo.waSupport) : ""}
          </div>
        </div>
      );
    }
    // Usuario Esperando Automatizaciòn de Resultados
    function userIsWaitingOrg() {
      return (
        <div
          id='waiting-content'
          className='dyn-main-wrapper animatedO opacity'>
          <label
            id='userEnrolled-state'
            className='user-state'
            style={{
              background: `rgba(${mainColor.red}, ${mainColor.green}, ${mainColor.blue}, 0.9)`,
            }}>
            {localStorage.name} revisaremos la informacion.
          </label>
          {localStorage.picture ? (
            <img
              id='user-picture'
              className='user-picture'
              src={localStorage.picture}
            />
          ) : (
            ''
          )}
          <div id='waiting-content-task-content' className='task-content'>
            <h5 id='waiting-Org' className='waiting-Org'>
              {' '}
              Muchas gracias por subir la informacion, estamos procesando los
              resultados
            </h5>
          </div>
        </div>
      );
    }
    // Panel de torneo para el torneo FINALIZADO y Para usuarios que perdieron
    function tournamentEnd() {
      return (
        <div
          id='loser-content'
          className='task-wrapper animatedO opacity'
          onLoad={enrolledLoad()}>
          <label
            id='loser-and-final'
            className='user-state'
            style={{
              background: `rgba(${mainColor.red}, ${mainColor.green}, ${mainColor.blue}, 0.9)`,
            }}>
            {localStorage.name} Gracias por competir
          </label>
          {localStorage.picture ? (
            <img
              id='user-picture'
              className='user-picture'
              src={localStorage.picture}
            />
          ) : (
            ''
          )}
          <div id='waiting-content-task-content' className='task-content'>
            <label id='loser-and-final' className='user-info-1'>
              Pronto se subiran los resultados
            </label>
            <p
              title='Espere pronto comenzara el torneo'
              id='register-user-info'
              className='user-info-2'>
              Esta competencia finalizó esperamos haya tenido una buena
              experiencia.
            </p>
          </div>
        </div>
      );
    }
    // Panel de torneo para aquellos que estan inscriptos en league of legends
    function usersArePlayingLol() {
      return (
        <div id='check-in' className='dyn-main-wrapper animatedO opacity'>
          <label
            id='userEnrolled-state'
            className='user-state'
            style={{
              background: `rgba(${mainColor.red}, ${mainColor.green}, ${mainColor.blue}, 0.9)`,
            }}>
            {`${localStorage.name} Coordiná la partida con tu rival`}
          </label>
          {localStorage.picture ? (
            <img
              id='user-picture'
              style={{border: `1px solid rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`}}
              className='user-picture'
              src={localStorage.picture}
            />
          ) : (
            ''
          )}
          <div id='task-content' className='task-content'>
            <div id='user-box' className='user-box' style={{marginBottom : '35px'}}>
              <div id='tittle-div' className='tittle-div'>
                <label id='checkin-tittle' className='checkin-tittle' style={{textAlign: 'left'}}>
                  PASO 2 -{' '}
                  <label id='tittle-desc' className='tittle-desc' style={{color: "green"}}>
                    CONTACTATE CON EL ORGANIZADOR VIA WHATSAPP PARA COORDINAR EL ENFRENTAMIENTO
                  </label>{' '}
                </label>
              </div>
              {/* 
              <div id='user-1-div' className='user-div' >
                
                <label id='user-1' className='user-1' style={{borderBottom: `1px solid rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`}}>
                  Tu : {rival.userNickname}
                </label>
              </div>
              <div id='user-2-div' className='user-div'>
                <label id='user-2' className='user-2' style={{borderBottom: `1px solid rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`}}>
                  Rival : {rival.info.nickname}
                </label>
              </div>*/}
            </div>
           
            {/*<label id='countDown-tittle' className='countDown-tittle'>
              Tiempo restante:
              <label id='countDown' className='countDown'>
                {' '}
                Cargando..
              </label>
            </label>*/}
             
            <div id="waSupport-content" className="waSupport-content" style={{position: "absolute" , bottom: "5px"}}>
              <img id="waIcon" className="waIcon" src={"https://res.cloudinary.com/versus/image/upload/v1600113647/Assets/Tournament2.0/xr4uzbrud64cnbmqp7eg.png"}></img>
              <label id="waSupport-text" className="waSupport-text">Grupo de soporte :</label>
              <a id="waSupport" className="waSupport" href={tInfo.waSupport} target="_blank">
                click aquí
              </a>
            </div>
          </div>
        </div>
      );
    }
    // Condicionales de Chequeo de fase
    function waitingOrgCheck() {
      return waitingOrg ? userIsWaitingOrg() : userImageUpload();
    }
    function readyBattleCheck() {
      return readyBattle ? usersArePlaying() : userCheckIn();
    }
    function tieBreakCheck() {
      return forTiebreaks.inTiebreak
        ? forTiebreaks.readyBattle
          ? forTiebreaks.waitingOrg
            ? userIsWaitingOrg()
            : userCheckIn() // userCheckin
          : userImageUpload() //imageupload
        : tournamentEnd();
    }
    function userInBracketCheck() {
      return userInActualBr ? readyBattleCheck() : tieBreakCheck();
    }
    function tournamentStarted(){
      alert("Este torneo ya comenzo regrese mas tarde o pruebe con otro ")
      window.location.href = `https://plataformaesports.com/#/${customerUrl(tInfo.customer)}`
    }

    switch (iTournament) {
      case 0:
        return (
          <img
            id='loading-img'
            className='loading-img'
            src='https://res.cloudinary.com/versus/image/upload/v1585185745/Statics_images/xxpauscz8misoyrhkjis.gif'></img>
        );
      // Inscripciones Abiertas
      case 1:
        return  userEnrolled ? userIsEnrolled() : userIsNotEnrolled(); // return userImageUpload()  // //
        break;
      // Inscripciones Cerradas
      case 2:
        return  userEnrolled ? userIsEnrolled() : tournamentStarted(); //userEnrolled ? userIsEnrolled() : userIsNotEnrolled();
        break;
      // Comenzo el torneo
      case 3:
        return  userEnrolled ? userIsEnrolled() : tournamentStarted();  //tInfo.game === "lol" ? usersArePlayingLol() : userInBracketCheck();
        break;
      case 4:
        return tournamentEnd();
        break;
    }
  }
  return taskDivs();
}

function tournamentCycle(iTournament) {
  function cycleLabelGreen(colorInput) {
    if (window.innerWidth <= 1024) {
      setTimeout(() => {
        document.getElementById(
          'tournament-cycle-label'
        ).style.background = colorInput;
      }, 1);
    }
  }
  switch (iTournament) {
    case 1:
      cycleLabelGreen('rgb(76, 175, 80)');
      return (
        <span id='tournament-cycle-span-1' className='green'>
          Abierto
        </span>
      );
      break;
    case 2:
      cycleLabelGreen('#F44336');
      return (
        <span id='tournament-cycle-span-2' className='red'>
          Cerrado
        </span>
      );
      break;
    case 3:
      cycleLabelGreen('#ffeb3b');
      return (
        <span id='tournament-cycle-span-3' className='yellow'>
          En curso
        </span>
      );
      break;
    case 4:
      cycleLabelGreen('#F44336');
      return (
        <span id='tournament-cycle-span-4' className='red'>
          Finalizado
        </span>
      );
    default:
      return 'Cargando';
      break;
  }
}

function dinamicTournamentPanel(navigation, tInfo, image, game, mainColor) {
  switch (navigation) {
    case 'Cargando':
      return (
        <img
          id='loading-img'
          className='loading-img'
          src='https://res.cloudinary.com/versus/image/upload/v1585185745/Statics_images/xxpauscz8misoyrhkjis.gif'></img>
      );
    case 'informacion':
      return (
        <div id='tournament-info' className='tournament-info animatedO opacity'>
          <label id='game-label' className='game-label'>
            {game.toUpperCase()}
          </label>
          <label id='tournament-cycle-label' className='tournament-cycle-label'>
            {tournamentCycle(tInfo.iTournament)}
          </label>
          <label id='countDown' className='countDown' style={{display : tInfo.iTournament === 3 ? "none" : "block"}}></label>
          <h4
            id='info-title'
            className='info-title'
            style={{
              borderBottom: `solid 1px rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`,
            }}>
            {tInfo.tournamentName}
          </h4>
          <i id='tStart-icon' className='material-icons tStart-icon'>
            date_range
          </i>
          <label
            id='tournament-start'
            className='tournament-start'>{`Comienza el ${tInfo.tStart.slice(
            8,
            10
          )} del ${tInfo.tStart
            .split('T')[0]
            .slice(5, 7)} a las ${tInfo.tStart
            .split('T')[1]
            .slice(0, 5)}`}</label>
          <i id='tAward-icon' className='material-icons tAward-icon'>
            whatshot
          </i>
          <label id='tournament-award' className='tournament-award'>
            {'Premio: '}
            {tInfo.tAward}
          </label>
          <label
            id='info-mode'
            className='info-mode'
            style={{
              borderBottom: `solid 1px rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`,
            }}>
            Modalidad de competencia
          </label>
          <label id='label-mode-0' className='label-mode-0'>
            Tendrás que jugar una fase{' '}
            <span id='mode-0' className='mode-0'>
              {tInfo.fase}
            </span>{' '}
            {tInfo.faseBo}
          </label>
          {/* 
          <label id='label-mode-1' className='label-mode-1'>
            Luego una fase
            <span id='mode-1' className='mode-1'>
              {' '}
              semanal
            </span>{' '}
            (BO3)
          </label>
          <label id='label-mode-2' className='label-mode-2'>
            Luego una final
            <span id='mode-2' className='mode-2'>
              {' '}
              mensual
            </span>{' '}
            (BO5)
          </label>
          */}
          <div id='image-gradient' className='image-gradient'></div>
          <div
            id='tournament-image'
            className='tournament-image'
            style={{ backgroundImage: `url(${image})` }}></div>
        </div>
      );
    case 'results':
      return (
        <div
          id='tournament-results'
          className='tournament-results animatedO opacity'>
          <h4 id='results-title' className='results-title'>
            resultados
          </h4>
        </div>
      );
      break;
  }
}

function navButtons(mainColor) {
  return (
    <div id='buttons-wrapper' className='buttons-wrapper'>
      <button
        id='nav-information'
        data-target='players-wrapper-modal'
        className='nav-information tooltipped highGradeButton'
        data-tooltip='Informacion del torneo'
        style={{
          border: `solid 2px rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`,
          backgroundColor: `rgba(${mainColor.red}, ${mainColor.green}, ${mainColor.blue}, 0.925)`,
          transition: '0.5s',
        }}
        onMouseOver={() => {
          event.target.style.backgroundColor = `rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue}`;
        }}
        onMouseLeave={() => {
          var tournamentData = document.getElementById('tournament-info');
          if (tournamentData.style.display === 'none') {
            var backgroundColor = `rgb(17, 18, 23)`;
            event.target.style.backgroundColor = backgroundColor;
          }
        }}
        onClick={() => {
          var tournamentData = document.getElementById('tournament-info');
          var calendar = document.getElementById('calendar-wrapper');
          var calendarButton = document.getElementById('nav-calendar');
          var infoButton = document.getElementById('nav-information');
          tournamentData.style.display = 'block';
          calendar.style.display = 'none';
          infoButton.className = 'nav-information tooltipped highGradeButton';
          infoButton.style.backgroundColor = `rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue}`;
          calendarButton.className = 'nav-calendar tooltipped lowGradeButton';
          calendarButton.style.backgroundColor = `rgba(${mainColor.red}, ${mainColor.green}, ${mainColor.blue}, 0`;
        }}>
        Información general
      </button>
      <button
        id='nav-calendar'
        data-target='calendar-modal'
        className='nav-calendar tooltipped lowGradeButton'
        data-tooltip='Calendario del torneo'
        style={{
          border: `solid ${window.innerWidth <= 1024 ? '1px' : '2px'} rgb(${
            mainColor.red
          }, ${mainColor.green}, ${mainColor.blue})`,
        }}
        onMouseOver={() => {
          // console.log(event)
          event.target.style.backgroundColor = `rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue}`;
        }}
        onMouseLeave={() => {
          var infoButton = document.getElementById('nav-information');
          if (
            infoButton.className ===
            'nav-information tooltipped highGradeButton'
          ) {
            var backgroundColor = `rgb(17, 18, 23)`;
            event.target.style.backgroundColor = backgroundColor;
          }
        }}
        onClick={() => {
          var tournamentData = document.getElementById('tournament-info');
          var calendar = document.getElementById('calendar-wrapper');
          var calendarButton = document.getElementById('nav-calendar');
          var infoButton = document.getElementById('nav-information');
          function pcHandler(mainColor) {
            window.innerWidth <= 1024
              ? ''
              : (tournamentData.style.display = 'none');
            calendar.style.display = 'block';
            infoButton.className = 'nav-information tooltipped lowGradeButton';
            infoButton.style.backgroundColor = `rgba(${mainColor.red}, ${mainColor.green}, ${mainColor.blue}, 0`;
            calendarButton.className =
              'nav-calendar tooltipped highGradeButton';
            calendarButton.style.backgroundColor = `rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue}`;
          }

          window.innerWidth <= 1024 ? '' : pcHandler(mainColor);
        }}>
        Calendario
      </button>
      <button
        id='nav-rules'
        className={`nav-rules modal-trigger lowGradeButton`}
        data-target='rules-modal'
        style={{
          border: `solid ${window.innerWidth <= 1024 ? '1px' : '2px'} rgb(${
            mainColor.red
          }, ${mainColor.green}, ${mainColor.blue})`,
        }}
        onMouseOver={() => {
          // console.log(event)
          event.target.style.backgroundColor = `rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue}`;
        }}
        onMouseLeave={() => {
          var backgroundColor = `rgb(17, 18, 23)`;
          event.target.style.backgroundColor = backgroundColor;
        }}>
        Reglamento
      </button>
    </div>
  );
}

var dinamicPanels = {
  centerDiv: centerDiv,
  dinamicTournamentPanel: dinamicTournamentPanel,
  calendar: calendar,
  tournamentCycle: tournamentCycle,
  returnBack: returnBack,
  navButtons: navButtons,
  //enrollForm: enrollForm
};

export default dinamicPanels;
