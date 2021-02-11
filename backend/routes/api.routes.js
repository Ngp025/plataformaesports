const express = require('express');
const router = express.Router();
const request = require('request');
const User = require('../models/users/users');
const nodemailer = require('nodemailer');
const fs = require('fs-extra');
const readline = require('readline');
const { google } = require('googleapis');
const mailgunLoader = require('mailgun-js');
const {
  apiConfig,
  ipConfig,
  mail,
  emailPass,
  emailActive,
} = require('../../config/default.js');

let mailgunAuth = mailgunLoader({
  apiKey: '319030b5bd7adac43bff227a9ed64e5d-07e45e2a-436d4ac0',
  domain: 'sandboxadb88e2ca0454c5b905e373d6daf80e7.mailgun.org',
});

function sendMail(to, from, subject, content) {
  let data = {
    to,
    from,
    subject,
    html: content,
  };
  return mailgunAuth.messages().send(data);
}

router.get('/lol/:server/:toSearch/:email', async (req, res) => {
  var api_key = '?api_key=' + apiConfig.LOL;
  var { toSearch, server, email } = req.params;
  console.log(toSearch, 'SI CORRE');
  console.log(server, 'SI CORRE');
  console.log(email, 'SI CORRE');

  request(
    {
      url: `https://${server}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${toSearch}${api_key}`,
      json: true,
    },
    async function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var apiLolJson = body;
        console.log(apiLolJson);
        const checkInfo = await User.findOne({ email: email }, { apiLol: 1 });
        console.log(checkInfo.apiLol.revisionDate);
        if (checkInfo.apiLol.revisionDate === apiLolJson.revisionDate) {
          console.log('NO SOBRE GUARDAR ');
        } else {
          await User.findOneAndUpdate(
            { email: email },
            {
              apiLol: apiLolJson,
            }
          );
        }

        res.json(body);
      } else {
        console.log(error);
        res.json({
          alert:
            'Disculpe, este nickname no esta registrado en League of Legeds. \n Si esta seguro de que existe, informenos y solucionares el inconveniente enseguida.',
        });
      }
    }
  );
});

router.get('/ip', async (req, res) => {
  const { key } = ipConfig;
  var api_key = '?access_key=' + key + '&format=1';

  request(
    {
      url: `http://api.ipstack.com/check${api_key}`,
      json: true,
    },
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var toParse = body;
        var languages = toParse.location.languages;
        //console.log(body)
        //console.log(languages)

        var json = {
          body: body,
          languages: languages,
        };

        //console.log(json)
        return res.json(json);
      } else {
        console.log(error);

        var json = {
          error: error,
        };
        return res.json(json);
      }
    }
  );
});

router.get('/sendMessage/:typeMessa/:email', async (req, res) => {
  const { typeMessa, email } = req.params;
  const TOKEN_PATH = 'token.json';
  console.log(typeMessa, 'PASANDO');

  async function sendMessage(authInfo) {
    var contentHTML = '';
    console.log('sendMessage');
    console.log(authInfo, 'authinfo');

    if (typeMessa === 'approvedNewAccount') { 
      var userInfo = await User.findOne(
        { email: email },
        { name: 1, token: 1, _id: 0 }
      );
      contentHTML = `
      <body style="padding: 0; margin: 0 auto; font-family: 'Roboto'">                
      <div id="background" class="background" style="position: absolute; z-index: 0 ; top: 0; left: 0; width: 820px; height:725px ;
      background-image: linear-gradient(to top, #fb2062, rgba(0, 0, 0, 0)); background-color: #111217;">
      <div id="wrapper" class="wrapper" style="margin: 0 auto; position: relative; display: block; top: 0; width: 520px; height: 616px; text-align: center;">
      <div id="headerMail" class="headerMail" style="padding-top: 20px">
          <div id="logoPlataforma" class="logoPlataforma" style="position: relative; margin: 0 auto;margin-top: 70px;margin-bottom: 30px; text-align: center;">
              <img src="https://res.cloudinary.com/versus/image/upload/c_scale,h_37,w_535/v1595284283/Assets/Home2.0/m2gkuogdxc3g9u4hxis8.png" alt="Plataforma Esports"></div>
          <div id="tituloDivider" class="tituloDivider" style="position: relative;display: block; margin: 0 auto;width: 440px;height: 1px;background: #fb2062;"></div>
      </div>
      <div id="cardMail" class="cardMail" style=" position: relative; width: 440px; height: 396px; margin: 0 auto; margin-top: 32px; background-color: #212433; border-radius: 6px;
          box-shadow: 0 0 50px 0 rgba(251, 32, 98, 0.25); border: solid 2px #fb2062; background-color: #212433;">
          <div id="titulo" class="titulo" style="position: relative; display: block; margin: 0 auto; padding-top: 48px;
          margin-bottom: 28px; width: 300px; height: 30px; font-family: 'Roboto'; font-size: 31px; font-weight: bold;
          font-stretch: normal; font-style: normal; line-height: 1.5; letter-spacing: normal; color: #ffffff; background: none;" 
          >¡Estás casi listo!</div>
          <div id="msjBienvenida" class="msjBienvenida" style="position: relative; display: block; margin: 0 auto; margin-bottom: 32px; padding-top: 3px; width: 340px;
          height: 48px; font-family: 'Roboto'; font-size: 22.5px; font-weight: normal; font-stretch: normal; font-style: normal; line-height: 1.2; 
          letter-spacing: normal; color: #ffffff; background: none;">¡Bienvenido  ${await userInfo.name}! Prepárate para una experiencia única en los Esports.</div>
          <div id="tokenBloque" class="tokenBloque" style="margin-bottom: 32px; background: none; padding-top: 15px">
              <div id="msjToken" class="msjToken" style="position: relative; display: block; margin: 0 auto; margin-bottom: 12px;
              width: 360px; height: 16px; font-family: 'Roboto'; font-size: 14px; font-weight: normal; font-stretch: normal;
              font-style: normal; line-height: 1.33; letter-spacing: normal;text-align: center; color: #828699; background: none;"
              >Confirma tu correo con el siguiente token y preparate.</div>
              <div class="token" style=" position: relative; display: block; margin: 0 auto; width: 300px; padding-top: 15px; padding-bottom: 12px;
              font-family: 'Roboto';font-size: 18px; font-weight: 500;font-stretch: normal; font-style: normal;line-height: 1; letter-spacing: normal;
              text-align: center; color: #ffffff;border-radius: 6px; border: solid 1px #fb2062;background-color: #111217;"
              ><strong style="color: #ffffff; font-family: 'Roboto';">${await userInfo.token}</strong></div>
          </div>
          <div id="linkWeb" class="linkWeb" style=" position: relative; display: block; margin: 0 auto; background: none;">
              <a href="https://www.plataformaesports.com/#/" style="width: 190px;height: 14px;font-family: Roboto;font-size: 16px;font-weight: 500;
              font-stretch: normal;font-style: normal;line-height: 1.29;letter-spacing: normal; text-align: center;color: #fb2062 ;
              text-decoration: none;background: none;">www.plataformaesports.com</a>
          </div>
          </div>
          </div>
          </div>
      </body>
      `;
      
      const smtpTransport = nodemailer.createTransport({
        host: 'mail.privateemail.com',
        //service: 'Gmail',
        port: 465, 
        auth: {
          //type: 'OAuth2',
          user: 'versusplay@plataformaesports.com',
          pass: "veRsuS025*"
          //clientId: authInfo._clientId,
          //clientSecret: authInfo._clientSecret,
          //refreshToken: authInfo.credentials.refresh_token,
          //accessToken: authInfo.credentials.access_token,
        },
        //tls: {rejectUnauthorized: true}
      });

      let mailOptions = {
        from: `"Plataforma Esports" ${emailActive}`,
        to: email,
        subject: 'Plataforma Esports te da la bienvenida ✔', // Subject line
        html: contentHTML,
      };

      smtpTransport.verify(function (error, success) {
        if (error) {
          console.log(error);
          res.json({
            alert: `Error: 360 verify. \n Si le aparece este error informenos y lo trataremos de ayudar.`,
          });
        } else {
          //Server is ready to take our messages
          smtpTransport.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
              res.json({
                alert:
                  'Error: 340 mail. \n Si le aparece este error informenos y lo trataremos de ayudar.',
              });
            } else {
              res.json({
                message: 'Perfecto valide el email y culminemos el registro.',
              });
            }
            smtpTransport.close();
          });
        }
      });
    }
  }

  function autorizationProcess() {
    const SCOPES = ['https://mail.google.com/'];
    const CREDENTIALS = 'credentials.json';

    function getNewToken(oAuth2Client, callback) {
      console.log('getNewToken!!!!!!');
      const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
        prompt: 'consent',
      });
      console.log('Authorize this app by visiting this url:', authUrl);
      //console.log(process.stdin, "process.stdin")
      //console.log(process.stdout, "process.stdout")
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
      console.log(content, 'content');
      authorize(JSON.parse(content), sendMessage);
    });
  }

  autorizationProcess();
});

router.post('/personalContactSendMessage', async (req, res) => {
  const { mailValue, nameValue, messageValue } = req.body;

  var contentHTML = `
        <body style="padding: 0; margin: 0 auto; font-family: 'Roboto'">  
        <div id="background" class="background" style="position: absolute; z-index: 0 ; top: 0; left: 0; width: 820px; height:950px ;
            background-image: linear-gradient(to top, #fb2062, rgba(0, 0, 0, 0)); background-color: #111217;">
            <div id="headerMail" class="headerMail" style="padding-top: 20px">
            <div id="logoPlataforma" class="logoPlataforma" style="position: relative; margin: 0 auto;margin-top: 70px;margin-bottom: 30px; text-align: center;">
                <img src="https://res.cloudinary.com/versus/image/upload/c_scale,h_37,w_535/v1595284283/Assets/Home2.0/m2gkuogdxc3g9u4hxis8.png" alt="Plataforma Esports"></div>
            <div id="tituloDivider" class="tituloDivider" style="position: relative;display: block; margin: 0 auto;width: 440px;height: 1px;background: #fb2062;"></div>
            </div>
            
            <p id="titulo" class="titulo" style="position: relative; display: block; margin: 0 auto; padding-top: 22px;
            font-family: 'Roboto'; font-size: 31px; font-weight: bold; text-align: center; background: none;
            font-stretch: normal; font-style: normal; line-height: 3.5; letter-spacing: normal; color: #FFFFFF; " 
            > Comunicado desde la pagina oficial!</p>

            <div id="cardMail" class="cardMail" style=" position: relative; width: 650px; height: 560px; margin: 0.25vh auto; margin-top: 32px; background-color: #212433; border-radius: 6px;
            box-shadow: 0 0 50px 0 rgba(251, 32, 98, 0.25); border: solid 2px #fb2062; background-color: #212433; text-align: center;">
            <div>
            <p id="msjBienvenida" class="msjBienvenida" style="position: relative; display: block; color: #FFFFFF; margin: 0 auto; margin-bottom: 32px;
            font-family: 'Roboto'; font-size: 22.5px; font-weight: normal; font-stretch: normal; font-style: normal; line-height: 3.5; 
            letter-spacing: normal; background: none;">De parte de:  ${nameValue}</p>
            </div>
            <p id="message" class="message"  style="font-family: 'Roboto'; font-size: 20px; color: #FFFFFF; font-weight: normal; font-stretch: normal; 
            font-style: normal; line-height: 1.2; letter-spacing: normal; background: none;">${messageValue}</p>
            </div>   
            </div>        
        </body>`;
  var members = [
    {
      address: mailValue,
    },
  ];

  mailgunAuth
    .lists('versus@sandboxadb88e2ca0454c5b905e373d6daf80e7.mailgun.org')
    .members()
    .add({ members: members, suscribe: false }, function (err, body) {
      console.log(body, 'created');
    });

  var list = mailgunAuth.lists(
    'versus@sandboxadb88e2ca0454c5b905e373d6daf80e7.mailgun.org'
  );
  list.members().list(function (err, members) {
    // `members` is the list of members
    console.log(members, ',members');
  });

  try {
    await sendMail(
      'versusgamingcode@gmail.com',
      mailValue,
      'Contacto de un usuario desde plataforma',
      contentHTML
    );
    res.json({
      message:
        '¡Muchas Gracias! \n Pronto leera su mensaje y se tomara en cuenta. \n Lo esperamos pronto en Plataforma Esports',
    });
  } catch (error) {
    console.log(error);
    //res.json({message: "¡Muchas Gracias por escribirnos! \n Pronto leeremos su mensaje."})
    res.json({ message: `¡Muchas Gracias! \n Pronto leeremos su mensaje.` });
  }
});



module.exports = router;
