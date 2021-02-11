const fs = require('fs-extra');
const readline = require('readline');
const { google } = require('googleapis');
const nodemailer = require('nodemailer');
const { emailActive } = require('../../../../config/default.js');

function autorizationProcess(callback) {
  const SCOPES = ['https://mail.google.com/'];
  const CREDENTIALS = 'credentials.json';
  const TOKEN_PATH = 'token.json';

  function getNewToken(oAuth2Client, callback) {
    console.log('getNewToken!!!!!!');
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
      prompt: 'consent',
    });

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question('Authorization code:', (code) => {
      console.log('CODE', code);
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error retrieving access token', err);
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) return console.error(err);
          console.log('Token stored to', TOKEN_PATH);
        });
        callback(oAuth2Client);
        rl.close();
      });
    });
  }

  async function authorize(credentials, callback) {
    console.log('auth!!!');
    const { client_secret, client_id, redirect_uris } = credentials.web;

    const oAuth2Client = new google.auth.OAuth2(
      client_id, // ClientID
      client_secret, // Client Secret
      redirect_uris[0] // 0
    );

    // Set auth as a global default
    google.options({
      auth: oAuth2Client,
    });

    fs.readFile(TOKEN_PATH, async (err, token) => {
      console.log(JSON.parse(token), 'Token');
      if (err) return getNewToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client);
    });
  }

  fs.readFile(CREDENTIALS, (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Gmail API.
    //console.log(content, "content")
    authorize(JSON.parse(content), callback);
  });
};

function sendMailForEveryPlayerInsidetheTeam(IDT, objToCheckInfo) {
  var valueArr = objToCheckInfo.valueArr;
  var keysArr = objToCheckInfo.keysArr;

  async function SendPerEveryPlayer(authInfo) {
    const smtpTransport = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      service: 'Gmail',
      auth: {
        type: 'OAuth2',
        user: 'versusgamingcode',
        clientId: authInfo._clientId,
        clientSecret: authInfo._clientSecret,
        refreshToken: authInfo.credentials.refresh_token,
        accessToken: authInfo.credentials.access_token,
      },
    });

    function sendingWithCorrectInfo(emailTo, message) {
      var regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

      if (regex.test(emailTo) === true) {      
        let mailOptions = {
          from: `"Plataforma Esports" ${emailActive}`,
          to: emailTo,
          subject: 'Tu equipo Esport te solicita! Bienvenido ✔', // Subject line
          html: message,
        };
        smtpTransport.verify((error, success) => {
          if (error) {
            console.log(error, 'ero');
            //res.json({alert: `Error: 360 verify. \n Si le aparece este error informenos y lo trataremos de ayudar.`})
          } else {
            //Server is ready to take our messages
            smtpTransport.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.log(error, 'ero2');
                //res.json({alert: "Error: 340 mail. \n Si le aparece este error informenos y lo trataremos de ayudar."})
              } else {
                //res.json({message: "Perfecto valide el email y culminemos el registro."})
              }
            });
          }
        });
      }
    }

    for (var i = 1; i < valueArr.length; i++) {
      console.log('pasando por el bucle');
      console.log(keysArr[i], 'keysArr[i]');
      if (
        keysArr[i].includes(`player`) &&
        valueArr[i] !== objToCheckInfo.whoSend &&
        valueArr[i] !== ''
        //&& !objToCheckInfo.teamActual.includes(valueArr[i])
      ) {
        var url = '';
        switch (objToCheckInfo.customer) {
          case 'ROSARIO':
            objToCheckInfo.customer = 'copaciudadrosario';
            break;
          case 'CIUDAD':
            objToCheckInfo.customer = 'ciudadesports';
            break;
          case 'AMBA':
            objToCheckInfo.customer = 'ciudadautodromo';
            break;
        }

        console.log(objToCheckInfo.preExistentAccount, 'preExistentAccount');
        if (objToCheckInfo.preExistentAccount.includes(valueArr[i])) {
          //guardo el equipo en el usuario
          url = `https://www.plataformaesports.com/#/teamregister/${IDT}-${objToCheckInfo.customer}-${valueArr[i]}-TrueInfo`;
        } else {
          url = `https://www.plataformaesports.com/#/teamregister/${IDT}-${objToCheckInfo.customer}-${valueArr[i]}`;
        }

        var contentHTML = `
            <body style="padding: 0; margin: 0 auto; font-family: 'Roboto'">                
            <div id="background" class="background" style="position: absolute; z-index: 0 ; top: 0; left: 0; width: 820px; height:725px ;
            background-image: linear-gradient(to top, #fb2062, rgba(0, 0, 0, 0)); background-color: #111217;">
            <div id="wrapper" class="wrapper" style="margin: 0 auto; position: relative; display: block; top: 0; width: 520px; height: 616px; text-align: center;">
            <div id="headerMail" class="headerMail" style="padding-top: 20px">
                <div id="logoPlataforma" class="logoPlataforma" style="position: relative; margin: 0 auto;margin-top: 70px;margin-bottom: 30px; text-align: center;">
                    <img src="https://res.cloudinary.com/versus/image/upload/c_scale,h_37,w_535/v1595284283/Assets/Home2.0/m2gkuogdxc3g9u4hxis8.png" alt="Plataforma Esports"></div>
                <div id="tituloDivider" class="tituloDivider" style="position: relative;display: block; margin: 0 auto;width: 440px;height: 1px;background: #fb2062;"></div>
            </div>
            <div id="cardMail" class="cardMail" style=" position: relative; width: 480px; height: 440px; margin: 0 auto; margin-top: 32px; background-color: #212433; border-radius: 6px;
                box-shadow: 0 0 50px 0 rgba(251, 32, 98, 0.25); border: solid 2px #fb2062; background-color: #212433;">
                <label id="titulo" class="titulo" style="display:block;margin:0 auto;margin-top:24px;width:90;height:54px;font-family:'Roboto';
                font-size:27px;font-weight:900;font-stretch:normal;font-style:normal;line-height:27px;margin-bottom:24px;letter-spacing:normal;
                color:#ffffff;background:none" > ¡El equipo ${objToCheckInfo.teamName} te espera! </label>
                <div id="msjBienvenida" class="msjBienvenida" style="position: relative; display: block;
                    margin: 0 auto; margin-bottom: 32px; padding-top: 3px; width: 340px;
                    height: 48px; font-family: 'Roboto'; font-size: 22.5px; font-weight: normal; font-stretch: normal;
                    font-style: normal; line-height: 1.2; letter-spacing: normal; color: #ffffff; background: none;"
                >¡Bienvenido! Prepárate para una experiencia única en los Esports.</div>
                <div id="tokenBloque" class="tokenBloque" style="margin-bottom: 32px; background: none; padding-top: 15px">
                <div id="msjToken" class="msjToken" style="position: relative; display: block; margin: 0 auto; margin-bottom: 12px;
                width: 360px; height: 16px; font-family: 'Roboto'; font-size: 14px; font-weight: normal; font-stretch: normal;
                font-style: normal; line-height: 1.33; letter-spacing: normal;text-align: center; color: #828699; background: none;"
                >Confirmanos si eres parte del equipo Esports.</div>
                <div class="token" style=" position: relative; display: block; margin: 0 auto; width: 300px; padding-top: 15px; padding-bottom: 12px;
                font-family: 'Roboto';font-size: 18px; font-weight: 500;font-stretch: normal; font-style: normal;line-height: 1; letter-spacing: normal;
                text-align: center; color: #ffffff;border-radius: 6px; border: solid 1px #fb2062;background-color: #111217;"
                ><a href=${url} style="color: white " > Ingresa te estamos esperando </a></div>
            </div>
                <div id="linkWeb" class="linkWeb" style=" position: relative; display: block; margin: 0 auto; background: none;">
                <a href="https://www.plataformaesports.com/#/" style="width: 190px;height: 14px;font-family: Roboto;font-size: 16px;font-weight: 500;
                font-stretch: normal;font-style: normal;line-height: 1.29;letter-spacing: normal; text-align: center;color: #fb2062 ;
                text-decoration: none;background: none;">www.plataformaesports.com</a>
                </div>
                <div id="errorOrFalt" class="errorOrFalt" style="position: relative; display: block; margin: 0 auto; margin-bottom: 12px;
                width: 360px; height: 16px; font-family: 'Roboto'; font-size: 14px; font-weight: normal; font-stretch: normal;
                font-style: normal; line-height: 1.33; letter-spacing: normal;text-align: center; color: #828699; background: none;"
                >Si de lo contrario no reconoces estar con este equipo Esport, por favor ignora este mensaje.</div>
                </div>
                </div>
                </div>
            </body>
        `;

        sendingWithCorrectInfo(valueArr[i], contentHTML);

        /*var regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            
            if(regex.test(valueArr[i]) === true){
                let mailOptions = {    
                    from: `"Plataforma Esports" ${emailActive}`,
                    to: valueArr[i],
                    subject: 'Tu equipo Esport te solicita! Bienvenido ✔', // Subject line
                    html: contentHTML,
                }
        
                smtpTransport.verify((error, success) => {
                    if (error) {
                        console.log(error,"ero");
                        //res.json({alert: `Error: 360 verify. \n Si le aparece este error informenos y lo trataremos de ayudar.`})
                    } else {
                        //Server is ready to take our messages
                        smtpTransport.sendMail(mailOptions, (error, info) => {
                            if(error){
                                console.log(error,"ero2")
                                //res.json({alert: "Error: 340 mail. \n Si le aparece este error informenos y lo trataremos de ayudar."})
                            } else {
                                //res.json({message: "Perfecto valide el email y culminemos el registro."})
                            }
                        });
                    };
                });*/
      } else {
        console.log('Un email no fue procesado', valueArr[i]);
      }
    }

    smtpTransport.close();
    //return true
  }

  autorizationProcess(SendPerEveryPlayer);
};

function sendMailForRecoveryPass(to, contentHTML) {
  var regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  function sendRecovery(authInfo) {
    const smtpTransport = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      service: 'Gmail',
      auth: {
        type: 'OAuth2',
        user: 'versusgamingcode',
        clientId: authInfo._clientId,
        clientSecret: authInfo._clientSecret,
        refreshToken: authInfo.credentials.refresh_token,
        accessToken: authInfo.credentials.access_token,
      },
    });

    if (regex.test(to) === true) {
      let mailOptions = {
        from: `"Plataforma Esports" ${emailActive}`,
        to: to,
        subject: 'Reset password email.', // Subject line
        html: contentHTML,
      };
      smtpTransport.verify((error, success) => {
        if (error) { 
          console.log(error, 'ero');
          //res.json({alert: `Error: 360 verify. \n Si le aparece este error informenos y lo trataremos de ayudar.`})
        } else {
          //Server is ready to take our messages
          smtpTransport.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error, 'ero2');
              //res.json({alert: "Error: 340 mail. \n Si le aparece este error informenos y lo trataremos de ayudar."})
            } else {
              //res.json({message: "Perfecto valide el email y culminemos el registro."})
            }
          });
        }
      });
    }

    smtpTransport.close();
  }

  autorizationProcess(sendRecovery);
};

function sendMailForEveryPlayerInsideTheTournament(IDT, json) {
  var valueArr = json.arrayWithArray;

  async function SendPerEveryPlayer(authInfo) {
    const smtpTransport = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      service: 'Gmail',
      auth: {
        type: 'OAuth2',
        user: 'versusgamingcode',
        clientId: authInfo._clientId,
        clientSecret: authInfo._clientSecret,
        refreshToken: authInfo.credentials.refresh_token,
        accessToken: authInfo.credentials.access_token,
      },
    });

    function sendingWithCorrectInfo(emailTo, message) {
      var regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

      if (regex.test(emailTo) === true) {      
        let mailOptions = {
          from: `"Plataforma Esports" ${emailActive}`,
          to: emailTo,
          subject: '¡El torneo esta por empezar! ✔', // Subject line
          html: message,
        };
        smtpTransport.verify((error, success) => {
          if (error) {
            console.log(error, 'ero');
          } else {
            //Server is ready to take our messages
            smtpTransport.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.log(error, 'ero2');
              } 
            });
          }
        });
      }
    }
   
    switch (json.customer) {
      case 'ROSARIO':
        json.customer = 'copaciudadrosario';
      break;
      case 'CIUDAD':
        json.customer = 'ciudadesports';
      break;
      case 'AMBA':
        json.customer = 'ciudadautodromo';
      break;
    }

    for (var i = 0; i < valueArr.length; i++) {
      console.log('pasando por el bucle');
      contentHTML = `
      <body style="padding: 0; margin: 0 auto; font-family: 'Roboto'">                
      <div id="background" class="background" style="position: absolute; z-index: 0 ; top: 0; left: 0; width: 100%; height: 100% ; rgb(29, 29, 34);">
      <p id="paragraph" style="color:'white'">
      Buen día ${valueArr[i][1]}, le queremos informar la siguiente ronda del torneo de FIFA 20, organizado por la municipalidad de rosario.

      <h4>Link de torneo:</h4>
      https://plataformaesports.com/#/fifa20-tournament/-t_${IDT}
      
      Hola ${valueArr[i][1]} te informamos que su proximo rival es ${valueArr[i][2]} a continuación te dejamos el cronograma.

      <h4>RONDA 2 - 128 jugadores - EN CURSO</h4>
      
      ACLARAMOS: Esta ronda vamos a mantener , EL EMPATE NO CUENTA, NI A GOL DE ORO . El que gane 2 partidos avanza de ronda, sin contemplar el global.
      
      Ronda 2 - Martes 22 - 19:30 hs  ||
      Ronda 3 - Miércoles 23 - 19:30 hs  ||
      Ronda 4 - Jueves 24 - 19:30 hs  || 
      Octavos - Jueves 24 - 20:30 hs  || 
     
      <h4>Fase final - 8 Jugadores</h4>

      Cuartos - Viernes 25 - 19:30 hs   ||
      Semifinal - Viernes 25 - 20:30 hs   ||
      Final - Viernes 25 - 21:30 hs   ||
      
      (Puede existir algún retraso de acuerdo a la demora en los brackets en ese caso será notificado por WhatsApp  o a través del mensaje del día en la aplicación)
      <h4>Método de competencia: </h4>
      Usted jugará un enfrentamiento al mejor de tres, (Bo3) de lunes a jueves el mismo jueves se jugarán los cuartos de final y el viernes se jugará semifinal y final a partir de las 19:30. 
      
      <h4>Rival:</h4>
      ${valueArr[i][2]}
      
      <h4>Validar resultado: </h4>
      Una vez terminado el enfrentamiento solo el ganador deberá subir una foto donde se pueda ver el resultado de la partida. (La falta de veracidad en la prueba lleva a la desclasificación directa de este y futuros torneos). Usted deberá validar cada partida ganada del mejor de tres.
      
      <h4>Soporte:</h4> 
      https://chat.whatsapp.com/FYD7P1Xjhw3EwH4b4lCBhE

      <h4>Reglamento:</h4>
      https://docs.google.com/document/d/1rEKOgJi494wGRVRFZmKMsEufEv__o2l0nq1YeMO2Jus/edit?usp=sharing
      
      </p>
          <div id="linkWeb" class="linkWeb" style=" position: relative; display: block; margin: 0 auto; background: none;">
              <a href="https://www.plataformaesports.com/#/${json.customer}" style="width: 190px;height: 14px;font-family: Roboto;font-size: 16px;font-weight: 500;
              font-stretch: normal;font-style: normal;line-height: 1.29;letter-spacing: normal; text-align: center;color: #fb2062 ;
              text-decoration: none;background: none;">www.plataformaesports.com</a>
          </div>
          </div>
          </div>
          </div>
      </body>
    `;

      if (valueArr[i][0]) {
        sendingWithCorrectInfo(valueArr[i][0], contentHTML);
      } else {
        console.log('Un email no existe', valueArr[i][0]);
      }
    }

    smtpTransport.close();
    //return true
  }

  autorizationProcess(SendPerEveryPlayer);
};

module.exports = {
  sendMailForEveryPlayerInsidetheTeam,
  sendMailForRecoveryPass,
  sendMailForEveryPlayerInsideTheTournament
};
