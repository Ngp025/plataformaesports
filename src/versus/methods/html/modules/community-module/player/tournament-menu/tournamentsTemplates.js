import React from 'react';
import dinamicPanels from './tournamentDinamicPanels';
import supportContent from '../support/supportContent';
import teamEnroll from '../../../../../vs-frames/teamEnroll';

//import login from '../../../../../../components/user/login/loginFunctions.js';

function newPara(messageData, chatBox) {
  for (var i = 0; i < messageData.length; i++) {
    //console.log(messageData[i].text)
    var newDivPara = document.createElement('div');
    newDivPara.setAttribute('key', `div-para-key-${i}`);
    newDivPara.setAttribute('id', `div-para${i}`);
    newDivPara.setAttribute('class', 'div-para');

    var userPara = document.createElement('p');
    userPara.setAttribute('key', `user-para-key-${i}`);
    userPara.setAttribute('id', `user-name-${i}`);
    userPara.setAttribute('class', 'user-name');
    userPara.innerText = `${messageData[0].userNick} dice :`;
    newDivPara.appendChild(userPara);

    var newPara = document.createElement('p');
    newPara.setAttribute('class', 'message-history');
    newPara.setAttribute('key', `${i}-paraKey`);
    newPara.setAttribute('id', `${i}-paraID`);
    newPara.innerText = messageData[i].text;
    newDivPara.appendChild(newPara);

    var newDataTime = document.createElement('label');
    newDataTime.setAttribute('key', `data-label-key-${i}`);
    newDataTime.setAttribute('id', `data-label-id-${i}`);
    newDataTime.innerText = `${messageData[0].time}\u00A0\u00A0`;
    newDivPara.appendChild(newDataTime);

    var newMiniImg = document.createElement('img');
    newMiniImg.setAttribute('src', `${messageData[0].picture}`);
    newMiniImg.setAttribute('id', `${i}-paraImg`);
    newMiniImg.setAttribute('id', `${i}-paraImg-key`);
    newMiniImg.setAttribute('class', 'picture-player');

    newDivPara.appendChild(newMiniImg);
    var chatBox = chatBox;
    chatBox.appendChild(newDivPara);
  }
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
      cycleLabelGreen('red');
      return (
        <span id='tournament-cycle-span-2' className='red'>
          Cerrado
        </span>
      );
      break;
    case 3:
      cycleLabelGreen('yellow');
      return (
        <span id='tournament-cycle-span-3' className='yellow'>
          En curso
        </span>
      );
      break;
    case 4:
      return (
        <span id='tournament-cycle-span-4' className='red'>
          Finalizado
        </span>
      );
    default:
      return 'Cargando...';
      break;
  }
}

// MODALS RENDERS FUNCTIONS

function calendar(tInfo, invoked, mainColor) {
  if (invoked === 'cel') {
    return (
      <div
        id='calendar-modal'
        className='calendar-modal modal cel-modal'
        style={{
          border: `solid 2px rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`,
          boxShadow: `0 0 12px 0 rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`,
        }}>
        <div id='calendar-modal-background' className='modal-background'>
          <div
            id='calendar-modal-background-filter'
            className='color-filter'
            style={{
              background: `linear-gradient(to bottom, rgba(${mainColor.red}, ${mainColor.green}, ${mainColor.blue}, 0.50) 15%, #111217 50%)`,
            }}>
            <h4
              id='calendar-tittle'
              className='modal-tittle'
              style={{
                borderLeft: `5px solid rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`,
              }}>
              Calendario
              <label id='calendar-game-label' className='game-label'>
                {location.href.split('#')[1].split('/')[1].split('-')[0]}
              </label>
            </h4>
            <div id='calendar-form-content' className='modal-content'>
              Pronto mas informaciòn.
              {/* 
            <div id="calendar-left-content" className="calendar-left-content">
              <div id="days-labels" className="days-labels">
                  <div id="day-1" className="day">LUN</div>
                  <div id="day-2" className="day">MAR</div>
                  <div id="day-3" className="day">MIE</div>
                  <div id="day-4" className="day">JUE</div>
                  <div id="day-5" className="day">VIE</div>
                  <div id="day-6" className="day">SAB</div>
                  <div id="day-7" className="day">DOM</div>
                </div>
              <div id='calendar' className='tournament-calendar'>
                </div>
                 {dinamicPanels.calendar(tInfo)}
              </div>
              <div id="calendar-rigth-content" className="calendar-rigth-content">
                <div id="day-info" className="day-info"></div>
                </div>
                */}
            </div>
            <i
              id='to-top'
              className='top-arrow material-icons'
              onClick={() => window.scroll(0, 0)}
              style={{
                display: `${window.innerWidth <= 1024 ? 'block' : 'none'}`,
              }}>
              arrow_upward
            </i>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div id='calendar-wrapper' className='calendar-wrapper animatedO opacity'>
        <div id='calendar-left-content' className='calendar-left-content'>
          <div id='days-labels' className='days-labels'>
            <div id='day-1' className='day'>
              LUN
            </div>
            <div id='day-2' className='day'>
              MAR
            </div>
            <div id='day-3' className='day'>
              MIE
            </div>
            <div id='day-4' className='day'>
              JUE
            </div>
            <div id='day-5' className='day'>
              VIE
            </div>
            <div id='day-6' className='day'>
              SAB
            </div>
            <div id='day-7' className='day'>
              DOM
            </div>
          </div>
          <div id='calendar' className='tournament-calendar'></div>
          {/*dinamicPanels.calendar(tInfo)*/}
        </div>
        <div id='calendar-rigth-content' className='calendar-rigth-content'>
          <div id='day-info' className='day-info'>
            Estamos trabajando en esta sección de la aplicación pronto mas
            novedades.
          </div>
        </div>
      </div>
    );
  }
}
/*
"question" : "¿Cómo válidar la partida?",
"solution-0" : "Para validar la partida deberas subir una captura con los resultados",
"solutionImage-0": "none",
"solution-1" : "none",
"solutionImage-1": "none"
*/
function supportHelpModal(supportNav, mainColor) {
  console.log(supportNav)
  return (
    <div
      id='help-modal'
      className='modal cel-modal'
      style={{
        border: `solid 1px rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`,
        boxShadow: `0 0 12px 0 rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`,
      }}>
      <div id='help-modal-content-background' className='modal-background'>
        <label
          id='sup-question'
          className='question'
          style={{
            borderBottom: `solid 2px rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`,
          }}>
          {supportNav.question}
        </label>
        <label id='solution0' className='solution-label'>
          <span
            id='solution-span-0'
            className='solution-span'
            style={{
              color: `rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`,
            }}>
            PASO 1:{' '}
          </span>
          {supportNav.solution0}
        </label>
        <img
          id='solutionImage0'
          className='solution-image'
          src={supportNav.solutionImage0}
          style={{
            display: `${
              supportNav.solutionImage0 === 'none' ? 'none' : 'block'
            }`,
            border: `1px solid rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`,
          }}></img>
        <label
          id='solution1'
          className='solution-label'
          style={{
            display: `${supportNav.solution1 === 'none' ? 'none' : 'block'}`,
          }}>
          <span
            id='solution-span-0'
            className='solution-span'
            style={{
              color: `rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`,
            }}>
            PASO 2:{' '}
          </span>
          {supportNav.solution1}
        </label>
        <img
          id='solutionImage1'
          className='solution-image'
          src={supportNav.solutionImage1}
          style={{
            display: `${
              supportNav.solutionImage1 === 'none' ? 'none' : 'block'
            }`,
            border: `1px solid rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`,
          }}></img>
                  <label
          id='solution2'
          className='solution-label'
          style={{
            display: `${supportNav.solution2 === 'none' ? 'none' : 'block'}`,
          }}>
          <span
            id='solution-span-0'
            className='solution-span'
            style={{
              color: `rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`,
            }}>
            PASO 3:{' '}
          </span>
          {supportNav.solution2}
        </label>
        <img
          id='solutionImage2'
          className='solution-image'
          src={supportNav.solutionImage2}
          style={{
            display: `${
              supportNav.solutionImage2 === 'none' ? 'none' : 'block'
            }`,
            border: `1px solid rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`,
          }}></img>
        <i
          id='to-top'
          className='top-arrow material-icons'
          onClick={() => window.scroll(0, 0)}
          style={{ display: `${window.innerWidth <= 1024 ? 'block' : 'none'}` }}>
          arrow_upward
        </i>
      </div>
    </div>
  );
}

function supportModal(game, invoked, mainColor, supportNavHandler) {
  if (invoked === 'cel') {
    return (
      <div
        id='support-modal'
        className='support-modal modal cel-modal'
        style={{
          border: `solid 2px rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`,
          boxShadow: `0 0 12px 0 rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`,
        }}>
        <div id='support-modal-background' className='modal-background'>
          <div
            id='support-modal-background-filter'
            className='color-filter'
            style={{
              background: `linear-gradient(to bottom, rgba(${mainColor.red}, ${mainColor.green}, ${mainColor.blue}, 0.50) 15%, #111217 50%)`,
            }}>
            <h4
              id='support-modal-tittle'
              className='modal-tittle'
              style={{
                borderLeft: `5px solid rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`,
              }}>
              Ayuda en linea
              <label id='game-label' className='game-label'>
                {game}
              </label>
            </h4>
            <div id='support-modal-content' className='modal-content'>
              <div id='support-faq' className='support-faq'></div>
            </div>
            <i
              id='to-top'
              className='top-arrow material-icons'
              onClick={() => window.scroll(0, 0)}
              style={{
                display: `${window.innerWidth <= 1024 ? 'block' : 'none'}`,
              }}>
              arrow_upward
            </i>
          </div>
        </div>
      </div>
    );
  }
}

function rulesModal(mainColor, game, regulation) {
  return (
    <div
      id='rules-modal'
      className='rules-modal modal cel-modal'
      style={{
        border: `solid 2px rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`,
        boxShadow: `0 0 12px 0 rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`,
      }}>
      <div id='rules-modal-background' className='modal-background'>
        <div
          id='rules-modal-background-filter'
          className='color-filter'
          style={{
            background: `linear-gradient(to bottom, rgba(${mainColor.red}, ${mainColor.green}, ${mainColor.blue}, 0.50) 15%, #111217 50%)`,
          }}>
          <h4
            id='rules-tittle'
            className='modal-tittle'
            style={{
              borderLeft: `5px solid rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`,
            }}>
            Reglamento
            <label id='game-label' className='game-label'>
              {game}
            </label>
          </h4>
          <div id='rules-modal-content' className='modal-content'>
            <p title='regulation'>{regulation}</p>
          </div>
          <i
            id='to-top'
            className='top-arrow material-icons'
            onClick={() => window.scroll(0, 0)}
            style={{
              display: `${window.innerWidth <= 1024 ? 'block' : 'none'}`,
            }}>
            arrow_upward
          </i>
        </div>
      </div>
    </div>
  );
}

//<label id='tournament-clock-label' className='tournament-clock-label'></label>
function classicTemplate(
  game,
  tInfo,
  actualInstance,
  rival,
  chatMessage,
  chatHistory,
  chatBox,
  navigation,
  image,
  enroll,
  unEnroll,
  supportNavHandler,
  supportNav,
  userEnrolled,
  openLogin,
  userInActualBr,
  waitingOrg,
  mainColor,
  checkOut,
  readyBattle,
  inTiebreak
) {
  //console.log(tInfo, '<--- tInfo en Clasic Template');
  //console.log(window.innerWidth > 767)
  return (
    <div
      id={`tournament-${game}-wrapper`}
      className={`tournament-${game}-wrapper animatedO opacity`}
      style={{
        background: `${
          window.innerWidth > 1025
            ? `radial-gradient(
              circle,
              rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue}) 0%,
              rgba(0,0,0,0) 37%,
              rgba(0,0,0,0) 47%,
              rgba(0,0,0,0) 51%,
              rgba(0,0,0,0) 59%,
              rgba(0,0,0,0) 100%
              )`
            : `linear-gradient(to bottom, rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue}) 0%,  #111217 30%)`
        }`,
      }}>
      <div
        id='nav-bar'
        className='nav-bar'
        style={{
          borderBottom: `1px solid rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue} )`,
        }}>
        {/*Comienzo de Navigation Bar */}
        <div id='nav-bar-content' className='nav-bar-content'>
          {/*login.loginButtonDisplay(navigation, mainColor) */}
          <label id='tournament-name' className='tournament-name'>
            {tInfo.customerTitle}
          </label>{' '}
          {/* Agregar Nombre del cliente dinamico */}
          <i
            id='back-button'
            className='back-button material-icons'
            style={{
              color: `rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`,
            }}
            onClick={() => window.history.back()}>
            arrow_back
          </i>
          <i
            id='cel-support'
            className=' cel-support material-icons modal-trigger'
            onClick={() => {
              window.scroll(0, 0);
              supportContent.appClassicSupportContent(supportNav);
            }}
            data-target='support-modal'
            style={{
              color: `rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`,
              display: `${window.innerWidth <= 1024 ? 'block' : 'none'}`,
            }}>
            help_outline
          </i>
          <i
            id='app-menu'
            data-target='dropdown1'
            className='app-menu dropdown-trigger material-icons'
            style={{
              color: `rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`,
            }}>
            apps
          </i>
          <div id='dropdown1' className='dropdown-content app-menu-dropdown'>
            <i
              id='profile-button'
              className='tooltipped profile-button material-icons'
              data-tooltip='Mira tu perfil'
              onMouseOver={() => {
                //event.target.style.color = `rgba(${mainColor.red}, ${mainColor.green}, ${mainColor.blue}, 0.1`
              }}
              onMouseLeave={() => {
                //event.target.style.color = "white" //`rgba(${mainColor.red}, ${mainColor.green}, ${mainColor.blue}, 0`
              }}
              onClick={() => (location.href = '/#/settings')}>
              person_pin
            </i>

            {/*<li className="divider" tabIndex="-1" style={{background: `rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`}}></li> */}
            <i
              id='log-out'
              className='log-out material-icons tooltipped'
              data-tooltip='Cerrar sesión'
              onClick={() => {
                localStorage.clear();
                window.history.back();
              }}>
              power_settings_new
            </i>
          </div>
          <label
            id='tournament-server-clock-label'
            className='tournament-server-clock-label'>
            Hora del servidor:{' '}
          </label>
          <label
            id='tournament-server-clock'
            className='tournament-server-clock'></label>
        </div>
      </div>
      {/*Fin de Div Nav-Bar <canvas className='p-landing' id='projector'/> */}
      {window.innerWidth <= 1024 ? calendar(tInfo, 'cel', mainColor) : ''}
      {window.innerWidth <= 1024
        ? supportModal(game, 'cel', mainColor, supportNav)
        : ''}
      {supportHelpModal(supportNav, mainColor)}
      <div
        id='tournament-image-cel'
        className='tournament-image'
        style={{
          backgroundImage: `url(${image})`,
          display: `${window.innerWidth <= 1024 ? 'block' : 'none'}`,
        }}>
        <label
          id='tournament-cycle-label'
          className='tournament-cycle-label'
          style={{
            background: `${tInfo.tournamentName ? 'grey' : ''}`,
            display: `${window.innerWidth <= 1024 ? 'block' : 'none'}`,
          }}>
          {tournamentCycle(tInfo.iTournament)}
        </label>
        <label
          id='countDown-cel'
          className='countDown'
          style={{ display: `${window.innerWidth <= 1024 ? tInfo.iTournament === 3 ? "none" : 'block' : 'none'}` }}>
          Cargando...
        </label>
      </div>
      <label
        id='tournament-tittle-cel'
        className='tournament-tittle-cel'
        style={{ display: `${window.innerWidth <= 1024 ? 'block' : 'none'}` }}>
        {tInfo.tournamentName}
      </label>
      <div id='t-content-wrapper' className='t-content-wrapper'>
        {window.innerWidth <= 1024 ? '' : dinamicPanels.navButtons(mainColor)}
        <div
          id='dynamic-panel'
          className={`dynamic-panel${
            window.innerWidth <= 1024 ? (userEnrolled ? '-collapsed' : '') : ''
          }`}>
          {window.innerWidth <= 1024 ? '' : calendar(tInfo, 'pc', mainColor)}
          <div
            id='dynamic-panel-cel-handler'
            className='dp-handler'
            style={{
              display: `${
                window.innerWidth <= 1024
                  ? userEnrolled
                    ? 'block'
                    : 'none'
                  : 'none'
              }`,
            }}
            onClick={() => {
              document.getElementsByClassName('dynamic-panel-collapsed')
                .length === 1
                ? (document.getElementsByClassName(
                    'dynamic-panel-collapsed'
                  )[0].className = 'dynamic-panel')
                : (document.getElementsByClassName(
                    'dynamic-panel'
                  )[0].className = 'dynamic-panel-collapsed');
              document.getElementById('dp-handler-chevron').className ===
              'chevron-down'
                ? 'chevron-up'
                : 'chevron-down';
            }}>
            <label
              id='dp-handler-text'
              className='dp-handler-text'
              style={{ display: `${userEnrolled ? 'block' : 'none'}` }}>
              Ver información del torneo{' '}
              <div
                id='dp-handler-chevron'
                className={`${userEnrolled ? 'chevron-down' : 'chevron-up'}`}
              />
            </label>
          </div>
          {/*document.getElementsByClassName("dynamic-panel-collapsed")[0] ? console.log(document.getElementsByClassName("dynamic-panel-collapsed")[0].innerHTML ="<p>CACA</p>") : ""*/}
          {dinamicPanels.dinamicTournamentPanel(
            navigation,
            tInfo,
            image,
            game,
            mainColor
          )}
        </div>
        <div
          id='buttons-wrapper-cel'
          className='buttons-wrapper'
          style={{
            display: `${window.innerWidth <= 1024 ? 'inline-block' : 'none'}`,
          }}>
          <button
            id='nav-information'
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
            }}>
            Información general
          </button>
          <button
            id='nav-calendar'
            data-target='calendar-modal'
            className='nav-calendar lowGradeButton modal-trigger'
            style={{
              border: `solid ${window.innerWidth <= 1024 ? '1px' : '2px'} rgb(${
                mainColor.red
              }, ${mainColor.green}, ${mainColor.blue})`,
            }}
            onClick={() => {
              window.scrollTo(0, 0);
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
            onClick={() => window.scrollTo(0, 0)}>
            Reglamento
          </button>
        </div>
        <div
          id='center-div-1'
          className='center-div-1'
          style={{
            borderLeft: `${
              window.innerWidth <= 1024
                ? 'none'
                : `6px solid rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`
            }`,
          }}>
          {dinamicPanels.centerDiv(
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
            inTiebreak
          )}
        </div>
        <div id='info-panel' className='info-panel'>
          <label
            id='day-message'
            className='day-message'
            style={{
              borderLeft: `10px solid rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`,
            }}>
            Mensaje del día
          </label>
          <div id='message-box' className='message-box'>
            <label id='message-updated' className='message-updated'>
              Ultima actualización{' '}
              {
                //`${tInfo.updatedAt.split("T")[0].split("-")[1]}-${tInfo.updatedAt.split("T")[0].split("-")[2]}
                // hora ${tInfo.updatedAt.split("T")[1].split("-")[0]}:${tInfo.updatedAt.split("T")[1].split("-")[1]}`
              }
            </label>
            <p title='actual info ' id='message-data' className='message-data'>
              El torneo está transcurriendo con normalidad, los mensajes del
              organizador apareceran aqui.
            </p>
          </div>
          <label
            id='winners'
            className='winners'
            style={{
              borderLeft: `10px solid rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`,
            }}>
            Ganadores
          </label>
          <div id='winners-box' className='winners-box'>
            <label>No hay ganadores aun</label>
            <a id='step' className='step'></a>
            <div id='day1-winners' className='day1-winners'></div>
            <div id='day2-winners' className='day2-winners'></div>
            <div id='day3-winners' className='day3-winners'></div>
            <div id='day4-winners' className='day4-winners'></div>
          </div>
          <div
            id='support-button'
            className='support-button-collapsed'
            style={{
              background: `rgb(${mainColor.red} , ${mainColor.green}, ${mainColor.blue})`,
              border: `1px solid rgb(${mainColor.red} , ${mainColor.green}, ${mainColor.blue})`,
            }}
            onClick={() => {
              var supportChat = document.getElementById('support-button');
              var supportFaq = document.getElementById('support-faq');
              var chevronUp = document.getElementById('chevron-up');
              var chatWrapper = document.getElementById('chat-wrapper');

              var supportChatState =
                supportChat.className === 'support-button-collapsed'
                  ? true
                  : false;

              function openMenu(elem, menuState) {
                supportChat.className = 'support-button-expanded';
                supportFaq.style.display = 'block';
                chevronUp.setAttribute(
                  'class',
                  'chevron-down animatedO opacity'
                );
              }
              function closeMenu(elem, menuState) {
                supportChat.className = 'support-button-collapsed';
                supportFaq.style.display = 'none';
                chevronUp.setAttribute('class', 'chevron-up animatedO opacity');
              }
              function chevronHandler(supportChatState) {
                var chevronClick =
                  event.composedPath()[0].className ===
                  'chevron-down animatedO opacity';
                chevronClick ? closeMenu() : openMenu();
                if (supportChatState) {
                  openMenu();
                } else {
                }
              }
              supportChatState
                ? chevronHandler(supportChatState)
                : chevronHandler(supportChatState);
            }}>
            <div id='chevron-up' className='chevron-up animatedO opacity'></div>
            <div id='support-tittle' className='support-tittle'>
              Ayuda en linea
            </div>
            {/* AQUI COMIENZA EL PANEL DE PREGUNTAS FRECUENTES */}
            <div id='support-faq' className='support-faq'>
              {supportContent.appClassicSupportContent(supportNavHandler)}
            </div>
          </div>
        </div>
        {/* 
        <div id='tournament-footer' className='tournament-footer'>
          <label id='footer-legend' className='footer-legend'>
            Desarrollado por Hype Interactivo.
          </label>
        </div>
        */}
      </div>
      {rulesModal(mainColor, game, tInfo.regulation)}
      {
        //console.log(tInfo.customer)
      }
      {teamEnroll.enrollForm(mainColor, enroll, tInfo.customer)}
    </div>
  );
}

const htmlTemplates = {
  classicTemplate: classicTemplate,
};

export default htmlTemplates;
