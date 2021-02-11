function enroll(inputData, customer) {
  event.preventDefault();
  // Enroll DATAA
  var data = document.location.href;
  var IDTArray = data.split('-t_');
  var IDTGameArray = IDTArray[0].split('/#/')[1].split('-');
  var game = IDTGameArray[0];
  console.log(IDTGameArray, '<----- IDTGameArray');
  console.log(game, '<----- GAME');
  var IDT = IDTArray[1].slice(0, 24);
  var captainData = '';
  var captainID = '';
  var userPicture = '';
  var enrollInputs = inputData.enrollInputs;
  localStorage.picture ? (userPicture = localStorage.picture) : '';
  localStorage.userData
    ? (captainData = JSON.parse(localStorage.userData))
    : '';
  captainData._id !== '' ? (captainID = captainData._id) : '';
  //var teamLogo = "https://res.cloudinary.com/versus/image/upload/v1595611777/Statics_images/drifuik2xv66qqq7iuu9.png" // ALpha Var
  // EL CONDICIONAL TERNARIO CON OBJECT.KEYS ES SOLO PARA CONTROLAR SI SE MUESTRA EL CONSOLE.LOG O NO
  console.log(data, 'data', IDT, 'IDT');
  console.log(enrollInputs); // En single enroll es el nickname del jugador, en team Enroll son los mails del equipo a confirmar
  console.log(captainID, 'captainID');
  //Object.keys(enrollInputs).length > 3 ? console.log(teamLogo, "logo del equipo") : ""
  Object.keys(enrollInputs).length > 3
    ? console.log(IDT, 'IDT del torneo al que se inscribe')
    : '';
  Object.keys(enrollInputs).length > 3
    ? console.log(captainID, 'Identificador de capitan')
    : '';
  Object.keys(enrollInputs).length > 3
    ? ''
    : console.log(userPicture, 'url de la imagen del jugador'); // La condicional ternaria solo sirve para mostrarte o no este console.log
  // var teamLogo = inputData.teamLogo // Beta var
  //-------- Funcionalidad anterior ----------//
  if (captainID !== '' ) {
    if(enrollInputs.player1 !== '' ||enrollInputs.teamName !== ''){    
      if (Object.keys(enrollInputs).length > 0) {
        if (game === 'lol' || game === 'mobileL') {
          var teamLogo =
            'https://res.cloudinary.com/versus/image/upload/v1595611777/Statics_images/drifuik2xv66qqq7iuu9.png';
          fetch(`/api/tournaments/enroll/${IDT}/team`, {
            method: 'PUT',
            body: JSON.stringify({
              captainID: captainID,
              name: localStorage.name,
              inputsValue: enrollInputs,
              picture: teamLogo,
              game: game,
              customer: customer,
              email: captainData.email,
            }),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          })
            .then((res) => res.json())
            .then((res) => (res.alert ? alert(res.alert) : location.reload())); //COLOCAR INFO ACTualizada
        } else {
          fetch(`/api/tournaments/enroll/${IDT}/user`, {
            method: 'PUT',
            body: JSON.stringify({
              IDU: captainID,
              name: localStorage.name,
              inputsValue: enrollInputs,
              picture: userPicture,
            }),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          })
            .then((res) => res.json())
            .then((res) => (res.alert ? alert(res.alert) : location.reload())); //COLOCAR INFO ACTualizada
        }
      } else {
        alert('Complete los datos');
      }
    } else {
      alert('Complete los datos');
    }
  } else {
    alert('INICIE SESION PARA REALIZAR ESTA ACCION');
  }
}
function unEnroll() {
  event.preventDefault();
  var IDT = this.state.tInfo._id;
  if (localStorage.userData) {
    var IDU = JSON.parse(localStorage.userData)._id;
  } else {
    var IDU = 'sing-out';
  }
  //////console.log(////console.log(IDT, ' Aqui el IDT ', IDU, ' Aqui el IDU ');
  const out = fetch(`/api/tournaments/UnEnroll/${IDT}/${IDU}`)
  .then((res) => res.json())
  .then((res) => res.alert ? alert(res.alert) : location.reload());
}

const enrollFunctions = {
  enroll: enroll,
  unEnroll: unEnroll,
};

module.exports = enrollFunctions;

/**LO QUE NECESITO
 * 
 * 
  enroll(inputData) {
    event.preventDefault();
    var enrollInputs = inputData.enrollInputs
    var userPicture = localStorage.picture ? localStorage.picture : ""
    // enrollInputs -> Dinamic enroll form info (Object)
    console.log(enrollInputs) // En single enroll es el nickname del jugador, en team Enroll son los mails del equipo a confirmar
    // Single Enroll DATA
    Object.keys(enrollInputs).length > 3 ? "" : console.log(userPicture, "url de la imagen del jugador")  // La condicional ternaria solo sirve para mostrarte o no este console.log
    // Team Enroll DATA
    var data = document.location.href;
    var IDTArray = data.split('-t_');
    var IDT = IDTArray[1].slice(0, 24);
    var teamLogo = "https://res.cloudinary.com/versus/image/upload/v1595611777/Statics_images/drifuik2xv66qqq7iuu9.png" // ALpha Var
    var captainData = localStorage.userData ? JSON.parse(localStorage.userData) : ""
    var captainID = captainData._id    
    // EL CONDICIONAL TERNARIO CON OBJECT.KEYS ES SOLO PARA CONTROLAR SI SE MUESTRA EL CONSOLE.LOG O NO
    Object.keys(enrollInputs).length > 3 ? console.log(teamLogo, "logo del equipo") : ""
    Object.keys(enrollInputs).length > 3 ? console.log(IDT, "IDT del torneo al que se inscribe") : ""
    Object.keys(enrollInputs).length > 3 ? console.log(captainID, "Identificador de capitan") : ""
    // var teamLogo = inputData.teamLogo // Beta var
    //-------- Funcionalidad anterior ----------//  
    if (captainID !== "") {
      if (enrollInputs) {
        fetch(`/api/tournaments/enroll/${IDT}/team`, {
          method: 'PUT',
          body: JSON.stringify({
            captainID: captainID,
            name: localStorage.name,
            inputsValue: enrollInputs,
            picture: teamLogo,
            game: game
          }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
          .then((res) => res.json())
          .then((res) => res.alert ? alert(res.alert) : location.reload()); //COLOCAR INFO ACTualizada
      } else {
        alert('Complete los datos');
      }
    } else {
      alert('INICIE SESION PARA REALIZAR ESTA ACCION');
    } 
  }
 * 
 * 
 * 
*/

/*
  async locallogin() {
    var emailL = document.getElementById('email-local-input').value;
    var passwordL = document.getElementById('password-local-input').value;
    event.preventDefault();
    function localLoginReload(json) {
      localStorage.setItem('name', json.name);
      localStorage.setItem('picture', json.send.picture);
      localStorage.setItem('provider', json.provider);
      localStorage.setItem('language', json.language);
      sessionStorage.setItem('userSession', json.send);
      localStorage.setItem('userData', JSON.stringify(json.send));
      location.reload();
    }
    await fetch(`users/betalogin/${emailL}/${passwordL}`)
      .then((res) => res.json())
      .then((json) => localLoginReload(json));
  }
  async localRegister() {
    var nameR = document.getElementById('name-register-input').value;
    var emailR = document.getElementById('email-register-input').value;
    var documento = document.getElementById('document-register-input').value;
    var direccion = document.getElementById('city-register-input').value;
    var passwordR = document.getElementById('password-register-input').value;
    var passwordConfR = document.getElementById(
      'passwordconfirm-register-input'
    ).value;
    function localLoginReload(json) {
      localStorage.setItem('name', json.name);
      localStorage.setItem('picture', json.send.picture);
      localStorage.setItem('validating', true);
      FifaTournament.prototype.loginState('validation');
      //localStorage.setItem('provider', json.provider);
      //localStorage.setItem('language', json.language);
      //sessionStorage.setItem('userSession', json.send);
      //localStorage.setItem('userData', JSON.stringify(json.send));
    }
    event.preventDefault();
    if (nameR || emailR || passwordR || passwordConfR) {
      if (passwordR === passwordConfR) {
        await fetch(`users/betaregister/${emailR}`, {
          method: 'POST',
          body: JSON.stringify({ nameR, emailR, passwordR, passwordConfR }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
          .then((res) => res.json())
          .then((json) => localLoginReload(json));
        //.then( location.reload())
      } else {
        alert(`check your password please`);
        ////console.log(`check your password please`);
      }
    } else {
      alert(`Complete de info`);
      ////console.log(`Complete de info`);
    }
  } */

/*
  playerLoad() {
    var listA = document.getElementById('list-a');
    var listB = document.getElementById('list-b');
    var totalPlayers = [];
    this.state.tInfo.tMain.map((obj) => {
      const playerNickName = obj.nickname;
      const playstationID = obj.playstationID;
      const playerPicture = obj.picture;
      totalPlayers.push('1');
    });
  } */

/*
  openLogin() {
    event.preventDefault();
    var elems = document.querySelectorAll('.loginModal');
    var instances = M.Modal.init(elems);
    var instance = M.Modal.getInstance(elems[0]);
    instance.open();
  }
  enrolledPlayers() {
    var brackets = this.state.tInfo.tBracket;
    var playerOrder = [];
    var i = 0;
    switch (this.state.tInfo.iTournament) {
      case 1:
        this.state.tInfo.tMain.map((obj) => {
          var bArray = [obj, brackets[playerOrder.length], playerOrder.length];
          this.renderBrackets(bArray);
          playerOrder.push('foo');
        });
        break;
      default:
        brackets.map((obj) => {
          i++;
          obj.push(i);
          this.renderBrackets(obj);
          playerOrder.push('foo');
        });
        break;
    }
  }
  */
/*
  output(a) {
    let output = document.getElementById('chat-box');
    output.innerHTML += `<div class='div-para'>
      <p title='user nickname' class='user-name'>${a.userNick} dice :</p>
      <p title='user message' class='message-history'>${a.text}</p>
      <label>${a.time}</label>
      <img src=${a.picture} class='picture-player'>
    </div> `;
    output.scrollTo(0, output.offsetHeight * 20);
  }
  */

/*
  loginState(invoked) {
    event.preventDefault();
    switch (invoked) {
      case 'login':
        document.getElementById('login-box').style.display = 'block';
        document.getElementById('register-box').style.display = 'none';
        document.getElementById('validation-box').style.display = 'none';
        document.getElementById('return-login-modal').style.display = 'none';
        break;
      case 'register':
        document.getElementById('login-box').style.display = 'none';
        document.getElementById('register-box').style.display = 'block';
        document.getElementById('validation-box').style.display = 'none';
        document.getElementById('return-login-modal').style.display = 'block';
        break;
      case 'validation':
        document.getElementById('login-box').style.display = 'none';
        document.getElementById('register-box').style.display = 'none';
        document.getElementById('validation-box').style.display = 'block';
        break;
      case 'congrats':
        document.getElementById('login-box').style.display = 'none';
        document.getElementById('register-box').style.display = 'none';
        document.getElementById('validation-box').style.display = 'none';
        alert('Se registro con exito');
        break;
    }
  }
  renderBrackets(tournamentBrackets) {
    //////console.log(tournamentBrackets)
    /*
      var playerWrapper = document.getElementById('players-wrapper-modal')
      var listA = document.getElementById('list-a')
      var listB = document.getElementById('list-b')
      const playerNickName = tournamentBrackets[0].nickname
      const playstationID = tournamentBrackets[0].playstationID
      const playerPicture = tournamentBrackets[0].pic
      
      ////console.log(tournamentBrackets)
        if(tournamentBrackets[2] % 2){
          var newPlayer = document.createElement('div')
          newPlayer.setAttribute('class', 'player-div')
          newPlayer.setAttribute('id', `player-div-${tournamentBrackets[2]}`)
          var newPlayerImg = document.createElement('img')
          newPlayerImg.setAttribute('class', 'player-img')
          newPlayerImg.setAttribute('id', `player-img-${tournamentBrackets[2]}`)
          newPlayerImg.setAttribute('src', `${playerPicture}`)
          newPlayer.appendChild(newPlayerImg)
          var newPlayerNick = document.createElement('label')
          newPlayerNick.setAttribute('class', 'player-nick')
          newPlayerNick.setAttribute('id', `player-nick-${tournamentBrackets[2]}`)
          newPlayerNick.innerText = playerNickName
          newPlayer.appendChild(newPlayerNick)
          var newPlayerPsId = document.createElement('label')
          newPlayerPsId.setAttribute('class', 'player-ps-id')
          newPlayerPsId.setAttribute('id', `player-nick-ps-id-${tournamentBrackets[2]}`)
          newPlayerPsId.innerText = playstationID
          newPlayer.appendChild(newPlayerPsId)
          listA.appendChild(newPlayer)
        }else{
            var newPlayer = document.createElement('div')
            newPlayer.setAttribute('class', 'player-div')
            newPlayer.setAttribute('id', `player-div-${tournamentBrackets[2]}`)
            var newPlayerImg = document.createElement('img')
            newPlayerImg.setAttribute('class', 'player-img')
            newPlayerImg.setAttribute('id', `player-img-${tournamentBrackets[2]}`)
            newPlayerImg.setAttribute('src', `${playerPicture}`)
            newPlayer.appendChild(newPlayerImg)
            var newPlayerNick = document.createElement('label')
            newPlayerNick.setAttribute('class', 'player-nick')
            newPlayerNick.setAttribute('id', `player-nick-${tournamentBrackets[2]}`)
            newPlayerNick.innerText = playerNickName
            newPlayer.appendChild(newPlayerNick)
            var newPlayerPsId = document.createElement('label')
            newPlayerPsId.setAttribute('class', 'player-ps-id')
            newPlayerPsId.setAttribute('id', `player-nick-ps-id-${tournamentBrackets[2]}`)
            newPlayerPsId.innerText = playstationID
            newPlayer.appendChild(newPlayerPsId)
            var newPlayerVs = document.createElement('div')
            newPlayerVs.setAttribute('id', `vs-div-${tournamentBrackets[2]}`, `vs-div-${tournamentBrackets[2]})`)
            newPlayerVs.setAttribute('class', 'vs-div')
            var vsImg = document.createElement('img');
            vsImg.setAttribute('class', 'vs-image')
            vsImg.setAttribute('src', 'https://res.cloudinary.com/versus/image/upload/v1585872570/Statics_images/lf0l1knncoprtlzp5wna.png')
            newPlayerVs.appendChild(vsImg)
            listB.appendChild(newPlayer)
            playerWrapper.appendChild(newPlayerVs)
    } 
    
  }
  */
