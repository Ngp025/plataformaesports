function tournamentSlidesRender(
  tInfo,
  prop,
  tittle,
  invoked,
  slideBoxId,
  str,
  game
) {
  var t = tInfo;
  var tittle = tittle;
  var tMax = t.length;
  var cut = Math.ceil(tMax / str);
  var slidesBoxContent = document.getElementById(`${slideBoxId}`);
  var slidesRegeneration = document.getElementById(`slides-wrapper-${prop}`);
  var slidesWrapper = document.createElement('div');
  slidesRegeneration ? (slidesWrapper = slidesRegeneration) : '';
  function loadContext() {
    var slidesContent = document.createElement('div');
    var slideTittle = document.createElement('label');
    slideTittle.innerText = tittle;
    slidesContent.setAttribute('id', `slides-content-${prop}`);
    slideTittle.setAttribute('id', 'slide-tittle');
    slidesWrapper.setAttribute('id', `slides-wrapper-${prop}`);
    slidesWrapper.appendChild(slideTittle);
    slidesWrapper.appendChild(slidesContent);
  }
  function regenContext() {
    var contentRegen = document.getElementById(`slides-content-${prop}`);
    function regen() {
      var slidesContent = document.createElement('div');
      var slideTittle = document.createElement('label');
      slideTittle.innerText = tittle;
      slidesContent.setAttribute('id', `slides-content-${prop}`);
      slideTittle.setAttribute('id', 'slide-tittle');
      slidesWrapper.setAttribute('id', `slides-wrapper-${prop}`);
      slidesWrapper.appendChild(slideTittle);
      slidesWrapper.appendChild(slidesContent);
    }
    contentRegen ? '' : regen();
  }
  invoked === 'load' ? loadContext() : regenContext();
  if (tInfo.length - 1 > str) {
    var navPrev = document.createElement('a');
    var navNext = document.createElement('a');
    function load(state) {
      navPrev.setAttribute('id', `nav-link1-theme1-on-${prop}`);
      navNext.setAttribute('id', `nav-link2-theme1-on-${prop}`);
      navPrev.addEventListener('click', () =>
        FifaPlaylanding.prototype.slidesHandler('prev', tInfo.length, prop, str)
      );
      navNext.addEventListener('click', () =>
        FifaPlaylanding.prototype.slidesHandler('next', tInfo.length, prop, str)
      );
      slidesWrapper.appendChild(navPrev);
      slidesWrapper.appendChild(navNext);
    }
    var navRegen = document.getElementById(`nav-link1-theme1-on-${prop}`);
    //navRegen ? '' : load(this.state)
  } else {
  }
  slidesBoxContent.appendChild(slidesWrapper);
  for (var i = 0; i < cut; i++) {
    function sectionLoad() {
      var newSection = document.createElement('section');
      newSection.setAttribute('id', `section${i}-${prop}`);
      if (i === 0) {
        newSection.style.display = 'block';
      } else {
        newSection.style.display = 'none';
      }
      var slidesContent = slidesWrapper.childNodes[1];
      slidesContent.appendChild(newSection);
    }
    var sectionRegen = slidesWrapper.childNodes[1].childNodes[i];
    sectionRegen ? '' : sectionLoad();

    var cases = [];
    cases.shift();
    cases.push(i);
    var indexPoint = i * str;
    var breakPoint = i * str + str;
    switch (i) {
      case 0:
        t.slice(indexPoint, breakPoint).map((to) => {
          var imageContainerRegen = document.getElementsByName(
            `ic-${i}-${prop}`
          );
          if (imageContainerRegen.length >= str) {
          } else {
            var IDT = to._id;
            // Tournament Image, Appenchill
            // TOURNAMENTS APPENDCHIL
            var imageContainer = document.createElement('div');
            imageContainer.setAttribute('class', 'image-container');
            imageContainer.setAttribute('name', `ic-${i}-${prop}`);

            //console.log(to)

            function tournamentRedirect() {
              location.href = `#/${game}-tournament/-t_${to._id}-ti_${to.imageMini}`;
            }

            // Tournament Name

            var tournamentTittle = document.createElement('label');
            tournamentTittle.setAttribute('id', `tournamentTittle-${IDT}`);
            tournamentTittle.setAttribute('class', 'tournamentTittle');
            tournamentTittle.innerHTML = `<i class='material-icons'>short_text</i>${to.tournamentName}`;
            tournamentTittle.addEventListener('click', () =>
              tournamentRedirect()
            );
            imageContainer.appendChild(tournamentTittle);

            // Maximo de Jugadores

            var tournamentMax = document.createElement('label');
            tournamentMax.setAttribute('id', `tournamentMax-${IDT}`);
            tournamentMax.setAttribute('class', 'tournamentMax');
            tournamentMax.innerHTML = `<i class='material-icons'>star_half</i>${to.tMain.length}/${to.cMax}`;
            tournamentMax.addEventListener('click', () => tournamentRedirect());
            imageContainer.appendChild(tournamentMax);

            // Hora de comienzo
            var tStart = document.createElement('label');
            tStart.setAttribute('id', `tStart-${IDT}`);
            tStart.setAttribute('class', 'tStart');
            tStart.innerHTML = `<i class='material-icons'>av_timer</i>${to.tStart} `;
            tStart.addEventListener('click', () => tournamentRedirect());
            imageContainer.appendChild(tStart);

            // Premio

            var tAward = document.createElement('label');
            tAward.setAttribute('id', `tAward-${IDT}`);
            tAward.setAttribute('class', 'tAward');
            tAward.innerHTML = `<i class='material-icons'>monetization_on</i>${to.tAward} `;
            tAward.addEventListener('click', () => tournamentRedirect());
            imageContainer.appendChild(tAward);

            // Fecha

            //var tAward = document.createElement('newElemnt');
            //tAward.setAttribute('id', `tAward-${IDT}`);
            //tAward.setAttribute('class', 'tAward');
            //imageContainer.appendChild(tAward);

            //tDate.slice(5, 10)
            // REgion
            //var tournamentServer = document.createElement('newElemnt');
            //tournamentServer.setAttribute('id', `tournamentTittle-${IDT}`);
            //tournamentServer.setAttribute('class', 'tournamentTittle');
            //tournamentServer.innerHTML = `<label><i class='material-icons'>flag</i>${to.tournamentServer}</label>`
            //imageContainer.appendChild(tournamentServer);

            // tImg
            var tImg = document.createElement('img');
            tImg.setAttribute('id', `${to._id}`);
            tImg.setAttribute('src', `${to.imageMini}`);
            if (localStorage.userData) {
              tImg.addEventListener('click', () => tournamentRedirect());
            } else {
              tImg.addEventListener('click', () =>
                alert('Inicia sesion, antes de continuar')
              );
            }
            //console.log(to)

            var section = document.getElementById(`section${i}-${prop}`);
            imageContainer.appendChild(tImg);
            section.appendChild(imageContainer);

            var try00 = document.getElementsByName(`${tittle}`);
            if (try00.length === 0) {
              function nextSlide(slideNum) {
                if (t[slideNum]) {
                  var img = t[slideNum].imageMini;
                  var nextSlide = document.createElement('div');
                  nextSlide.setAttribute('name', `${tittle}`);
                  nextSlide.setAttribute('class', 'next-slide');

                  // Tournament Name

                  var tournamentTittle = document.createElement('label');
                  tournamentTittle.setAttribute(
                    'id',
                    `tournamentTittle-${IDT}`
                  );
                  tournamentTittle.setAttribute('class', 'tournamentTittle');
                  tournamentTittle.innerHTML = `<i class='material-icons'>short_text</i>${to.tournamentName}`;
                  nextSlide.appendChild(tournamentTittle);

                  // Maximo de Jugadores

                  var tournamentMax = document.createElement('label');
                  tournamentMax.setAttribute('id', `tournamentMax-${IDT}`);
                  tournamentMax.setAttribute('class', 'tournamentMax');
                  tournamentMax.innerHTML = `<i class='material-icons'>star_half</i>${to.tMain.length}/${to.cMax}`;
                  nextSlide.appendChild(tournamentMax);

                  // Hora de comienzo
                  var tStart = document.createElement('label');
                  tStart.setAttribute('id', `tStart-${IDT}`);
                  tStart.setAttribute('class', 'tStart');
                  tStart.innerHTML = `<i class='material-icons'>av_timer</i>${to.tStart} `;
                  nextSlide.appendChild(tStart);

                  // Premio

                  var tAward = document.createElement('label');
                  tAward.setAttribute('id', `tAward-${IDT}`);
                  tAward.setAttribute('class', 'tAward');
                  tAward.innerHTML = `<i class='material-icons'>monetization_on</i>${to.tAward} `;
                  nextSlide.appendChild(tAward);

                  var nsImg = document.createElement('img');
                  nsImg.setAttribute('src', `${img}`);
                  nextSlide.appendChild(nsImg);
                  return nextSlide;
                }
              }
              if (section.childNodes[str - 1]) {
                t[breakPoint] ? section.appendChild(nextSlide(breakPoint)) : '';
              }
            }
          }
        });
        break;
      case cases[0]:
        t.slice(indexPoint, breakPoint).map((to) => {
          var IDT = to._id;
          var imageContainerRegen = document.getElementsByName(
            `ic-${i}-${prop}`
          );
          if (imageContainerRegen.length >= str) {
          } else {
            // TOURNAMENTS APPENDCHIL
            var imageContainer = document.createElement('div');
            imageContainer.setAttribute('class', 'image-container');
            imageContainer.setAttribute('name', `ic-${i}-${prop}`);
            //console.log(to)
            // Tournament Name

            var tournamentTittle = document.createElement('label');
            tournamentTittle.setAttribute('id', `tournamentTittle-${IDT}`);
            tournamentTittle.setAttribute('class', 'tournamentTittle');
            tournamentTittle.innerHTML = `<i class='material-icons'>short_text</i>${to.tournamentName}`;
            imageContainer.appendChild(tournamentTittle);

            // Maximo de Jugadores

            var tournamentMax = document.createElement('label');
            tournamentMax.setAttribute('id', `tournamentMax-${IDT}`);
            tournamentMax.setAttribute('class', 'tournamentMax');
            tournamentMax.innerHTML = `<label><i class='material-icons'>star_half</i>${to.cMax}</label> `;
            imageContainer.appendChild(tournamentMax);

            // REgion
            //var tournamentServer = document.createElement('newElemnt');
            //tournamentServer.setAttribute('id', `tournamentTittle-${IDT}`);
            //tournamentServer.setAttribute('class', 'tournamentTittle');
            //tournamentServer.innerHTML = `<label><i class='material-icons'>flag</i>${to.tournamentServer}</label>`
            //imageContainer.appendChild(tournamentServer);

            var tImg = document.createElement('img');
            tImg.setAttribute('id', `${to._id}`);
            tImg.setAttribute('src', `${to.imageMini}`);
            if (localStorage.userData) {
              tImg.addEventListener(
                'click',
                () =>
                  (document.location.href = `#/fifa-tournament/-t_${to._id}-ti_${to.imageMini}`)
              );
            } else {
              tImg.addEventListener('click', () =>
                alert('Inicia sesion, antes de continuar')
              );
            }

            var tStart = document.createElement('tStart');
            tStart.setAttribute('id', `tStart-${prop}`);
            tStart.setAttribute('className', `tStart`);
            tStart.innerText = ``;
            imageContainer.appendChild(tImg);

            var section = document.getElementById(`section${i}-${prop}`);
            imageContainer.appendChild(tImg);
            section.appendChild(imageContainer);

            var try00 = document.getElementsByName(`${tittle}`);
            if (try00.length) {
              function nextSlide(slideNum) {
                if (t[slideNum]) {
                  var img = t[slideNum].imageMini;
                  var nextSlide = document.createElement('div');
                  nextSlide.setAttribute('name', `${tittle}`);
                  nextSlide.setAttribute('class', 'next-slide');
                  var nsImg = document.createElement('img');
                  nsImg.setAttribute('src', `${img}`);
                  nextSlide.appendChild(nsImg);
                  return nextSlide;
                }
              }
              //console.log(section)
              if (section.childNodes[str - 1]) {
                t[breakPoint]
                  ? section.appendChild(nextSlide(breakPoint))
                  : section.insertBefore(nextSlide(0), section.childNodes[0]);
              } else {
                function fixSlide(ti) {
                  var imageContainerFix = document.createElement('div');
                  imageContainerFix.setAttribute('class', 'image-container');
                  imageContainer.setAttribute('name', `sf-${prop}`);
                  var fixImg = document.createElement('img');
                  fixImg.setAttribute('id', `${ti._id}`);
                  fixImg.setAttribute('src', `${ti.imageMini}`);
                  fixImg.addEventListener(
                    'click',
                    () =>
                      (document.location.href = `#/fifa-tournament/-t_${ti._id}-ti_${ti.imageMini}`)
                  );
                  imageContainerFix.appendChild(fixImg);
                  imageContainerFix.addEventListener('mouseenter', function () {
                    event.stopPropagation();
                    event.path[2].childNodes[0].childNodes[0].setAttribute(
                      'class',
                      'next-slide-hover'
                    );
                  });
                  imageContainerFix.addEventListener('mouseleave', function () {
                    event.stopPropagation();
                    event.path[2].childNodes[0].childNodes[0].setAttribute(
                      'class',
                      'next-slide'
                    );
                  });
                  section.insertBefore(
                    imageContainerFix,
                    section.childNodes[4]
                  );
                }
                var sf = document.getElementsByName(`sf-${prop}`);
                function countTournament() {
                  var ref = document.getElementsByName(`ic-${i}-${prop}`);
                  // console.log(ref, 'ref.length')
                  function add1() {
                    // console.log('add1')
                    /*
                  if(ref.length === 3){
                    fixSlide(t[indexPoint-indexPoint] )
                    section.insertBefore(nextSlide(0),section.childNodes[0])
                    }
                    */
                  }
                  function add2() {
                    // console.log('add2')
                    /* if(ref.length === 2){
                    fixSlide(t[indexPoint-indexPoint] )
                    fixSlide(t[indexPoint-indexPoint+1] )
                    section.insertBefore(nextSlide(0),section.childNodes[0])
                  } */
                  }
                  function add3() {
                    if (ref.length === 1) {
                      // console.log('aqui', indexPoint)
                      /*fixSlide(t[indexPoint-indexPoint] )
                    fixSlide(t[indexPoint-indexPoint+1] )
                    fixSlide(t[indexPoint-indexPoint+2] )
                    section.insertBefore(nextSlide(0),section.childNodes[0]) */
                    }
                    /* if(ref.length === 1){
                    console.log('aqui', indexPoint)
                    fixSlide(t[indexPoint-indexPoint] )
                    fixSlide(t[indexPoint-indexPoint+1] )
                    fixSlide(t[indexPoint-indexPoint+2] )
                    section.insertBefore(nextSlide(0),section.childNodes[0])
                    } */
                  }
                  function add4() {
                    // console.log('add4')
                    /*
                  if(ref.length === 0){
                    console.log('aqui', indexPoint)
                    fixSlide(t[indexPoint-indexPoint] )
                    fixSlide(t[indexPoint-indexPoint+1] )
                    fixSlide(t[indexPoint-indexPoint+2] )
                    fixSlide(t[indexPoint-indexPoint+3] )
                    section.insertBefore(nextSlide(0),section.childNodes[0])
                    } */
                  }
                  function slidesFive() {
                    t[indexPoint]
                      ? t[indexPoint + 1]
                        ? t[indexPoint + 2]
                          ? t[indexPoint + 3]
                            ? add1()
                            : add2()
                          : add3()
                        : add4()
                      : '';
                  }
                  function slidesFour() {
                    t[indexPoint]
                      ? t[indexPoint + 1]
                        ? t[indexPoint + 2]
                          ? add1()
                          : add2()
                        : add3()
                      : '';
                  }
                  function slidesTree() {
                    t[indexPoint] ? (t[indexPoint + 1] ? add1() : add2()) : '';
                  }
                  function slidesTwo() {
                    t[indexPoint] ? add1() : '';
                  }
                  //console.log(str , 'str')
                  str === 5
                    ? slidesFive()
                    : str === 4
                    ? slidesFour()
                    : str === 3
                    ? slidesTree()
                    : str === 2
                    ? slidesTwo()
                    : '';
                }
                sf.length === 0 ? countTournament() : '';
              }
            }
          }
        });
        break;
    }
  }
}

function userTournamentRegisters(tData, index, boxId) {
  var buttonWrapper = document.getElementById(`${boxId}`);
  //console.log(tData, index, boxId)
  if (tData[0]._id) {
    var labelText = 'Torneos Inscriptos';
    buttonWrapper.innerHTML = `<label id='nav-t-button-label' class='nav-t-button-label'>${labelText}</label>`;
    // console.log(tData)
    tData.map((to) => {
      var tName = to.tournamentName;
      var imageMini = to.imageMini;
      var IDT = to._id;
      var tournamentEnrolledButton = document.createElement('button');
      tournamentEnrolledButton.setAttribute(
        'id',
        `tournamentEnrolledButton-${IDT}`
      );
      tournamentEnrolledButton.setAttribute(
        'class',
        'tournamentEnrolledButton'
      );
      tournamentEnrolledButton.innerText = tName;
      tournamentEnrolledButton.addEventListener(
        'click',
        () =>
          (location.href = `#/${to.game}-tournament/-t_${IDT}-ti_${imageMini}`)
      );
      buttonWrapper.appendChild(tournamentEnrolledButton);
    });
  } else {
    var labelText = 'Escoge un torneo para empezar';
    buttonWrapper.innerHTML = `<label id='nav-t-button-label' class='nav-t-button-label'>${labelText}</label>`;
  }
}

const tournamentsRender = {
  tournamentSlidesRender: tournamentSlidesRender,
  userTournamentRegisters: userTournamentRegisters,
};
export default tournamentsRender;
