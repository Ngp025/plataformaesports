import io from 'socket.io-client';

function tournamentSupport(output) {
  if (localStorage.userData) {
    // IDT = A partir de aqui Identificador de Sala/Room de 'chat'
    var data = document.location.href;
    var IDTArray = data.split('-t_');
    var IDT = IDTArray[1].slice(0, 24);
    var IDP = JSON.parse(localStorage.userData)._id;
    // AQUI SE BAJA LA INFORMACION DEL CHAT (GET)

    // AQUI SE CONECTA AL SERVIDOR DE SOCKET.IO, NAMESPACE: 'chat'
    var tChatConnect = (IDP) => {
      return io.connect(`${process.env.HOST}:${process.env.PORT}`, {
        //
        //'https://app-fifa.herokuapp.com', {
        //`${process.env.HOST}:${process.env.PORT}`, {
        query: 'vs_IDP=' + IDP + '-logIn',
      });
    };
    var chat = tChatConnect(IDP);

    //EL USUARIO ABRE UN ESCUCHA PARA SU SALA DE CHAT Y RECIBE 'data'
    chat.on(`view${IDP}`, (data) => output(data));

    // Socket CONNECT TO ROOM
    chat.emit('create', IDP);

    // AQUI SE DECLARAN LAS VARIABLES Y EL CONTROLADOR DEL BOTON ENVIAR CHAT
    let userNick = localStorage.name;
    userNick ? console.log('cargando') : (userNick = 'usuario15');
    let btn = document.getElementById('send-button');
    //let btn2 = document.getElementById('closechat');
    let picture = localStorage.picture;
    let message = document.getElementById('message');
    //let message = 'HOLA UNO DOS TRES CUATRO CINCO CIEN MIL MILLONES QUINIENTOS DOSMIL TRESMIL CUATROMIL SEISMIL DIEZMIL'
    let time = new Date();
    let lTime = time.toLocaleTimeString();

    //console.log(userNick)
    //console.log(message.value)
    //console.log(lTime)
    //console.log(picture)
    // AQUI SE AGREGA UN CONTROLADOR BOTON DE CLOSE CUANDO SE MONTA EL COMPONENTE 'chatoff'
    {
      /*
    btn2.addEventListener('click', () => {
        chat.emit('chatOff', IDT);
      }) */
    }

    // AQUI SE AGREGA UN OYENTE AL BOTON DE ENVIAR CHAT 'send'
    document.addEventListener('keydown', (event) => {
      if (event.isComposing || event.keyCode === 13) {
        function chatMessages(userNick, text, time, picture, IDT) {
          this.userNick = userNick;
          this.text = text;
          this.time = time;
          this.picture = picture;
          this.IDT = IDT;
          //console.log(userNick)
        }
        var chatMessage = new chatMessages(
          userNick,
          message.value,
          lTime,
          picture,
          IDT
        );
        // AQUI SE EMITE EL MENSAJE DEL USUARIO
        chat.emit(`data`, chatMessage);

        // AQUI SE SUBE LA INFORMACION DEL CHAT (POST)
        fetch(`/api/tournaments/sendMessage/${IDT}`, {
          method: 'POST',
          body: JSON.stringify(chatMessage),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }).then((message.value = ''));
      }
    });
    btn.addEventListener('click', () => {
      //console.log('tocaste el boton de enviar')
      // AQUI SE CREA EL OBJETO QUE CONTENDRA TODA LA INFORMACION DEL MENSAJE
      function chatMessages(userNick, text, time, picture, IDT) {
        this.userNick = userNick;
        this.text = text;
        this.time = time;
        this.picture = picture;
        this.IDT = IDT;
      }
      var chatMessage = new chatMessages(
        userNick,
        message.value,
        lTime,
        picture,
        IDT
      );

      // AQUI SE EMITE EL MENSAJE DEL USUARIO
      chat.emit(`data`, chatMessage);

      // AQUI SE SUBE LA INFORMACION DEL CHAT (POST)
      fetch(`/api/tournaments/sendMessage/${IDT}`, {
        method: 'POST',
        body: JSON.stringify(chatMessage),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((message.value = ''));
    });
  } else {
    console.log('Desconectado del chat');
  }
}

var support = {
  tournamentSupport: tournamentSupport,
};

export default support;
