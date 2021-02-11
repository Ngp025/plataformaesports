import React, { Component } from 'react';
import moment from 'moment-timezone';

//Login Functions

function teamRegisterData() {
  var playerTeamData = location.href.split('/')[5].split('-');
  return playerTeamData;
}
function logOut() {
  localStorage.clear();
  sessionStorage.clear();
  location.reload();
}
function onChange(e) {
  const { name, value } = e.target;
  this.setState({ [name]: value });
}
async function recoveryPassword(email, pass, confirm, loginState) {
  event.preventDefault();
  if (pass === confirm) {
    await fetch(`users/newPassword/${email}`, {
      method: 'POST',
      body: JSON.stringify({
        tempPassword: pass,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((jsonMess) => {
        if (!jsonMess.alert) {
          loginState('validation');
        } else {
          alert(jsonMess.alert);
        }
      });
  } else {
    alert(
      'Disculpe la contraseña no es exactamente igual por favor indique correctamente'
    );
  }
}
function loginBeta(loginState, localLogin, mainColor) {
  return (
    <div id='login-box' className='login-box  opacity animatedO'>
      {/*AQUI COMIENZA LOGIN CONTENT */}
      <label id='login-tittle' className='login-tittle'>
        Bienvenido
      </label>
      <form id='form-loginlocal' className='form-loginlocal'>
        <label
          id='label-loginlocal-email'
          className='label-loginlocal-email'
          htmlFor='email-local-input'>
          Correo Electrónico
        </label>
        <input
          id='email-local-input'
          className='email-local-input'
          type='email'
          placeholder='Ingrese su correo electrónico'
          onMouseEnter={() => {
            document.getElementById(
              'email-local-input'
            ).style.borderBottom = `1px solid rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`;
          }}
          onMouseLeave={() => {
            document.getElementById('email-local-input').style.borderBottom =
              '1px solid #ffffff';
          }}
          //style={{}}
          //error={errors.email}
        />
        {/*<spam id='red-text-email-l' className='red-text-email-l'></spam>*/}
        <label
          id='label-loginlocal-password'
          className='label-loginlocal-password'
          htmlFor='password'>
          Password
        </label>
        <input
          id='password-local-input'
          className='password-local-input'
          type='password'
          placeholder='Ingresa su password'
          onMouseEnter={() => {
            document.getElementById(
              'password-local-input'
            ).style.borderBottom = `1px solid rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`;
          }}
          onMouseLeave={() => {
            document.getElementById('password-local-input').style.borderBottom =
              '1px solid #ffffff';
          }}
          //error={}//errors.password
        />
        {/*<spam id='red-text-password-l' className='red-text-password-l'></spam>*/}
        <button
          id='submit-loginlocal'
          className='submit-loginlocal'
          type='submit'
          onClick={() => localLogin()}
          style={{
            backgroundColor: `rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`,
          }}>
          Ingresar
        </button>
        <canvas
          id='login-canvas'
          className='login-canvas'
          style={{
            backgroundColor: `rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`,
          }}></canvas>
        <button
          id='to-register'
          className='to-register'
          onClick={() => loginState('register')}
          style={{
            border: `solid 1px rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`,
          }}>
          ¿No estas registrado aún?{' '}
          <span
            id='elevate-span-register'
            className='elevate-span'
            style={{
              color: `rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`,
            }}>
            Registrate
          </span>
        </button>
        <a
          id='submit-lostPass'
          className='submit-lostPass'
          type='submit'
          onClick={() => loginState('recovery')}
          style={{
            color: `rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`,
          }}>
          ¿Olvidaste tu contraseña?
        </a>
      </form>
    </div>
  );
}
function registerBeta(localRegister, mainColor, invoke) {
  var customer = location.href.split("/")[4]
  console.log(customer)
  /*
  if(customer === "copavenadotuerto"){
    function selectInit(elems) {
      var instances = M.FormSelect.init(elems, 0);
    }
    setTimeout(() => {
      selectInit(document.querySelectorAll('select'));
    }, 25);
    } */
  return (
    <div
      id='register-box'
      className='register-box opacity animatedO'
      style={{
        display: `${invoke === 'teamregister' ? 'block' : 'none'}`,
        border: `${
          invoke === 'teamregister'
            ? `solid 2px rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`
            : ''
        }`,
      }}>
      {/*AQUI COMIENZA LOGIN CONTENT */}
      <label id='register-tittle' className='register-tittle'>
        {invoke === 'teamregister' ? 'Registro y equipo' : 'Registro'}
      </label>
      <form id='form-register-local' className='form-loginlocal'>
        <label
          id='label-name-register'
          className='label-name-register'
          htmlFor='name-register-input'>
          Nombre completo
        </label>
        <input
          id='name-register-input'
          className='name-register'
          type='text'
          placeholder='Nombre y apellido'
          autoComplete='off'
          onMouseEnter={() => {
            document.getElementById(
              'name-register-input'
            ).style.borderBottom = `1px solid rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`;
          }}
          onMouseLeave={() => {
            document.getElementById('name-register-input').style.borderBottom =
              '1px solid #ffffff';
          }}
        />
          <label id="club-label" className="club-label" style={{display: customer === "copavenadotuerto" ? "block" : "none"}}>Club</label>
          <select id="club-select" className="club-select" style={{display: customer === "copavenadotuerto" ? "block" : "none", color:`rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`}}>
              <option disabled selected >Selecciona tu club</option>
              <option value="Sportivo B Rivadavia"> Sportivo B Rivadavia </option>
              <option value="Defensores Talleres"> Defensores Talleres </option>
              <option value="Ciudad Nueva F.B.C."> Ciudad Nueva F.B.C. </option>
              <option value="Centenario F.B.C."> Centenario F.B.C. </option>
              <option value="Sacachispas F.B.C."> Sacachispas F.B.C. </option>
              <option value="Atl. Jorge Newbwry"> Atl. Jorge Newbwry </option>
              <option value="Central Argentino F.B.C."> Central Argentino F.B.C. </option>
              <option value="Juventud Pueyredon"> Juventud Pueyredon </option>
              <option value="Ciudad">Club Ciudad</option>
              <option value="Sportivo Avellaneda"> Sportivo Avellaneda </option>
          </select>
        <label
          id='label-nickname-register'
          className='nickname-register-label'
          style={{ display: invoke === 'teamregister' ? 'block' : 'none' }}
          htmlFor='nickname-input'>
          Nickname
        </label>
        <input
          id='nickname-input'
          className='nickname-register-input'
          type='text'
          autoComplete='off'
          //defaultValue = {`${invoke === "teamregister" ? "Ingrese su Nick" : ""}`}
          style={{ display: invoke === 'teamregister' ? 'block' : 'none' }}
          placeholder='Ingrese su nick'
          onMouseEnter={() => {
            document.getElementById(
              'nickname-input'
            ).style.borderBottom = `1px solid rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`;
          }}
          onMouseLeave={() => {
            document.getElementById('nickname-input').style.borderBottom =
              '1px solid #ffffff';
          }}
        />
        <label
          id='label-email-register'
          className='label-email-register'
          style={{ display: invoke === 'teamregister' ? 'none' : 'block' }}
          htmlFor='email-register-input'>
          Correo electrónico
        </label>
        <input
          id='email-register-input'
          className='email-register'
          type='text'
          placeholder={`${
            invoke === 'teamregister'
              ? teamRegisterData()[2]
              : 'Correo Electronico'
          }`}
          autoComplete='off'
          defaultValue={`${
            invoke === 'teamregister' ? teamRegisterData()[2] : ''
          }`}
          style={{ display: invoke === 'teamregister' ? 'none' : 'block' }}
          onMouseEnter={() => {
            document.getElementById(
              'email-register-input'
            ).style.borderBottom = `1px solid rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`;
          }}
          onMouseLeave={() => {
            document.getElementById('email-register-input').style.borderBottom =
              '1px solid #ffffff';
          }}
        />
        <label
          id='label-email-register'
          className='label-email-register'
          style={{ display: invoke === 'teamregister' ? 'none' : 'block' }}
          htmlFor='email-register-input-confirm'>
          Confirma tu correo electrónico
        </label>
        <input
          id='email-register-input-confirm'
          className='email-register'
          type='text'
          placeholder={`${
            invoke === 'teamregister'
              ? teamRegisterData()[2]
              : 'Confirma tu email'
          }`}
          autoComplete='off'
          defaultValue={`${
            invoke === 'teamregister' ? teamRegisterData()[2] : ''
          }`}
          onChange={()=>{ 
            var mail = document.getElementById('email-register-input')
            var cMail = document.getElementById('email-register-input-confirm')
            function validMail(){
              cMail.style.outline = "1px solid green" ;
              cMail.style.border ="none"
              mail.style.outline = "1px solid green" ;
              mail.style.border ="none"
            }
            function invalidMail(){
              cMail.style.outline = "1px solid red";
              cMail.style.border ="none"
              mail.style.outline = "1px solid red"
              mail.style.border ="none"
            }
            mail.value.trim().toLowerCase() ===  cMail.value.trim().toLowerCase() ? validMail() : invalidMail() 
            mail.value.trim().toLowerCase() ===  cMail.value.trim().toLowerCase() ? validMail() : invalidMail()
          }}
          style={{ display: invoke === 'teamregister' ? 'none' : 'block' }}
          onMouseEnter={() => {
            document.getElementById(
              'email-register-input'
            ).style.borderBottom = `1px solid rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`;
          }}
          onMouseLeave={() => {
            document.getElementById('email-register-input').style.borderBottom =
              '1px solid #ffffff';
          }}
        />
        <label
          id='label-date-register'
          className='label-date-register'
          htmlFor='email-register-input'>
          Fecha de nacimiento
        </label>
        <input
          id='date-register-input'
          className='date-register'
          type='date'
          defaultValue='01/01/2000'
          style={{ color: 'rgba(130, 134, 153, 0.35)' }}
          onChange={() => {
            event.target.style.color = '#ffffff';
            var userDate = event.target.value.split('-');
            var isUnder16 = moment()
              .subtract(16, 'years')
              .format('YYYY-MM-DD')
              .split('-');
            if (userDate[0] >= 1920) {
              var tutorData = document.getElementById('tutor-data');
              setTimeout(function () {
                if (isUnder16[0] > userDate[0]) {
                  tutorData.style.display = 'none';
                }
                if (isUnder16[0] === userDate[0]) {
                  if (isUnder16[1] > userDate[1]) {
                    tutorData.style.display = 'none';
                  }
                  if (isUnder16[1] === userDate[1]) {
                    if (isUnder16[2] > userDate[2]) {
                      tutorData.style.display = 'none';
                      alert('aqui');
                    }
                    if (isUnder16[2] === userDate[2]) {
                      tutorData.style.display = 'none';
                    }
                    if (isUnder16[2] < userDate[2]) {
                      tutorData.style.display = 'block';
                    }
                  }
                  if (isUnder16[1] < userDate[1]) {
                    tutorData.style.display = 'block';
                  }
                }
                if (isUnder16[0] < userDate[0]) {
                  tutorData.style.display = 'block';
                }
              }, 1000);
            }
          }}
          max={'2005-01-01'}
          min={'1920-01-01'}
          onMouseEnter={() => {
            document.getElementById(
              'date-register-input'
            ).style.borderBottom = `1px solid rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`;
          }}
          onMouseLeave={() => {
            document.getElementById('date-register-input').style.borderBottom =
              '1px solid #ffffff';
          }}
          placeholder='Fecha de nacimiento'
          autoComplete='off'
        />
        <div
          id='tutor-data'
          className='tutor-data animatedO opacity'
          style={{ display: 'none' }}>
          <label
            id='label-tutor-name-register'
            className='label-name-register'
            htmlFor='name-register-input'>
            Nombre completo de el padre, la madre o tutor
          </label>
          <input
            id='name-tutor-register-input'
            className='name-register'
            type='text'
            placeholder='Nombre y apellido (padre madre o tutor)'
            autoComplete='off'
            onMouseEnter={() => {
              document.getElementById(
                'name-tutor-register-input'
              ).style.borderBottom = `1px solid rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`;
            }}
            onMouseLeave={() => {
              document.getElementById(
                'name-tutor-register-input'
              ).style.borderBottom = '1px solid #ffffff';
            }}
          />
          <label
            id='label-tutor-date-register'
            className='label-date-register'
            htmlFor='document-tutor-input'>
            Número de documento de el padre la madre o tutor
          </label>
          <input
            id='document-tutor-input'
            className='document-input'
            type='number'
            placeholder='Documento (padre madre o tutor)'
            autoComplete='off'
            min='1200000'
            max='20000000'
            onMouseEnter={() => {
              document.getElementById(
                'document-tutor-input'
              ).style.borderBottom = `1px solid rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`;
            }}
            onMouseLeave={() => {
              document.getElementById(
                'document-tutor-input'
              ).style.borderBottom = '1px solid #ffffff';
            }}
          />
          <label id='tutor-auth' className='tutor-auth'>
            Una vez enviado el formulario el representante acepta la
            participacion del menor a su cargo en nuestros torneos. Bienvenidos.{' '}
          </label>
        </div>
        <label
          id='label-date-register'
          className='label-date-register'
          htmlFor='document-input'>
          Número de documento
        </label>
        <input
          id='document-input'
          className='document-input'
          type='number'
          placeholder='Documento del jugador'
          autoComplete='off'
          min='1200000'
          max='20000000'
          onMouseEnter={() => {
            document.getElementById(
              'document-input'
            ).style.borderBottom = `1px solid rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`;
          }}
          onMouseLeave={() => {
            document.getElementById('document-input').style.borderBottom =
              '1px solid #ffffff';
          }}
        />
        <label
          id='label-city-register'
          className='label-city-register'
          htmlFor='city-input'>
          Municipio / Comuna
        </label>
        <input
          id='city-register-input'
          className='city-register'
          type='text'
          placeholder='Ingrese su ciudad'
          onMouseEnter={() => {
            document.getElementById(
              'city-register-input'
            ).style.borderBottom = `1px solid rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`;
          }}
          onMouseLeave={() => {
            document.getElementById('city-register-input').style.borderBottom =
              '1px solid #ffffff';
          }}
        />
        <label
          id='label-password-register'
          className='label-password-register'
          htmlFor='password-register-input'>
          Contraseña
        </label>
        <input
          id='password-register-input'
          className='password-register'
          type='password'
          placeholder='Ingrese su contraseña'
          autoComplete='off'
          onMouseEnter={() => {
            document.getElementById(
              'password-register-input'
            ).style.borderBottom = `1px solid rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`;
          }}
          onMouseLeave={() => {
            document.getElementById(
              'password-register-input'
            ).style.borderBottom = '1px solid #ffffff';
          }}
        />
        <label
          id='label-passwordconfirm-register'
          className='label-passwordconfirm-register'
          htmlFor='passwordconfirm-register-input'>
          Confirmar contraseña
        </label>
        <input
          id='passwordconfirm-register-input'
          className='passwordconfirm-register'
          type='password'
          placeholder='Confime su contraseña'
          autoComplete='off'
          onMouseEnter={() => {
            document.getElementById(
              'passwordconfirm-register-input'
            ).style.borderBottom = `1px solid rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`;
          }}
          onMouseLeave={() => {
            document.getElementById(
              'passwordconfirm-register-input'
            ).style.borderBottom = '1px solid #ffffff';
          }}
        />

        <label id='label-policy-register' className='label-policy-register'>
          Al registrarse usted acepta nuestros{' '}
          <a
            onClick={() =>
              window.open(
                'https://www.plataformaesports.com/#/terms-and-politics',
                'Diseño Web',
                'width=300, height=200'
              )
            }>
            terminos y politicas de uso
          </a>
        </label>
        <button
          id='register-submit'
          className='register-submit'
          type='submit'
          onClick={() => localRegister()}
          style={{
            backgroundColor: `rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`,
            border: `2px solid rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`,
          }}>
          Registrarse
        </button>
      </form>
    </div>
  );
}
function recovery(loginState, mainColor) {
  return (
    <div
      id='recovery-box'
      className='recovery-box opacity animatedO'
      style={{ display: 'none' }}>
      {/*AQUI COMIENZA LOGIN CONTENT */}
      <label id='recovery-tittle' className='recovery-tittle'>
        Recuperar contraseña
      </label>
      <label id='recovery-condition' className='recovery-condition'>
        Al realizar el cambio de contraseña debe recordar que no podra cambiarla
        nuevamente por las siguientes 72 horas luego de culminar el proceso.
      </label>
      <form id='form-recovery' className='form-recovery'>
        {/* EMAIL INPUT */}
        <label
          id='label-recovery-email'
          className='label-recovery-email'
          htmlFor='email-recovery-input'>
          Correo Electrónico
        </label>
        <input
          id='email-recovery-input'
          className='email-recovery-input'
          type='email'
          placeholder='Ingrese su correo electrónico'
          onMouseEnter={() => {
            document.getElementById(
              'email-local-input'
            ).style.borderBottom = `1px solid rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`;
          }}
          onMouseLeave={() => {
            document.getElementById('email-recovery-input').style.borderBottom =
              '1px solid #ffffff';
          }}
        />
        {/* PASWORD INPUT */}
        <label
          id='label-recovery-password'
          className='label-recovery-password'
          htmlFor='password-recovery-input'>
          Nueva contraseña
        </label>
        <input
          id='password-recovery-input'
          className='password-recovery-input'
          type='password'
          placeholder='Ingresa su password'
          onMouseEnter={() => {
            document.getElementById(
              'password-local-input'
            ).style.borderBottom = `1px solid rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`;
          }}
          onMouseLeave={() => {
            document.getElementById(
              'password-recovery-input'
            ).style.borderBottom = '1px solid #ffffff';
          }}
          //error={}//errors.password
        />
        {/* PASWORD INPUT 2*/}
        <label
          id='label-recovery-password-2-confirm'
          className='label-recovery-password-2-confirm'
          htmlFor='password-recovery-input-2-confirm'>
          Confirma la nueva contraseña
        </label>
        <input
          id='password-recovery-input-2-confirm'
          className='password-recovery-input-2-confirm'
          type='password'
          placeholder='Ingresa su password'
          onMouseEnter={() => {
            document.getElementById(
              'password-local-input'
            ).style.borderBottom = `1px solid rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`;
          }}
          onMouseLeave={() => {
            document.getElementById(
              'password-recovery-input-2-confirm'
            ).style.borderBottom = '1px solid #ffffff';
          }}
        />
        {/*<spam id='red-text-password-l' className='red-text-password-l'></spam>*/}
        <button
          id='submit-recovery'
          className='submit-recovery'
          type='submit'
          onClick={
            () =>
              recoveryPassword(
                document.getElementById('email-recovery-input').value,
                document.getElementById('password-recovery-input').value,
                document.getElementById('password-recovery-input-2-confirm')
                  .value,
                loginState
              )
            /*fetch*/
          }
          style={{
            backgroundColor: `rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`,
          }}>
          VALIDAR
        </button>
      </form>
    </div>
  );
}
function loginButtonDisplay(navigation, mainColor) {
  function loginButton() {
    if (localStorage.userData) {
      return (
        <button
          id='profile-button'
          className='modal-trigger tooltipped  login-button highGradeButton'
          data-tooltip='Mira tu perfil'
          style={{
            boxShadow: `0 0 50px 0 rgba(${mainColor.red}, ${mainColor.green}, ${mainColor.blue}, 0.25)`,
            border: ` solid 2px rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`,
          }}
          onMouseOver={() => {
            event.target.style.backgroundColor = `rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue}`;
          }}
          onMouseLeave={() => {
            event.target.style.backgroundColor = `rgba(${mainColor.red}, ${mainColor.green}, ${mainColor.blue}, 0`;
          }}
          onClick={() => (location.href = '/#/perfil')}>
          Perfil
        </button>
      );
    } else {
      return (
        <button
          id='plataformaesports-singIn-button'
          data-target='modal1'
          className='modal-trigger tooltipped login-button lowGradeButton'
          data-tooltip='Iniciar sesión'>
          Ingresa
        </button>
      );
    }
  }
  if (navigation === 'Cargando') {
    <p title='...'>...</p>;
  } else {
    return loginButton();
  }
}
function cleanAndSafe() {
  const email = JSON.parse(localStorage.userData).email;
  const IDP = JSON.parse(localStorage.userData)._id;

  fetch(`users/cleanInfo/${IDP}/${email}`)
    .then((res) => res.json())
    .then((data) => d);

  localStorage.clear();
  location.reload();
}
function validationModal(localValidation, mainColor) {
  if (localStorage.userData) {
    var userData = JSON.parse(localStorage.userData);
  }
  return (
    <div
      id='validation-box'
      className='validation-box  opacity animatedO'
      style={{ display: 'none' }}>
      {/*AQUI COMIENZA LOGIN CONTENT */}
      <label id='validation-tittle' className='validation-tittle'>
        ¡Sólo un paso más!
      </label>
      <form id='form-validation' className='form-validation'>
        <label id='label-email-token' className='label-email-token'>
          Un código de validación fué enviado a su email{' '}
          {localStorage.userData ? userData.email : ''}
        </label>
        <label
          id='label-validation-token'
          className='label-validation-token'
          htmlFor='validation-token-input'>
          Código de validación
        </label>
        <input
          id='validation-token-input'
          className='validation-token-input'
          type='text'
          placeholder='Coloque aqui su codigo de validación'
          style={{
            border: `1px solid rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`,
          }}
          onMouseEnter={() => {
            document.getElementById(
              'passwordconfirm-register-input'
            ).style.borderBottom = `1px solid rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`;
          }}
          onMouseLeave={() => {
            document.getElementById(
              'passwordconfirm-register-input'
            ).style.borderBottom = '1px solid #ffffff';
          }}
        />
        <button
          id='validate-submit'
          className='validate-submit'
          onClick={() => localValidation()}
          style={{
            backgroundColor: `rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`,
          }}>
          Validar
        </button>
        <label
          style={{
            color: `rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`,
          }}
          id='clearRegister'
          className='clearRegister'
          onClick={() => cleanAndSafe()}>
          Comenzar de nuevo.
        </label>
      </form>
    </div>
  );
}
function updating() {
  return (
    <div
      id='updating-box'
      className='updating-box  opacity animatedO'
      style={{ display: 'none' }}>
      {/*AQUI COMIENZA LOGIN CONTENT */}
      <img
        id='loading-img-updating-box'
        className='loading-img'
        src='https://res.cloudinary.com/versus/image/upload/v1585185745/Statics_images/xxpauscz8misoyrhkjis.gif'></img>
    </div>
  );
}
function congrats() {
  return (
    <div
      id='congrats-box'
      className='congrats-box  opacity animatedO'
      style={{ display: 'none' }}>
      {/*AQUI COMIENZA LOGIN CONTENT */}
      <img
        id='congrats-img'
        className='congrats-img'
        src='../../../media/assets/elipse-1.svg'></img>
      <label id='congrats-tittle' className='congrats-tittle'>
        ¡Registro Exitoso!
      </label>
    </div>
  );
}
const login = {
  loginButtonDisplay: loginButtonDisplay,
  registerBeta: registerBeta,
  loginBeta: loginBeta,
  logOut: logOut,
  validationModal: validationModal,
  updating: updating,
  congrats: congrats,
  teamRegisterData: teamRegisterData,
  recovery: recovery,
};

export default login;
