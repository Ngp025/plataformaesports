import React, { Component, useContext, useState } from 'react';
// Local imports
import gamesModal from '../gameModal';
// SCSS imports
import '../../../styles/customers/copavenadotuerto.scss';
// Logim
import login from '../../user/login/loginFunctions.js';
import '../../../styles/main/user/loguinModal.scss';

// Local Declarations
var customer = 'CVT';
var gameClicked = [];
var gameIDTs = [];

class Copavenadotuerto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: localStorage.userData,
      height: window.innerHeight,
      navigation: 0,
      tournamentsInfo: 'load',
      personalize: 'load',
      videoPlayer: false,
    };
    this.locallogin = this.locallogin.bind(this);
  }
  async tournamentsNames() {
    const response = await fetch(
      `/api/tournaments/information/personalize/${customer}`
    );
    await response.json().then((res) => {
      //console.log(res)
      this.setState({
        tournamentsInfo: res.customerGameResponse,
        personalize: res.personalize,
      });
    });
  }
  logoTheme() {
    var logoWhite = document.getElementsByName('white');
    var logoBlack = document.getElementsByName('black');
    if (logoWhite) {
      return 'https://res.cloudinary.com/versus/image/upload/q_auto/v1581967079/Statics_images/huwfbmcdnyauxauvvwzq.png';
    } else if (logoBlack) {
      return 'https://res.cloudinary.com/versus/image/upload/q_auto/v1581967087/Statics_images/tkculvrokfkavzkftckv.png';
    }
  }
  setTheme() {
    document.documentElement.style.setProperty('--themeColor', '#111217');
    document.documentElement.style.setProperty('--marginDivBgLeft', '#111217');
    document.documentElement.style.setProperty('--marginDivBgRigth', '#111217');
    document.documentElement.style.setProperty('--navBarDivition', '#ab3030');
    document.documentElement.style.setProperty('--fontColor', 'white');
  }
  // LOGUIN
  // LOGUIN STATE
  loginState(invoked, resInvoke) {
    // console.log('Cambiando estado del formulario a ' , invoked)
    switch (invoked) {
      case 'login':
        resInvoke ? '' : event.preventDefault();
        document.getElementById('login-box').style.display = 'block';
        document.getElementById('register-box').style.display = 'none';
        document.getElementById('validation-box').style.display = 'none';
        document.getElementById('return-login-modal').style.display = 'none';
        document.getElementById('updating-box').style.display = 'none';
        document.getElementById('recovery-box').style.display = 'none';
        // Return Button
        document.getElementById('congrats-box').style.display = 'none';
        break;
      case 'register':
        document.getElementById('login-box').style.display = 'none';
        document.getElementById('register-box').style.display = 'block';
        document.getElementById('validation-box').style.display = 'none';
        document.getElementById('return-login-modal').style.display = 'block';
        document.getElementById('updating-box').style.display = 'none';
        document.getElementById('congrats-box').style.display = 'none';
        document.getElementById('recovery-box').style.display = 'none';
        // Return Button
        document.getElementById('return-login-modal').style.display = 'block';
        resInvoke ? '' : event.preventDefault();
        break;
      case 'validation':
        document.getElementById('login-box').style.display = 'none';
        document.getElementById('register-box').style.display = 'none';
        document.getElementById('validation-box').style.display = 'block';
        document.getElementById('updating-box').style.display = 'none';
        document.getElementById('congrats-box').style.display = 'none';
        document.getElementById('recovery-box').style.display = 'none';
        // Return Button
        document.getElementById('return-login-modal').style.display = 'block';
        resInvoke; //? '' : event.preventDefault();
        break;
      case 'updating':
        document.getElementById('login-box').style.display = 'none';
        document.getElementById('register-box').style.display = 'none';
        document.getElementById('validation-box').style.display = 'none';
        document.getElementById('updating-box').style.display = 'block';
        document.getElementById('congrats-box').style.display = 'none';
        document.getElementById('recovery-box').style.display = 'none';
        // Return Button
        document.getElementById('return-login-modal').style.display = 'none';
        break;
      case 'congrats':
        document.getElementById('login-box').style.display = 'none';
        document.getElementById('register-box').style.display = 'none';
        document.getElementById('validation-box').style.display = 'none';
        document.getElementById('updating-box').style.display = 'none';
        document.getElementById('recovery-box').style.display = 'none';
        document.getElementById('congrats-box').style.display = 'block';
        // Return Button
        document.getElementById('return-login-modal').style.display = 'block';
        setTimeout(location.reload(), 2000);
        break;
      case 'recovery':
        document.getElementById('login-box').style.display = 'none';
        document.getElementById('register-box').style.display = 'none';
        document.getElementById('register-box').style.display = 'none';
        document.getElementById('validation-box').style.display = 'none';
        document.getElementById('updating-box').style.display = 'none';
        document.getElementById('congrats-box').style.display = 'none';
        document.getElementById('recovery-box').style.display = 'block';
        // Return Button
        document.getElementById('return-login-modal').style.display = 'block';
        break;
    }
  }
  logOut() {
    localStorage.clear();
    sessionStorage.clear();
    location.reload();
  }
  loginButtonDisplay() {
    if (localStorage.name) {
      return (
        <i
          id='app-menu'
          data-target='dropdown1'
          className='app-menu dropdown-trigger material-icons'
          style={{
            color: "white"
          }}>
          apps
        </i>
      );
    } else {
      return (
        <div id='empty'></div>
        /*
        <button
          id='login-button'
          className='modal-trigger tooltipped  login-button highGradeButton'
          data-tooltip='Mira tu perfil'
          onClick={() => this.openLogin()}
          style={{boxShadow: `0 0 50px 0 rgba(${this.state.personalize.mainColor.red}, ${this.state.personalize.mainColor.green}, ${this.state.personalize.mainColor.blue}, 0.25)`}}>
          Inicia sesión
        </button>
        */
      );
    }
  }
  openLogin(validating) {
    if (validating) {
      Copavenadotuerto.prototype.loginState('validation');
    }
    if (event.target) {
      gameClicked.pop();
      gameIDTs.pop();
      gameClicked.push(event.target.id);
      gameIDTs.push(event.target.getAttribute('name'));
    }
    var elems = document.querySelectorAll('#modal1');
    var supOptions = {
      inDuration: 10,
      startingTop: window.innerWidth <= 1024 ? '0%' : '4%',
      endingTop: window.innerWidth <= 1024 ? '0%' : '10%',
      opacity: window.innerWidth <= 1024 ? 1 : 0.5,
      preventScrolling: false,
    };
    var instances = M.Modal.init(elems, supOptions);
    var instance = M.Modal.getInstance(elems[0]);
    instance.open();
  }
  async locallogin() {
    var emailL = document.getElementById('email-local-input').value.trim().toLowerCase();
    var passwordL = document.getElementById('password-local-input').value;
    event.preventDefault();
    // LOCAL FUNCTION
    async function localLoginReload(json) {
      localStorage.setItem('name', json.name);
      localStorage.setItem('picture', json.send.picture);
      localStorage.setItem('provider', json.provider);
      localStorage.setItem('language', json.language);
      sessionStorage.setItem('userSession', json.send);
      localStorage.setItem('userData', JSON.stringify(json.send));
      var messagealert =
        'Lo sentimos en este momento el torneo aun no se encuentra disponible por favor intente mas tarde';
      if (gameIDTs[0]) {
        var parseIDTs = gameIDTs[0].split(',');
      } else {
        var parseIDTs = [];
      }
      if (parseIDTs.length === 1) {
        location.href = `#/${gameClicked[0]}-tournament/-t_${parseIDTs[0]}`;
      } else {
        if (parseIDTs[1]) {
          alert('Hey este juego tiene mas de un torneo creado');
          location.reload();
        } else {
          location.reload();
        }
      }
    }
    //Form Vars
    if (emailL && passwordL) {
      Copavenadotuerto.prototype.loginState('updating');
      //Copavenadotuerto.prototype.loginState('updating');
      await fetch(`users/betalogin/${emailL}/${passwordL}`)
        .then((res) => res.json())
        .then((json) => {
          if (json.alert) {
            Copavenadotuerto.prototype.loginState('login', true);
            alert(json.alert);
          } else {
            //Copavenadotuerto.prototype.loginState('congrats');
            localLoginReload(json, this.state.preTournamentInfo);
          }
        });
    } else {
      alert('Complete su informacion para realizar el login');
      //console.log('Complete su informacion')
    }
  }
  // Register
  localRegister() {   
    var nameR = document.getElementById('name-register-input').value;
    var clubR = document.getElementById('club-select').value
    var emailR = document.getElementById('email-register-input').value.trim().toLowerCase();
    var dateR = document.getElementById('date-register-input').value;
    var nameTutorR = document.getElementById('name-tutor-register-input').value;
    var documentTutorR = document.getElementById('document-tutor-input').value;
    var documentR = document.getElementById('document-input').value;
    var direccionR = document.getElementById('city-register-input').value;
    var passwordR = document.getElementById('password-register-input').value;
    var passwordConfR = document.getElementById(
      'passwordconfirm-register-input'
    ).value;
    function localLoginReload(json, send) {
      console.log(json, 'EL Json DE local login reload ');
      localStorage.setItem('name', json.name);
      localStorage.setItem('picture', json.send.picture);
      localStorage.setItem('isValidate', json.isValidate);
      localStorage.setItem('provider', json.provider);
      localStorage.setItem('language', json.language);
      sessionStorage.setItem('userSession', json.send);
      localStorage.setItem('userData', JSON.stringify(json.send));
      send ?  Copavenadotuerto.prototype.loginState('validation') : location.reload() //location.reload()//window.href("https://www.plataformaesports.com/#/pes20-tournament/-t_5f6bf19e2e9dfd001ca5205d");
    }
    async function sendMessage(json) {
      var messsageType = 'approvedNewAccount';
      var email = json.email.trim();
      await fetch(`api/games/sendMessage/${messsageType}/${email}`)
        .then((res) => res.json())
        .then((jsonMess) => {
          console.log('PASANDO sendMessage');
          if (jsonMess.alert) {
            Copavenadotuerto.prototype.loginState('register', true);
            alert(jsonMess.alert);
          } else {
            localLoginReload(json, true);
          }
        });
    }
    async function saveRegister() {
      console.log('pasando por registered click');
      if (passwordR === passwordConfR) {
        Copavenadotuerto.prototype.loginState('updating');
        const registerInfo = await fetch(`users/betaregister/${emailR}/false`, {
          method: 'POST',
          body: JSON.stringify({
            nameR,
            clubR,
            emailR,
            passwordR,
            passwordConfR,
            documentR,
            direccionR,
            dateR,
            nameTutorR,
            documentTutorR,
            customer,
          }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }).then((res) => res.json());

        if (await registerInfo.alert) {
          Copavenadotuerto.prototype.loginState('register', true);
          alert(registerInfo.alert);
        } else {
          await registerInfo.send.email_verified 
          ? localLoginReload(registerInfo, false) 
          : sendMessage(registerInfo);
        }
        //.then( location.reload())
      } else {
        alert(`check your password please`);
        //console.log(`check your password please`);
      }
    }

    event.preventDefault();
    if(clubR === "Selecciona tu club"){
      alert("Seleccione su club")
    }else{
      if (
        nameR &&
        emailR &&
        dateR &&
        passwordR &&
        passwordConfR &&
        documentR &&
        direccionR
      ) {
        saveRegister();
      } else {
        alert('Complete el formulario para avanzar');
      }
    }
  }
  // Validation
  async localValidation(preTournamentInfo) {
    event.preventDefault();
    console.log(preTournamentInfo, '<-------------');
    Copavenadotuerto.prototype.loginState('updating');
    var toValidate = document.getElementById('validation-token-input').value;
    if (toValidate === '') {
      alert('Ingrese su Codigo');
    }
    await fetch(`users/confirm/${toValidate}`)
      .then((res) => res.json())
      .then(async (json) => {
        Copavenadotuerto.prototype.loginState('congrats');
        if (json.isValidate === 'true') {
          localStorage.setItem('isValidate', json.isValidate);
          setTimeout(function validatingRedirect() {
            switch (gamePath[0]) {
              case 'fifa20':
                location.href = `#/${gamePath[0]}-tournament/-t_${
                  preTournamentInfo.fifa === ''
                    ? 'load'
                    : preTournamentInfo.fifa
                }`;
                break;
              case 'pes20':
                location.href = `#/${gamePath[0]}-tournament/-t_${
                  preTournamentInfo.pes === '' ? 'load' : preTournamentInfo.pes
                }`;
                break;
              case 'lol':
                location.href = `#/${gamePath[0]}-tournament/-t_${
                  preTournamentInfo.lol === '' ? 'load' : preTournamentInfo.lol
                }`;
                break;
              case 'mobileL':
                location.href = `#/${gamePath[0]}-tournament/-t_${
                  preTournamentInfo.mobileL === ''
                    ? 'load'
                    : preTournamentInfo.mobileL
                }`;
                break;
            }
          }, 1750);
        } else if (json.newPass) {
          alert(
            'Cambio de contraseña completado con exito. \n Recuerde que no podra cambiar la contraseña por las proximas 72 horas.'
          );
          location.reload();
        } else {
          Copavenadotuerto.prototype.loginState('validation');
          alert('los datos ingresados son incorrectos');
        }
      });
  }
  // GAME MODAL
  async gameModalHandler() {
    var elems = document.querySelectorAll('.gamesModal');
    var instance = M.Modal.getInstance(elems[0]);
    var modalOverlay = document.getElementsByClassName('modal-overlay');
    var cardsWrapper = document.getElementById('cards-wrapper');
    //console.log(instance)
    var CopavenadotuertoContent = document.getElementById(
      'Copavenadotuerto-box'
    );
    var mainLogo = document.getElementById(
      'logo-align'
    )
    var closeModal = document.getElementById('close-login-modal')
    closeModal.addEventListener('click', ()=>{
      CopavenadotuertoContent.style.opacity = 1;
      mainLogo.style.opacity = 1;
    })
    if (instance.isOpen === false) {
      //console.log('AQUI')
      instance.open();
      CopavenadotuertoContent.style.opacity = 0.2;
      mainLogo.style.opacity = 0.2;
    }
    modalOverlay[0].addEventListener('click', () => {
      CopavenadotuertoContent.style.opacity = 1;
      mainLogo.style.opacity = 1;
    });
    document.addEventListener('keydown', (key) => {
      if (key.key === 'Escape') {
        instance.isOpen === false
          ? (CopavenadotuertoContent.style.opacity = 1, mainLogo.style.opacity = 1)
          : '';
      }
    });
  }
  // VIDEO HANDLER
  startVideo() {
    var videoContent = document.getElementById('video-content');
    console.log(video);
    if (videoContent.style.display === 'none') {
      videoContent.style.display = 'block';
      var video = document.getElementById('sponsor-video-1');
      video.play();
      this.setState({ videoPlayer: true });
      setTimeout(() => this.gameModalHandler(), 19000);
      setTimeout(() => (videoContent.style.display = 'none'), 19000);
    } else {
      videoContent.style.display = 'none';
    }
  }
  // Mount Component
  componentDidMount() {
    this.tournamentsNames();
    // Navigation Listeners
    document.addEventListener('keydown', () => {
      if (event.code === 'Escape') {
        var CopavenadotuertoContent = document.getElementById(
          'Copavenadotuerto-box'
        );
        var modalOverlay = document.getElementsByClassName('modal-overlay');
        //console.log(CopavenadotuertoContent)
        if (CopavenadotuertoContent.style.display === 'none') {
          this.gameModalHandler();
          CopavenadotuertoContent.style.display = 'block';
          //console.log(CopavenadotuertoContent)
        }
      }
    });
    // GAME MODAL
    function modalRegen() {
      var elems = document.querySelectorAll('.gamesModal');
      var instances = M.Modal.init(elems);
      var instance = M.Modal.getInstance(elems[0], { opacity: 1 });
      //console.log(instance)
      instance.close();
      instance.isOpen = false;
    }
    modalRegen();
    //const socket = io()
    //socket.emit('disconnect', {true : true})

    /*socket.on('iTournament', (data)=>{
      socket.disconnect()
      //var tInfo = this.state.tInfo
      //var newTInfo = this.state.tInfo
      /*
      for(const prop in tInfo){
        prop === 'iTournament' ? newTInfo[prop] = data.iTournament : ""
      } */
    //this.setState({tInfo : newTInfo})

    /*
    function loginModalRegen() {
      var elems = document.querySelectorAll('#modal1');
      var instances = M.Modal.init(elems);
      var instance = M.Modal.getInstance(elems[0]);
      // console.log(instance)
      instance.close();
      instance.isOpen = false;
    }
    loginModalRegen();
    */
    // Materialice Tooltip init
    document.addEventListener('mouseover', function () {
      var elems = document.querySelectorAll('.tooltipped');
      var options = 0;
      var instances = M.Tooltip.init(elems, options);
    });
    // Materialice Select
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('select');
      var instances = M.FormSelect.init(elems, 1);
    });
    // DROPDOWN TRIGGER
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, 1);
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
    document.removeEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.gamesModal');
      var instances = M.Modal.init(elems[0]);
      instances.destroy();
    });
    //location.reload()
  }

  sponsorsCountDown() {
    var second = 15
    function renderCountDown() {
      document.getElementById('countdown-sponsor').innerHTML = second + ' segundos';

    }
    function showRemaining() {
        /*var now = new Date();
        var distance = end - now;
        if (distance < 0) {

            clearInterval(timer);
            document.getElementById('countdown-sponsor').innerHTML = 'EXPIRED!';
            return;
        } */
        second--
        renderCountDown()
      }
   var timer = setInterval(showRemaining, 1000);
   timer
  }

  render() {
    return (
      <div id='responsive-Copavenadotuerto'>
        <div
          id='Copavenadotuerto-wrapper-image'
          className='Copavenadotuerto-wrapper-image'></div>
        <div
          id='Copavenadotuerto-wrapper-gradient'
          className='Copavenadotuerto-wrapper-gradient'></div>
        <div
          id='plataformaesports-Copavenadotuerto'
          className='Copavenadotuerto-wrapper'>
          <div
            id='Copavenadotuerto-content'
            className='Copavenadotuerto-content'>
            <div id='nav-bar' className='nav-bar'>
              <div id='nav-bar-content' className='nav-bar-content'>
                {this.loginButtonDisplay()}
                <div id='sponsor-footer-1' className='sponsor-footer-prod'>
                <img
                  id='sponsor-1'
                  className='sponsor-img animatedO opacity'
                  onClick= {()=> window.open('https://www.instagram.com/esportslandarg/')}
                  src='https://res.cloudinary.com/versus/image/upload/v1600271006/Customers/cbb2mo2tjzwinu2qbmxx.png'></img>
                <label id="es-prod" className="es-prod animatedO opacity" onClick= {()=> window.open('https://www.instagram.com/esportslandarg/')}>producciones</label>
              </div>
                <div
                  id='dropdown1'
                  className='dropdown-content app-menu-dropdown'>
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
                      location.reload();
                    }}>
                    power_settings_new
                  </i>
                </div>
              </div>
            </div>
            {gamesModal(
              this.state.tournamentsInfo,
              Copavenadotuerto.prototype.openLogin
            )}
            <div id='logo-align' className='logo-align'>
              <img
                id='vs-logo'
                className='vs-logo'
                alt='Liga electronica Venadense'
                onClick= {()=> location.href = 'https://instagram.com/patriciomarenghini?igshid=lqfgep0hnnyp'}
                src='https://res.cloudinary.com/versus/image/upload/v1600869831/Customers/CVT/Logos/rcynqnnajvokrnpucyil.png'
              />
            </div>
            <h1 id='Plataforma Esports' className='Plataforma Esports' hidden>
              Plataforma Esports
            </h1>
            <h2 id='Amba Esports' className='Amba Esports' hidden>
              El mejor lugar para crecer como jugador y organizador, Amba
              Esports es el futuro de todos los gamers en Latino America.
            </h2>
            <div id='Copavenadotuerto-box'>
              <h4
                id='Copavenadotuerto-legend'
                className='Copavenadotuerto-legend'>
                Competencias de Esports en linea.
              </h4>
              {this.state.tournamentsInfo === 'load' ? (
                <img
                  id='loading-img'
                  className='loading-img'
                  src='https://res.cloudinary.com/versus/image/upload/v1585185745/Statics_images/xxpauscz8misoyrhkjis.gif'></img>
              ) : (
                <button
                  id='plataformaesports-play-button'
                  className='modal-trigger play-button' //tooltipped
                  type='button'
                  //data-tooltip='¡A JUGAR!'
                  onClick={() =>
                    this.state.videoPlayer
                      ? this.gameModalHandler()
                      : this.startVideo()
                  }>
                  <p
                    title='Start playing'
                    id='button-contenido'
                    className='button-contenido'>
                    Empieza a jugar
                  </p>
                </button>
              )}
              <div
                id='video-content'
                className='video-content'
                style={{ display: 'none' }}>
                <div id='video-align' className='video-align'>
                  <label id='video-text' className='video-text'>
                    Mira el video para continuar
                  </label>
                  <video
                    id='sponsor-video-1'
                    className='sponsor-video'
                    src='https://res.cloudinary.com/versus/video/upload/v1601045378/Customers/CVT/Videos/w58otmeynlxqs5go5za3.mp4'
                    type='video/mp4'
                  />
                </div>
              </div>
            </div>
            {/*
              <p title='Sponsors' id='text-sponsor-2' className='text-sponsor'>
                Produce
              </p>
               
              <div id='sponsor-footer-1' className='sponsor-footer-prod'>
                <img
                  id='sponsor-1'
                  className='sponsor-img animatedO opacity'
                  onClick= {()=> location.href = 'https://www.instagram.com/esportslandarg/'}
                  src='https://res.cloudinary.com/versus/image/upload/v1600271006/Customers/cbb2mo2tjzwinu2qbmxx.png'></img>
              </div>
              */}
            <p title='Sponsors' id='text-sponsor' className='text-sponsor'>
              Nuestros patrocinadores
            </p>
            <div id='sponsor-footer' className='sponsor-footer'>
                    <img
                        id='sponsor-2'
                        onClick= {()=> window.open('https://www.instagram.com/libreopcion/')}
                        className='sponsor-img libre animatedO opacity'
                        src='https://res.cloudinary.com/versus/image/upload/v1600869831/Customers/CVT/Logos/lmmhskmj0k0hgqf5vay0.png'>
                      </img>
                      <img
                        id='sponsor-3'
                        onClick= {()=> window.open('https://www.facebook.com/ligavenadenseok/')}
                        className='sponsor-img lvfb animatedO opacity'
                        src='https://res.cloudinary.com/versus/image/upload/v1600869831/Customers/CVT/Logos/bjgwjeviagswknsgfftb.png'>
                      </img>
                      <img
                        id='sponsor-4'
                        onClick= {()=> window.open('https://www.instagram.com/ver.tv_/')}
                        className='sponsor-img vtv animatedO opacity'
                        src='https://res.cloudinary.com/versus/image/upload/v1600869831/Customers/CVT/Logos/f3gfsce4leic5qeevkpz.png'>
                      </img>
                      <img
                        id='sponsor-5'
                        //onClick= {()=> window.open('https://www.instagram.com/libreopcion/')}
                        className='sponsor-img asdev animatedO opacity'
                        src='https://res.cloudinary.com/versus/image/upload/v1600869831/Customers/CVT/Logos/u8bo6wmc7udy6zxwutgf.png'>
                      </img>
                      <img
                        id='sponsor-5'
                        onClick= {()=> window.open('https://www.instagram.com/concejalespj.vt/')}
                        className='sponsor-img parque consejales animatedO opacity'
                        src='https://res.cloudinary.com/versus/image/upload/v1600869831/Customers/CVT/Logos/fgm32bim8htq2qibz63n.png'>
                      </img>
                  </div>
            <div
              id='modal1'
              className='modal loginModal'
              style={{ maxWidth: '100% !important' }}>
              <div
                id='modal-content'
                className={`modal-content ${
                  window.innerWidth <= 1024 ? 'cel' : ''
                }`}
                style={{
                  border: `1px solid 
                    rgb(${
                      this.state.personalize !== 'load'
                        ? this.state.personalize.mainColor.red
                        : 0
                    }, 
                      ${
                        this.state.personalize !== 'load'
                          ? this.state.personalize.mainColor.green
                          : 0
                      }, 
                      ${
                        this.state.personalize !== 'load'
                          ? this.state.personalize.mainColor.blue
                          : 0
                      })`,
                }}>
                {login.loginBeta(
                  Copavenadotuerto.prototype.loginState,
                  this.locallogin,
                  this.state.personalize !== 'load'
                    ? this.state.personalize.mainColor
                    : 0
                )}
                {login.registerBeta(
                  this.localRegister,
                  this.state.personalize !== 'load'
                    ? this.state.personalize.mainColor
                    : 0
                )}
                {login.recovery(
                  Copavenadotuerto.prototype.loginState,
                  this.state.personalize !== 'load'
                    ? this.state.personalize.mainColor
                    : 0
                )}
                {login.validationModal(
                  Copavenadotuerto.prototype.localValidation,
                  this.state.personalize !== 'load'
                    ? this.state.personalize.mainColor
                    : 0
                )}
                {login.updating()}
                {login.congrats()}
                <i
                  id='close-login-modal'
                  className='modal-close material-icons'>
                  clear
                </i>
                <i
                  id='return-login-modal'
                  style={{ display: 'none' }}
                  className='return-modal material-icons'
                  onClick={() =>
                    Copavenadotuerto.prototype.loginState('login')
                  }>
                  arrow_back
                </i>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Copavenadotuerto;
