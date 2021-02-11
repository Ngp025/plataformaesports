import React from 'react';

import games from '../../../jsons/gamesList.json';

function initModal() {
  var elems3 = document.querySelectorAll('#enroll-form');
  //var instances = M.Modal.init(elems3);
  //var instance3 = M.Modal.getInstance(elems3[0]);
  //instance3.close();
  //instance3.isOpen = false;
  //console.log(elems3)
}

function teamSizeInputsRender(inputsNumber, enrollFormContent) {
  var teamName = document.createElement('input');
  teamName.setAttribute('id', `teamName`);
  teamName.setAttribute('class', 'enroll-input team-name');
  teamName.placeholder = `Nombre de equipo`;
  enrollFormContent ? enrollFormContent.appendChild(teamName) : '';
  for (var i = 0; inputsNumber.teamsSize > i; i++) {
    var newField = document.createElement('input');
    newField.setAttribute('id', `player${i + 1}`);
    newField.setAttribute('class', 'enroll-input');
    if (i === 0) {
      newField.placeholder = `Tu nick - (Capitan)`;
    } else if(i === 1) {
      newField.placeholder =  JSON.parse(localStorage.userData).email;
      newField.disabled = true
    }else if(i === 6 || i === 7){
      newField.placeholder = `Mail de Jugador ${i} (opcional)`;
    }
    else{
      newField.placeholder = `Mail de Jugador ${i}`;
    }
    enrollFormContent ? enrollFormContent.appendChild(newField) : '';
  }
}

function enrollForm(mainColor, enroll, customer) {
  return (
    <div
      id='enroll-form'
      className='enroll-modal modal cel-modal'
      style={{
        border: `solid 2px rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`,
        boxShadow: `0 0 12px 0 rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`,
      }}>
      <div id='enroll-modal-background' className='modal-background'>
        <div
          id='enroll-modal-background-filter'
          className='color-filter'
          style={{
            background: `linear-gradient(to bottom, rgba(${mainColor.red}, ${mainColor.green}, ${mainColor.blue}, 0.50) 15%, #111217 50%)`,
          }}>
          <h4
            id='enroll-tittle'
            className='modal-tittle'
            style={{
              borderLeft: `5px solid rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`,
            }}>
            Inscripciones
            <label id='enroll-game-label' className='game-label'>
              {location.href.split('#')[1].split('/')[1].split('-')[0]}
            </label>
          </h4>
          <div id='enroll-form-content' className='modal-content enroll-form'>
            <label
              id='enroll-legend'
              className='enroll-legend'
              style={{
                color: `rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`,
              }}>
              Complete los campos para continuar la inscripción.
            </label>
            {teamEnroll.enrollGameRender(mainColor, enroll, customer)}
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

function enrollGameRender(mainColor, enroll, customer) {
  if (mainColor) {
  } else {
    mainColor = {
      red: 251,
      green: 32,
      blue: 98,
    };
  }
  var enrollFormContent = document.getElementById('enroll-form-content');
  // Render check
  var isRender = document.getElementsByClassName('isRender').length;
  //console.log(isRender)
  if (isRender === 0) {
    var render = document.createElement('div');
    render.setAttribute('id', 'isRender');
    render.setAttribute('class', 'isRender');
    enrollFormContent ? enrollFormContent.appendChild(render) : '';
  }
  function singlePlayerInputs(fields) {
    for (var prop in fields) {
      var newField = document.createElement('input');
      newField.setAttribute('id', `${fields[prop]}`);
      newField.setAttribute('class', 'enroll-input');
      switch (fields[prop]) {
        case 'nickname':
          newField.placeholder = 'Nickname, Playstation ID, Game ID';
          break;
        case 'customerInput':
          newField.placeholder = 'Documento';
          break;
        default:
          newField.placeholder = fields[prop];
          break;
      }
      enrollFormContent ? enrollFormContent.appendChild(newField) : '';
    }
    /*
              <input
                id='documento-input'
                className='documento-input'
                autoComplete='off'
                placeholder='Documento'
                onFocus={()=>{ event.target.style.borderBottom = `1px solid rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`}}
                onBlur={()=>{ event.target.style.borderBottom = `1px solid rgba(255,255,255,0.5)`}}
                ></input>
              <input
                id='playstation-id-input'
                className='playstation-id-input'
                autoComplete='off'
                placeholder='Playstation-ID'
                onFocus={()=>{event.target.style.borderBottom = `1px solid rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`}}
                onBlur={()=>{ event.target.style.borderBottom = `1px solid rgba(255,255,255,0.5)`}}
                ></input>
              
    */
  }

  function currentGame() {
    var currentGame = location.href.split('#')[1].split('/')[1].split('-')[0];
    for (var prop in games) {
      if (prop === currentGame) {
        return currentGame;
      }
    }
  }
  // INPUTS RENDER
  if (isRender === 0) {
    switch (currentGame()) {
      case 'fifa20':
        games.fifa20.teamsSize > 1
          ? teamSizeInputsRender(games.fifa20, enrollFormContent)
          : singlePlayerInputs(games.fifa20.enrollData);
        break;
      case 'pes20':
        games.pes20.teamsSize > 1
          ? teamSizeInputsRender(games.pes20, enrollFormContent)
          : singlePlayerInputs(games.pes20.enrollData);
        break;
      case 'GT':
        games.GT.teamsSize > 1
          ? teamSizeInputsRender(games.GT, enrollFormContent)
          : singlePlayerInputs(games.GT.enrollData);
        break;
      case 'lol':
        games.lol.teamsSize > 1
          ? teamSizeInputsRender(games.lol, enrollFormContent)
          : singlePlayerInputs(games.lol.enrollData);
        break;
      case 'mobileL':
        games.mobileL.teamsSize > 1
          ? teamSizeInputsRender(games.mobileL, enrollFormContent)
          : singlePlayerInputs(games.mobileL.enrollData);
        break;
      case 'NBA2k':
        games.NBA2k.teamsSize > 1
          ? teamSizeInputsRender(games.NBA2k.teamsSize, enrollFormContent)
          : singlePlayerInputs(games.NBA2k.enrollData);
        break;
    }
  }
  // TEAM DATA HANDLER & SEND
  if (isRender === 0) {
    var enrollInputsArr = document.getElementsByClassName('enroll-input');
    var sendButton = document.createElement('button');
    sendButton.setAttribute('id', 'enroll-send');
    sendButton.setAttribute('class', 'enroll-send');
    sendButton.style.border = `2px solid rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`;
    sendButton.addEventListener('click', () => {
      var enrollInputs = [];
      for (var i = 0; enrollInputsArr.length > i; i++) {
        var newFieldEntry = `"${enrollInputsArr[i].id}" : "${enrollInputsArr[i].value}"`;
        enrollInputs.push(newFieldEntry);
      }
      var unparseInputs = `{"enrollInputs" : {${enrollInputs.toString()}}}`;
      var enrollInputsObject = JSON.parse(unparseInputs);
      if(enrollInputsObject.enrollInputs.teamName === ""){
        alert('Coloque el nombre de su equipo por favor') 
        }else if( enrollInputsObject.enrollInputs.player1 === "" ){
          alert('Coloque el nickname del cápitan por favor')
          }else{
            event.target.innerText = 'Enviando...';
            event.target.disabled = true;
            event.target.style.background = `rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`;
            var unparseInputs = `{"enrollInputs" : {${enrollInputs.toString()}}}`;
            var enrollInputsObject = JSON.parse(unparseInputs);
            //console.log(enrollInputsObject, "INFO HANDLER")
            enroll(enrollInputsObject, customer);
          }
      });
    sendButton.innerText = 'Enviar inscripción';

    sendButton.onmouseenter = () => {
      event.target.style.backgroundColor = `rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue}`;
    };
    sendButton.onmouseleave = () => {
      var backgroundColor = `rgb(17, 18, 23)`;
      event.target.style.backgroundColor = backgroundColor;
    };
    enrollFormContent ? enrollFormContent.appendChild(sendButton) : '';
  }
}
initModal();
var teamEnroll = {
  enrollGameRender: enrollGameRender,
  enrollForm: enrollForm,
};

export default teamEnroll;
