// React imports
import React, { Component } from 'react';
import organizerClock from '../../../../vs-frames/organizerClock';
// Moment Import

// Locals global Vars
if (location.href.split('#').length > 1) {
  var game = location.href.split('#')[1].split('/')[2];
}
var relatedDaysArr = [];
var isEditing = false;
// SCSS imports

import '../../../../../styles/games/_game-template/tournament-panel.scss';

// Socket IO  imports
//import io from 'socket.io-client';

// Local declarations
//import userState from '../index';

class TournamentPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Admin validation
      validAdmin: false,
      // Navigation State
      navigation: 'organizer-panel',
      dayInfo: '',
      autoSave: false,
      createClose: '',
      // Tournaments Array
      watchArr: [],
      // Tournament Info
      IDO: sessionStorage._id || '',
      pe2: [],
      pe4: [],
      pe8: [],
      pe16: [],
      pe32: [],
      pe64: [],
      pe128: [],
      pe256: [],
      pe512: [],
      pe1024: [],
      cMax: '',
      chatMessage: [],
      checked: [],
      createdAt: '',
      weeksDuration: '',
      gMax: '',
      game: 'fifa20',
      iTournament: 0,
      initial: [],
      mid: [],
      final: [],
      isFinished: false,
      lastInstance: false,
      ronda: '',
      server: '',
      tAward: '',
      tBracket: [],
      tDate: '',
      tMain: [],
      tPlataform: '',
      tStart: '',
      tournamentName: '',
      updatedAt: '',
      vipMessage: '',
      winners: {
        eighth: '',
        seventh: '',
        sixth: '',
        fifth: '',
        fourth: '',
        three: '',
        second: '',
        first: '',
      },
      initialsRelatedsDays: [],
      midsRelatedsDays: [],
      __v: 0,
      _id: '',
    };
    TournamentPanel.prototype.uploadInstances = TournamentPanel.prototype.uploadInstances.bind(
      this
    );
    TournamentPanel.prototype.organizerPanel = TournamentPanel.prototype.organizerPanel.bind(
      this
    );
    TournamentPanel.prototype.navigationHandler = TournamentPanel.prototype.navigationHandler.bind(
      this
    );
    TournamentPanel.prototype.organizerButtonsHandler = TournamentPanel.prototype.organizerButtonsHandler.bind(
      this
    );
    TournamentPanel.prototype.orgForm = TournamentPanel.prototype.orgForm.bind(
      this
    );
    TournamentPanel.prototype.saveSingleInstance = TournamentPanel.prototype.saveSingleInstance.bind(
      this
    );
    TournamentPanel.prototype.unassignedDays = TournamentPanel.prototype.unassignedDays.bind(
      this
    );
    TournamentPanel.prototype.assignedDays = TournamentPanel.prototype.assignedDays.bind(
      this
    );
    TournamentPanel.prototype.updateClickedDay = TournamentPanel.prototype.updateClickedDay.bind(
      this
    );
    TournamentPanel.prototype.loadTournaments = TournamentPanel.prototype.loadTournaments.bind(
      this
    );
    TournamentPanel.prototype.deleteSingleInstance = TournamentPanel.prototype.deleteSingleInstance.bind(
      this
    );
  }

  // DATA BASE FUNCTIONS, LOAD AND UPLOAD
  async organizerTournaments() {
    if (location.href.split('#').length > 1) {
      var IDT = location.href.split('#')[1].split('/')[3];
    }
    // console.log(IDT)

    const response = await fetch(
      `/api/organizer/tournament-panel/${IDT}/false`
    );
    const json = await response.json();
    // console.log(json, "AQUI JSON")
    this.loadTournaments(json.tournamentData);
    //// console.log(json, 'tMain posee toda la informacion de los jugadores inscriptos');
    //// console.log(json, '<----- json con elementos del torneo')
  }
  loadTournaments(json) {
    // console.log("Load Tournament")
    var tInfo = json;
    // console.log(tInfo)
    this.setState({
      navigation: 'tournament-panel',
      createClose: tInfo.createClosed,
      //IDO: tInfo.IDO,
      dayInfo: '',
      pe2: tInfo.pe2,
      pe4: tInfo.pe4,
      pe8: tInfo.pe8,
      pe16: tInfo.pe16,
      pe32: tInfo.pe32,
      pe64: tInfo.pe64,
      pe128: tInfo.pe128,
      pe256: tInfo.pe256,
      pe512: tInfo.pe512,
      pe1024: tInfo.pe1024,
      cMax: tInfo.cMax,
      chatMessage: tInfo.chatMessage,
      checked: tInfo.checked,
      createdAt: tInfo.createdAt,
      weeksDuration: tInfo.weeksDuration,
      gMax: tInfo.gMax,
      game: tInfo.game,
      iTournament: tInfo.iTournament,
      initial: tInfo.initial,
      mid: tInfo.mid,
      final: tInfo.final,
      lastInstance: tInfo.lastInstance,
      isFinished: tInfo.isFinished,
      ronda: tInfo.ronda,
      server: tInfo.server,
      tAward: tInfo.tAward,
      tBracket: tInfo.tBracket,
      tDate: tInfo.tDate,
      tMain: tInfo.tMain,
      tPlataform: tInfo.tPlataform,
      tStart: tInfo.tStart,
      tournamentName: tInfo.tournamentName,
      updatedAt: tInfo.updatedAt,
      vipMessage: tInfo.vipMessage,
      winners: tInfo.winners,
      initialsRelatedsDays: tInfo.initialsRelatedsDays,
      midsRelatedsDays: tInfo.midsRelatedsDays,
      _id: tInfo._id,
      __v: tInfo.__v,
    });
  }
  async uploadInstances() {
    const {
      _id,
      IDO,
      initial,
      mid,
      final,
      initialsRelatedsDays,
      midsRelatedsDays,
    } = this.state;

    await fetch(`/api/organizer/uploadInstances/${_id}/${IDO}`, {
      method: 'POST',
      body: JSON.stringify({
        initial,
        mid,
        final,
        initialsRelatedsDays,
        midsRelatedsDays,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((json) => alert(json.alert));
  }
  // RENDER FUNCTIONS
  // PANEL FORM AND BUTTONS RENDER
  organizerPanel() {
    TournamentPanel.prototype.refreshButtonPanel();
    var initialDayInput = this.state.tDate.split('T')[0].split('-')[2];
    var initialMonthNumberInput = this.state.tDate.split('T')[0].split('-')[1];
    var weeksDurationInput = this.state.weeksDuration;
    var initialsRelatedsDays = this.state.initialsRelatedsDays;
    var midsRelatedsDays = this.state.midsRelatedsDays;

    let options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    var parseDate = organizerClock.whatTimeIsIt()._d.toString();
    var nameDay = parseDate.slice(0, 3);
    console.log(nameDay);
    switch (nameDay) {
      case 'Mon':
        var startDayFix = 0;
        break;
      case 'Tue':
        var startDayFix = 1;
        break;
      case 'Wed':
        var startDayFix = 2;
        break;
      case 'Thu':
        var startDayFix = 3;
        break;
      case 'Fri':
        var startDayFix = 4;
        break;
      case 'Sat':
        var startDayFix = 5;
        break;
      case 'Sun':
        var startDayFix = 6;
        break;
      default:
        var startDayFix = 0;
        break;
    }

    // Parse inputs
    var stateDayInfo = this.state.dayInfo;
    var initialMonthNumber =
      initialMonthNumberInput == 0
        ? initialMonthNumberInput
        : parseInt(initialMonthNumberInput);
    var initialDay =
      initialDayInput == 0 ? initialDayInput : parseInt(initialDayInput);
    var weeksDuration =
      weeksDurationInput == 0
        ? weeksDurationInput
        : parseInt(weeksDurationInput);
    if (initialDay > 0 && initialMonthNumber > 0 && weeksDuration > 0) {
      var tournamentInitial = this.state.initial;
      var tournamentMid = this.state.mid;
      var tournamentFinal = this.state.final;
      // Local Vars
      var organizerPanel = document.getElementById('organizer-buttons');

      var buttonsRender = [];
      var initialMonthString =
        initialMonthNumber.toString().length === 1
          ? `0${initialMonthNumber}`
          : initialMonthNumber.toString();
      var monthsToGenerate = Math.ceil(weeksDuration / 4) + 1;
      // Local methods
      function monthDays(month) {
        if (
          month === '04' ||
          month === '06' ||
          month === '09' ||
          month === '11'
        ) {
          return 30;
        } else {
          if (month === '02') {
            return 28;
          } else {
            return 31;
          }
        }
      }
      function nextMonth(actMonthNumber) {
        if (actMonthNumber >= 12) {
          var nextMonth =
            (actMonthNumber - 11).toString().length === 1
              ? `0${actMonthNumber - 11}`
              : (actMonthNumber - 11).toString();
          return nextMonth;
        } else if (actMonthNumber < 12) {
          var nextMonth =
            (actMonthNumber + 1).toString().length === 1
              ? `0${actMonthNumber + 1}`
              : (actMonthNumber + 1).toString();
          return nextMonth;
        }
      }
      function customDay(dayInfo) {
        var panelButton = document.createElement('div');
        panelButton.setAttribute('id', `${dayInfo.day}`);
        var relatedNextDays = [];
        if (stateDayInfo.day === dayInfo.day) {
          panelButton.setAttribute(
            'class',
            `panel-button ${dayInfo.instance}-userClicked itsClicked`
          );
        } else {
          panelButton.setAttribute('class', `panel-button ${dayInfo.instance}`);
        }

        panelButton.name = JSON.stringify(dayInfo);
        panelButton.value = dayInfo;
        panelButton.innerText = `${dayInfo.day}`;
        panelButton.addEventListener('click', () => {
          TournamentPanel.prototype.organizerButtonsHandler(
            dayInfo.day,
            dayInfo
          );
        });
        var buttonLabel = document.createElement('label');
        buttonLabel.setAttribute('class', 'button-label');

        switch (dayInfo.instance) {
          case 'mid':
            for (var i = 0; i < midsRelatedsDays.length; i++) {
              if (midsRelatedsDays[i].split('_')[0] === dayInfo.day) {
                relatedNextDays.push(midsRelatedsDays[i].split('_')[1]);
                buttonLabel.style.backgroundColor = '#497039';
              }
            }
            break;
          case 'initial':
            for (var i = 0; i < initialsRelatedsDays.length; i++) {
              if (initialsRelatedsDays[i].split('_')[0] === dayInfo.day) {
                relatedNextDays.push(initialsRelatedsDays[i].split('_')[1]);
                buttonLabel.style.backgroundColor = '#ffb74d';
              }
            }
            break;
        }

        buttonLabel.setAttribute('id', `button-label-${dayInfo.day}`);
        buttonLabel.innerText = relatedNextDays.toString();
        relatedNextDays[0] ? '' : (buttonLabel.style.display = 'none');

        panelButton.appendChild(buttonLabel);
        organizerPanel.appendChild(panelButton);
      }
      function createDayButton(i, month) {
        var panelButton = document.createElement('div');
        var completeDate =
          i.toString().length === 1
            ? `0${i}-${month}`
            : `${i.toString()}-${month}`;
        var emptyData = {
          day: completeDate,
          instance: 'none',
          lastInstance: false,
          winnersNeed: 1,
          tStart: '',
          winnersIDs: [],
          nextInstance: [],
          prevInstance: [],
        };
        panelButton.setAttribute('id', completeDate);
        if (stateDayInfo.day === completeDate) {
          panelButton.setAttribute(
            'class',
            'panel-button none-userClicked itsClicked'
          );
        } else {
          panelButton.setAttribute('class', 'panel-button none');
        }
        panelButton.value = emptyData;
        panelButton.innerText = completeDate;
        panelButton.addEventListener('click', () =>
          TournamentPanel.prototype.organizerButtonsHandler(
            completeDate,
            emptyData
          )
        );
        organizerPanel.appendChild(panelButton);
      }
      function createFixDayButton(i, month) {
        var panelButton = document.createElement('div');
        var completeDate =
          i.toString().length === 1
            ? `0${i}-${month}`
            : `${i.toString()}-${month}`;
        var emptyData = {
          day: completeDate,
          instance: 'none',
          lastInstance: false,
          winnersNeed: 1,
          tStart: '',
          lifes: 0,
          active: false,
          winnersIDs: [],
          nextInstance: [],
          prevInstance: [],
        };
        panelButton.setAttribute('id', completeDate);
        if (stateDayInfo.day === completeDate) {
          panelButton.setAttribute(
            'class',
            'panel-button none-userClicked itsClicked'
          );
        } else {
          panelButton.setAttribute('class', 'panel-button fix');
        }
        panelButton.value = emptyData;
        panelButton.innerText = completeDate;
        organizerPanel.appendChild(panelButton);
      }
      // Main Functionality
      function grid(gridNumber, dayFix) {
        if (dayFix) {
          var prevMonth = parseInt(nextMonth(initialMonthNumber)) - 2;
          var prevMonthString =
            prevMonth.toString().length === 1
              ? `0${prevMonth}`
              : prevMonth.toString();
          var prevMonthDays = monthDays(prevMonthString);
          // console.log(initialDay)
          // console.log(prevMonthDays)
          // console.log(dayFix)
          for (var i = 0; dayFix > i; i++) {
            if (initialDay - dayFix + i < 1) {
              var z = initialDay - dayFix + i;
              createFixDayButton(prevMonthDays + z, prevMonthString);
            } else {
              createFixDayButton(initialDay - dayFix + i, initialMonthString);
            }
          }
        }
        function renderMonth(startDay, monthString, monthDays) {
          var i = 0;
          while (buttonsRender.length < gridNumber) {
            if (startDay + i >= 1 && startDay + i < 10) {
              var dayToValidate = `0${startDay + i}-${monthString}`;
            } else {
              var dayToValidate = `${startDay + i}-${monthString}`;
            }
            var isCustomDay = [false];
            // Initial Matchs
            var s = 0;
            while (s < tournamentInitial.length) {
              var validationIni = tournamentInitial[s].day === dayToValidate;
              if (validationIni) {
                isCustomDay.pop();
                isCustomDay.push(true);
                customDay(tournamentInitial[s]);
              }
              s = s + 1;
            }
            // Mid Matchs
            var m = 0;
            while (m < tournamentMid.length) {
              var validationMid = tournamentMid[m].day === dayToValidate;
              if (validationMid) {
                isCustomDay.pop();
                isCustomDay.push(true);
                customDay(tournamentMid[m]);
              }
              m = m + 1;
            }
            // Finals Matchs
            var z = 0;
            while (z < tournamentFinal.length) {
              var validationFinal = tournamentFinal[z].day === dayToValidate;
              if (validationFinal) {
                isCustomDay.pop();
                isCustomDay.push(true);
                customDay(tournamentFinal[z]);
              }
              z = z + 1;
            }
            // Month Break
            if (startDay + i > monthDays) {
              break;
            }
            buttonsRender.push(i);
            // Is Custom Day Check.
            isCustomDay[0] ? '' : createDayButton(startDay + i, monthString);
            i++;
          }
        }
        for (var w = 0; w < monthsToGenerate; w++) {
          w === 0
            ? renderMonth(
                initialDay,
                nextMonth(initialMonthNumber + w - 1),
                monthDays(initialMonthString)
              )
            : renderMonth(
                1,
                nextMonth(initialMonthNumber + w - 1),
                monthDays(nextMonth(initialMonthNumber + w - 1))
              );
        }
      }
      // Function trigger
      var errArr = [];
      function validation() {
        errArr.push(
          'El numero de mes escogido es mayor a 12 o menor a 1, el numero de dia que escogio no existe, o es menor a 1, la cantidad de semanas maxima es 14 y el minimo es 1'
        );
        return initialMonthNumber > 12 || initialMonthNumber < 1
          ? false
          : initialDay > monthDays(initialMonthString) || initialDay < 1
          ? false
          : weeksDuration < 1 || weeksDuration > 14
          ? false
          : true;
      }
      startDayFix === 0
        ? grid(7 * weeksDuration)
        : grid(7 * weeksDuration, startDayFix);
    }
  }

  orgForm() {
    TournamentPanel.prototype.refreshFormPanel();
    // Local Vars
    var initial = this.state.initial;
    var mid = this.state.mid;
    var final = this.state.final;

    var clickedDayInfo = this.state.dayInfo;
    var clickedInstance = clickedDayInfo.instance;

    var organaizerForm = document.getElementById('organizer-form');
    var dayFormWrapper = document.getElementById('organizer-form-wrapper');
    dayFormWrapper
      ? (dayFormWrapper.class = `organizer-form-wrapper form-Animation-0 form-opacity-0 ${clickedDayInfo.instance}`)
      : '';

    var dayFormContent = document.createElement('div');
    dayFormContent.setAttribute('id', 'day-form-content');
    dayFormContent.setAttribute('class', 'form-content');

    // Clear Assign panel
    /*
		function clearAssignPanel(){
			setTimeout(
				function (){
					var assignDays = document.querySelectorAll('.single-assign-day')
					for(var i = 0; i < assignDays.length ; i++){
						var elem = assignDays[i]
						//// console.log(elem)
						elem.parentNode.removeChild(elem);
					}			
					},10
				)
			} */
    //clearAssignPanel();

    // Form Content

    function wellcome() {
      var welcomeContentLabel = document.createElement('label');
      welcomeContentLabel.setAttribute('id', 'form-content-label');
      welcomeContentLabel.setAttribute('class', 'content-tittle-label');
      welcomeContentLabel.innerText = 'Wellcome';
      dayFormContent.appendChild(welcomeContentLabel);
      dayFormWrapper.appendChild(dayFormContent);
    }
    function content(selectInit, updatingInstance) {
      function selectInit(elems) {
        var instances = M.FormSelect.init(elems, 0);
      }
      setTimeout(() => {
        selectInit(document.querySelectorAll('select'));
      }, 25);
      //// console.log(clickedDayInfo, '<----- ClickedDayInfo')
      
      // FORM DAY VALUE HIDDEN INPUT
      var dayFormValue = document.createElement('input');
      dayFormValue.setAttribute('id', 'day-form-value');
      dayFormValue.setAttribute('class', 'dayFormValue');
      dayFormValue.setAttribute('hidden', true);
      dayFormValue.setAttribute('name', JSON.stringify(clickedDayInfo));
      dayFormContent.appendChild(dayFormValue);
      // LABEL DAY FORM
      var formContentLabel = document.createElement('label');
      formContentLabel.setAttribute('id', 'form-content-label');
      formContentLabel.setAttribute('class', 'content-tittle-label');
      formContentLabel.innerText = clickedDayInfo.day;
      dayFormContent.appendChild(formContentLabel);
      // DAY INSTANCE SELECT ELEMENTS
      var dayInstanceDiv = document.createElement('div');
      dayInstanceDiv.setAttribute('id', 'day-instance-div');
      dayInstanceDiv.setAttribute('class', 'day-instance-div');
      dayFormContent.appendChild(dayInstanceDiv);

      var dayInstanceLabel = document.createElement('label');
      dayInstanceLabel.setAttribute('id', 'day-instance-div-label');
      dayInstanceLabel.setAttribute('class', 'day-instance-div-label');
      dayInstanceLabel.htmlFor = 'day-instance-div-select';
      dayInstanceLabel.innerText = 'Seleccione la instancia de este dia.';
      dayInstanceDiv.appendChild(dayInstanceLabel);

      function selectInstances(clickedInstance) {
        var instanceSelect = document.createElement('select');
        instanceSelect.id = 'day-instance-div-select';
        instanceSelect.class = 'day-instance-div-select';
        instanceSelect.disabled =
          clickedDayInfo.instance === 'none' ? false : true;
        dayInstanceDiv.onchange = () => {
          TournamentPanel.prototype.relatedDayRender();
        };
        dayInstanceDiv.appendChild(instanceSelect);
        switch (clickedInstance) {
          case 'initial':
            var instaceSelectOptionInitial = document.createElement('option');
            instaceSelectOptionInitial.value = 'initial';
            instaceSelectOptionInitial.innerText = 'Inicial';
            //instaceSelectOptionInitial.disabled = clickedDayInfo.instance === "initial" ? true : false
            instanceSelect.appendChild(instaceSelectOptionInitial);
          //alert('en initial')
          case 'mid':
            var instaceSelectOptionMid = document.createElement('option');
            instaceSelectOptionMid.value = 'mid';
            instaceSelectOptionMid.innerText = 'Media';
            //instaceSelectOptionMid.disabled = clickedDayInfo.instance === "mid" ? true : false
            instanceSelect.appendChild(instaceSelectOptionMid);
          case 'final':
            var instaceSelectOptionFinal = document.createElement('option');
            instaceSelectOptionFinal.value = 'final';
            instaceSelectOptionFinal.innerText = 'Final';
            //instaceSelectOptionFinal.disabled = clickedDayInfo.instance === "final" ? true : false
            instanceSelect.appendChild(instaceSelectOptionFinal);
          case 'none':
            if (initial[0] && mid[0] && final[0]) {
              var instanceSelectOptionNone = document.createElement('option');
              instanceSelectOptionNone.value = 'none';
              instanceSelectOptionNone.innerText = 'Ninguna';
              instanceSelect.appendChild(instanceSelectOptionNone);

              //var instaceSelectOptionInitial = document.createElement('option');
              //instaceSelectOptionInitial.value = 'initial'
              //instaceSelectOptionInitial.innerText = 'Inicial'
              //instaceSelectOptionInitial.disabled = clickedDayInfo.instance === "initial" ? true : false
              //instanceSelect.appendChild(instaceSelectOptionInitial)

              //var instaceSelectOptionMid = document.createElement('option');
              //instaceSelectOptionMid.value = 'mid'
              //instaceSelectOptionMid.innerText = 'Media'
              //instaceSelectOptionMid.disabled = clickedDayInfo.instance === "mid" ? true : false
              //instanceSelect.appendChild(instaceSelectOptionMid)

              break;
            } else if (initial[0] && mid[0]) {
              var instanceSelectOptionNone = document.createElement('option');
              instanceSelectOptionNone.value = 'none';
              instanceSelectOptionNone.innerText = 'Ninguna';
              instanceSelect.appendChild(instanceSelectOptionNone);

              var instaceSelectOptionInitial = document.createElement('option');
              instaceSelectOptionInitial.value = 'initial';
              instaceSelectOptionInitial.innerText = 'Inicial';
              //instaceSelectOptionInitial.disabled = clickedDayInfo.instance === "initial" ? true : false
              instanceSelect.appendChild(instaceSelectOptionInitial);

              var instaceSelectOptionMid = document.createElement('option');
              instaceSelectOptionMid.value = 'mid';
              instaceSelectOptionMid.innerText = 'Media';
              //instaceSelectOptionMid.disabled = clickedDayInfo.instance === "mid" ? true : false
              instanceSelect.appendChild(instaceSelectOptionMid);

              var instaceSelectOptionFinal = document.createElement('option');
              instaceSelectOptionFinal.value = 'final';
              instaceSelectOptionFinal.innerText = 'Final';
              //instaceSelectOptionFinal.disabled = clickedDayInfo.instance === "final" ? true : false
              instanceSelect.appendChild(instaceSelectOptionFinal);

              break;
            } else if (initial[0]) {
              var instanceSelectOptionNone = document.createElement('option');
              instanceSelectOptionNone.value = 'none';
              instanceSelectOptionNone.innerText = 'Ninguna';
              instanceSelect.appendChild(instanceSelectOptionNone);

              var instaceSelectOptionInitial = document.createElement('option');
              instaceSelectOptionInitial.value = 'initial';
              instaceSelectOptionInitial.innerText = 'Inicial';
              //instaceSelectOptionInitial.disabled = clickedDayInfo.instance === "initial" ? true : false
              instanceSelect.appendChild(instaceSelectOptionInitial);

              var instaceSelectOptionMid = document.createElement('option');
              instaceSelectOptionMid.value = 'mid';
              instaceSelectOptionMid.innerText = 'Media';
              //instaceSelectOptionMid.disabled = clickedDayInfo.instance === "mid" ? true : false
              instanceSelect.appendChild(instaceSelectOptionMid);
              break;
            } else {
              var instanceSelectOptionNone = document.createElement('option');
              instanceSelectOptionNone.value = 'none';
              instanceSelectOptionNone.innerText = 'Ninguna';
              instanceSelect.appendChild(instanceSelectOptionNone);

              var instaceSelectOptionInitial = document.createElement('option');
              instaceSelectOptionInitial.value = 'initial';
              instaceSelectOptionInitial.innerText = 'Inicial';
              instaceSelectOptionInitial.disabled =
                clickedDayInfo.instance === 'initial' ? true : false;
              instanceSelect.appendChild(instaceSelectOptionInitial);
              break;
            }
            break;
        }
      }

      selectInstances(clickedInstance);
      var maxWinnersDiv = document.createElement('div');
      maxWinnersDiv.setAttribute('id', 'day-gMax-div');
      maxWinnersDiv.setAttribute('class', 'day-gMax-div');
      dayFormContent.appendChild(maxWinnersDiv);

      var maxWinnersLabel = document.createElement('label');
      maxWinnersLabel.setAttribute('id', 'day-gMax-label');
      maxWinnersLabel.setAttribute('class', 'day-gMax-label');
      maxWinnersLabel.htmlFor = 'day-gMax';
      maxWinnersLabel.innerText = 'Seleccione ganadores de esta instancia.';
      maxWinnersDiv.appendChild(maxWinnersLabel);

      var instanceWinnersSelect = document.createElement('select');
      instanceWinnersSelect.id = 'day-gMax';
      instanceWinnersSelect.class = 'day-gMax-select';
      instanceWinnersSelect.disabled =
        clickedDayInfo.instance === 'none' ? false : true;
      //maxWinnersDiv.onclick= ()=> {updatingInstance(); panelFormInstanceSetter(false)}
      maxWinnersDiv.appendChild(instanceWinnersSelect);

      var instanceWinnersSelectDefault = document.createElement('option');
      instanceWinnersSelectDefault.id = 'day-gMax-option-default';
      instanceWinnersSelectDefault.class = 'day-gMax-option-default';
      instanceWinnersSelectDefault.disabled = true;
      instanceWinnersSelectDefault.selected = true;
      instanceWinnersSelectDefault.value =
        clickedDayInfo.winnersNeed === undefined
          ? '1'
          : clickedDayInfo.winnersNeed;
      instanceWinnersSelectDefault.innerText =
        clickedDayInfo.winnersNeed === undefined
          ? '1'
          : clickedDayInfo.winnersNeed;
      instanceWinnersSelect.appendChild(instanceWinnersSelectDefault);

      var instanceWinnersOption1 = document.createElement('option');
      instanceWinnersOption1.id = 'day-gMax-option-1';
      instanceWinnersOption1.class = 'day-gMax-option-1';
      instanceWinnersOption1.value = '1';
      instanceWinnersOption1.innerText = '1';
      instanceWinnersOption1.disabled =
        clickedDayInfo.winnersNeed === '1' ? true : false;
      instanceWinnersSelect.appendChild(instanceWinnersOption1);

      var instanceWinnersOption2 = document.createElement('option');
      instanceWinnersOption2.id = 'day-gMax-option-2';
      instanceWinnersOption2.class = 'day-gMax-option-2';
      instanceWinnersOption2.value = '2';
      instanceWinnersOption2.innerText = '2';
      instanceWinnersOption2.disabled =
        clickedDayInfo.winnersNeed === '2' ? true : false;
      instanceWinnersSelect.appendChild(instanceWinnersOption2);

      var instanceWinnersOption4 = document.createElement('option');
      instanceWinnersOption4.id = 'day-gMax-option-4';
      instanceWinnersOption4.class = 'day-gMax-option-4';
      instanceWinnersOption4.value = '4';
      instanceWinnersOption4.innerText = '4';
      instanceWinnersOption4.disabled =
        clickedDayInfo.winnersNeed === '4' ? true : false;
      instanceWinnersSelect.appendChild(instanceWinnersOption4);

      var instanceWinnersOption8 = document.createElement('option');
      instanceWinnersOption8.id = 'day-gMax-option-8';
      instanceWinnersOption8.class = 'day-gMax-option-8';
      instanceWinnersOption8.value = '8';
      instanceWinnersOption8.innerText = '8';
      instanceWinnersOption8.disabled =
        clickedDayInfo.winnersNeed === '8' ? true : false;
      instanceWinnersSelect.appendChild(instanceWinnersOption8);

      // DAY TIME START
      var tStartDiv = document.createElement('div');
      tStartDiv.setAttribute('id', 'panelForm-tStart-div');
      tStartDiv.setAttribute('class', 'panelForm-tStart-div');
      dayFormContent.appendChild(tStartDiv);

      var tStartLabel = document.createElement('label');
      tStartLabel.setAttribute('id', 'panelForm-tStart-label');
      tStartLabel.setAttribute('class', 'panelForm-tStart-label');
      tStartLabel.htmlFor = 'panelForm-tStart-input';
      tStartLabel.innerText = '¿A que hora comienza esta instancia?.';
      tStartDiv.appendChild(tStartLabel);

      var tStartInput = document.createElement('input');
      tStartInput.type = 'time';
      tStartInput.id = 'panelForm-tStart-input';
      tStartInput.value =
        clickedDayInfo.tStart === undefined
          ? '14:00'
          : clickedDayInfo.tStart.toString();
      tStartInput.disabled = clickedDayInfo.instance === 'none' ? false : true;
      //tStartInput.onChange = ()=> {TournamentPanel.prototype.updatingInstance()}
      tStartInput.name = 'meeting-time';
      tStartDiv.appendChild(tStartInput);

      // ASSIGNS DAY DIV
      var assignDayDiv = document.createElement('div');
      assignDayDiv.setAttribute('id', 'assign-day-div');
      assignDayDiv.setAttribute('class', 'assign-day-div');
      clickedDayInfo.nextInstance[0]
        ? ''
        : (assignDayDiv.style.display = 'none');

      var assignDayLabel = document.createElement('label');
      assignDayLabel.setAttribute('id', 'assign-day-label');
      assignDayLabel.setAttribute('class', 'assign-day-label');
      assignDayLabel.innerText = 'Asigna instancias iniciales';
      assignDayDiv.appendChild(assignDayLabel);

      var relatedDaysWrapper = document.createElement('div');
      relatedDaysWrapper.setAttribute('id', 'related-days-wrapper');
      relatedDaysWrapper.setAttribute('class', 'related-days-wrapper');

      var unassignednDayPanel = document.createElement('div');
      unassignednDayPanel.setAttribute('id', 'unassigned-day-panel');
      unassignednDayPanel.setAttribute('class', 'unassigned-day-panel');
      relatedDaysWrapper.appendChild(unassignednDayPanel);

      var assignedDayPanel = document.createElement('div');
      assignedDayPanel.setAttribute('id', 'assigned-day-panel');
      assignedDayPanel.setAttribute('class', 'assigned-day-panel');
      relatedDaysWrapper.appendChild(assignedDayPanel);

      for (var i = 0; i < clickedDayInfo.nextInstance.length; i++) {
        var newDayAssignedButton = document.createElement('button');
        newDayAssignedButton.setAttribute(
          'id',
          `assigned-singleDay-${clickedDayInfo.nextInstance[i].day}`
        );
        newDayAssignedButton.setAttribute('class', 'assigned-singleDay');
        newDayAssignedButton.setAttribute(
          'name',
          `${JSON.stringify(clickedDayInfo.nextInstance[i])}`
        );
        newDayAssignedButton.innerText = clickedDayInfo.nextInstance[i].day;
        assignedDayPanel.appendChild(newDayAssignedButton);
      }

      assignDayDiv.appendChild(relatedDaysWrapper);
      dayFormContent.appendChild(assignDayDiv);

      // FINAL APPENDCHILD
      dayFormWrapper.appendChild(dayFormContent);
      organaizerForm.appendChild(dayFormWrapper);
      var invoked = {
        invoked: 'save',
      };
    }
    // Form Display Handler
    if (clickedDayInfo.day) {
      return content();
    } else {
      return (
        <label id='content-tittle-label' className='content-tittle-label'>
          Wellcome
        </label>
      );
    }
  }
  // FORM HANDLERS AND SAVE
  organizerButtonsHandler(dayData, nameDayInfo) {
    // console.log(dayData,nameDayInfo )
    //Local Vars
    //// console.log('0 - Function Entry')
    var dayClicked = this.state.dayInfo;
    //console.log(dayClicked)
    var dayFormContent = document.getElementById('day-form-value')
      ? document.getElementById('day-form-value').name
      : '';
    var day = dayData.split('-')[0];
    var month = dayData.split('-')[1];
    var entryDayInfo = nameDayInfo.day ? nameDayInfo : JSON.parse(nameDayInfo);
    var eventTargetInput = document.getElementById(
      event.composedPath()[0].innerText
    );
    var dayInfo = {
      day: `${day}-${month}`,
      instance: entryDayInfo.instance,
      lastInstance: entryDayInfo.lastInstance,
      winnersNeed: entryDayInfo.winnersNeed,
      tStart: entryDayInfo.tStart,
      winnersIDs: entryDayInfo.winnersIDs,
      nextInstance: entryDayInfo.nextInstance,
      prevInstance: entryDayInfo.prevInstance,
    };

    function isUpdating() {
      if (dayFormContent === '') {
      } else {
        var formDayInfo =
          dayFormContent === '' ? '' : JSON.parse(dayFormContent);
        var oldTStart = formDayInfo.tStart;
        var oldGMax =
          formDayInfo.winnersNeed == 0
            ? formDayInfo.winnersNeed
            : parseInt(formDayInfo.winnersNeed);
        var oldInstanceSelect = formDayInfo.instance;
        var actualTStart = document.getElementById('panelForm-tStart-input')
          .value;
        var actualGmax =
          document.getElementById('day-gMax').value == 0
            ? document.getElementById('day-gMax').value
            : parseInt(document.getElementById('day-gMax').value);
        var actualInstanceSelect = document.getElementById(
          'day-instance-div-select'
        ).value;
        //// console.log(dayFormContent, 'raw objet')
        //// console.log(formDayInfo, '<-------- formDayInfo' )
        //// console.log(oldInstanceSelect, '<-------- Old Instance Select /// Actual Instance Select -------->', actualInstanceSelect)
        //// console.log(oldGMax, '<-------- OLD GMAX /// ACTUAL GMAX ------->', actualGmax)
        //// console.log(oldTStart, '<------------ OLD TSTART /// ACTUAL TSTART --------->', actualTStart)
      }

      if (oldInstanceSelect == actualInstanceSelect) {
        return true;
      } else {
        if (actualTStart === oldTStart && actualGmax === oldGMax) {
          return false;
        }
      }
    }
    if (isUpdating()) {
      function defaultButtonClassAssign(setNewButton) {
        var wasClicked = document.getElementsByClassName('itsClicked')[0];
        var dayValue = event.composedPath()[0].value;
        wasClicked
          ? wasClicked.setAttribute(
              'class',
              `panel-button ${dayClicked.instance}`
            )
          : '';
        if (dayValue.instance != 'none') {
          event.composedPath()[0].class = `panel-button ${dayValue.instance}-userClicked itsClicked`;
        } else {
          event.composedPath()[0].class = `panel-button userClicked itsClicked `;
        }
        setNewButton();
      }
      TournamentPanel.prototype.selectInit();
      var newButtonClicked = () => {
        this.setState({
          buttonClicked: dayData,
          dayInfo: dayInfo,
        });
      };
      defaultButtonClassAssign(newButtonClicked);
    } else {
      var nameDayObj = entryDayInfo;
      var autoSave = {
        invoked: 'autoSave',
        dayData: dayData,
        nameDayObj: nameDayObj,
        eventTarget: eventTargetInput,
        confirmed: '',
      };
      confirm('¿Desea guardar los cambios del dia?')
        ? (autoSave.confirmed = true)
        : (autoSave.confirmed = false);
      TournamentPanel.prototype.saveSingleInstance(autoSave);
    }
  }
  saveSingleInstance(invoked) {
    // console.log(this.state.initial)
    var initial = this.state.initial;
    var mid = this.state.mid;
    var final = this.state.final;
    var relatedDaysNodes = document.getElementsByClassName('relatedDay');

    if (invoked.confirmed) {
      var instanceLevel = document.getElementById('day-instance-div-select')
        .value;
    } else {
      if (invoked.invoked === 'save') {
        var instanceLevel = document.getElementById('day-instance-div-select')
          .value;
      } else {
        var instanceLevel = 'none';
      }
    }
    var initialsRelatedsDays = this.state.initialsRelatedsDays;
    var midsRelatedsDays = this.state.midsRelatedsDays;
    function deleteElement(array, elem) {
      var result = [];
      for (var i = 0; i < array.length; i++) {
        if (array[i] !== elem) {
          result.push(array[i]);
        }
      }
      return result;
    }
    var singleDaySettings = {        //<<------- PUNTO DE GUARDADO PARA SUBIR INFO
      day: document.getElementById('form-content-label').innerText,
      instance: instanceLevel,
      winnersNeed: document.getElementById('day-gMax').value,
      lastInstance: false,
      tStart:
        document.getElementById('panelForm-tStart-input').value === ''
          ? '14:00'
          : document.getElementById('panelForm-tStart-input').value,
      lifes: 2,
      active: false,
      winnersIDs: [],
      nextInstance: [],
      prevInstance: [],
    };
    switch (instanceLevel) {
      case 'initial':
        var newInitial = initial;
        var newMid = mid;
        var newFinal = final;
        newInitial.push(singleDaySettings);
        break;
      case 'mid':
        var newInitial = initial;
        var newMid = mid;
        var newFinal = final;
        for (var i = 0; i < relatedDaysNodes.length; i++) {
          for (var z = 0; z < initial.length; z++) {
            initial[z].day === relatedDaysNodes[i].innerText
              ? initialsRelatedsDays.push(
                  `${initial[z].day}_${singleDaySettings.day}`
                )
              : '';
            initial[z].day === relatedDaysNodes[i].innerText
              ? singleDaySettings.prevInstance.push(initial[z])
              : '';
          }
        }
        newMid.push(singleDaySettings);
        break;
      case 'final':
        var newInitial = initial;
        var newMid = mid;
        var newFinal = final;
        for (var i = 0; i < relatedDaysNodes.length; i++) {
          for (var z = 0; z < mid.length; z++) {
            mid[z].day === relatedDaysNodes[i].innerText
              ? midsRelatedsDays.push(`${mid[z].day}_${singleDaySettings.day}`)
              : '';
            mid[z].day === relatedDaysNodes[i].innerText
              ? singleDaySettings.prevInstance.push(mid[z])
              : '';
          }
        }
        newFinal.push(singleDaySettings);
        break;
      case 'none':
        var newInitial = initial;
        var newMid = mid;
        var newFinal = final;
        break;
    }
    switch (invoked.invoked) {
      case 'autoSave': {
        if (invoked.confirmed) {
          this.setState({
            initial: newInitial,
            mid: newMid,
            final: newFinal,
            dayInfo: singleDaySettings,
            relatedDaysArr: relatedDaysArr,
          });
          setTimeout(function () {
            TournamentPanel.prototype.updateClickedDay(invoked.nameDayObj);
          }, 15);
        } else {
          setTimeout(function () {
            TournamentPanel.prototype.updateClickedDay(invoked.nameDayObj);
          }, 15);
        }
        break;
      }
      case 'save':
        this.setState({
          initial: newInitial,
          mid: newMid,
          final: newFinal,
          dayInfo: singleDaySettings,
          relatedDaysArr: relatedDaysArr,
        });
        this.refreshButtonPanel();
        break;
    }
  }
  editSingleInstance(invoked) {
    console.log(invoked, 'editSingleInstance');
    var select = document.getElementsByClassName('select-dropdown');
    //var select = document.getElementById("day-instance-div-select")
    var instanceStart = document.getElementById('panelForm-tStart-input');
    instanceStart.disabled = false;
    select[0].disabled = false;
    select[3].disabled = false;
  }
  deleteSingleInstance(invoked) {
    var initial = this.state.initial;
    var mid = this.state.mid;
    var final = this.state.final;

    var initialsRelatedsDays = this.state.initialsRelatedsDays;
    var midsRelatedsDays = this.state.midsRelatedsDays;
    var dayFormValue = document.getElementById('day-form-value');
    var dayFormValueObj = this.state.dayInfo;
    console.log(dayFormValueObj);
    console.log(initialsRelatedsDays);

    switch (dayFormValueObj.instance) {
      case 'initial':
        for (var z = 0; initialsRelatedsDays.length > z; z++) {
          var relIndex = z;
          initialsRelatedsDays[z].split('_')[0] === dayFormValueObj.day
            ? initialsRelatedsDays.splice(relIndex, 1)
            : '';
          console.log(initialsRelatedsDays);
        }
        for (var i = 0; initial.length > i; i++) {
          var index = i;
          initial[i].day === dayFormValueObj.day
            ? initial.splice(index, 1)
            : '';
          TournamentPanel.prototype.organizerPanel();
          TournamentPanel.prototype.orgForm();
        }
      case 'mid':
        function checkRelated() {
          var isRelated = false;
          for (var i = 0; initialsRelatedsDays.length > i; i++) {
            initialsRelatedsDays[i].split('_')[1] === dayFormValueObj.day
              ? (isRelated = true)
              : '';
          }
          return isRelated;
        }
        if (checkRelated()) {
          alert('Elimine primero los dias relacionados con este torneo');
        } else {
          for (var z = 0; midsRelatedsDays.length > z; z++) {
            var relIndex = z;
            midsRelatedsDays[z].split('_')[0] === dayFormValueObj.day
              ? midsRelatedsDays.splice(relIndex, 1)
              : '';
          }
          for (var i = 0; mid.length > i; i++) {
            var index = i;
            mid[i].day === dayFormValueObj.day ? mid.splice(index, 1) : '';
            TournamentPanel.prototype.organizerPanel();
          }
        }
      case 'final':
        for (var i = 0; final.length > i; i++) {
          var index = i;
          final[i].day === dayFormValueObj.day ? final.splice(index, 1) : '';
          TournamentPanel.prototype.organizerPanel();
          TournamentPanel.prototype.orgForm();
        }
        break;
    }
  }
  // Refresh Handlers
  refreshButtonPanel() {
    var dayButtonsArr = document.querySelectorAll('.panel-button');
    // console.log(dayButtonsArr)
    for (var i = 0; i < dayButtonsArr.length; i++) {
      var buttonPanel = dayButtonsArr[i];
      var parent = buttonPanel.parentNode;
      parent.removeChild(buttonPanel);
    }
  }
  refreshFormPanel() {
    var formContent = document.getElementById('day-form-content');
    if (formContent) {
      var parent = formContent.parentNode;
      parent.removeChild(formContent);
    }
  }
  selectInit(createForm) {
    createForm === 'createForm'
      ? ''
      : setTimeout(function () {
          var instanceSelect = document.getElementById(
            'day-instance-div-select'
          );
          M.FormSelect.init(instanceSelect, 0);
        }, 5);
    createForm === 'createForm'
      ? ''
      : setTimeout(function () {
          var gMaxSelect = document.getElementById('day-gMax');
          M.FormSelect.init(gMaxSelect, 0);
        }, 5);

    createForm === 'createForm'
      ? setTimeout(function () {
          var gMaxSelect = document.getElementById('select-weeksDuration');
          M.FormSelect.init(gMaxSelect, 0);
        }, 5)
      : '';

    createForm === 'createForm'
      ? setTimeout(function () {
          var regionSelect = document.getElementById('select-region');
          M.FormSelect.init(regionSelect, 0);
        }, 5)
      : '';
  }
  // Assign panel
  relatedDayRender() {
    // console.log("AQUI 1")
    function deleteElement(array, elem) {
      var result = [];
      for (var i = 0; i < array.length; i++) {
        if (array[i].day !== elem) {
          result.push(array[i]);
        }
      }
      return result;
    }

    // Show and Hide assign day panel
    event.target.value === 'initial' || event.target.value === 'none'
      ? (document.getElementById('assign-day-div').style.display = 'none')
      : (document.getElementById('assign-day-div').style.display = 'block');

    var dayFormValue = JSON.parse(
      document.getElementById('day-form-value').name
    );

    TournamentPanel.prototype.unassignedDays(event.target.value);

    var elemInfo = event.target.name ? JSON.parse(event.target.name) : '';
    //// console.log(elemInfo, '<---- ElemInfo ---- Function Entry - 0 ')

    //var assignedDayPanel = document.getElementById('assigned-day-panel');
  }
  relatedDayHandler(invoked) {
    var dayDate = event.target.innerText;
    // console.log("related-" , dayDate)
    var unassignednDayPanelChilds = document.getElementById(
      'unassigned-day-panel'
    ).childNodes;
    var assignedDayPanel = document.getElementById('assigned-day-panel');

    var focusDayclass = 'unassigned-singleDay none-userClicked relatedDay';
    var normalDayclass = 'unassigned-singleDay';

    relatedDaysArr.push(dayDate);
    if (event.target.className === focusDayclass) {
      event.target.className = normalDayclass;
    } else {
      event.target.className = focusDayclass;
    }
    // New related Render
    var assignDayDiv = document.getElementById('assign-day-div');
  }
  assignedDays(dayInfo, instanceLevel) {
    var instanceArr = dayInfo.nextInstance;
    var relatedsDayWrapper = document.getElementById('related-days-wrapper');
    var assignedDayPanel = document.createElement('div');
    assignedDayPanel.setAttribute('id', 'assigned-day-panel');
    assignedDayPanel.setAttribute('class', 'assigned-day-panel');

    if (instanceArr[0]) {
      for (var i = 0; i < instanceArr.length; i++) {
        var newDayAssignedButton = document.createElement('button');
        newDayAssignedButton.setAttribute(
          'id',
          `assigned-singleDay-${instanceArr[i]}`
        );
        newDayAssignedButton.setAttribute('class', 'assigned-singleDay');
        newDayAssignedButton.setAttribute(
          'name',
          `${JSON.stringify(instanceArr[i])}`
        );
        newDayAssignedButton.innerText = instanceArr[i];
        assignedDayPanel.appendChild(newDayAssignedButton);
      }
    }
    relatedsDayWrapper.appendChild(assignedDayPanel);
  }
  unassignedDays(instanceLevel) {
    // console.log("UnassignedDays Function")
    var initialsRelatedsDays = this.state.initialsRelatedsDays;

    switch (instanceLevel) {
      case 'initial':
        break;
      case 'mid':
        var instanceArr = this.state.initial;
        break;
      case 'final':
        var instanceArr = this.state.mid;
        // console.log(instanceArr, '<--- InstanceArr');
        break;
    }

    if (instanceArr === undefined) {
    } else {
      var unassignedDayPanel = document.getElementById('unassigned-day-panel');
      var unassignedDayPanelChilds = document.getElementById(
        'unassigned-day-panel'
      ).childNodes;
      for (var i = 0; i < unassignedDayPanelChilds.length; i++) {
        unassignedDayPanelChilds[i].parentNode.removeChild(
          unassignedDayPanelChilds[i]
        );
      }
      if (unassignedDayPanelChilds[0]) {
      } else {
        for (var i = 0; i < instanceArr.length; i++) {
          var renderCheck = true;
          if (instanceArr[i].nextInstance[0]) {
          } else {
            for (var z = 0; z < initialsRelatedsDays.length; z++) {
              var initialDayRelated = initialsRelatedsDays[z].split('_')[0];
              instanceArr[i].day === initialDayRelated
                ? (renderCheck = false)
                : '';
            }
            function renderDay(relatedDayHandler) {
              var dayInfo = instanceArr[i].day
                ? instanceArr[i]
                : JSON.parse(instanceArr[i].name);
              var newDayAssignedButton = document.createElement('button');
              newDayAssignedButton.setAttribute(
                'id',
                `unassigned-singleDay-${dayInfo.day}`
              );
              newDayAssignedButton.setAttribute(
                'class',
                'unassigned-singleDay'
              );
              newDayAssignedButton.setAttribute(
                'name',
                `${JSON.stringify(dayInfo)}`
              );
              newDayAssignedButton.innerText = dayInfo.day;
              newDayAssignedButton.onclick = () => {
                relatedDayHandler('unassignedDay');
              };
              unassignedDayPanel.appendChild(newDayAssignedButton);
            }
            renderCheck
              ? renderDay(TournamentPanel.prototype.relatedDayHandler)
              : '';
          }
        }
      }
    }

    //// console.log(instanceArr, instance, '<------- Aqui')
  }
  // ------------------------------------------///
  // Extra
  updateClickedDay(dayInfoObj) {
    TournamentPanel.prototype.refreshButtonPanel();
    this.setState({
      dayInfo: dayInfoObj,
      autoSave: true,
    });
  }
  // ----------------------------------------- ///
  navigationHandler(nav) {
    this.setState({
      navigation: nav,
    });
  }
  componentDidMount() {
    this.organizerTournaments();
    /*
    if (sessionStorage._id) {
      ;
      //this.organizerSocket();

      // Materialize Modal
      var elems = document.querySelectorAll('.tooltipped');
      //// console.log(elems)
      function modalRegen() {
        var elems = document.querySelectorAll('.createTournamentModal');
        var instances = M.Modal.init(elems);
        var instance = M.Modal.getInstance(elems[0]);
        //// console.log(instance)
        instance.close();
        instance.isOpen = false;
      }
      modalRegen();
      // Materialice Tooltip init
      document.addEventListener('mouseover', function () {
        var elems = document.querySelectorAll('.tooltipped');
        var options = 0;
        var instances = M.Tooltip.init(elems, options);
      });
    } else {
      location.href = '#/organizer';
    }
    */
  }
  componentWillUnmount() {
    /*
    document.removeEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.createTournamentModal');
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

    /*fetch('users/navigationSave', {
			method: 'POST',s
			body: JSON.stringify(this.state),
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		}).then(location.reload());*/
    // location.reload();
  }
  render() {
    return (
      <div id={`${game}-tournament-panel-wrapper`} className='main-wrapper'>
        {/* AQUI COMIENZA NAVIGATION BAR */}
        <div className='navigation-bar center' id='nav-bar-home'>
          <div id='navigation-bar-content' className='navigation-bar-content'>
            <i
              id='back-button'
              className='back-button material-icons'
              onClick={() => {
                window.history.back();
              }}>
              arrow_back
            </i>
            <h4 id='panel-tournament-title' className='panel-tournament-title'>
              Panel del torneo {this.state.tournamentName}
            </h4>
            <button
              id='save-tournament'
              className='save-tournament'
              onClick={() => this.uploadInstances()}>
              Grabar Formato
            </button>
          </div>
        </div>
        {/* AQUI TERMINA NAVIGATION BAR */}
        <div id='tournament-panel-bg' className='tournament-panel-bg'></div>
        <div
          id='tournament-panel-content-wrapper'
          className='tournament-panel-content-wrapper'>
          <div id='organizer-buttons' className='organizer-buttons'>
            <div id='days-labels' className='days-labels'>
              <span id='day-1' className='day'>
                LUN
              </span>
              <span id='day-2' className='day'>
                MAR
              </span>
              <span id='day-3' className='day'>
                MIE
              </span>
              <span id='day-4' className='day'>
                JUE
              </span>
              <span id='day-5' className='day'>
                VIE
              </span>
              <span id='day-6' className='day'>
                SAB
              </span>
              <span id='day-7' className='day'>
                DOM
              </span>
            </div>
            {this.organizerPanel()}
          </div>
          <div id='organizer-form' className='organizer-form'>
            <div
              id='organizer-form-wrapper'
              className='organizer-form-wrapper form-Animation-0 form-opacity-0'>
              {this.orgForm()}
              <button
                id='instance-save'
                className='save-instance'
                style={{
                  display: `${this.state.dayInfo.instance ? 'block' : 'none'}`,
                }}
                onClick={() => {
                  var invoked = {
                    invoked: 'save',
                  };
                  if (this.state.dayInfo.instance === 'none') {
                    TournamentPanel.prototype.saveSingleInstance(invoked);
                  } else {
                    TournamentPanel.prototype.deleteSingleInstance(invoked);
                  }
                }}>
                {this.state.dayInfo.instance === 'none' ? 'SAVE' : 'DELETE'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TournamentPanel;
