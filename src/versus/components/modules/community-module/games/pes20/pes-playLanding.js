// Main Imports
import React, { Component } from 'react';

//Styles
import '../../../styles/games/pes20/pes-playLanding.scss';
import '../../../styles/main/animations.scss';

// Methods
import tournamentsRender from '../../../methods/tournamentSlidesRender.js';
import htmlTemplates from '../../../methods/html/playLandingTemplates.js';

// Local declaration
var game = 'pes20';
function initialWidth() {
  return 3;
}

class PesPlayLanding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slidesToRender: initialWidth(),
      tInfo: {
        all: [],
        others: {},
        tRegistered: {},
      },
    };
  }
  // Tournaments Request
  async lolTournamentsAll() {
    if (localStorage.userData) {
      var IDU = JSON.parse(localStorage.userData)._id;
    } else {
      var IDU = 'sing-out';
    }
    e(localStorage.userData)._id === undefined
      ? 'sing-out'
      : JSON.parse(localStorage.userData)._id;

    // await fetch();
    //const json = await response.json()
    //      await response.json()
    var game = location.href.split('/')[4];
    //console.log(IDU)
    var tournamentData = await fetch(
      `/api/tournaments/allForUser/${IDU}/${game}`
    );
    await tournamentData.json().then((json) => this.stateSetter(json));
    //.then(res => console.log(res))
    //.then(() => this.preTournamentSlidesRender('load'));  //COLOCAR IMAGENES DEFAULT MIENTRAS SE HACE EL FETCH
  }
  // Render Functions
  stateSetter(json) {
    //console.log(json, ' JSON JSON JSON')
    this.setState({ tInfo: { all: json.all, tRegistered: json.registered } });
    this.preTournamentSlidesRender('load');
    this.preTournamentEnrolled();
  }
  //-- Enrolled Tournaments Render
  preTournamentEnrolled() {
    var tInfoArray = this.state.tInfo.tRegistered;
    var boxId = 'nav-tournament-button-wrapper';
    //console.log( tInfoArray, ' PRE TOURNAMENT OBJ')
    for (var prop in tInfoArray) {
      //console.log(prop, ' PRETOURNAMENTENROLLED PROP')
      tournamentsRender.userTournamentRegisters(
        tInfoArray[`${prop}`],
        prop,
        boxId
      );
    }
  }
  //-- Slides Render
  preTournamentSlidesRender(invoked) {
    var tInfoArray = this.state.tInfo.all;
    var boxId = 'slides-box-on';
    var str = this.state.slidesToRender;
    for (var prop in tInfoArray) {
      // console.log(prop, ' SLIDE RENDER PROP')
      var teamsTittleArray = prop.split('_');
      if (teamsTittleArray[2]) {
        var teamsTittleString = `Tournaments for ${teamsTittleArray[1]} and ${teamsTittleArray[2]} teams`;
      } else {
        var teamsTittleString = `${teamsTittleArray[1]} tournaments`;
      }
      //console.log(tInfoArray[`${prop}`], ' PRE TOURNAMENT SLIDES RENDER')
      tournamentsRender.tournamentSlidesRender(
        tInfoArray[`${prop}`],
        prop,
        teamsTittleString,
        invoked,
        boxId,
        str,
        game
      );

      /*console.log( tInfoArray ,'tInfoArray',
      prop, 'prop',
      teamsTittleArray, 'teamsTittleArray',
      teamsTittleString,'teamTittleString', 
      tInfoArray[`${prop}`], 'envio a tournamentSlidesRender(tInfo)',
      '** preTournamentSlides Render Function 1 **' ) */
    }
    var tInfoArray2 = this.state.tInfo.others;
    for (var prop in tInfoArray2) {
      var teamsTittleArray = prop.split('_');

      if (teamsTittleArray[2]) {
        var teamsTittleString = `Tournaments for ${teamsTittleArray[1]} and ${teamsTittleArray[2]} teams`;
      } else {
        var teamsTittleString = `${teamsTittleArray[1]} tournaments`;
      }
      tournamentsRender.tournamentSlidesRender(
        tInfoArray[`${prop}`],
        prop,
        teamsTittleString,
        invoked,
        boxId,
        str,
        game
      );
    }
  }
  // Theme Function
  viewTheme() {
    var homeCSS = getComputedStyle(document.documentElement);
    document.documentElement.style.setProperty('--themeColor', '#111217');
    document.documentElement.style.setProperty('--marginDivBgLeft', '#111217');
    document.documentElement.style.setProperty('--marginDivBgRigth', '#111217');
    document.documentElement.style.setProperty('--navBarDivition', '#ab3030');
    document.documentElement.style.setProperty('--fontColor', 'white');
    var leftArrow = document.getElementById(
      'nav-link1-theme1-on-tournaments_All'
    );
    var rightArrow = document.getElementById(
      'nav-link2-theme1-on-tournaments_All'
    );
  }
  // Component Did Mount
  componentDidMount() {
    this.lolTournamentsAll();
    // Resize Listener
    {
      /*  window.addEventListener('resize', function(){
        window.screen.width > 767 
        ? window.screen.width > 1023
          ? window.screen.width > 1439 
              ? window.screen.width > 1919 
                ? window.screen.width > 2239 
                  ? Playlanding.prototype.setSlides(5) : Playlanding.prototype.setSlides(4)
                : Playlanding.prototype.setSlides(4)
              : Playlanding.prototype.setSlides(3)
            : Playlanding.prototype.setSlides(2)
          : Playlanding.prototype.setSlides(1)
        }
    )*/
    }
    //localStorage.clear()
    //sessionStorage.clear()

    // Materialice Modal Init
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.loginModal');
      var instances = M.Modal.init(elems);
    });

    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.globalLocation');
      var instances = M.Modal.init(elems);
    });

    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.ourTeams');
      var instances = M.Modal.init(elems);
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
  }
  componentWillUnmount() {
    document.removeEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.loginModal');
      var instances = M.Modal.init(elems);
    });

    document.removeEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.globalLocation');
      var instances = M.Modal.init(elems);
    });

    document.removeEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.ourTeams');
      var instances = M.Modal.init(elems);
    });

    // Materialice Tooltip init
    document.removeEventListener('mouseover', function () {
      var elems = document.querySelectorAll('.tooltipped');
      var options = 0;
      var instances = M.Tooltip.init(elems, options);
    });

    // Materialice Select
    document.removeEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('select');
      var instances = M.FormSelect.init(elems, 1);
    });
    location.reload();
  }

  render() {
    return (
      <div id={`${game}-main-wrapper`}>
        {htmlTemplates.classicTemplate(game)}
      </div>
    );
  }
}

export default PesPlayLanding;
