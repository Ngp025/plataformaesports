function modalRegen() {
  /*var elems = document.querySelectorAll('.loginModal');
    var instances = M.Modal.init(elems);
    var instance = M.Modal.getInstance(elems[0]);
    instance.close();
    instance.isOpen = false;*/

  var elems2 = document.querySelectorAll('#rules-modal');
  var instances = M.Modal.init(elems2);
  var instance2 = M.Modal.getInstance(elems2[0]);
  instance2.close();
  instance2.isOpen = false;

  var elems3 = document.querySelectorAll('#enroll-form');
  var instances = M.Modal.init(elems3);
  var instance3 = M.Modal.getInstance(elems3[0]);
  instance3.close();
  instance3.isOpen = false;

  if (window.innerWidth <= 1024) {
    var elems4 = document.querySelectorAll('#calendar-modal');
    var instances = M.Modal.init(elems4);
    var instance4 = M.Modal.getInstance(elems4[0]);
    instance4.close();
    instance4.isOpen = false;
  }
  if (window.innerWidth <= 1024) {
    var elems5 = document.querySelectorAll('#support-modal');

    var instances = M.Modal.init(elems5, 1);
    var instance5 = M.Modal.getInstance(elems5[0]);
    //instance5.close();
    //instance5.isOpen = false;
  }
  function scrollFix() {
    var fixi = 196;
    fixi === 0
      ? ''
      : (fixInterval = setInterval(function windowTour() {
          if (fixi > 0) {
            window.scroll(0, fixi - 4);
            fixi--;
            fixi--;
            fixi--;
            fixi--;
          } else {
            clearInterval();
          }
        }, 13.5));
  }
  var supOptions = {
    onOpenEnd: scrollFix,
    inDuration: 10,
    preventScrolling: false,
  };

  var elems6 = document.querySelectorAll('#help-modal');
  var helpModalInstance = M.Modal.init(elems6, supOptions);
  var instance6 = M.Modal.getInstance(elems6[0]);
  instance6.close();
  instance6.isOpen = false;

  // DROPDOWN TRIGGER
  var elems = document.querySelectorAll('.dropdown-trigger');
  var instances = M.Dropdown.init(elems, 1);

  //console.log(instance3)
}

function tooltipsInit() {
  document.addEventListener('mouseover', function () {
    var elems = document.querySelectorAll('.tooltipped');
    var options = 0;
    var instances = M.Tooltip.init(elems, options);
  });
}

const modalsInit = {
  modalRegen: modalRegen,
  tooltipsInit: tooltipsInit,
};

module.exports = modalsInit;

{
  /* 
<div id='modal1' className='modal loginModal'>
  <div id='modal-content' className='modal-content'>
    <div id='login-wrapper'></div>
    {login.loginBeta(
      this.state.loginDisplay,
      this.loginState,
      this.locallogin,
      this.state.mainColor
    )}
    {login.registerBeta(this.localRegister, this.state.mainColor)}
    {login.validationModal(
      this.state.validationDisplay,
      this.state.mainColor
    )}
    <i id='close-login-modal' className='modal-close material-icons'>
      clear
    </i>
    <i
      id='return-login-modal'
      style={{ display: 'none' }}
      className='return-modal material-icons'
      onClick={() => FifaTournament.prototype.loginState('login')}>
      arrow_back
    </i>
  </div>
</div>
*/
}
