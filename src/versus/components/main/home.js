import React, { Component, useContext, useState } from 'react';

// Methods
//import login from './methods/login'
//import CardList from '../user/passport-cards/cardList';
//import PassportProfile from '../user/passportProfile'
// Local imports
// SCSS imports
import '../../styles/main/home.scss';
// Logim
import login from '../user/login/loginFunctions';
import '../../styles/main/user/loguinModal.scss';
// Local Declarations

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.locallogin = this.locallogin.bind(this);
  }
  // LOGUIN STATE
  loginState(invoked, resInvoke) {
    switch (invoked) {
      case 'login':
        resInvoke ? '' : event.preventDefault();
        document.getElementById('login-box').style.display = 'block';
        document.getElementById('register-box').style.display = 'none';
        document.getElementById('validation-box').style.display = 'none';
        document.getElementById('return-login-modal').style.display = 'none';
        document.getElementById('updating-box').style.display = 'none';
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
        // Return Button
        document.getElementById('return-login-modal').style.display = 'block';
        resInvoke ? '' : event.preventDefault();
        break;
      case 'updating':
        document.getElementById('login-box').style.display = 'none';
        document.getElementById('register-box').style.display = 'none';
        document.getElementById('validation-box').style.display = 'none';
        document.getElementById('updating-box').style.display = 'block';
        document.getElementById('congrats-box').style.display = 'none';
        // Return Button
        document.getElementById('return-login-modal').style.display = 'none';
        break;
      case 'congrats':
        document.getElementById('login-box').style.display = 'none';
        document.getElementById('register-box').style.display = 'none';
        document.getElementById('validation-box').style.display = 'none';
        document.getElementById('updating-box').style.display = 'none';
        document.getElementById('congrats-box').style.display = 'block';
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
        <button
          id='profile-button'
          className='modal-trigger tooltipped  login-button highGradeButton'
          data-tooltip='Mira tu perfil'
          onClick={() => (location.href = '/#/settings')}>
          Perfil
        </button>
      );
    } else {
      return (
        <button
          id='login-button'
          className='modal-trigger tooltipped  login-button highGradeButton'
          data-tooltip='Mira tu perfil'
          onClick={() => this.openLogin()}>
          Inicia sesión
        </button>
      );
    }
  }
  openLogin(validating) {
    if (validating) {
      Home.prototype.loginState('validation');
    }
    var elems = document.querySelectorAll('#modal1');
    var instances = M.Modal.init(elems);
    var instance = M.Modal.getInstance(elems[0]);
    instance.open();
    gamePath.pop();
    gamePath.push(event.path[0].id);
  }
  async locallogin() {
    var emailL = document.getElementById('email-local-input').value;
    var passwordL = document.getElementById('password-local-input').value;
    event.preventDefault();
    // LOCAL FUNCTION
    async function localLoginReload(json, preTournamentInfo) {
      localStorage.setItem('name', json.name);
      localStorage.setItem('picture', json.send.picture);
      localStorage.setItem('provider', json.provider);
      localStorage.setItem('language', json.language);
      sessionStorage.setItem('userSession', json.send);
      localStorage.setItem('userData', JSON.stringify(json.send));
      //console.log(gamePath[0], '${gamePath[0]}', gamePath, 'gamePath');
      switch (gamePath[0]) {
        case 'fifa20':
          location.href = `#/${gamePath[0]}-tournament/-t_${
            preTournamentInfo.fifa === '' ? 'load' : preTournamentInfo.fifa
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
        default:
          location.reload();
          break;
      }
    }
    //Form Vars
    if (emailL && passwordL) {
      Home.prototype.loginState('updating');
      //Home.prototype.loginState('updating');
      await fetch(`users/betalogin/${emailL}/${passwordL}`)
        .then((res) => res.json())
        .then((json) => {
          if (json.alert) {
            Home.prototype.loginState('login', true);
            alert(json.alert);
          } else {
            //Home.prototype.loginState('congrats');
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
    function localLoginReload(json) {
      console.log(json, 'EL Json DE local login reload ');
      localStorage.setItem('name', json.name);
      localStorage.setItem('picture', json.send.picture);
      localStorage.setItem('isValidate', json.isValidate);
      localStorage.setItem('provider', json.provider);
      localStorage.setItem('language', json.language);
      sessionStorage.setItem('userSession', json.send);
      localStorage.setItem('userData', JSON.stringify(json.send));
      Home.prototype.loginState('validation');
    }
    async function saveRegister() {
      console.log('pasando por registered click');
      if (passwordR === passwordConfR) {
        var customer = 'Plataforma Esports';
        Home.prototype.loginState('updating');
        await fetch(`users/betaregister/${emailR}/false`, {
          method: 'POST',
          body: JSON.stringify({
            nameR,
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
        })
          .then((res) => res.json())
          .then((json) => {
            console.log(json);
            if (json.alert) {
              Home.prototype.loginState('register', true);
              alert(json.alert);
            } else {
              localLoginReload(json);
            }
          });
        //.then( location.reload())
      } else {
        alert(`check your password please`);
        //console.log(`check your password please`);
      }
    }

    event.preventDefault();
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
      //console.log(`Complete the info`);
    }
  }
  // Validation
  async localValidation(preTournamentInfo) {
    event.preventDefault();
    console.log(preTournamentInfo, '<-------------');
    Home.prototype.loginState('updating');
    var toValidate = document.getElementById('validation-token-input').value;
    if (toValidate === '') {
      alert('Ingrese su Codigo');
    }
    await fetch(`users/confirm/${toValidate}`)
      .then((res) => res.json())
      .then(async (json) => {
        Home.prototype.loginState('congrats');
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
        } else {
          Home.prototype.loginState('validation');
          alert('los datos ingresados son incorrectos');
        }
      });
  }
  async sendMessage() {
    event.preventDefault();
    var nameValue = document.getElementById('contact-name').value;

    var mailValue = document.getElementById('contact-mail').value;

    var messageValue = document.getElementById('contact-message').value;
    var regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    function sendMessage(message) {
      alert(message);
      location.reload();
    }
    if (nameValue && mailValue && messageValue) {
      if (regex.test(mailValue) === true) {
        await fetch('api/games/personalContactSendMessage', {
          method: 'POST',
          body: JSON.stringify({
            nameValue,
            mailValue,
            messageValue,
          }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
          .then((res) => res.json())
          .then((data) =>
            data.alert ? alert(data.alert) : sendMessage(data.message)
          );
      } else {
        alert('escriba un mail valido ');
      }
    } else {
      alert('Verifique campos para enviar el mensaje');
    }
  }
  // GAME MODAL
  gameModalHandler() {
    var elems = document.querySelectorAll('.gamesModal');
    var instance = M.Modal.getInstance(elems[0]);
    var modalOverlay = document.getElementsByClassName('modal-overlay');
    var cardsWrapper = document.getElementById('cards-wrapper');
    //console.log(instance)
    var homeContent = document.getElementById('home-box');
    if (instance.isOpen === false) {
      //console.log('AQUI')
      instance.open();
      homeContent.style.display = 'none';
    }
    modalOverlay[0].addEventListener('click', () => {
      homeContent.style.display = 'block';
    });
  }
  // Mount Component
  componentDidMount() {
    //this.tournamentsNames()
    // Navigation Listeners
    //window.addEventListener('resize', () => this.navigationResize());
    //document.addEventListener('wheel', () => this.navigationWheel());
    //document.addEventListener('keydown', () => this.navigationKey());
    document.addEventListener('keydown', () => {
      if (event.code === 'Escape') {
        var homeContent = document.getElementById('home-box');
        var modalOverlay = document.getElementsByClassName('modal-overlay');
        //console.log(homeContent)
        if (homeContent.style.display === 'none') {
          this.gameModalHandler();
          homeContent.style.display = 'block';
          //console.log(homeContent)
        }
      }
    });
    // GAME MODAL
    function loginModalRegen() {
      var elems = document.querySelectorAll('#modal1');
      var instances = M.Modal.init(elems);
      var instance = M.Modal.getInstance(elems[0]);
      // console.log(instance)
      instance.close();
      instance.isOpen = false;
    }
    //loginModalRegen()
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
  }
  render() {
    return (
      <div id='responsive-home'>
        <div className='home-wrapper' id='plataformaesports-home'>
          <div id='home-box' className='home-box'>
            <div
              id='home-style-top-container'
              className='home-style-top-container'>
              <div
                id='explore-games-div'
                className='explore-games'
                onClick={() => (location.href = '#/ciudadautodromo')}>
                <label id='explore-games'>
                  <i className='material-icons'>search</i>Explora nuestros
                  torneos
                </label>
              </div>
              <img
                id='home-top-gradient'
                className='home-top-gradient'
                src='https://res.cloudinary.com/versus/image/upload/v1591701209/Assets/Home/jsp4hvwfktskj7o9gpfh.png'
              />
              <img
                id='home-top-diamonds'
                className='home-top-diamonds'
                src='https://res.cloudinary.com/versus/image/upload/v1591741018/Assets/Home/emtv48ycxfzdylkaonse.png'
              />
              <img
                id='home-top-tittle-img'
                className='home-top-tittle-img'
                src='https://res.cloudinary.com/versus/image/upload/v1591702085/Assets/Home/lpilpcqndrw5hgpipt0i.png'
              />
            </div>
            <div id='slogan-container' className='slogan-container'>
              <h2 id='app-slogan' className='app-slogan'>
                La mejor solución a la organización de torneos en línea
              </h2>
              <p id='app-legend' className='app-legend'>
                Facilita la creación, ejecución y seguimiento de tus
                competencias, siendo más productivo, competitivo y masivo.
              </p>
              <img
                id='down-arrow'
                className='down-arrow'
                src='https://res.cloudinary.com/versus/image/upload/v1591743182/Assets/Home/pi6d2ot2svygptv3bidn.png'
              />
            </div>
            <div id='app-content-box' className='app-content'>
              <div id='app-content-1' className='app-content-1'>
                <div
                  id='app-content-1-line-bg'
                  className='app-content-1-line-bg'></div>
                <div id='text-box-1' className='text-box'>
                  <label id='text-box-1-tittle' className='text-box-tittle'>
                    Automatización de procesos
                  </label>
                  <p id='text-box-1-p' className='text-box-1-p'>
                    Automatizamos tu proceso de creacion, organizacion,
                    validación, verificación y seguimiento, obteniendo los datos
                    de los enfrentamientos a través de la API rest oficial del
                    desarrollador.
                  </p>
                </div>
                <img
                  id='automatization-img'
                  className='automatization-img'
                  src='https://res.cloudinary.com/versus/image/upload/v1591734554/Assets/Home/sknqlz6kue5jhufvpt6n.png'
                />
                <img
                  id='automatization-img-bg'
                  className='automatization-img-bg'
                  src='https://res.cloudinary.com/versus/image/upload/v1591741076/Assets/Home/onb2kbexk2i7o5utpuq7.png'
                />
              </div>
              <div id='app-content-2' className='app-content-2'>
                <div
                  id='app-content-2-line-bg'
                  className='app-content-2-line-bg'></div>
                <div id='text-box-2' className='text-box'>
                  <label id='text-box-2-tittle' className='text-box-tittle'>
                    Base de datos de jugadores
                  </label>
                  <p id='text-box-2-p' className='text-box-2-p'>
                    Podrás registrar, validar y almacenar de forma segura y
                    ordenada los datos de tus jugadores, mantén actualizados los
                    datos de usuarios según su competitividad con nuestro
                    sistema de reputación.
                  </p>
                </div>
                <img
                  id='database-img'
                  className='database-img'
                  src='https://res.cloudinary.com/versus/image/upload/v1591738442/Assets/Home/oa62cahoswq1eypgycy4.png'
                />
                <img
                  id='database-img-bg'
                  className='database-img-bg'
                  src='https://res.cloudinary.com/versus/image/upload/v1591741076/Assets/Home/onb2kbexk2i7o5utpuq7.png'
                />
              </div>
              <div id='app-content-3' className='app-content-3'>
                <div
                  id='app-content-3-line-bg'
                  className='app-content-3-line-bg'></div>
                <div id='text-box-3' className='text-box'>
                  <label id='text-box-3-tittle' className='text-box-tittle'>
                    Interfaz adaptable
                  </label>
                  <p id='text-box-3-p' className='text-box-3-p'>
                    Nuestra App cuenta con una interfaz adaptable a distintos
                    dispositivos mostrando a cada usuario lo que necesita ver.
                    Puede llevar estadísticas de sus torneos en un entorno
                    comodo y adaptable según sus intereses.
                  </p>
                </div>
                <img
                  id='interfaz-img'
                  className='interfaz-img'
                  src='https://res.cloudinary.com/versus/image/upload/v1591737798/Assets/Home/rj6aiwtqdtzlpygaubm9.png'
                />
                <img
                  id='interfaz-img-bg'
                  className='interfaz-img-bg'
                  src='https://res.cloudinary.com/versus/image/upload/v1591741076/Assets/Home/onb2kbexk2i7o5utpuq7.png'
                />
              </div>
            </div>
            <div id='app-contact-box' className='app-contact-box'>
              <img
                id='contact-diamonds'
                className='contact-diamonds'
                src='https://res.cloudinary.com/versus/image/upload/v1591741018/Assets/Home/emtv48ycxfzdylkaonse.png'
              />
              <img
                id='contact-robot'
                className='contact-robot'
                src='https://res.cloudinary.com/versus/image/upload/v1591745205/Assets/Home/leqndhsubm5n8hwlfv9b.png'
              />
              <div id='contact-form-box' className='contact-form-box'>
                <form id='contact-form' className='contact-form'>
                  <label id='contact-tittle' className='contact-title'>
                    ¡Hablemos!
                  </label>
                  <input
                    id='contact-name'
                    className='contact-name'
                    placeholder='Nombre Completo'
                    autoComplete='off'></input>
                  <input
                    id='contact-mail'
                    className='contact-mail'
                    placeholder='Correo Electronico'
                    autoComplete='off'></input>
                  <textarea
                    id='contact-message'
                    className='contact-message'
                    placeholder='¿En qué podemos ayudarte?'
                    autoComplete='off'></textarea>
                  <button
                    id='contact-form-button'
                    className='contact-form-button'
                    onClick={() => {
                      this.sendMessage();
                    }}>
                    Enviar consulta
                  </button>
                </form>
              </div>
            </div>
            <div id='home-footer-container' className='home-footer-container'>
              <div id='home-footer' className='home-footer'>
                <label id='index' className='index'>
                  Inicio
                </label>
                <label id='manual-entry' className='manual-entry'>
                  ¿Quieres saber cómo funciona la plataforma?
                </label>
                <a
                  id='download-manual'
                  className='download-manual'
                  href='legal/Manual de uso - Plataforma Esports'
                  download='Manual de uso - Plataforma Esports'>
                  Solicita el manual de uso
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
