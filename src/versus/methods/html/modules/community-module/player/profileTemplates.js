import React from 'react';

import teamEnroll from '../../../../vs-frames/teamEnroll.js';

//-------------------------------------------------- https://developer.riotgames.com/apis#champion-mastery-v4
// hacer una llamada a OBTENER / lol / champion-mastery / v4 / champion-masteries / by-summoner / {encryptedSummonerId}
// se hace con el id del jugador que te da lol
// resultado de los mejores campeones usados con puntos , lvl y ultima vez usado
// aprovechar los primero 5 para hacer algo en el font de profile

//ademas usar
// tambien usar OBTENER / lol / champion-mastery / v4 / score / by-summoner / {encryptedSummonerId}
// para ver la maestria total con champions

//--------------------- https://developer.riotgames.com/docs/lol#data-dragon_champions
//Para la imagenes de los champions
// buscar Champion Square Assets
// http://ddragon.leagueoflegends.com/cdn/10.11.1/img/champion/Aatrox.png
// posiblemente toque desfragmentar este json por las keys de esa forma se podra relacionar con los valores del primer punto
// y de esa manera poder escribir colocar de forma dinamica el nombre de los 5 primeros champions a buscar por su key

//---------------------------------------------------- https://developer.riotgames.com/apis#league-v4
// para la liga
// por jugador OBTENER / lol / league / v4 / entries / by-summoner / {encryptedSummonerId}
// por liga OBTENER / lol / league / v4 / ligas / {leagueId}

//------------------------------------------------------- https://developer.riotgames.com/apis#tournament-v4/POST_registerTournament
//para torneo
// para crear el torneo ENVIAR / lol / torneo / v4 / torneos
// para crear codigos para el torneo ENVIAR / lol / torneo / v4 / códigos
// para estructurar las batallas del torneo (es un chin mas complejo) PONER / lol / torneo / v4 / codes / {torneoCode}

{
  /* 
        var elementToEdit = document.getElementById('element-id')
        elementToEdit.setAttribute('class', `${elementToEdit.className} updating`)
    */
}

function editSomething(theInput, thePassword) {
  event.preventDefault();
  if (!thePassword) {
    var elementToEdit = document.getElementById(`${theInput}`);
    if (elementToEdit.disabled) {
      elementToEdit.setAttribute(
        'class',
        `${elementToEdit.className} updating`
      );
      elementToEdit.disabled = false;
    } else {
      elementToEdit.setAttribute('class', `${theInput}`);
      elementToEdit.disabled = true;
    }
  } else {
    var elementToEdit = document.getElementById(`${theInput}`);
    var passwordForEdit = document.getElementById(`${thePassword}`);
    if (elementToEdit.disabled && passwordForEdit.disabled) {
      elementToEdit.setAttribute(
        'class',
        `${elementToEdit.className} updating`
      );
      elementToEdit.disabled = false;
      passwordForEdit.setAttribute(
        'class',
        `${passwordForEdit.className} updating`
      );
      passwordForEdit.disabled = false;
    } else {
      elementToEdit.setAttribute('class', `${theInput}`);
      elementToEdit.disabled = true;
      passwordForEdit.setAttribute('class', `${thePassword}`);
      passwordForEdit.disabled = true;
    }
  }
}

function submitEditorSett() {
  event.preventDefault();
  var nameEdit = document.getElementById('info-name').value;
  var documentEdit = document.getElementById('info-document').value;
  var dateEdit = document.getElementById('info-date').value;
  //var emailEdit = document.getElementById('info-email').value;
  var addressEdit = document.getElementById('info-address').value;
  var phoneEdit = document.getElementById('info-phone').value;
  var tutorsNameEdit = document.getElementById('info-tutor-name').value;
  var tutorsDocumentEdit = document.getElementById('info-tutor-document').value;

  const newEdit = {
    name: nameEdit,
    document: documentEdit,
    born: dateEdit,
    // email: emailEdit,
    address: addressEdit,
    phone: phoneEdit,
    tutorsName: tutorsNameEdit,
    tutorsDocument: tutorsDocumentEdit,
  };

  const IDU = JSON.parse(localStorage.userData)._id;

  fetch(`users/editProfile/${IDU}`, {
    method: 'PUT',
    body: JSON.stringify(newEdit),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => (data.alert ? alert(data.alert) : location.reload()));
}

function submitEditorEmail() {
  event.preventDefault();
  var emailEdit = document.getElementById('info-email').value;
  var passwordAct = document.getElementById('edit-email-password').value;

  const IDU = JSON.parse(localStorage.userData)._id;

  const emailEditor = {
    email: emailEdit,
    password: passwordAct,
  };

  fetch(`users/editEmail/${IDU}`, {
    method: 'PUT',
    body: JSON.stringify(emailEditor),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => (data.alert ? alert(data.alert) : location.reload()));
}

function createTeam(teamPlayerFunctions) {
  var createTeamButton = document.getElementById('create-team');
  if (createTeamButton) {
  } else {
    var teamInfoBox = document.getElementById('team-info-box');
    var teamWrapperTittle = document.createElement('h2');
    teamWrapperTittle.setAttribute('id', `teams-tittle`);
    teamWrapperTittle.setAttribute('class', 'teams-tittle');
    teamWrapperTittle.innerText = 'Inscribe a un torneo para comenzar.';
    teamInfoBox.appendChild(teamWrapperTittle);
  }
}

function editEmail(newEmail, lastEmail) {
  console.log(newEmail, 'newEmail');
  console.log(lastEmail, 'lastEmail');
}

function goodByeGamer(email, verify, totalPlayers, IDteam) {
  fetch(`teams/goodBye/${IDteam}`, {
    method: 'POSt',
    body: JSON.stringify({
      email,
      verify,
      totalPlayers,
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => (data.alert ? alert(data.alert) : location.reload()));
}

function teamInfoRender(userInfo, teamPlayerFunctions) {
  var teamInfoBox = document.getElementById('team-info-box');
  console.log(teamInfoBox, 'teamInfoBox');

  function teamSizeInputsRender() {
    var totalPlayers = Object.values(userInfo.teams[0].totalPlayers);
    var IDteam = userInfo.teams[0].IDteam;
    Object.values(userInfo.teams[0].totalPlayers);

    var teamWrapperTittle = document.createElement('h2');
    teamWrapperTittle.setAttribute('id', `teams-tittle`);
    teamWrapperTittle.setAttribute('class', 'teams-tittle');
    teamWrapperTittle.innerText = 'Tu equipo';
    teamInfoBox.appendChild(teamWrapperTittle);

    totalPlayers.map((player, index) => {
      var newPlayerCard = document.createElement('div');
      newPlayerCard.setAttribute('id', `player-card-${index}`);
      newPlayerCard.setAttribute('class', 'player-card');
      var playerImage = document.createElement('img');
      playerImage.setAttribute('id', `player-image-${index}`);
      playerImage.setAttribute('class', 'player-image');
      playerImage.src = player.image;
      playerImage.innerText = player.image;
      newPlayerCard.appendChild(playerImage);
      var playerNickLabelRes = document.createElement('label');
      playerNickLabelRes.setAttribute('id', `player-nickname-res-${index}`);
      playerNickLabelRes.setAttribute('class', 'player-nickname-label-res');
      playerNickLabelRes.innerText = player.nickname;
      newPlayerCard.appendChild(playerNickLabelRes);
      var playerEmailLabel = document.createElement('label');
      playerEmailLabel.setAttribute('id', `player-email-${index}`);
      playerEmailLabel.setAttribute('class', 'player-email-label');
      playerEmailLabel.innerText = 'Email:';
      var playerEmailLabelVer = document.createElement('label');
      playerEmailLabelVer.setAttribute('id', `player-email-${index}-ver`);
      playerEmailLabelVer.setAttribute(
        'class',
        player.verify === true
          ? 'player-email-label-ver verify'
          : 'player-email-label-ver unverify'
      );
      playerEmailLabelVer.innerText =
        player.verify === true ? 'Verificado' : 'Sin verificar';
      playerEmailLabel.appendChild(playerEmailLabelVer);
      newPlayerCard.appendChild(playerEmailLabel);

      var reputationLabel = document.createElement('label');
      reputationLabel.setAttribute('id', `player-repu-${index}`);
      reputationLabel.setAttribute('class', 'player-repu-label');
      reputationLabel.innerText = 'Reputación:';
      newPlayerCard.appendChild(reputationLabel);

      var reputationLabelData = document.createElement('label');
      reputationLabelData.setAttribute('id', `player-repu-data-${index}`);
      reputationLabelData.setAttribute('class', 'player-repu-label-data');
      reputationLabelData.innerText = '0/15';
      newPlayerCard.appendChild(reputationLabelData);

      var playerEmailLabelRes = document.createElement('label');
      playerEmailLabelRes.setAttribute('id', `player-email-res-${index}`);
      playerEmailLabelRes.setAttribute('class', 'player-email-label-res');
      playerEmailLabelRes.innerText = player.email;
      newPlayerCard.appendChild(playerEmailLabelRes);
      
      var actualUser = JSON.parse(localStorage.userData).email
        console.log(actualUser, "actualUser")
        console.log(userInfo.teams, "userInfo")
      if(userInfo.teams[0].totalPlayers.player1.email === actualUser ){
        var editButton = document.createElement('button');
        editButton.setAttribute('id', `edit-player`);
        editButton.setAttribute('class', 'edit-player');
        editButton.innerText = 'Edit';
        editButton.addEventListener('click', () => {
          var newEmail = prompt();
          editEmail(newEmail, player.email, player.verify, IDteam);
          //last email
          alert('Codigo de busqueda #FF102');
          //teamPlayerFunctions().editPlayer(editButton.value)
        });
        newPlayerCard.appendChild(editButton);
      }
      if(userInfo.teams[0].totalPlayers.player1.email === actualUser ){
        var deletePlayer = document.createElement('button');
        deletePlayer.setAttribute('id', `delete-player`);
        deletePlayer.setAttribute('class', 'delete-player');
        deletePlayer.innerText = 'Eliminar';
        deletePlayer.addEventListener('click', () => {
          goodByeGamer(player.email, player.verify, totalPlayers, IDteam);
          alert('Codigo de busqueda #FF103');
        });
        newPlayerCard.appendChild(deletePlayer);
      }
      teamInfoBox ? teamInfoBox.appendChild(newPlayerCard) : '';
    });
  }
  if (teamInfoBox) {
    var isRender = teamInfoBox.childNodes.length === 0;
  }
  if (isRender) {
    userInfo.teams[0] ? teamSizeInputsRender() : '';
  }
}

function classicTemplate(
  playerImage,
  summonerLevel,
  userInfo,
  settingsNav,
  settingsNavHandler,
  teamPlayerFunctions
) {
  //console.log(userInfo.teams)
  return (
    <div id='div-settings' className='div-settings'>
      {/* User Info box */}
      <div id='setting-nav-buttons' className='setting-nav-wrapper'>
        <i
          id='profile'
          className={`settings-nav-button material-icons ${
            settingsNav === 'profile' ? 'selected' : ''
          }`}
          onClick={() => settingsNavHandler('profile')}>
          person
        </i>
        <i
          id='teams'
          className={`settings-nav-button material-icons ${
            settingsNav === 'teams' ? 'selected' : ''
          }`}
          onClick={() => settingsNavHandler('teams')}>
          group
        </i>
      </div>
      <div
        id='user-info-box'
        className='user-info-box'
        style={{ display: `${settingsNav === 'profile' ? 'block' : 'none'}` }}>
        <h2 id='user-info-tittle' className='user-info-tittle'>
          Información de la cuenta
        </h2>
        <form noValidate>
          <label
            id='label-info-name'
            className='label-info-name'
            htmlFor='info-name'>
            Nombre{' '}
          </label>
          <div id='input-wrapper-1' className='input-wrapper'>
            <input
              id='info-name'
              className='info-name'
              type='string'
              disabled={true}
              defaultValue={userInfo.name}
            />
            <button
              id='submit-edit-name'
              className='edit-button'
              onClick={() => editSomething('info-name')}>
              <i id='material-icon-name' className='tiny material-icons'>
                border_color
              </i>
            </button>
          </div>
          {/*<img id='info-picture' className='info-picture' src={userInfo.picture} />*/}
          <label
            id='label-info-document'
            className='label-info-document'
            htmlFor='info-document'>
            Documento
          </label>
          <div id='input-wrapper-2' className='input-wrapper'>
            <input
              id='info-document'
              className='info-document'
              type='number'
              disabled={true}
              defaultValue={userInfo.document}
            />
            <button
              id='submit-edit-document'
              className='edit-button'
              onClick={() => editSomething('info-document')}>
              <i id='material-icon-document' className='tiny material-icons'>
                border_color
              </i>
            </button>
          </div>
          <label
            id='label-info-date'
            className='label-info-date'
            htmlFor='info-date'>
            Fecha de nacimiento{' '}
          </label>
          <div id='input-wrapper-3' className='input-wrapper'>
            <input
              id='info-date'
              className='info-date'
              type='date'
              disabled={true}
              defaultValue={userInfo.born}
            />
            <button
              id='submit-edit-date'
              className='edit-button'
              onClick={() => editSomething('info-date')}>
              <i id='material-icon-date' className='tiny material-icons'>
                border_color
              </i>
            </button>
          </div>
          <label
            id='label-info-address'
            className='label-info-address'
            htmlFor='info-address'>
            Dirección{' '}
          </label>
          <div id='input-wrapper-5' className='input-wrapper'>
            <input
              id='info-address'
              className='info-address'
              type='string'
              disabled={true}
              defaultValue={userInfo.address}
            />
            <button
              id='submit-edit-address'
              className='edit-button'
              onClick={() => editSomething('info-address')}>
              <i id='material-icon-address' className='tiny material-icons'>
                border_color
              </i>
            </button>
          </div>
          <label
            id='label-info-phone'
            className='label-info-phone'
            htmlFor='info-phone'>
            Numero de contacto
          </label>
          <div id='input-wrapper-6' className='input-wrapper'>
            <input
              id='info-phone'
              className='info-phone'
              type='number'
              disabled={true}
              defaultValue={userInfo.phone}
            />
            <button
              id='submit-edit-phone'
              className='edit-button'
              onClick={() => editSomething('info-phone')}>
              <i id='material-icon-phone' className='tiny material-icons'>
                border_color
              </i>
            </button>
          </div>
          <label
            id='label-info-tutor-name'
            className='label-info-tutor-name'
            htmlFor='info-tutor-name'>
            Nombre del tutor
          </label>
          <div id='input-wrapper-7' className='input-wrapper'>
            <input
              id='info-tutor-name'
              className='info-tutor-name'
              type='string'
              disabled={true}
              defaultValue={userInfo.tutorsName}
            />
            <button
              id='submit-edit-tutor-name'
              className='edit-button'
              onClick={() => editSomething('info-tutor-name')}>
              <i id='material-icon-tutor-name' className='tiny material-icons'>
                border_color
              </i>
            </button>
          </div>
          <label
            id='label-info-tutor-document'
            className='label-info-tutor-document'
            htmlFor='info-tutor-document'>
            Documento del tutor{' '}
          </label>
          <div id='input-wrapper-8' className='input-wrapper'>
            <input
              id='info-tutor-document'
              className='info-tutor-document'
              type='number'
              disabled={true}
              defaultValue={userInfo.tutorsDocument}
            />
            <button
              id='submit-edit-tutor-document'
              className='edit-button'
              onClick={() => editSomething('info-tutor-document')}>
              <i
                id='material-icon-tutor-document'
                className='tiny material-icons'>
                border_color
              </i>
            </button>
          </div>
          <label
            id='label-edit-email-password'
            className='label-edit-email-password'
            htmlFor='edit-email-password'>
            Por favor ingrese su contraseña para realizar este cambio.
          </label>
          <div id='input-wrapper-9' className='input-wrapper'>
            <input
              id='info-email'
              className='info-email'
              type='string'
              disabled={true}
              defaultValue={userInfo.email}
            />
            <button
              id='submit-edit-email'
              className='edit-button'
              onClick={() =>
                editSomething('info-email', 'edit-email-password')
              }>
              <i id='material-icon-email' className='tiny material-icons'>
                border_color
              </i>
            </button>
            <input
              id='edit-email-password'
              className='edit-email-password'
              type='password'
              disabled={true}
            />
          </div>
          <div id='input-wrapper-10' className='input-wrapper'>
            <button
              id='btn-form-cancel-edit'
              className='btn-form-cancel-edit'
              onClick={() => location.reload()}>
              CANCEL
            </button>
            <button
              id='btn-form-submit-edit'
              className='btn-form-submit-edit'
              onClick={() => submitEditorSett()}>
              SAVE
            </button>
          </div>
        </form>
      </div>

      {/*teamEnroll.enrollForm(mainColor, enroll, tInfo.customer)*/}

      <div
        id='team-info-box'
        className='team-info-box'
        style={{ display: `${settingsNav === 'teams' ? 'block' : 'none'}` }}>
        {userInfo
          ? userInfo.teams[0]
            ? teamInfoRender(userInfo, teamPlayerFunctions)
            : createTeam(teamPlayerFunctions)
          : ''}
      </div>
      {/* Game User Info box       
            <div id="game-user-info-box" className="game-user-info-box">
                <label id="game-user-tittle" className="game-user-tittle">User Mail and Date</label>
                <label id='label-info-email' className='label-info-email' htmlFor='info-email'>Correo Electronico</label>
                    <div id="input-wrapper-10" className="input-wrapper">
                        <input 
                            id='info-email' 
                            className='info-email' 
                            type='string' 
                            disabled={true} 
                            defaultValue={userInfo.email} />
                        <button 
                            id='submit-edit-email'
                            className='edit-button' 
                            onClick={() => editSomething('info-email','edit-email-password')
                            }>
                            <i id='material-icon-email' className='tiny material-icons'>border_color</i> 
                        </button>
                        <label 
                            id='label-edit-email-password' 
                            className='label-edit-email-password' 
                            htmlFor='edit-email-password'> 
                        Por favor ingrese su contraseña para realizar este cambio.
                        </label>
                        <input 
                            id='edit-email-password' 
                            className='edit-email-password' 
                            type='password' 
                            disabled={true} 
                        />          
                    </div>
                    
                    <div id="input-wrapper-9" className="input-wrapper">
                        <button id='btn-cancel-edit-email' className='btn-cancel-edit-email' onClick={() => location.reload()}>
                            CANCEL
                        </button>
                        <button id='btn-submit-edit-email' className='btn-submit-edit-email' onClick={() => submitEditorEmail()}>
                            SAVE
                        </button>
                    </div>
            </div> */}
      {/* User app Info box */}
    </div>
  );
}

const htmlTemplates = {
  classicTemplate: classicTemplate,
};

export default htmlTemplates;
