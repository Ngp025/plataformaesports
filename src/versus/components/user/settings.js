// React imports
import React, { Component } from 'react';
import htmlTemplates from '../../methods/html/modules/community-module/player/profileTemplates';

// SCSS imports
import '../../styles/main/user/profileStyles.scss';
class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: '',
      summonerLevel: '0',
      playerImage:
        'https://res.cloudinary.com/versus/image/upload/v1585185745/Statics_images/xxpauscz8misoyrhkjis.gif',
      settingsNav: 'profile',
    };
    this.settingsNavHandler = this.settingsNavHandler.bind(this);
  }
  async userInfo() {
    const IDP = JSON.parse(localStorage.userData)._id;
    const userJson = await fetch(`users/profile/${IDP}`)
      .then((res) => res.json())
      .then((json) =>
        json.alert ? alert(json.alert) : this.setState({ userInfo: json })
      );
    //this.getInfoLol();
  }
  async getInfoLol() {
    const server = 'LA2';
    if (this.state.userInfo != '') {
      var nickname = '';
      this.state.userInfo.nickname === undefined
        ? (nickname = this.state.userInfo.name) //hacer que el escriba su nombre
        : (nickname = this.state.userInfo.nickname);
      const response = await fetch(
        `/api/games/lol/${server}/${nickname}/${this.state.userInfo.email}`
      );
      const json = await response.json();
      if (json.alert) {
        alert(json.alert);
      } else {
        this.setState({
          summonerLevel: json.summonerLevel,
          playerImage: `http://ddragon.leagueoflegends.com/cdn/10.11.1/img/profileicon/${json.profileIconId}.png`,
        });
      }
    }
  }
  // NAVIGATION HANDLERS
  settingsNavHandler(newNav) {
    this.setState({
      settingsNav: newNav,
    });
  }
  // Team Functions
  editTeamPlayer(inputsData) {
    console.log(inputsData);
  }
  deleteTeamPlayer(inputsData) {
    alert(inputsData);
  }
  createTeam() {
    alert('Codigo de busqueda #FF101');
  }
  teamPacketFunction() {
    var teamFunction = {
      editPlayer: Settings.prototype.editTeamPlayer,
      deleteTeamPlayer: Settings.prototype.deleteTeamPlayer,
      createTeam: Settings.prototype.createTeam,
    };
    return teamFunction;
  }
  // Right Menu Functions
  componentDidMount() {
    this.userInfo();
    // Materialice Modal init

    // Materialice Select
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('select');
      var instances = M.FormSelect.init(elems, 1);
    });
  }
  componentWillUnmount() {
    // Materialice Modal init
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.modal');
      var instances = M.Modal.init(elems, {
        opacity: 0.7,
        endingTop: '14%',
        startingTop: '7%',
      });
    });
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
    location.reload();
  }
  render() {
    return (
      <div id='profile-main-wrapper'>
        <div id='profile-wrapper'>
          <div id='nav-bar' className='nav-bar'>
            {/*Comienzo de Navigation Bar */}
            <div id='nav-bar-content' className='nav-bar-content'>
              <h2 id='profile-tittle' className='profile-tittle'>
                Configuración
              </h2>
              <i
                id='back-button'
                className='back-button material-icons'
                onClick={() => window.history.back()}>
                arrow_back
              </i>
            </div>
          </div>
          {htmlTemplates.classicTemplate(
            this.state.playerImage,
            this.state.summonerLevel,
            this.state.userInfo,
            this.state.settingsNav,
            this.settingsNavHandler,
            this.teamPacketFunction
          )}
        </div>
      </div>
    );
  }
}

export default Settings;
