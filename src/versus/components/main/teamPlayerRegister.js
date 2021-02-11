import React, { Component, useContext, useState } from 'react';
import login from '../user/login/loginFunctions';

// STYLE IMPORTS
import '../../styles/main/teamPlayerRegister.scss';
import { Redirect } from 'react-router-dom';

var mainColor = {
  red: 48,
  green: 129,
  blue: 214,
};

class TeamPlayerRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.localRegister = this.localRegister.bind(this);
  }
  localRegister() {
    var nameR = document.getElementById('name-register-input').value;
    var nicknameR = document.getElementById('nickname-input').value;
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
    var IDteam = location.href.split('/')[5].split('-')[0];
    async function sendMessage(json) {
      var messsageType = 'approvedNewAccount';
      var email = json.email.trim();
      await fetch(`api/games/sendMessage/${messsageType}/${email}`)
        .then((res) => res.json())
        .then((jsonMess) => {
          if (jsonMess.alert) {
            //location.href = `www.plataformaesports.com/#/${}`
          }
        });
    }
    async function saveRegister() {
      console.log('pasando por registered click');
      var customer = login.teamRegisterData()[0];
      if (passwordR === passwordConfR) {
        const registerInfo = await fetch(`users/betaregister/${emailR}/true`, {
          method: 'POST',
          body: JSON.stringify({
            nameR,
            nicknameR,
            emailR,
            passwordR,
            passwordConfR,
            documentR,
            direccionR,
            dateR,
            nameTutorR,
            documentTutorR,
            customer,
            IDteam,
          }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
          .then((res) => res.json())
          .then((json) => {
            console.log('PASANDO sendMessage');
            if (json.alert) {
              //AmbaMetropolitanos.prototype.loginState('register', true);
              alert(json.alert);
            } else {
              localLoginReload(json);
              location.href = `/#/${login.teamRegisterData()[1]}`;
            }
          });
        function localLoginReload(json) {
          localStorage.clear();
          sessionStorage.clear();
          console.log(json, 'EL Json DE local login reload ');
          localStorage.setItem('name', json.name);
          localStorage.setItem('picture', json.send.picture);
          localStorage.setItem('isValidate', json.isValidate);
          localStorage.setItem('provider', json.provider);
          localStorage.setItem('language', json.language);
          sessionStorage.setItem('userSession', json.send);
          localStorage.setItem('userData', JSON.stringify(json.send));
          //AmbaMetropolitanos.prototype.loginState('validation');
        }
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
    }
  }
  // Mount Component
  componentDidMount() {
    localStorage.clear();
    var isTrueInfo = location.href.split('/')[5].split('-')[3];
    if (isTrueInfo === 'TrueInfo') {
      var customerUrl = location.href.split('/')[5].split('-')[1];
      async function sendAccept() {
        var teamId = location.href.split('/')[5].split('-')[0];
        var userEmail = location.href.split('/')[5].split('-')[2];
        console.log(customerUrl)
        await fetch(`teams/userAccept/${teamId}/${userEmail}`)
          .then((res) => res.json())
          .then((json) => {
            if (json.alert) {
              alert(json.alert);
            } else {
              location.href = `/#/${customerUrl}`;
            }
          });
      }
      sendAccept();
    }
  }
  componentWillUnmount() {}
  render() {
    return (
      <div id='responsive-TeamPlayerRegister'>
        <div
          className='TeamPlayerRegister-wrapper'
          id='plataformaesports-TeamPlayerRegister'>
          {login.registerBeta(this.localRegister, mainColor, 'teamregister')}
        </div>
      </div>
    );
  }
}

export default TeamPlayerRegister;
