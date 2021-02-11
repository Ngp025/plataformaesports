const express = require('express');
const users = express.Router();
const request = require('request');
const { ipConfig, emailPass } = require('../../../config/default.js');
const Connetion = require('../../models/users/usersConnection');
const User = require('../../models/users/users');
const Teams = require('../../models/users/teams');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const {
  randomToken,
} = require('../routes-methods/tournaments/tournamentsFunctions.js');
const {
  sendMailForRecoveryPass,
} = require('../routes-methods/mails/sendMessages.js');
const {
  addNewValuesToSomeoneInTheTeam,
  reEstructureTeamInAArray,
} = require('../routes-methods/teams/teamsFunctions');

// - - - - -  PUT
// Eliminando favorito
users.put('/viewDel/:idU', async (req, res, cb) => {
  const { tID, idU } = req.body;

  await User.findByIdAndUpdate(
    { _id: idU },
    {
      $pull: { fViews: tID },
    },
    { returnNewDocument: true, new: true },
    (err, doc) => {
      if (err) {
        console.log('Something wrong when updating data!');
      } else {
        const fViews = doc.fViews;
        console.log(fViews);
        res.json(fViews);
      }
    }
  ).catch((err) => {
    res.send('error: ' + err);
  });
});
// Agregando favorito
users.put('/view/:idU', async (req, res, cb) => {
  const { tID, idU } = req.body;

  await User.findByIdAndUpdate(
    { _id: idU },
    {
      $addToSet: { fViews: tID },
    },
    { returnNewDocument: true, new: true },
    (err, doc) => {
      if (err) {
        console.log('Something wrong when updating data!');
      } else {
        const fViews = doc.fViews;
        console.log(fViews);
        res.json(fViews);
      }
    }
  )
    .then((res1) => {})
    .catch((err) => {
      res.send('error: ' + err);
    }); //??save
  // razon del {new: true} https://github.com/Automattic/mongoose/issues/2262

  //return res.json({ statusText: 'Torneo Oculto y Guardado'})
});
// Editando Perfil
users.put('/editProfile/:IDU', async (req, res) => {
  console.log(req.body, 'edit profile');

  await User.findByIdAndUpdate(
    { _id: req.params.IDU },
    {
      $set: {
        name: req.body.name,
        document: req.body.document,
        //'email': req.body.email,
        born: req.body.born,
        address: req.body.address,
        phone: req.body.phone,
        tutorsName: req.body.tutorsName,
        tutorsDocument: req.body.tutorsDocument,
      },
    },
    { returnNewDocument: true, new: true },
    (err, doc) => {
      if (err) {
        console.log('Something wrong when change info!');
        res.json({
          alert: 'Error la edificion de perfil no pudo ser completada',
        });
      } else {
        const UDT = {
          name: doc.name,
          document: doc.document,
          born: doc.born,
          // email: doc.email,
          address: doc.address,
          phone: doc.phone,
          tutorsName: doc.tutorsName,
          tutorsDocument: doc.tutorsDocument,
        };
        console.log(UDT);
        res.json(UDT);
      }
    }
  );
});
users.put('/editEmail/:IDU', async (req, res) => {
  const { IDU } = req.params;
  const { email, password } = req.body;
  const userInfo = await User.findOne(
    { _id: IDU },
    { name: 1, email: 1, password: 1 }
  );
  console.log(userInfo);
  if (userInfo) {
    console.log('PASAAAAA');
    //await User.findOne({ _})

    if (email !== userInfo.email) {
      console.log('email diferentes');

      bcrypt.compare(password, userInfo.password, async (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          await User.findByIdAndUpdate(
            { _id: IDU },
            {
              $set: { email: email },
            },
            { returnNewDocument: true, new: true },
            (err, doc) => {
              if (err) {
                console.log('Something wrong when change info!');
                res.json({
                  alert:
                    'Error la edificion de perfil no pudo ser completada. \n Muy probablemente por inconvenientes con su conexion de red al momento de la edicion.',
                });
              } else {
                console.log('exito al cambiar de email');
              }
            }
          );
          var contentHTMLold = `
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
                      >¡Nuevo Email Oficial!</div>
                      <div id="msjBienvenida" class="msjBienvenida" style="position: relative; display: block; margin: 0 auto; margin-bottom: 32px; padding-top: 3px; width: 340px;
                      height: 48px; font-family: 'Roboto'; font-size: 22.5px; font-weight: normal; font-stretch: normal; font-style: normal; line-height: 1.2; 
                      letter-spacing: normal; color: #ffffff; background: none;">${userInfo.name}, Se nos ha informado de un cambio de email.</div>
                      <div id="tokenBloque" class="tokenBloque" style="margin-bottom: 32px; background: none; padding-top: 15px">
                          <div id="msjToken" class="msjToken" style="position: relative; display: block; margin: 0 auto; margin-bottom: 12px;
                          width: 360px; height: 16px; font-family: 'Roboto'; font-size: 14px; font-weight: normal; font-stretch: normal;
                          font-style: normal; line-height: 1.33; letter-spacing: normal;text-align: center; color: #828699; background: none;"
                          >Este sera el ultimo mensaje a este correo, Gracias por actualizar. A continuación su nuevo correo oficial.</div>
                          <div class="token" style=" position: relative; display: block; margin: 0 auto; width: 300px; padding-top: 15px; padding-bottom: 12px;
                          font-family: 'Roboto';font-size: 18px; font-weight: 500;font-stretch: normal; font-style: normal;line-height: 1; letter-spacing: normal;
                          text-align: center; color: #ffffff;border-radius: 6px; border: solid 1px #fb2062;background-color: #111217;"
                          ><strong style="color: #ffffff; font-family: 'Roboto';">${email}</strong></div>
                      </div>
                      <div id="linkWeb" class="linkWeb" style=" position: relative; display: block; margin: 0 auto; background: none;">
                          <a href="https://www.plataformaesports.com/#/" style="width: 190px;height: 14px;font-family: Roboto;font-size: 16px;font-weight: 500;
                          font-stretch: normal;font-style: normal;line-height: 1.29;letter-spacing: normal; text-align: center;color: #fb2062 ;
                          text-decoration: none;background: none;">www.plataformaesports.com</a>
                      </div>
                      </div>
                      </div>
                      </div>
                  </body>`;
          var contentHTMLnew = `
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
                      >¡Nuevo Email!</div>
                      <div id="msjBienvenida" class="msjBienvenida" style="position: relative; display: block; margin: 0 auto; margin-bottom: 32px; padding-top: 3px; width: 340px;
                      height: 48px; font-family: 'Roboto'; font-size: 22.5px; font-weight: normal; font-stretch: normal; font-style: normal; line-height: 1.2; 
                      letter-spacing: normal; color: #ffffff; background: none;">Hola ${userInfo.name}! Excelente actualizacion de email.</div>
                      
                      <div id="msjBienvenida" class="msjBienvenida" style="position: relative; display: block; margin: 0 auto; margin-bottom: 32px; padding-top: 3px; width: 340px;
                      height: 48px; font-family: 'Roboto'; font-size: 22.5px; font-weight: normal; font-stretch: normal; font-style: normal; line-height: 1.2; 
                      letter-spacing: normal; color: #ffffff; background: none;">Muchas gracias por actualizar. Lo esperamos en su platafoma de Esports favorita 
                      para continuar avanzando en esta gran aventura </div>
                      
                      <div id="msjToken" class="msjToken" style="position: relative; display: block; margin: 0 auto; margin-bottom: 12px;
                      width: 360px; height: 16px; font-family: 'Roboto'; font-size: 14px; font-weight: normal; font-stretch: normal;
                      font-style: italic; line-height: 1.33; letter-spacing: normal;text-align: center; color: #828699; background: none;"
                      >Nota: Recuerde que mas alla de que su correo fue actualizado, aun mantiene su contraseña como siempre. </div>
                      
                      <div id="linkWeb" class="linkWeb" style=" position: relative; display: block; margin: 0 auto; background: none;">
                          <a href="https://www.plataformaesports.com" style="width: 190px;height: 14px;font-family: Roboto;font-size: 16px;font-weight: 500;
                          font-stretch: normal;font-style: normal;line-height: 1.29;letter-spacing: normal; text-align: center;color: #fb2062 ;
                          text-decoration: none;background: none;">www.plataformaesports.com</a>
                      </div>
                      </div>
                      </div>
                      </div>
                  </body>`;
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'versusgamingcode@gmail.com',
              pass: emailPass,
            },
          });
          const info = await transporter.sendMail({
            from: "'Plataforma Esports' versusgamingcode@gmail.com",
            to: userInfo.email,
            subject: 'Plataforma Esports informa, Edicion de Email con exito ✔', // Subject line
            html: contentHTMLold,
          });
          const info2 = await transporter.sendMail({
            from: "'Plataforma Esports' versusgamingcode@gmail.com",
            to: email,
            subject: 'Plataforma Esports, ¡Excelente nuevo email!', // Subject line
            html: contentHTMLnew,
          });
        } else {
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
          <div id="cardMail" class="cardMail" style=" position: relative; width: 440px; height: 420px; margin: 0 auto; margin-top: 32px; background-color: #212433; border-radius: 6px;
              box-shadow: 0 0 50px 0 rgba(251, 32, 98, 0.25); border: solid 2px #fb2062; background-color: #212433;">
              <div id="titulo" class="titulo" style="position: relative; display: block; margin: 0 auto; padding-top: 48px;
              margin-bottom: 28px; width: 300px; height: 30px; font-family: 'Roboto'; font-size: 31px; font-weight: bold;
              font-stretch: normal; font-style: normal; line-height: 1.5; letter-spacing: normal; color: #ffffff; background: none;" 
              >¡Importante!</div>
              <div id="msjBienvenida" class="msjBienvenida" style="position: relative; display: block; margin: 0 auto; margin-bottom: 32px; padding-top: 3px; width: 340px;
              height: 48px; font-family: 'Roboto'; font-size: 22.5px; font-weight: normal; font-stretch: normal; font-style: normal; line-height: 1.2; 
              letter-spacing: normal; color: #ffffff; background: none;">¡Hola ${userInfo.name}! Intentaron cambiar su email oficial.</div>
              <div id="msjBienvenida" class="msjBienvenida" style="position: relative; display: block; margin: 0 auto; margin-bottom: 32px; padding-top: 3px; width: 340px;
              height: 48px; font-family: 'Roboto'; font-size: 22.5px; font-weight: normal; font-stretch: normal; font-style: normal; line-height: 1.2; 
              letter-spacing: normal; color: #ffffff; background: none;"
              >Por seguridad ya cerramos su sesión, pero si vuelve a llegarle este mensaje informenos para hacerle un seguimiento personalizado.</div>
            
              <div id="msjToken" class="msjToken" style="position: fixed; display: block; margin: 0 auto; margin-bottom: 36px; margin-top: 36px;
              width: 360px; height: 16px; font-family: 'Roboto'; font-size: 14px; font-weight: normal; font-stretch: normal;
              font-style: normal; line-height:7.6; letter-spacing: normal;text-align: center; color: #828699; background: none;"
              >Muchas gracias por su tiempo. Lo esperamos en</div>
              
              <div id="linkWeb" class="linkWeb" style=" position: fixed; display: block; margin: 15px auto; margin-top: 36px; background: none;">
                  <a href="https://www.plataformaesports.com/#/" style="width: 190px;height: 14px;font-family: Roboto;font-size: 16px;font-weight: 500;
                  font-stretch: normal;font-style: normal;line-height: 5;letter-spacing: normal; text-align: center;color: #fb2062 ;
                  text-decoration: none;background: none;">www.plataformaesports.com</a>
              </div>
              </div>
              </div>
              </div>
          </body>`;
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'versusgamingcode@gmail.com',
              pass: emailPass,
            },
          });
          const info = await transporter.sendMail({
            from: "'Plataforma Esports' versusgamingcode@gmail.com",
            to: userInfo.email,
            subject: 'Plataforma Esports pregunta, ¿ Desea cambiar su Email?', // Subject line
            html: contentHTML,
          });

          res.json({
            alert:
              'Lo sentimos su contraseña fue erronea \n Por protocolos de seguridad sera informado a su email del suceso y debera ingresar nuevamente.',
          });
        }
      });
    } else {
      return res.json({
        alert:
          'Disculpe si desea cambiar el email debe colocar un nuevo correo electronico.',
      });
    }
  }
});

// - - - - -  GET
//visualizando favoritos (sin pulir )
users.get('/viewGet/:IDU', async (req, res) => {
  try {
    const ArrayView = await User.findById(req.params.IDU);
    const resArrayView = await ArrayView.fViews;
    res.json(resArrayView);
    console.log(resArrayView);
  } catch {}
});
users.get('/logout/:IDU', async (req, res) => {
  //COLOCAR UN CONTADOR DE USUARIOS ELIMINADOS CON IPS
  const { IDU } = req.params;
  console.log(IDU);
  await Connetion.deleteOne({ IDU: IDU });
});
users.get('/navigation/:IDU', async (req, res) => {
  const { IDU } = req.params;
  await User.findById({ _id: IDU }, (err, doc) => {
    if (err) {
      console.log('Something wrong when state change data!');
    } else {
      console.log(doc.nav);

      const UDT = {
        IDU: doc._id,
        nickname: doc.nickname,
        name: doc.name,
        lastName: doc.lastName,
        born: doc.born,
        gender: doc.gender,
      };
      res.json(UDT);
    }
  });
});
users.get('/betalogin/:email/:password', async (req, res) => {
  if (!req.params.email || !req.params.password) {
    console.log('ERROR');
    res
      .status(200)
      .json('ERROR por modificacion de front posiblemente mal intencionada.');
  } else {
    var string = req.params.email;
    var regex = new RegExp(["^", string, "$"].join(""), "i");
    await User.findOne(
      { email: regex },
      {
        _id: 1,
        name: 1,
        email: 1,
        email_verified: 1,
        picture: 1,
        provider: 1,
        language: 1,
        passportID: 1,
        password: 1,
      }
    ).then((user) => {
      if (user) {
        //Match password
        bcrypt.compare(req.params.password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            if (user.email_verified === true) {
              const send = {
                _id: user._id,
                name: user.name,
                email: user.email,
                email_verified: user.email_verified,
                picture: user.picture,
                provider: user.provider,
                language: user.language,
                passportID: user.passportID,
              };
              console.log(send);
              return res.json({
                send: send,
                name: user.name,
                picture: user.picture,
                provider: `null`,
                language: user.language,
              });
            } else {
              return res.json({
                alert:
                  'Por favor revise su correo, y verifique su cuenta. \n\n Recuerde que el mensaje podria estar en la bandeja de spam, \n dependiendo de su configuracion. ',
              });
            }
          } else {
            //contraseña incorrecta
            return res.json({
              alert:
                'Disculpe, \n Su contraseña no coincide, intente nuevamente.',
            });
          }
        });
      } else {
        return res.json({
          alert: `Disculpe, \n Esta cuenta no se encuentra registrada.`,
        });
      }
    });
  }
});
users.get('/cleanInfo/:IDP/:email', async (req, res) => {
  const { IDP, email } = req.params;
  try {
    var user = await User.findById(IDP, { email: 1, _id: 1 });
    if (email === user.email) {
      await User.findByIdAndRemove(IDP);
      console.log('Usuario eliminado!');
      return res.json({ message: 'Usuario eliminado', status: 200 });
    } else {
      return res.json({
        message: 'Clean this, is probably a error for edited.',
        status: 200,
      });
    }
  } catch {
    res.json({
      alert:
        'Por favor revise que tiene habilitado el sistema o sencillamente cargue la pagina.',
    });
  }
});
users.get('/profile/:IDP', async (req, res) => {
  //console.log(req.params.IDP, '<------- AQUI TAAAAAAAAAA ');
  const user = await User.findById(req.params.IDP, {
    passportID: 0,
    password: 0,
    _id: 0,
    createdAt: 0,
    updateAt: 0,
    __v: 0,
    email_verified: 0,
    termAgreed: 0,
  });
  //console.log(user.teams, "antes")

  if (user.teams !== []) {
    var team = {
      IDteam: '',
      logo: '',
      totalPlayers: {
        //<-- hacer dinamico
        player1: {},
        player2: {},
        player3: {},
        player4: {},
        player5: {},
        player6: {},
        player7: {},
        player8: {},
      },
      moreDetails: {},
    };

    var totalPlayerNeed = Object.keys(team.totalPlayers);

    function cleanValuesAndOrganizeTeam(value) {
      //console.log(value, "value")
      for (
        var checkAndOrganize = 0;
        checkAndOrganize < totalPlayerNeed.length;
        checkAndOrganize++
      ) {
        team.totalPlayers[`${totalPlayerNeed[checkAndOrganize]}`] =
          value[`${totalPlayerNeed[checkAndOrganize]}`];
        delete value[`${totalPlayerNeed[checkAndOrganize]}`];
      }
      team.moreDetails[t] = value;
    }

    for (var t = 0; t < user.teams.length; t++) {
      if (
        (await Teams.find({ _id: user.teams[t] }).countDocuments()) > 0 ===
        true
      ) {
        var teamsInfo = await Teams.findById(user.teams[t], {
          player9: 0,
          player10: 0,
          player11: 0,
          player12: 0,
          player13: 0,
          player14: 0,
          player15: 0,
          player16: 0,
        });
        team.IDteam = user.teams[t];
        team.logo = user.teams[t].logo;
        cleanValuesAndOrganizeTeam(teamsInfo);
        user.teams[t] = team;
      }
    }
  }

  //console.log(user.teams, "despues")
  //console.log(user)
  user === {}
    ? res.json({
        alert:
          'No existe como usuario verifique informacion o vuelva a usar el login',
      })
    : res.json(user);
});
users.get('/confirm/:token', async (req, res) => {
  if (req.params.token.length === 6) {
    if (
      (await User.find({ token: req.params.token }).countDocuments()) > 0 ===
      true
    ) {
      console.log(true, 'VALIDATION');
      await User.findOneAndUpdate(
        { token: req.params.token },
        { email_verified: true }
      );
      return res.json({ isValidate: 'true' });
    } else {
      return res.json({
        alert:
          'Disculpe pero no se encuentra ningun token con esas caracteristicas verifique el email eviado nuevamente',
      });
    }
  } else if (req.params.token.length === 8) {
    if (
      (await User.find({ tempToken: req.params.token }).countDocuments()) >
        0 ===
      true
    ) {
      const userInfo = await User.findOne(
        { tempToken: req.params.token },
        { temporaryPassword: 1 }
      );

      await User.findOneAndUpdate(
        { tempToken: req.params.token },
        { password: userInfo.temporaryPassword, email_verified: true }
      );

      console.log('Change Password Success');

      return res.json({ newPass: 'true', success: true, status: 200 });
    } else {
      return res.json({
        alert:
          'Disculpe pero no se encuentra ningun token con esas caracteristicas verifique el email eviado nuevamente',
      });
    }
  } else {
    console.log(false, 'VALIDATION');
    return res.json({
      alert: 'Por favor verifique que el token fue escrito correctamente',
    });
  }
});

// - - - - -  POST
users.post('/registerPass', async (req, res) => {
  console.log(req.body, `este el body REVISAR`);
  if (!req.body) {
    console.log('ERROR');
    res.json({
      status: 200,
      alert: 'ERROR por modificacion de front posiblemente mal intencionada.',
    });
  } else {
    await User.findOne(
      { email: req.body.jsonPass.email },
      {
        name: 1,
        email: 1,
        email_verified: 1,
        picture: 1,
        provider: 1,
        language: 1,
        passportID: 1,
      }
    ).then(async (user) => {
      if (!user) {
        var newUserToSave = {
          name: req.body.jsonPass.name,
          email: req.body.jsonPass.email,
          email_verified: req.body.jsonPass.email_verified,
          picture: req.body.jsonPass.picture,
          provider: req.body.provider,
          language: req.body.jsonPass.locale,
          passportID: req.body.jsonPass.sub,
        };
        await User.create(newUserToSave).then((user) => {
          const theUser = {
            IDU: user.id,
            name: req.body.jsonPass.name,
            email: req.body.jsonPass.email,
            email_verified: req.body.jsonPass.email_verified,
            picture: req.body.jsonPass.picture,
            provider: req.body.provider,
            language: req.body.jsonPass.locale,
            passportID: req.body.jsonPass.sub,
          };
          return res.json(theUser);
        });
      } else {
        return res.json(user);
      }
    });
  }
});
users.post('/betaregister/:email/:emailVerify', async (req, res) => {
  var regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  var verify = "true" //req.params.emailVerify
  if (regex.test(req.params.email) === true) {
    if (
      (await User.find({ email: req.params.email }).countDocuments()) > 0 ===
      true
    ) {
      console.log('Disculpe este email ya se encuentra registrado');
      res.json({
        alert: 'Disculpe, \n Este email ya se encuentra registrado.',
      });
    } else {
      console.log('EMAIL POR ELSE');
      var tokenP = randomToken(6);
      var club = "" 
      req.body.clubR ? club = req.body.clubR : "" 
      var newUserToSave = {
        name: req.body.nameR,
        email: req.body.emailR,
        picture:
          'https://res.cloudinary.com/versus/image/upload/v1585336078/avatars/s9dhdle2fkgciavfjkya.png',
        password: req.body.passwordR,
        document: req.body.documentR,
        address: req.body.direccionR,
        born: req.body.dateR,
        //-------- Para menores de 16
        tutorsName: req.body.nameTutorR || '-',
        tutorsDocument: req.body.documentTutorR || '-',
        customerReg: req.body.customer,
        club: club,
        token: tokenP,
        email_verified: verify,        
      };
      console.log(verify, typeof verify);

      if (verify === 'true') {
        if(req.body.nicknameR){
          newUserToSave['nickname'] = req.body.nicknameR;
          var teamPlayers = await Teams.findById(req.body.IDteam, {
            player1: 1,
            player2: 1,
            player3: 1,
            player4: 1,
            player5: 1,
            player6: 1,
            player7: 1,
            player8: 1,
            _id: 0,
          });
  
          var teamArr = reEstructureTeamInAArray(teamPlayers);
          const teamArrWithTwoValues = addNewValuesToSomeoneInTheTeam(
            teamArr,
            req.body.emailR,
            req.body.nicknameR,
            true
          );
  
          const theUserExist = teamArrWithTwoValues[1];
          const newTeamArr = teamArrWithTwoValues[0];
  
          if (theUserExist) {
            newUserToSave['teams'] = [req.body.IDteam];
            await Teams.findOneAndUpdate(
              { _id: req.body.IDteam },
              {
                player1: newTeamArr[0],
                player2: newTeamArr[1],
                player3: newTeamArr[2],
                player4: newTeamArr[3],
                player5: newTeamArr[4],
                player6: newTeamArr[5],
                player7: newTeamArr[6],
                player8: newTeamArr[7],
              }
            );
          }
        }    
      }
      //Hash Password
      bcrypt.genSalt(10, (err, salt) =>
        bcrypt.hash(newUserToSave.password, salt, async (err, hash) => {
          if (err) throw err;
          //Set password to hashed
          newUserToSave.password = hash;
          const userID = await User.create(newUserToSave);
          const send = {
            _id: userID._id,
            name: req.body.nameR,
            email: req.body.emailR,
            email_verified: verify,
            picture:
              'https://res.cloudinary.com/versus/image/upload/v1585336078/avatars/s9dhdle2fkgciavfjkya.png',
            provider: `null`,
            language: 'es',
          };

          return res.json({
            send: send,
            name: send.name,
            picture: send.picture,
            provider: null,
            isValidate: send.email_verified,
            email: req.body.emailR,
          });
        })
      );
    }
  } else {
    console.log('NO CUMPLE');
    return res.json({
      alert:
        'Disculpe, \n Su informacion de email no cumple los estandares de seguridad establecidos por la RFC.\n\n Intente nuevamente con otro email. ',
    });
  }
});
users.post('/newPassword/:email', async (req, res) => {
  var { tempPassword } = req.body;
  if (
    (await User.find({ email: req.params.email }).countDocuments()) > 0 ===
    true
  ) {
    console.log('EMAIL POR ELSE');
    var tempToken = randomToken(8);

    //Hash Password
    bcrypt.genSalt(10, (err, salt) =>
      bcrypt.hash(tempPassword, salt, async (err, hash) => {
        //Set password to hashed
        if (err) throw err;
        tempPassword = hash;
        await User.findOneAndUpdate(
          { email: req.params.email },
          {
            tempToken: tempToken,
            temporaryPassword: tempPassword,
          }
        );
      })
    );

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
      <div id="cardMail" class="cardMail" style=" position: relative; width: 440px; height: 396px; margin: 0 auto; margin-top: 32px; background-color: #212433; border-radius: 6px;
          box-shadow: 0 0 50px 0 rgba(251, 32, 98, 0.25); border: solid 2px #fb2062; background-color: #212433;">
          <div id="titulo" class="titulo" style=style="display:block;margin:0 auto;padding-top:48px;margin-bottom:28px;width:300px;height:30px;font-family:'Roboto';
          font-size:31px;font-weight:bold;font-stretch:normal;font-style:normal;line-height:1.5;letter-spacing:normal;color:#ffffff;background:none">
          ¡Estás por cambiar tu contraseña!</div>
          <div id="msjBienvenida" class="msjBienvenida" style="display:block;margin:0 auto;margin-bottom:32px;padding-top:3px;width:340px;height:48px;font-family:'Roboto';
          font-size:22.5px;font-weight:normal;font-stretch:normal;font-style:normal;line-height:1.2;letter-spacing:normal;color:#ffffff;background:none">
          ¡Su seguridad va de primero! Luego de este paso seguimos con el mundo Esports.</div>
          <div id="tokenBloque" class="tokenBloque" style="margin-bottom: 32px; background: none; padding-top: 15px">
              <div id="msjToken" class="msjToken" style="position: relative; display: block; margin: 0 auto; margin-bottom: 12px;
              width: 360px; height: 16px; font-family: 'Roboto'; font-size: 14px; font-weight: normal; font-stretch: normal;
              font-style: normal; line-height: 1.33; letter-spacing: normal;text-align: center; color: #828699; background: none;"
              >Confirme su contraseña con el siguiente token.</div>
              <div class="token" style=" position: relative; display: block; margin: 0 auto; width: 300px; padding-top: 15px; padding-bottom: 12px;
              font-family: 'Roboto';font-size: 18px; font-weight: 500;font-stretch: normal; font-style: normal;line-height: 1; letter-spacing: normal;
              text-align: center; color: #ffffff;border-radius: 6px; border: solid 1px #fb2062;background-color: #111217;"
              ><strong style="color: #ffffff; font-family: 'Roboto';">${tempToken}</strong></div>
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

    sendMailForRecoveryPass(req.params.email, contentHTML);

    return res.json({ success: true, status: 200 });
  } else {
    console.log('Disculpe este email no se encuentra registrado');
    res.json({
      alert: 'Disculpe, \n Este email no se encuentra registrado.',
    });
  }
});

module.exports = users;

/** fetch a colocar 
 * 
 * 
 * await fetch(`users/newPassword/${emailR}`, {
      method: 'POST',
      body: JSON.stringify({
        tempPassword,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((res) => res.json())
    .then(jsonMess => {
        console.log("PASANDO sendMessage");
        if (jsonMess.alert) {
          //RosarioJuega.prototype.loginState('register', true);
          alert(jsonMess.alert);
        } else {
          localLoginReload(json);
        }
      })
 * ----------------------
    await fetch(`users/confirm/recoverPassword/${tokenValue}`)
      .then((res) => res.json())
 **/
