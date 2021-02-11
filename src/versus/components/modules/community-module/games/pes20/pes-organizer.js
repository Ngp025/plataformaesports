// React imports
import React, { Component } from 'react';

var game = 'pes20';
var relatedDaysArr = [];
var isEditing = false;
// SCSS imports
import '../../../../../styles/games/pes20/pes-organizer.scss';

// Socket IO  imports
//import io from 'socket.io-client';
import htmlTemplates from '../../../../../methods/html/modules/community-module/organizer/organizerTemplates';

// Local declarations
//import userState from '../index';

class PesOrganizer extends Component {
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
      lastTournament: false,
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
    PesOrganizer.prototype.uploadInstances = PesOrganizer.prototype.uploadInstances.bind(
      this
    );
    PesOrganizer.prototype.eraseTournament = PesOrganizer.prototype.eraseTournament.bind(
      this
    );
    PesOrganizer.prototype.organizerPanel = PesOrganizer.prototype.organizerPanel.bind(
      this
    );
    PesOrganizer.prototype.editTournament = PesOrganizer.prototype.editTournament.bind(
      this
    );
    PesOrganizer.prototype.navigationHandler = PesOrganizer.prototype.navigationHandler.bind(
      this
    );
    PesOrganizer.prototype.organizerButtonsHandler = PesOrganizer.prototype.organizerButtonsHandler.bind(
      this
    );
    PesOrganizer.prototype.orgForm = PesOrganizer.prototype.orgForm.bind(this);
    PesOrganizer.prototype.saveSingleInstance = PesOrganizer.prototype.saveSingleInstance.bind(
      this
    );
    PesOrganizer.prototype.unassignedDays = PesOrganizer.prototype.unassignedDays.bind(
      this
    );
    PesOrganizer.prototype.assignedDays = PesOrganizer.prototype.assignedDays.bind(
      this
    );
    PesOrganizer.prototype.updateClickedDay = PesOrganizer.prototype.updateClickedDay.bind(
      this
    );
    PesOrganizer.prototype.loadTournaments = PesOrganizer.prototype.loadTournaments.bind(
      this
    );
  }

  // DATA BASE FUNCTIONS, LOAD AND UPLOAD
  async organizerTournaments() {
    var IDO = this.state.IDO; //IDO momentaneo de prueba
    var game = location.href.split('/')[4].split('-')[0];

    // Aqui termina la informacion de ejemplo
    const response = await fetch(`/api/organizer/${IDO}/${game}`);
    const json = await response.json();
    console.log(json);
    this.loadTournaments(json);
    //console.log(json, 'tMain posee toda la informacion de los jugadores inscriptos');
    //console.log(json, '<----- json con elementos del torneo')
  }
  loadTournaments(json, invoke, index) {
    console.log('Load Tournament');
    if (invoke === 'user') {
      var tInfo = this.state.watchArr[index];
      this.setState({
        navigation: 'tournament-panel',
        createClose: tInfo.createClosed,
        //IDO: tInfo.IDO,
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
        lastTournament: tInfo.lastTournament,
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
    } else {
      this.setState({
        watchArr: json.watchArr,
      });
    }
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
    var parseDate = new Date(this.state.tDate);
    var nameDay = parseDate.toLocaleDateString('es-MX', options).slice(0, 3);
    console.log(nameDay);
    switch (nameDay) {
      case 'lun':
        var startDayFix = 0;
        break;
      case 'mar':
        var startDayFix = 1;
        break;
      case 'mié':
        var startDayFix = 2;
        break;
      case 'jue':
        var startDayFix = 3;
        break;
      case 'vie':
        var startDayFix = 4;
        break;
      case 'sáb':
        var startDayFix = 5;
        break;
      case 'dom':
        var startDayFix = 6;
        break;
      default:
        var startDayFix = 0;
        break;
    }

    // Parse inputs
    var stateDayInfo = this.state.dayInfo;
    console.log(stateDayInfo, 'aqui');
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
      console.log(organizerPanel);
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
          PesOrganizer.prototype.organizerButtonsHandler(dayInfo.day, dayInfo);
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
          PesOrganizer.prototype.organizerButtonsHandler(
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
          console.log(initialDay);
          console.log(prevMonthDays);
          console.log(dayFix);
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
  refreshFormPanel() {
    var formContent = document.getElementById('day-form-content');
    if (formContent) {
      var parent = formContent.parentNode;
      parent.removeChild(formContent);
    }
  }
  orgForm() {
    //PesOrganizer.prototype.refreshFormPanel();
    // Local Vars
    console.log('aqui');
    console.log(this.state);
    var initial = this.state.initial;
    var mid = this.state.mid;
    var final = this.state.final;

    var clickedDayInfo = this.state.dayInfo;
    var clickedInstance = clickedDayInfo.instance;

    var organaizerForm = document.getElementById('organizer-form');
    var dayFormWrapper = document.getElementById('organizer-form-wrapper');
    dayFormWrapper
      ? (dayFormWrapper.className = `organizer-form-wrapper form-Animation-0 form-opacity-0 ${clickedDayInfo.instance}`)
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
						//console.log(elem)
						elem.parentNode.removeChild(elem);
					}			
					},10
				)
			} */
    //clearAssignPanel();

    // Form Content
    /*
		function wellcome(){
			var welcomeContentLabel = document.createElement('label');
			welcomeContentLabel.setAttribute('id', 'form-content-label');
			welcomeContentLabel.setAttribute('class', 'content-tittle-label');
			welcomeContentLabel.innerText = 'Wellcome';
			dayFormContent.appendChild(welcomeContentLabel);
			dayFormWrapper.appendChild(dayFormContent)
			} */
    function content(selectInit, updatingInstance) {
      function selectInit(elems) {
        var instances = M.FormSelect.init(elems, 0);
      }
      setTimeout(() => {
        selectInit(document.querySelectorAll('select'));
      }, 25);
      //console.log(clickedDayInfo, '<----- ClickedDayInfo')
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
        instanceSelect.className = 'day-instance-div-select';
        instanceSelect.disabled =
          clickedDayInfo.instance === 'none' ? false : true;
        dayInstanceDiv.onchange = () => {
          PesOrganizer.prototype.relatedDayRender();
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
      instanceWinnersSelect.className = 'day-gMax-select';
      instanceWinnersSelect.disabled =
        clickedDayInfo.instance === 'none' ? false : true;
      //maxWinnersDiv.onclick= ()=> {updatingInstance(); panelFormInstanceSetter(false)}
      maxWinnersDiv.appendChild(instanceWinnersSelect);

      var instanceWinnersSelectDefault = document.createElement('option');
      instanceWinnersSelectDefault.id = 'day-gMax-option-default';
      instanceWinnersSelectDefault.className = 'day-gMax-option-default';
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
      instanceWinnersOption1.className = 'day-gMax-option-1';
      instanceWinnersOption1.value = '1';
      instanceWinnersOption1.innerText = '1';
      instanceWinnersOption1.disabled =
        clickedDayInfo.winnersNeed === '1' ? true : false;
      instanceWinnersSelect.appendChild(instanceWinnersOption1);

      var instanceWinnersOption2 = document.createElement('option');
      instanceWinnersOption2.id = 'day-gMax-option-2';
      instanceWinnersOption2.className = 'day-gMax-option-2';
      instanceWinnersOption2.value = '2';
      instanceWinnersOption2.innerText = '2';
      instanceWinnersOption2.disabled =
        clickedDayInfo.winnersNeed === '2' ? true : false;
      instanceWinnersSelect.appendChild(instanceWinnersOption2);

      var instanceWinnersOption4 = document.createElement('option');
      instanceWinnersOption4.id = 'day-gMax-option-4';
      instanceWinnersOption4.className = 'day-gMax-option-4';
      instanceWinnersOption4.value = '4';
      instanceWinnersOption4.innerText = '4';
      instanceWinnersOption4.disabled =
        clickedDayInfo.winnersNeed === '4' ? true : false;
      instanceWinnersSelect.appendChild(instanceWinnersOption4);

      var instanceWinnersOption8 = document.createElement('option');
      instanceWinnersOption8.id = 'day-gMax-option-8';
      instanceWinnersOption8.className = 'day-gMax-option-8';
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
      //tStartInput.onChange = ()=> {PesOrganizer.prototype.updatingInstance()}
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
      return (
        <button
          id='instance-save'
          className='save-instance'
          onClick={() => PesOrganizer.prototype.saveSingleInstance(invoked)}>
          SAVEE
        </button>
      );
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
    //Local Vars
    //console.log('0 - Function Entry')
    var dayClicked = this.state.dayInfo;
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
        //console.log(dayFormContent, 'raw objet')
        //console.log(formDayInfo, '<-------- formDayInfo' )
        //console.log(oldInstanceSelect, '<-------- Old Instance Select /// Actual Instance Select -------->', actualInstanceSelect)
        //console.log(oldGMax, '<-------- OLD GMAX /// ACTUAL GMAX ------->', actualGmax)
        //console.log(oldTStart, '<------------ OLD TSTART /// ACTUAL TSTART --------->', actualTStart)
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
          event.composedPath()[0].className = `panel-button ${dayValue.instance}-userClicked itsClicked`;
        } else {
          event.composedPath()[0].className = `panel-button userClicked itsClicked `;
        }
        setNewButton();
      }
      this.selectInit();
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
      PesOrganizer.prototype.saveSingleInstance(autoSave);
    }
  }
  saveSingleInstance(invoked) {
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
    var singleDaySettings = {
      day: document.getElementById('form-content-label').innerText,
      instance: instanceLevel,
      winnersNeed: document.getElementById('day-gMax').value,
      lastInstance: false,
      tStart:
        document.getElementById('panelForm-tStart-input').value === ''
          ? '14:00'
          : document.getElementById('panelForm-tStart-input').value,
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
            PesOrganizer.prototype.updateClickedDay(invoked.nameDayObj);
          }, 15);
        } else {
          setTimeout(function () {
            PesOrganizer.prototype.updateClickedDay(invoked.nameDayObj);
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
  // Refresh Handlers
  refreshButtonPanel() {
    var dayButtonsArr = document.querySelectorAll('.panel-button');
    for (var i = 0; i < dayButtonsArr.length; i++) {
      var buttonPanel = dayButtonsArr[i];
      var parent = buttonPanel.parentNode;
      parent.removeChild(buttonPanel);
    }
  }
  // Assign panel
  relatedDayRender() {
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

    PesOrganizer.prototype.unassignedDays(event.target.value);

    var elemInfo = event.target.name ? JSON.parse(event.target.name) : '';
    //console.log(elemInfo, '<---- ElemInfo ---- Function Entry - 0 ')

    //var assignedDayPanel = document.getElementById('assigned-day-panel');
  }
  relatedDayHandler(invoked) {
    var dayDate = event.target.innerText;
    var unassignednDayPanelChilds = document.getElementById(
      'unassigned-day-panel'
    ).childNodes;
    var assignedDayPanel = document.getElementById('assigned-day-panel');

    var focusDayClass = 'unassigned-singleDay none-userClicked relatedDay';
    var normalDayClass = 'unassigned-singleDay';

    relatedDaysArr.push(dayDate);

    if (event.target.className === focusDayClass) {
      event.target.className = normalDayClass;
    } else {
      event.target.className = focusDayClass;
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
    var initialsRelatedsDays = this.state.initialsRelatedsDays;

    switch (instanceLevel) {
      case 'initial':
        break;
      case 'mid':
        var instanceArr = this.state.initial;
        break;
      case 'final':
        var instanceArr = this.state.mid;
        console.log(instanceArr, '<--- InstanceArr');
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
              ? renderDay(PesOrganizer.prototype.relatedDayHandler)
              : '';
          }
        }
      }
    }

    //console.log(instanceArr, instance, '<------- Aqui')
  }
  // ------------------------------------------///
  // Extra
  updateClickedDay(dayInfoObj) {
    PesOrganizer.prototype.refreshButtonPanel();
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
  //Information view Functions
  confirmEdit(IDT) {
    var tournamentName = document.getElementsByClassName(
      `tournament-name-${IDT}`
    )[0].value;
    //console.log(tournamentName)
    var cMax = document.getElementsByClassName(`tMax-${IDT}`)[0].value;
    var tDate = document.getElementsByClassName(`tDate-${IDT}`)[0].value;
    //var iTournament = tournamentClicked[12].value;
    var tStart = document.getElementsByClassName(`start-date-${IDT}`)[0].value;
    //var created = tdocument.getElementById(`created-date-${IDT}`)
    var tAward = document.getElementsByClassName(`tAward-${IDT}`)[0].value;
    var server = document.getElementsByClassName(`server-${IDT}`)[0].value;

    var oldTournamentName = document
      .getElementById(`tournament-name-${IDT}`)
      .innerText.slice(8);
    //console.log(oldTournamentName)

    var userConfirm = confirm(
      `¿Desea modificar los datos del torneo ${oldTournamentName}?`
    );

    if (userConfirm) {
      fetch(`/api/organizer/editElements/${IDT}`, {
        method: 'PUT',
        body: JSON.stringify({
          tournamentName,
          cMax,
          tDate,
          tStart,
          tAward,
          server,
          //, public_id
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then(location.reload());
    }
  }
  editTournament(IDT) {
    var tournamentInfoWrapper = document.getElementById(
      `tournament-info-wrapper-${IDT}`
    );
    var footerButtons = document.getElementById(`footer-buttons-${IDT}`);
    footerButtons.style.display = 'none';
    var tournamentTittle = document.getElementById(`tournaments-tittle-${IDT}`);
    tournamentTittle.innerText = 'Modifique los datos'.toUpperCase();
    // Listeners
    document.addEventListener('keypress', (e) => {
      console.log(e);
      if (e.key === 'Enter') {
        this.confirmEdit(IDT);
        return false;
      } else {
      }
    });
    if (isEditing) {
      document.addEventListener('click', () => {
        this.confirmEdit(IDT);
      });
    }
    for (
      var i = 0;
      tournamentInfoWrapper.querySelectorAll('p').length > i;
      i++
    ) {
      var oldState = tournamentInfoWrapper.querySelectorAll('p')[i];
      console.log(oldState);
      oldState.style.display = 'none';
      if (i === 1 || i === 4 || i === 5 || i === 7) {
        var newState = document.createElement('input');
        newState.className = oldState.id;
        newState.placeholder = oldState.innerText;
        newState.disabled = true;
        tournamentInfoWrapper.appendChild(newState);
      } else {
        if (i === 2) {
          var newState = document.createElement('input');
          newState.className = oldState.id;
          newState.placeholder = oldState.innerText;
          newState.setAttribute('type', 'date');
          tournamentInfoWrapper.appendChild(newState);
        } else {
          var newState = document.createElement('input');
          newState.className = oldState.id;
          newState.placeholder = oldState.innerText;
          tournamentInfoWrapper.appendChild(newState);
        }
      }
      var footerButtons = document.createElement('div');
      footerButtons.setAttribute('id', 'footer-buttons');
      footerButtons.setAttribute('class', 'footer-buttons');
      var confirm = document.createElement('button');
      confirm.innerText = 'CONFIRM';
      confirm.addEventListener('click', () => this.confirmEdit(IDT));
      confirm.setAttribute('class', 'confirm-button');
      footerButtons.appendChild(confirm);
      var reload = document.createElement('button');
      reload.addEventListener('click', () => location.reload());
      reload.innerText = 'CANCELAR';
      reload.setAttribute('class', 'cancel-button');
      footerButtons.appendChild(reload);
      tournamentInfoWrapper.appendChild(footerButtons);
    }
    isEditing = true;
  }
  async eraseTournament(IDT) {
    var IDO = this.state.IDO;
    var IDT = IDT;
    //console.log(IDO, '<---- IDO', IDT, '<---- IDT')
    if (confirm('¿Desea eliminar el torneo?')) {
      await fetch(`/api/organizer/delete/${IDT}/${IDO}`)
        .then((res) => location.reload())
        .catch((err) =>
          alert(
            '\n Por favor vuelva a cargar la pagina, \n\n Puede que tenga inconvenientes con el internet y la bajada de informacion'
          )
        );
    }
  }
  startTournament(IDT) {
    var startTournament = confirm('¿Esta seguro que desea comenzar el torneo');
    const newbool = 3;
    if (startTournament) {
      fetch(`/api/organizer/statusStart/${IDT}/${newbool}`).then(
        setTimeout(location.reload(), 5)
      );
    }
  }
  stopTournament(IDT) {
    var stopTournament = confirm('¿Esta seguro que desea detener el torneo');
    const newbool2 = 1;
    if (stopTournament) {
      fetch(`/api/organizer/status/${IDT}/${newbool2}`).then((res) =>
        location.reload()
      );
    }
  }
  closeInscription(IDT) {
    var oldButton = event.composedPath()[0];
    var tournamentInfoWrapper = document.getElementById(
      `tournament-info-wrapper-${IDT}`
    );
    //console.log(tournamentInfoWrapper)
    var inscStatePara = document.getElementById(`tournament-state-data-${IDT}`);
    var startButton = event.composedPath()[1].childNodes[1];
    //console.log(startButton)

    if (confirm('¿Confirmas el cambio en las inscripciones?')) {
      //console.log(inscStatePara.innerText)
      //console.log(startButton)
      const newbool =
        inscStatePara.innerText === 'Inscripciones Abiertas' ? 2 : 1;
      //console.log(newbool)
      fetch(`/api/organizer/status/${IDT}/${newbool}`);
      function iTournament() {
        oldButton.innerText = 'Cerrar Inscripcion';
        inscStatePara.innerText = 'Inscripciones Abiertas';
        startButton.disabled = true;
      }
      function openInscription() {
        oldButton.innerText = 'Abrir Inscripcion';
        inscStatePara.innerText = 'Inscripciones Cerradas';
        startButton.disabled = false;
      }
      newbool === 1 ? iTournament() : openInscription();
    }
  }
  async editText(IDT, tournamentMessage) {
    var newVipMessage = prompt('Escriba el nuevo mensaje');
    var oldVipMessage = tournamentMessage;
    oldVipMessage.innerText = newVipMessage;

    await fetch(`/api/organizer/vipMessage/${IDT}`, {
      method: 'POST',
      body: JSON.stringify({ newVipMessage }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());

    //console.log(`Valor del viejo mensaje ${oldVipMessage}\n`,`Valor del nuevo mensaje ${newVipMessage}\n`, `ID del torneo a modificar ${IDT}`)
  }
  tInfoPacketFunctions() {
    var tInfoFunctions = {
      confirmEdit: PesOrganizer.prototype.confirmEdit,
      editTournament: PesOrganizer.prototype.editTournament,
      eraseTournament: PesOrganizer.prototype.eraseTournament,
      startTournament: PesOrganizer.prototype.startTournament,
      stopTournament: PesOrganizer.prototype.stopTournament,
      closeInscription: PesOrganizer.prototype.closeInscription,
      editText: PesOrganizer.prototype.editText,
      loadTournaments: PesOrganizer.prototype.loadTournaments,
    };
    return tInfoFunctions;
  }
  // Support View Functions
  validateResults(IDT) {
    var validateResult = document.getElementById(`validate-results-div-${IDT}`);
    var chatBox = document.getElementById(`chat-${IDT}`);
    chatBox.style.display = 'none';
    validateResult.style.display === 'block'
      ? (validateResult.style.display = 'block')
      : (validateResult.style.display = 'block');
  }
  displayChat(IDT) {
    var validateResult = document.getElementById(`validate-results-div-${IDT}`);
    var chatBox = document.getElementById(`chat-${IDT}`);
    chatBox.style.display === 'block'
      ? (chatBox.style.display = 'block')
      : (chatBox.style.display = 'block');
    validateResult.style.display = 'none';
  }
  cardContentHandler(IDT, tournamentIndex) {
    var tournamentTittle = document.getElementById(`tournaments-tittle-${IDT}`);
    var infoWrapper = document.getElementById(`tournament-info-wrapper-${IDT}`);
    var stateWrapper = document.getElementById(
      `tournament-state-wrapper-${IDT}`
    );
    var chatWrapper = document.getElementById(`tournament-chat-wrapper-${IDT}`);
    var buttonClicked = event.composedPath()[0];
    var buttonInfo = document.getElementById(`button-info-${IDT}`);
    var buttonState = document.getElementById(`button-state-${IDT}`);
    var buttonChat = document.getElementById(`button-chat-${IDT}`);

    buttonClicked.name
      ? (buttonClicked = buttonClicked)
      : (buttonClicked = event.composedPath()[1]);
    //console.log(buttonClicked.name)
    if (buttonClicked.name === 'info-wrapper') {
      chatWrapper.style.display = 'none';
      buttonChat.setAttribute('class', 'info-chat');
      stateWrapper.style.display = 'none';
      buttonState.setAttribute('class', 'info-state');
      infoWrapper.style.display = 'block';
      buttonClicked.setAttribute('class', 'info-wrapper selected');
      tournamentTittle.innerText = `Zona ${tournamentIndex} - Informacion`;
    } else if (buttonClicked.name === 'info-state') {
      chatWrapper.style.display = 'none';
      buttonChat.setAttribute('class', 'info-chat');
      infoWrapper.style.display = 'none';
      buttonInfo.setAttribute('class', 'info-wrapper');
      stateWrapper.style.display = 'block';
      buttonClicked.setAttribute('class', 'info-state selected');
      tournamentTittle.innerText = `Zona ${tournamentIndex} - Estado`;
    } else if (buttonClicked.name === 'info-chat') {
      stateWrapper.style.display = 'none';
      buttonState.setAttribute('class', 'info-state');
      infoWrapper.style.display = 'none';
      buttonInfo.setAttribute('class', 'info-wrapper');
      chatWrapper.style.display = 'block';
      buttonClicked.setAttribute('class', 'info-chat selected');
      tournamentTittle.innerText = `Zona ${tournamentIndex} - Soporte`;
    }
  }
  output(data, IDT) {
    let output = document.getElementById(`chat-${data.IDT}`);
    var newMessage = document.createElement('p');
    newMessage.innerText = `${data.text}`;
    output.appendChild(newMessage);
    output.scrollTo(0, output.offsetHeight * 20);
    var chatButton = document.getElementById('chat-button');
    chatButton.style.background = 'red';
  }
  // Session buttons Display Functions
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
  componentDidMount() {
    if (sessionStorage._id) {
      this.organizerTournaments();
      //this.organizerSocket();

      // Materialize Modal
      var elems = document.querySelectorAll('.tooltipped');
      //console.log(elems)
      function modalRegen() {
        var elems = document.querySelectorAll('.createTournamentModal');
        var instances = M.Modal.init(elems);
        var instance = M.Modal.getInstance(elems[0]);
        //console.log(instance)
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
  }
  componentWillUnmount() {
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
    location.reload();
  }
  render() {
    return (
      <div id={`${game}-organaizer-main-wrapper`} className='main-wrapper'>
        {htmlTemplates.classicTemplate(
          game,
          this.state.navigation,
          this.state.watchArr,
          this.state.createClose,
          PesOrganizer.prototype.tInfoPacketFunctions,
          PesOrganizer.prototype.uploadInstances,
          PesOrganizer.prototype.selectInit,
          PesOrganizer.prototype.organizerPanel,
          PesOrganizer.prototype.orgForm,
          PesOrganizer.prototype.eraseTournament
        )}
      </div>
    );
  }
}

export default PesOrganizer;
