import React from 'react';
import login from '../login/loginFunctions';
//import PassportProfile from '../../components/user/passportProfile'
//import CardList from '../../components/user/passport-cards/cardList'

function classicTemplate(game) {
  return (
    <div
      id={`${game}-playLanding-wrapper`}
      className={`${game}-playLanding-wrapper`}>
      <div className='navigation-bar' id='nav-bar-home'>
        <a className='set-theme' id='theme' onClick={() => this.viewTheme()}>
          <i className='material-icons'>brightness_4</i>
        </a>
        <a className='home' id='home' onClick={() => (location.href = '#/')}>
          <i className='material-icons'>home</i>
        </a>
        <div
          id='nav-tournament-button-wrapper'
          className='t-button-wrapper'></div>
        {login.loginButtonDisplay()}
        <div id='modal1' className='modal loginModal modal-fixed-footer'>
          <div id='modal-content' className='modal-content'>
            <div id='login-wrapper'></div>
            {login.loginBeta()}
            {login.registerBeta()}
            <a className='modal-close waves-effect waves-green btn-flat'>
              Close
            </a>
          </div>
        </div>
      </div>
      <div id='left-div' className='left-div'></div>
      <div
        className='content-wrapper'
        id='plataformaesports-wrapper'
        name='content-wrapper'>
        <div
          className='content-wrapper-1'
          id='plataformaesports-1'
          name='content'>
          <div id={`brand-wrapper-on`}>
            <div
              id='sponsor-box'
              style={{
                background:
                  "url('https://res.cloudinary.com/versus/image/upload/v1588709510/Statics_images/ubkldq6qzneioaucddlz.jpg')",
                backgroundPosition: 'center',
              }}>
              <h1 id='sponsor-tittle' className='animat'>
                PARTNER TOURNAMENT
              </h1>
              <p title='Welcome for sponsors' id='sponsor-text'>
                Welcome! This is your perfect place for play tournaments of
                Fifa, it's time to show what you can achieve while winning many
                awards with your friends.
              </p>
              <h4 id='sponsor-slogan'>IMPROVE YOURSELF</h4>
              <a id='sponsor-join' className='btn'>
                JOIN
              </a>
            </div>
          </div>
          <div id='box-content' className='box-content'>
            <div id='slides-box-on'></div>
          </div>
        </div>
      </div>
      <div id='rigth-div' className='rigth-div'></div>
    </div>
  );
}

const htmlTemplates = {
  classicTemplate: classicTemplate,
};

export default htmlTemplates;
