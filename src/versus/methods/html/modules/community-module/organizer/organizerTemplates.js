import React from 'react';
import ExportExcel from 'react-export-excel';
import formsModels from './organizerForms/formsModels.js';

var arrayPrint = [];

function organizerNavigation(
  nav,
  watchArr,
  game,
  tInfoPacketFunctions,
  orgPanel,
  orgForm
) {
  switch (nav) {
    case 'organizer-panel':
      return (
        <div className='organizer-panel' id='organizer-panel' name='content'>
          {console.log(watchArr)}
          {watchArr.length > 0
            ? watchArr.map((tournament, index) => {
                var tournamentCard = document.createElement('div');
                tournamentCard.setAttribute('id', 'tournament-card ');
                tournamentCard.setAttribute('class', 'tournament-card ');
                var name = tournament.tournamentName;
                var imageOrga = tournament.imageOrga;
                var IDT = tournament._id;
                var publicId = tournament.public_id;
                var tMax = tournament.cMax;
                var svTour = tournament.server;
                var startTime = tournament.tStart;
                var createdTime = tournament.createdAt;
                var tAward = tournament.tAward;
                var tDate = tournament.tDate;
                var imgMini = tournament.imgMini;
                var chatMessage = tournament.chatMessage;
                var closeIncription = tournament.closeIncription;
                var tMain = tournament.tMain;
                var tBracket = tournament.tBracket;
                var tournamentIndex = index;

                console.log(createdTime, 'created time');
                console.log(tournament.tDate, 'tdata');

                function cardContentHandler(IDT, tournamentIndex) {
                  var tournamentTittle = document.getElementById(
                    `tournaments-tittle-${IDT}`
                  );
                  var infoWrapper = document.getElementById(
                    `tournament-info-wrapper-${IDT}`
                  );
                  var stateWrapper = document.getElementById(
                    `tournament-state-wrapper-${IDT}`
                  );
                  var chatWrapper = document.getElementById(
                    `tournament-chat-wrapper-${IDT}`
                  );
                  var buttonClicked = event.composedPath()[0];
                  var buttonInfo = document.getElementById(
                    `button-info-${IDT}`
                  );
                  var buttonState = document.getElementById(
                    `button-state-${IDT}`
                  );
                  var buttonChat = document.getElementById(
                    `button-chat-${IDT}`
                  );

                  buttonClicked.name
                    ? (buttonClicked = buttonClicked)
                    : (buttonClicked = event.composedPath()[1]);
                  console.log(buttonClicked.name);
                  if (buttonClicked.name === 'info-wrapper') {
                    tournamentTittle.innerText = `Zona ${tournamentIndex} - Informacion`.toUpperCase();
                    chatWrapper.style.display = 'none';
                    buttonChat.setAttribute('class', 'info-chat');
                    stateWrapper.style.display = 'none';
                    buttonState.setAttribute('class', 'info-state');
                    infoWrapper.style.display = 'block';
                    buttonClicked.setAttribute(
                      'class',
                      'info-wrapper selected'
                    );
                  } else if (buttonClicked.name === 'info-state') {
                    tournamentTittle.innerText = `Zona ${tournamentIndex} - Estado`.toUpperCase();
                    chatWrapper.style.display = 'none';
                    buttonChat.setAttribute('class', 'info-chat');
                    infoWrapper.style.display = 'none';
                    buttonInfo.setAttribute('class', 'info-wrapper');
                    stateWrapper.style.display = 'block';
                    buttonClicked.setAttribute('class', 'info-state selected');
                  } else if (buttonClicked.name === 'info-chat') {
                    tournamentTittle.innerText = `Zona ${tournamentIndex} - Soporte`.toUpperCase();
                    stateWrapper.style.display = 'none';
                    buttonState.setAttribute('class', 'info-state');
                    infoWrapper.style.display = 'none';
                    buttonInfo.setAttribute('class', 'info-wrapper');
                    chatWrapper.style.display = 'block';
                    buttonClicked.setAttribute('class', 'info-chat selected');
                  }
                }

                function infoWrapper() {
                  // -- Info Wrapper Vars
                  var teamsMax = document.createElement('p');
                  teamsMax.innerHTML = `<label class='tournament-index'>Cantidad maxima:</label><label class='tournament-data'> ${tMax}</label>`;
                  teamsMax.setAttribute('id', `tMax-${IDT}`);
                  //--
                  var startDate = document.createElement('p');
                  startDate.innerHTML = `<label class='tournament-index'>Hora de comienzo:</label><label class='tournament-data'> ${startTime}</label>`;
                  startDate.setAttribute('id', `start-date-${IDT}`);
                  //--
                  var slicedCreated = createdTime.slice(0, 10);
                  var splitedCreated = slicedCreated.split('-');
                  console.log(splitedCreated, 'SPLITEDcREATE');
                  var created = document.createElement('p');
                  created.innerHTML = `<label class='tournament-index'>Fecha de creacion:</label><label class='tournament-data'> ${splitedCreated[1]}-${splitedCreated[2]}</label>`;
                  created.setAttribute('id', `created-date-${IDT}`);
                  //--
                  var serverTournament = document.createElement('p');
                  serverTournament.innerHTML = `<label class='tournament-index'>Servidor: </label><label class='tournament-data'>${svTour}</label>`;
                  serverTournament.setAttribute('id', `server-${IDT}`);
                  //--
                  var tournamentName = document.createElement('p');
                  tournamentName.setAttribute('id', `tournament-name-${IDT}`);
                  tournamentName.innerHTML = `<label class='tournament-index'>Nombre: </label><label class='tournament-data'>${name}</label>`;
                  //--
                  var tournamentAward = document.createElement('p');
                  tournamentAward.innerHTML = `<label class='tournament-index'>Premio: </label><label class='tournament-data'>${tAward}</label>`;
                  tournamentAward.setAttribute('id', `tAward-${IDT}`);
                  //--
                  console.log(tDate, '<----------- FECHA A SPLITEAR');
                  var slicedDate = tDate.slice(0, 7);
                  var splitedDate = slicedDate.split('-');
                  //console.log('Error al editar la informacion de la fecha')
                  var tournamentDate = document.createElement('p');
                  //tournamentDate.innerHTML = `<label class='tournament-index'>Fecha del torneo:</label><label class='tournament-data'> ${splitedDate[1]}-${splitedDate[0].slice(2,5)}</label>`;
                  //tournamentDate.setAttribute('id', `tDate-${IDT}`);
                  //--
                  var tournamentCloseIncription = document.createElement('p');
                  tournamentCloseIncription.setAttribute(
                    'id',
                    `close-inscription-${IDT}`
                  );
                  switch (closeIncription) {
                    case 1:
                      tournamentCloseIncription.innerHTML = `<label class='tournament-index'>Estado: </label><label class='tournament-data' id='tournament-state-data-${IDT}'>Abierto</label>`;
                      break;
                    case 2:
                      tournamentCloseIncription.innerHTML = `<label class='tournament-index'>Estado: </label><label class='tournament-data' id='tournament-state-data-${IDT}'>Cerrado</label>`;
                      break;
                    case 3:
                      tournamentCloseIncription.innerHTML = `<label class='tournament-index'>Estado: </label><label class='tournament-data id='tournament-state-data-${IDT}'>En curso</label>`;
                  }
                  //--
                  var footerButtons = document.createElement('div');
                  footerButtons.setAttribute('id', `footer-buttons-${IDT}`);
                  footerButtons.setAttribute('class', 'footer-buttons');
                  //--
                  var editButton = document.createElement('button');
                  editButton.innerText = 'EDITAR';
                  editButton.setAttribute('class', 'edit-button');
                  editButton.addEventListener('click', () => {
                    tInfoPacketFunctions().editTournament(IDT);
                  });
                  //--
                  var deleteButton = document.createElement('button');
                  deleteButton.innerText = 'BORRAR';
                  deleteButton.setAttribute('class', 'delete-button');
                  deleteButton.addEventListener('click', () => {
                    tInfoPacketFunctions().eraseTournament(IDT, publicId);
                  });
                  if (closeIncription === 2 || closeIncription === 3) {
                    var enrolledPlayers = document.createElement('div');
                    var totalPlayers = tBracket.length * 2;
                    enrolledPlayers.innerText = `${totalPlayers} / ${tMax}`;
                    enrolledPlayers.setAttribute('class', 'enrolled-players');
                  } else {
                    var enrolledPlayers = document.createElement('div');
                    enrolledPlayers.innerText = `${tMain.length} / ${tMax}`;
                    enrolledPlayers.setAttribute('class', 'enrolled-players');
                  }
                  //-- Info Wrapper AppenChilds
                  var tournamentInfoWrapper = document.createElement('div');
                  tournamentInfoWrapper.setAttribute(
                    'class',
                    'tournament-info-wrapper'
                  );
                  tournamentInfoWrapper.setAttribute(
                    'id',
                    `tournament-info-wrapper-${IDT}`
                  );
                  tournamentInfoWrapper.appendChild(tournamentName);
                  tournamentInfoWrapper.appendChild(teamsMax);
                  tournamentInfoWrapper.appendChild(tournamentDate);
                  tournamentInfoWrapper.appendChild(startDate);
                  tournamentInfoWrapper.appendChild(tournamentCloseIncription);
                  tournamentInfoWrapper.appendChild(created);
                  tournamentInfoWrapper.appendChild(tournamentAward);
                  tournamentInfoWrapper.appendChild(serverTournament);
                  footerButtons.appendChild(deleteButton);
                  footerButtons.appendChild(editButton);
                  footerButtons.appendChild(enrolledPlayers);
                  tournamentInfoWrapper.appendChild(footerButtons);
                  return tournamentInfoWrapper;
                }

                function tournamentState(tData) {
                  // -- Tournament State Vars
                  //-- Main Div
                  var tournamentState = document.createElement('div');
                  tournamentState.setAttribute('class', 'tournament-state');
                  tournamentState.setAttribute(
                    'id',
                    `tournament-state-wrapper-${IDT}`
                  );
                  tournamentState.style.display = 'none';
                  //--- tImg
                  var tImg = document.createElement('img');
                  tImg.setAttribute('id', 'tournament-image');
                  tImg.setAttribute('class', 'tournament-image');
                  tImg.setAttribute('src', `${imageOrga}`);
                  //-- tImg Background
                  var tImgBg = document.createElement('div');
                  tImgBg.setAttribute('class', 'tournament-img-bg');
                  //--
                  var tournamentMessage = document.createElement('label');
                  tournamentMessage.setAttribute('class', 'tournamen-message');
                  if (tData.vipMessage === '0') {
                    tournamentMessage.innerText = 'HOLA SOY EL MENSAJE DEL DIA';
                  } else {
                    tournamentMessage.innerText = tData.vipMessage;
                  }

                  var editText = document.createElement('button');
                  editText.innerText = 'Editar mensaje';
                  editText.className = 'edit-text';
                  editText.addEventListener('click', () => {
                    tInfoPacketFunctions().editText(IDT, tournamentMessage);
                  });

                  //* 1 = Torneo abierto
                  //* 2 = Cerro torneo
                  //* 3 = Torneo en curso

                  switch (closeIncription) {
                    case 1:
                      var closeTournament = document.createElement('button');
                      closeTournament.innerText = 'CERRAR INSCRIPCION';
                      closeTournament.setAttribute(
                        'class',
                        'close-inscription-button'
                      );
                      closeTournament.addEventListener('click', () => {
                        tInfoPacketFunctions().closeInscription(IDT);
                      });
                      var startTournamentButton = document.createElement(
                        'button'
                      );
                      startTournamentButton.innerText = 'COMENZAR TORNEO';
                      startTournamentButton.setAttribute(
                        'class',
                        'start-tournament-button'
                      );
                      startTournamentButton.disabled = true;
                      startTournamentButton.addEventListener('click', () => {
                        tInfoPacketFunctions().startTournament(IDT);
                      });
                      tournamentState.appendChild(closeTournament);
                      tournamentState.appendChild(startTournamentButton);
                      break;
                    case 2:
                      var closeTournament = document.createElement('button');
                      closeTournament.innerText = 'ABRIR INSCRIPCION';
                      closeTournament.setAttribute(
                        'class',
                        'close-inscription-button'
                      );
                      closeTournament.addEventListener('click', () => {
                        tInfoPacketFunctions().closeInscription(IDT);
                      });
                      var startTournamentButton = document.createElement(
                        'button'
                      );
                      startTournamentButton.innerText = 'COMENZAR TORNEO';
                      startTournamentButton.setAttribute(
                        'class',
                        'start-tournament-button'
                      );
                      startTournamentButton.addEventListener('click', () => {
                        tInfoPacketFunctions().startTournament(IDT);
                      });
                      tournamentState.appendChild(closeTournament);
                      tournamentState.appendChild(startTournamentButton);
                      break;
                    case 3:
                      var tournamentStateLabel = document.createElement(
                        'label'
                      );
                      tournamentStateLabel.innerText = 'Torneo en curso';
                      tournamentStateLabel.setAttribute(
                        'class',
                        'tournament-state-label'
                      );
                      tournamentState.appendChild(tournamentStateLabel);

                      var startTournamentButton = document.createElement(
                        'button'
                      );
                      startTournamentButton.innerText = 'DETENER TORNEO';
                      startTournamentButton.setAttribute(
                        'class',
                        'start-tournament-button'
                      );
                      startTournamentButton.addEventListener('click', () => {
                        tInfoPacketFunctions().eraseTournament(IDT);
                      });
                      tournamentState.appendChild(startTournamentButton);

                      break;
                  }
                  //-- Tournament State AppenChilds
                  tImgBg.appendChild(tournamentMessage);
                  tournamentState.appendChild(tImg);
                  tournamentState.appendChild(tImgBg);
                  tournamentState.appendChild(editText);
                  return tournamentState;
                }

                function tournamentChatWrapper() {
                  var tournamentChatWrapper = document.createElement('div');
                  // CHAT VARS
                  var tournamentChat = document.createElement('div');
                  tournamentChat.setAttribute('id', `chat-${IDT}`);
                  tournamentChat.className = 'chat-wrapper';
                  tournamentChat.style.display = 'none';
                  //--
                  var chatBox = document.createElement('div');
                  chatBox.setAttribute('class', 'chat-box');
                  //--
                  var tournamentLabel = document.createElement('label');
                  tournamentLabel.setAttribute('class', 'chat-title');
                  chatBox.appendChild(tournamentLabel);
                  //--
                  var chatInput = document.createElement('input');
                  chatInput.setAttribute('class', 'message-input');
                  tournamentChat.appendChild(chatInput);
                  //--
                  var chatButton = document.createElement('button');
                  chatButton.setAttribute('class', 'send-button');
                  tournamentChat.appendChild(chatButton);
                  tournamentChat.appendChild(chatBox);
                  //--

                  for (var i = 0; chatMessage.length > i; i++) {
                    let output = chatBox;
                    output.innerHTML += `<div class='div-para'>
                              <p class='user-name'>${chatMessage[i].userNick} dice :</p>
                              <p class='message-history'>${chatMessage[i].text}</p>
                              <label>${chatMessage[i].time}</label>
                              <img src=${chatMessage[i].picture} class='picture-player'>
                            </div> `;
                    output.scrollTo(0, output.offsetHeight * 20);
                  }

                  //--
                  var chatButton = document.createElement('button');
                  chatButton.innerText = 'CHAT';
                  chatButton.setAttribute('class', `chat-button`);
                  chatButton.addEventListener('click', () => {
                    tInfoPacketFunctions().displayChat(IDT);
                  });
                  //--
                  var validateResultsDiv = document.createElement('div');
                  validateResultsDiv.setAttribute(
                    'id',
                    `validate-results-div-${IDT}`
                  );
                  validateResultsDiv.setAttribute(
                    'class',
                    'validate-results-div'
                  );
                  validateResultsDiv.style.display = 'block';
                  //console.log(tBracket)

                  function renderPlayer(newBracket) {
                    var bracket = document.createElement('div');
                    bracket.setAttribute('id', `bracket-${IDT}`);
                    bracket.setAttribute('class', 'bracket');

                    var playerA = document.createElement('label');
                    playerA.setAttribute('id', `playerA-${IDT}`);
                    playerA.setAttribute('class', 'playerA');
                    bracket.appendChild(playerA);

                    var playerB = document.createElement('label');
                    playerB.setAttribute('id', `playerB-${IDT}`);
                    playerB.setAttribute('class', 'playerB');
                    bracket.appendChild(playerB);

                    for (var tbrr = 0; tbrr < newBracket.length; tbrr++) {
                      tbrr === 0
                        ? (playerA.innerText = newBracket[tbrr].nickname)
                        : (playerB.innerText = newBracket[tbrr].nickname);
                    }

                    return bracket;
                  }

                  for (var tbn = 0; tbn < tBracket.length; tbn++) {
                    //console.log(tBracket[tbn][0])

                    validateResultsDiv.appendChild(renderPlayer(tBracket[tbn]));
                  }

                  //
                  var validateResults = document.createElement('button');
                  validateResults.setAttribute('id', `validate-results-${IDT}`);
                  validateResults.setAttribute('class', 'validate-results');
                  validateResults.innerText = 'Validar R.';
                  validateResults.addEventListener('click', () => {
                    tInfoPacketFunctions().validateResults(IDT);
                  });
                  //console.log(validateResults)

                  // VALIDATE RESULTS CHILDS
                  tournamentChatWrapper.appendChild(validateResultsDiv);
                  tournamentChatWrapper.appendChild(validateResults);

                  // CHAT CHILDS
                  tournamentChatWrapper.setAttribute(
                    'class',
                    'tournament-chat-wrapper'
                  );
                  tournamentChatWrapper.setAttribute(
                    'id',
                    `tournament-chat-wrapper-${IDT}`
                  );
                  tournamentChatWrapper.style.display = 'none';
                  tournamentChatWrapper.style.display = 'none';
                  tournamentChatWrapper.appendChild(chatButton);
                  tournamentChatWrapper.appendChild(tournamentChat);

                  return tournamentChatWrapper;
                }

                //-- Main Childs
                //-- To Tournament-Panel
                var tournamentFormat = document.createElement('a');
                tournamentFormat.setAttribute('class', 'tournament-format');
                tournamentFormat.setAttribute(
                  'id',
                  `tournaments-format-${IDT}`
                );
                var text = 'Panel de torneo';
                tournamentFormat.addEventListener('click', () => {
                  document.location.href = `#/tournament-panel/${game}/${IDT}`;
                });
                tournamentFormat.innerText = text.toLocaleUpperCase();
                //-- Nav Card Tittle
                var tournamentInformationTittle = document.createElement('h4');
                tournamentInformationTittle.setAttribute(
                  'class',
                  'tournaments-tittle'
                );
                tournamentInformationTittle.setAttribute(
                  'id',
                  `tournaments-tittle-${IDT}`
                );
                var tittle = `Zona ${tournamentIndex} - Informacion`;
                tournamentInformationTittle.innerText = tittle.toLocaleUpperCase();
                //-- Nav Card Buttons
                var buttonInfo = document.createElement('button');
                buttonInfo.innerHTML = `<i id="info-wrapper-button-${index}" name='info-wrapper' class='material-icons'> date_range <i/>`;
                buttonInfo.setAttribute('id', `button-info-${IDT}`);
                buttonInfo.setAttribute('class', 'info-wrapper selected');
                buttonInfo.setAttribute('name', 'info-wrapper');
                //buttonInfo.style.borderColor = '#448aff'
                buttonInfo.addEventListener('click', () => {
                  cardContentHandler(IDT, tournamentIndex);
                });
                var buttonState = document.createElement('button');
                buttonState.innerHTML = `<i id="info-state-button-${index}" name='info-state' class='material-icons'> airplay <i/>`;
                buttonState.setAttribute('id', `button-state-${IDT}`);
                buttonState.setAttribute('class', 'info-state');
                buttonState.setAttribute('name', 'info-state');
                buttonState.addEventListener('click', () => {
                  cardContentHandler(IDT, tournamentIndex);
                });
                var buttonChat = document.createElement('button', 'info-chat');
                buttonChat.innerHTML = `<i id="info-chat-button-${index}" name='info-chat' class='material-icons'> chat <i>`;
                buttonChat.setAttribute('id', `button-chat-${IDT}`);
                buttonChat.setAttribute('class', 'info-chat');
                buttonChat.setAttribute('name', 'info-chat');
                buttonChat.addEventListener('click', () => {
                  cardContentHandler(IDT, tournamentIndex);
                });
                //--  Nav Buttons
                tournamentCard.appendChild(tournamentFormat);
                tournamentCard.appendChild(buttonInfo);
                tournamentCard.appendChild(buttonState);
                tournamentCard.appendChild(buttonChat);
                tournamentCard.appendChild(tournamentInformationTittle);
                //-- Main Content
                tournamentCard.appendChild(infoWrapper());
                tournamentCard.appendChild(tournamentState(tournament));
                tournamentCard.appendChild(tournamentChatWrapper(tournament));

                //--
                //tournamentDisplay.appendChild(tournamentCard);
                document
                  .getElementById('organizer-panel')
                  .appendChild(tournamentCard);
              })
            : 'load'}
        </div>
      );
    case 'tournament-panel':
      console.log('tournament panel');

      var contentWrapper = document.getElementById('content-wrapper');
      //console.log(contentWrapper)
      //var isRender = document.getElementById("tournament-panel-bg")
      var isRender = false;
      if (isRender) {
      } else {
        var touramentPanel = document.createElement('div');
        touramentPanel.setAttribute('id', 'tournament-panel-bg');
        touramentPanel.setAttribute('class', 'tournament-panel-bg');

        var tournamentPanelContent = document.createElement('div');
        tournamentPanelContent.setAttribute(
          'id',
          'tournament-panel-content-wrapper'
        );
        tournamentPanelContent.setAttribute(
          'class',
          'tournament-panel-content-wrapper'
        );
        touramentPanel.appendChild(tournamentPanelContent);

        setTimeout(() => {
          orgForm();
        }, 1);

        // ORGANIZER BUTTONS PANEL

        var daysLabels = document.createElement('div');
        daysLabels.setAttribute('id', 'days-labels');
        daysLabels.setAttribute('class', 'days-labels');

        for (var i = 0; i < 7; i++) {
          var newDay = document.createElement('span');
          newDay.setAttribute('id', `day-${i + 1}`);
          newDay.setAttribute('class', 'day');
          switch (i) {
            case 0:
              newDay.innerText = 'LUN';
              break;
            case 1:
              newDay.innerText = 'MAR';
              break;
            case 2:
              newDay.innerText = 'MIE';
              break;
            case 3:
              newDay.innerText = 'JUE';
              break;
            case 4:
              newDay.innerText = 'VIE';
            case 5:
              newDay.innerText = 'SAB';
              break;
            case 6:
              newDay.innerText = 'DOM';
              break;
          }
          daysLabels.appendChild(newDay);
        }

        var organizerButtons = document.createElement('div');
        organizerButtons.setAttribute('id', 'organizer-buttons');
        organizerButtons.setAttribute('class', 'organizer-buttons');

        organizerButtons.appendChild(daysLabels);
        tournamentPanelContent.appendChild(organizerButtons);

        console.log(watchArr);
        setTimeout(() => {
          orgPanel(watchArr);
        }, 1);

        // ORGANIZER FORM

        var organizerForm = document.createElement('div');
        organizerForm.setAttribute('id', 'organizer-form');
        organizerForm.setAttribute('class', 'organizer-form');

        var organizerFormWrapper = document.createElement('div');
        organizerFormWrapper.setAttribute('id', 'organizer-form-wrapper');
        organizerFormWrapper.setAttribute('class', 'organizer-form-wrapper');
        organizerForm.appendChild(organizerFormWrapper);

        tournamentPanelContent.appendChild(organizerForm);

        contentWrapper.appendChild(touramentPanel);
      }

      return <div></div>;

    /*
      return (
        <div id='tournament-panel-bg' className='tournament-panel-bg'>
          <div id="tournament-panel-content-wrapper" className="tournament-panel-content-wrapper"> 
            <div id="days-labels" className="days-labels">
              <span id="day-1" className="day">LUN</span>
              <span id="day-2" className="day">MAR</span>
              <span id="day-3" className="day">MIE</span>
              <span id="day-4" className="day">JUE</span>
              <span id="day-5" className="day">VIE</span>
              <span id="day-6" className="day">SAB</span>
              <span id="day-7" className="day">DOM</span>
            </div>
            <div id='organizer-buttons' className='organizer-buttons'>
              {
                 setTimeout(function () {
                   orgPanel(); // Estos valores representan ( Dia inicial, Mes Inicial, DuracionDeTorneoSemana //tiene que arrancar el mismo dia )
                   }, 100)
              }
              </div>
          </div>
          <div id='organizer-form' className='organizer-form'>
            <div id='organizer-form-wrapper' className='organizer-form-wrapper'>
              {orgForm()}
            </div>
          </div>
          <button onClick={() => uploadInstances()}>Grabar Formato</button>
        </div>
      ); */
  }
}

async function sendMailForEveryPlayerInTournament() {
  var IDTRosarioFifa20 = '5f5be982fff0e660d4062f78';
  await fetch(`/api/organizer/emails/${IDTRosarioFifa20}/load`)
    .then((res) => res.json())
    .then((json) => {
      arrayPrint.push(json);
      console.log('LISTO!!!');
    });
}

function classicTemplate(
  game,
  nav,
  watchArr,
  createClose,
  tInfoPacketFunctions,
  uploadInstances,
  selectInit,
  organizerPanel,
  orgForm,
  eraseTournament
) {
  const ExcelFile = ExportExcel.ExcelFile;
  const ExcelSheet = ExportExcel.ExcelSheet;
  const ExcelColumn = ExportExcel.ExcelColumn;
  return (
    <div className={`${game}-organizer-wrapper`} id='plataformaesports-home'>
      <div id='left-div' className='left-div'></div>
      <div id='rigth-div' className='rigth-div'></div>
      {/* AQUI COMIENZA NAVIGATION BAR */}
      <div className='navigation-bar center' id='nav-bar-home'>
        <h2 id='organizer-title' className='organizer-title'>
          Panel de organizador de {sessionStorage.customer}
        </h2>
        <button
          id='create-button'
          data-target='createTournaments'
          className='modal-trigger tooltipped create-button'
          data-tooltip='Creá un nuevo torneo'
          disabled={createClose}>
          Nuevo Torneo
        </button>
        <button
          id='delete-button'
          className=' tooltipped delete-button'
          data-tooltip='Borra el torneo actual'
          disabled={!createClose}
          onClick={() => eraseTournament()}>
          Borrar Torneo
        </button>
        <button
          id='export-button'
          className=' tooltipped export-button'
          data-tooltip='Finaliza el torneo y guarda ganadores'
          onClick={() => {
            sendMailForEveryPlayerInTournament();
          }}
          disabled={false}>
          Exportar Ganadores
        </button>
        <div
          id='createTournaments'
          className='modal createTournamentModal modal-fixed-footer'>
          <div id='modal-content' className='modal-content'>
            {formsModels(game, selectInit)}
            <a className='modal-close waves-effect waves-green btn-flat'>
              Close
            </a>
          </div>
        </div>
      </div>
      {/* AQUI TERMINA NAVIGATION BAR */}

      {/* AQUI COMIENZA CONTENT WRAPPER */}
      <div
        className='content-wrapper'
        id='content-wrapper'
        name='content-wrapper'>
        {organizerNavigation(
          nav,
          watchArr,
          game,
          tInfoPacketFunctions,
          organizerPanel,
          orgForm
        )}

        {/* Excel export */}
        <ExcelFile
          element={<button> Export Excel </button>}
          filename='Excel Information'>
          <ExcelSheet
            data={[
              {
                email: 'santyrk7658@gmail.com',
                nickname: 'santyrk7658',
                name: 'Santiago Ruiz Kuttel ',
              },
              {
                email: 'bcapurro11@gmail.com',
                nickname: 'Capurrin_',
                name: 'Bautista capurro',
              },
              {
                email: 'tentacionmomera@gmail.com',
                nickname: 'EvilTatooh',
                name: 'Christian Ferraro',
              },
              {
                email: 'ariirios2002@gmail.com',
                nickname: 'Ariirios02',
                name: 'Ariel rios',
              },
              {
                email: 'agustin.robles.gonzalez@gmail.com',
                nickname: 'AGUS_ALBERTO0095',
                name: 'Agustin Gonzalez',
              },
              {
                email: 'Bot para Completar Informacion ',
                nickname: 'TangerMan',
                name: 'TangeTaber',
              },
              {
                email: 'luisfigue10@gmail.com',
                nickname: 'Luis_de_lomas',
                name: 'Luis figueroa',
              },
              {
                email: 'juniormarcos1960@gmail.com',
                nickname: 'Seven7-killer7',
                name: 'Marcos Juarez',
              },
              {
                email: 'mateo.dotto.16@gmail.com',
                nickname: 'NJR11teo',
                name: 'Mateo Dotto',
              },
              {
                email: 'fede_10_verdinegro@hotmail.com',
                nickname: 'FedeVidela1992',
                name: 'Federico Videla',
              },
              {
                email: 'valentinbaglione@gmail.com',
                nickname: 'ValenBaglione_',
                name: 'Valentín Baglione',
              },
              {
                email: 'viculin44@gmail.com',
                nickname: 'Viculin2015',
                name: 'Iván Viculin',
              },
              {
                email: 'michelelguti@hotmail.com',
                nickname: 'Miche_g98',
                name: 'Michel Leonel Gutierrez',
              },
              {
                email: 'ginojalon@gmail.com',
                nickname: 'Abcgatito ',
                name: 'Gino jalon',
              },
              {
                email: 'gallogaston462@gmail.com',
                nickname: 'Gastygallo10',
                name: 'Gastón Gallo ',
              },
              {
                email: 'matiquilmesq22@gmail.com',
                nickname: 'Matiasq22',
                name: 'Matias  errecalde legler',
              },
              {
                email: 'matyparella@gmail.com',
                nickname: 'Matyfcbarca ',
                name: 'Maty Parella',
              },
              {
                email: 'juancruzmilesi@live.com',
                nickname: 'juancmilesi ',
                name: 'Juan Cruz Milesi',
              },
              {
                email: 'agusbarbara20@gmail.com',
                nickname: 'AgusBarbara2001',
                name: 'Agustín Barbara',
              },
              {
                email: 'agusdure11@hotmail.com',
                nickname: 'agudure',
                name: 'Agustín Duré',
              },
              {
                email: 'briandanielcapo12@gmail.com',
                nickname: 'Mayerr03',
                name: 'Brian Buckmayer',
              },
              {
                email: 'lautarogil.lg@gmail.com',
                nickname: 'Licantropo-22',
                name: 'Lautaro Gil',
              },
              {
                email: 'lg314978@gmail.com',
                nickname: 'lgDLB2003',
                name: 'Leonel Garcia',
              },
              {
                email: 'ema.bosterola12@gmail.com',
                nickname: 'Ema_bocala12',
                name: 'Emmanuel Saavedra',
              },
              {
                email: 'alexispiri07@gmail.com',
                nickname: 'Lapiraguaa',
                name: 'Alexis correa',
              },
              {
                email: 'fcandia@galileo.edu.ar',
                nickname: 'Peqos_',
                name: 'Franco candia',
              },
              {
                email: 'nachopeska95@gmail.com',
                nickname: 'Peskitaa',
                name: 'Ignacio Peska',
              },
              {
                email: 'santicapodehuracan73@gmail.com',
                nickname: 'santidaluz19',
                name: 'Santino',
              },
              {
                email: 'juanmabg14@gmail.com',
                nickname: 'Juanma-juanmabg1',
                name: 'Juan Manuel Berruezo ',
              },
              {
                email: 'tomasjuanbustos@hotmail.com',
                nickname: 'BustosT99',
                name: 'Tomas Bustos',
              },
              {
                email: 'camirod0901@gmail.com',
                nickname: 'MiloCastellino',
                name: 'Camilo Rodriguez',
              },
              {
                email: 'maticornearg@gmail.com',
                nickname: 'matiascornejo_',
                name: 'Matías Cornejo',
              },
              {
                email: 'tickipolo@gmail.com',
                nickname: 'BlackHaz44',
                name: 'Ricardo Romanessi',
              },
              {
                email: 'gonzalotbogado@gmail.com',
                nickname: 'yGnZ_Kalfita',
                name: 'Gonzalo Bogado',
              },
              {
                email: 'Bot para Completar Informacion ',
                nickname: 'abrir2025',
                name: 'abrir2025',
              },
              {
                email: 'santanagames11@gmail.com',
                nickname: 'andersonspbr ',
                name: 'Anderson Souza Santana',
              },
              {
                email: 'nicolasderiver1@gmail.com',
                nickname: 'Nicolas_carp24',
                name: 'Nicolas Amaral',
              },
              {
                email: 'ruscittilautaro@gmail.com',
                nickname: 'Colonporsiempre',
                name: 'Ezequiel ruscitti',
              },
              {
                email: 'axel_pampi@hotmail.com',
                nickname: 'Pampidemba7 ',
                name: 'Axel Pampillon',
              },
              {
                email: 'franciscofernandez3976@gmail.com',
                nickname: 'Fabriz2005 ',
                name: 'Fabrizio garcia',
              },
              {
                email: 'thoomas.muniz@hotmail.com',
                nickname: 'Thomasmuniiz',
                name: 'Thomas Muñiz',
              },
              {
                email: 'franlasta@icloud.com',
                nickname: 'Franlasta7',
                name: 'Francisco Lasta',
              },
              {
                email: 'ignaciosores2002@gmail.com',
                nickname: 'Igna_Osores_',
                name: 'Ignacio Osores',
              },
              {
                email: 'gonzaarossetti@gmail.com',
                nickname: 'Rossenberg22',
                name: 'Gonzalo rossetti',
              },
              {
                email: 'ramifernandez02@gmail.com',
                nickname: 'Rama_fernandez23',
                name: 'Ramiro Fernández',
              },
              {
                email: 'sernaapedroo@gmail.com',
                nickname: 'Chaiich',
                name: 'Pedro Serna',
              },
              {
                email: 'dadinmarcoos4@gmail.com',
                nickname: 'fmldadin',
                name: 'Marcos Dadin',
              },
              {
                email: 'tomas.amher@gmail.com',
                nickname: 'Pulso_99',
                name: 'Tomás Amher',
              },
              {
                email: 'cardozo.matias2000@gmail.com',
                nickname: 'MaTii_car00',
                name: 'Matias Cardozo',
              },
              {
                email: 'valentinmelet@gmail.com',
                nickname: 'Hyker_V4L3N',
                name: 'Valentin melamet',
              },
              {
                email: 'mateogarcia2607@gmail.com',
                nickname: 'mateogarci03',
                name: 'Mateo garcia',
              },
              {
                email: 'nicolas_781@hotmail.com',
                nickname: 'Nicolas_rrc',
                name: 'Nicolas gutierrez',
              },
              {
                email: 'cosa.camila@gmail.com',
                nickname: 'SylaRodus',
                name: 'Camila Cosa',
              },
              {
                email: 'tomasg435@outlook.es',
                nickname: 'tomgauna',
                name: 'Tomas Gauna',
              },
              {
                email: 'xxmartincarpxx@gmail.com',
                nickname: 'Martin1CARP',
                name: 'Martin Raimondo',
              },
              {
                email: 'chinofernandez2009@hotmail.com',
                nickname: 'IvaanFernandez__',
                name: 'Ivan Fernandez',
              },
              {
                email: 'joaquinfifa17@gmail.com',
                nickname: 'Joaquin1126sb',
                name: 'Joaquín Sequeira',
              },
              {
                email: 'matylh_1998@hotmail.com',
                nickname: 'Mati56712',
                name: 'Matias ordoñez',
              },
              {
                email: 'kevinhoflores@gmail.com',
                nickname: 'KevinTWM-',
                name: 'Kevin Flores',
              },
              {
                email: 'marcosesquite290@gmail.com',
                nickname: 'TNT_Andy_Prado',
                name: 'Marcos Esquite',
              },
              {
                email: 'lautyrock226@gmail.com',
                nickname: 'LautaroMN97',
                name: 'Lautaro Morales',
              },
              {
                email: 'ezequielcoria@outlook.com',
                nickname: 'Eche_coria',
                name: 'Ezequiel Coria ',
              },
              {
                email: 'wainercarp2002@gmail.com',
                nickname: 'riverones ',
                name: 'Valentin Wainerman',
              },
              {
                email: 'agusrome2000@gmail.com',
                nickname: 'Romee00_',
                name: 'Agustin romero',
              },
              {
                email: 'joni_lre@hotmail.com',
                nickname: 'ThumperGambino13',
                name: 'Jonatan Dominguez ',
              },
              {
                email: 'axelgangeme@hotmail.com',
                nickname: 'Bikibikifc',
                name: 'Axel Leonel Gangeme',
              },
              {
                email: 'mateodominguez111@gmail.com',
                nickname: 'MateoDominguez',
                name: 'Marrón Dominguez',
              },
              {
                email: 'alejoburki@hotmail.com',
                nickname: 'alejoburki',
                name: 'Alejo Burki',
              },
              {
                email: 'leproso_lucas@hotmail.com',
                nickname: 'Lucrado-1974',
                name: 'Lucas mariotti',
              },
              {
                email: 'cristianvegaok@hotmail.com',
                nickname: 'Cr7cai',
                name: 'Cristian cai',
              },
              {
                email: 'juanchoorcese97@gmail.com',
                nickname: 'Juanc1907',
                name: 'Juan cruz Orcese',
              },
              {
                email: 'lucaas.xeneise.99@gmail.com',
                nickname: 'buyo099',
                name: 'Lucas Buyo',
              },
              {
                email: 'Bot para Completar Informacion ',
                nickname: 'clonita66',
                name: 'Niclonita',
              },
              {
                email: 'santiago_velazquez08@hotmail.com',
                nickname: 'Santy12345678448',
                name: 'santiago velazquez',
              },
              {
                email: 'Bot para Completar Informacion ',
                nickname: 'soyelsol',
                name: 'soyElSol',
              },
              {
                email: 'nahuel.abasolo@hotmail.com',
                nickname: 'Nahuelabasolo',
                name: 'Nahuel abasolo',
              },
              {
                email: 'dilitan78@gmail.com',
                nickname: 'CAstakaking',
                name: 'Dylan Alexander Fernández',
              },
              {
                email: 'duran99999@gmail.com',
                nickname: 'angeldurazno',
                name: 'Angel Gabriel Duran',
              },
              {
                email: 'arocenaalan@gmail.com',
                nickname: 'Zamparc',
                name: 'Alan Arocena',
              },
              {
                email: 'dondavy07@gmail.com',
                nickname: 'dontoldave91',
                name: 'Davidson Losier',
              },
              {
                email: 'ezequieltrivisonno@hotmail.com',
                nickname: 'TriviBj',
                name: 'ezequiel trivisonno',
              },
              {
                email: 'jonathanmirandarodriguez01@gmail.com',
                nickname: 'Joni05Miranda',
                name: 'Jonathan Miranda',
              },
              {
                email: 'mandolesifelipe@gmail.com',
                nickname: 'Hoodiefelton_',
                name: 'Felipe Mandolesi',
              },
              {
                email: 'dyceghard@gmail.com',
                nickname: 'Dyceghard27',
                name: 'Marcelo Gunter',
              },
              {
                email: 'aguszerda94@gmail.com',
                nickname: 'AgussZ92',
                name: 'Agustín Zerda',
              },
              {
                email: 'nanuchaza256@gmail.com',
                nickname: 'MrgCrew-Ghost',
                name: 'Nahuel Chazarreta Aguila',
              },
              {
                email: 'leocasla99@gmail.com',
                nickname: 'leotinez13',
                name: 'Leandro Martínez',
              },
              {
                email: 'tomisued1989@gmail.com',
                nickname: 'tomisued1989',
                name: 'Tomas Sued ',
              },
              {
                email: 'ignaciooto@hotmail.com',
                nickname: 'Nachito_dp',
                name: 'Ignacio oto',
              },
              {
                email: 'luqas_21@hotmail.com',
                nickname: 'FranKs_-56',
                name: 'Lucas emanuel',
              },
              {
                email: 'Bot para Completar Informacion ',
                nickname: 'medio-menta',
                name: 'JavierCapi1665',
              },
              {
                email: 'francofami1@gmail.com',
                nickname: 'Famicrack01',
                name: 'Franco familume ',
              },
              {
                email: 'luciano.fourastie@gmail.com',
                nickname: 'Luchof_occ',
                name: 'Luciano Andres Fourastie',
              },
              {
                email: 'Bot para Completar Informacion ',
                nickname: 'elgordosin_vida',
                name: 'GordoSinVida',
              },
              {
                email: 'lean.carp1435@gmail.com',
                nickname: 'Tirastegas2017',
                name: 'Leandro Nahuel Zapata',
              },
              {
                email: 'johantommasi7@gmail.com',
                nickname: 'Johant_15',
                name: 'Johan Tommasi',
              },
              {
                email: 'lauti.ureta123@gmail.com',
                nickname: 'lautaro_ureta2',
                name: 'lautaro ureta ',
              },
              {
                email: 'sebastiangarzoglio@gmail.com',
                nickname: 'SebaBanfield10',
                name: 'Sebastian Garzoglio',
              },
              {
                email: 'tommykinan2002@gmail.com',
                nickname: 'Tommy_csp02',
                name: 'Tommy kinan',
              },
              {
                email: 'eliasvargas_00@hotmail.com',
                nickname: 'IHuevito',
                name: 'Elias Nicolas Vargas',
              },
              {
                email: 'walterzoe@hotmail.com',
                nickname: '',
                name: 'Walter gustavo pereyra',
              },
              {
                email: 'juampatagle@gmail.com',
                nickname: 'TwtchJuampatagle',
                name: 'Juan Pablo tagle',
              },
              {
                email: 'matias.buldorini@hotmail.com',
                nickname: 'MatiBuldo10',
                name: 'Matías Buldorini',
              },
              {
                email: 'alvarolasagna@gmail.com',
                nickname: 'klastrongomis ',
                name: 'Álvaro Lasagna ',
              },
              {
                email: 'franalarcon.2175@gmail.com',
                nickname: 'Fralarcon21',
                name: 'Francisco Alarcon',
              },
              {
                email: 'camilochudoba@gmail.com',
                nickname: 'Chuwaka103',
                name: 'Camilo chudoba',
              },
              {
                email: 'lazarocerquetti2001@gmail.com',
                nickname: 'Lázarocerquetti',
                name: 'Lázaro Cerquetti',
              },
              {
                email: 'lulubrunettoaguirre@gmail.com',
                nickname: 'Luyro44678 ',
                name: 'Luciano Brunetto ',
              },
              {
                email: 'lucas_capo789@hotmail.com',
                nickname: 'Slotted_airstrip ',
                name: 'Nicolas carral',
              },
              {
                email: 'riverorodrigo050@gmail.com',
                nickname: 'Rodrisasuke ',
                name: 'Rodrigo Rivero',
              },
              {
                email: 'franco99lanfranco@gmail.com',
                nickname: 'Cerebro__22',
                name: 'franco lanfranco',
              },
              {
                email: 'predejv@gmail.com',
                nickname: 'Jvalvarc',
                name: 'Juan Valva',
              },
              {
                email: 'fabrizio2010@hotmail.com.ar',
                nickname: 'Fabriziogoico05',
                name: 'Fabrizio goicoechea',
              },
              {
                email: 'marcostufeksian@hotmail.com',
                nickname: 'marcos_tufe',
                name: 'marcos tufeksian',
              },
              {
                email: 'urriagarodrigo7@gmail.com',
                nickname: 'Rodrigo_Urriaga',
                name: 'Rodrigo Daniel Urriaga',
              },
              {
                email: 'marklarck@hotmail.com',
                nickname: 'Marklarck95',
                name: 'Martin Murad',
              },
              {
                email: 'agustinmarcos123456@gmail.com',
                nickname: 'xMenghi_7',
                name: 'Agustín Menghi',
              },
              {
                email: 'lucianoivan2001.lg@gmail.com',
                nickname: 'gimenezz01_',
                name: 'Luciano Gimenez',
              },
              {
                email: 'Bot para Completar Informacion ',
                nickname: 'rFlexo666',
                name: 'Ramiro Flexont',
              },
              {
                email: 'jonirodas12@hotmail.com',
                nickname: 'JoniR_7',
                name: 'Jonathan Ezequiel Rodas',
              },
              {
                email: 'nata987@hotmail.com',
                nickname: 'Natariver1987',
                name: 'Natanael Pryszczuk  ',
              },
              {
                email: 'federico280700@gmail.com',
                nickname: 'FeDe_G_28',
                name: 'Federico Gabriel Galeano ',
              },
              {
                email: 'ema_velez_2009@hotmail.com',
                nickname: 'EmaCAVS99',
                name: 'Emanuel Gustavo Puzer',
              },
              {
                email: 'jiv123.jiv@gmail.com',
                nickname: 'jiv_12-ttv',
                name: 'Verbitchi Juan Ignacio',
              },
              {
                email: 'ulloaroberto03@gmail.com',
                nickname: 'rober1430',
                name: 'Roberto Ulloa',
              },
              {
                email: 'nico_dominguez1996@hotmail.com',
                nickname: 'NicolasD_96 ',
                name: 'Nicolas Agustin Dominguez ',
              },
              {
                email: 'lucacornejo06@gmail.com',
                nickname: 'Delospelos22',
                name: 'Luca Cornejo',
              },
              {
                email: 'ardelmetalrock@gmail.com',
                nickname: 'AdrianBarasz',
                name: 'Barasz adrian',
              },
            ]}
            name='Information'>
            {/** Primera ronda 
            <ExcelColumn label='Email' value='email' />
            <ExcelColumn label='Name' value='name' />
            <ExcelColumn label='Nickname' value='nickname' />
            */}
            {/* Segunda ronda*/}
            <ExcelColumn label='Nickname' value='nickname' />
            <ExcelColumn label='Name' value='name' />
            <ExcelColumn label='Email' value='email' />
          </ExcelSheet>
        </ExcelFile>
      </div>
      {/* AQUI TERMINA CONTENT WRAPPER */}
    </div>
  );
}

const htmlTemplates = {
  classicTemplate: classicTemplate,
};

export default htmlTemplates;
