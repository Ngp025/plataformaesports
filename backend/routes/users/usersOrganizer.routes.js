const express = require('express');
const router = express.Router();
const Organizer = require('../../models/users/organizer.js');
const User = require('../../models/users/users.js');
const nodemailer = require('nodemailer');
const {
  randomToken,
} = require('../routes-methods/tournaments/tournamentsFunctions.js');
const { emailPass } = require('../../../config/default.js');

//----------- Organizer User
// - - - - - - - - - POST
router.get('/registerOrganizer', (req, res) => {
  const info = {
    user: `Organizer2`,
    token: `#44ASDle3`,
  };

  Organizer.create(info);

  /*
    Organizer.findOne(info.user)
    .then(user => {
        if(!user){
        Organizer.create(info)  
        } else {
            console.log(info.user + `ya exite en la base de datos cambie el user `)
        }
    })*/
});
router.post('/template/:IDO', async (req, res) => {
  const {
    //plantilla info
  } = req.body;

  await Organizer.findByIdAndUpdate(IDO, {
    template: template,
  });
});
router.post('/messageForComunication', async (req, res) => {
  const { nameValue, mailValue, messageValue } = req.body;

  const userInfo = await User.findOne(
    { email: mailValue },
    { name: 1, _id: 1 }
  );

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'versusgamingcode@gmail.com',
      pass: emailPass,
    },
  });

  if (userInfo) {
    var contentHTML2 = `
        <body style="padding: 0; margin: 0 auto; font-family: 'Roboto'">  
        <div id="background" class="background" style="position: absolute; z-index: 0 ; top: 0; left: 0; width: 820px; height:950px ;
            background-image: linear-gradient(to top, #fb2062, rgba(0, 0, 0, 0)); background-color: #111217;">
            <div id="headerMail" class="headerMail" style="padding-top: 20px">
            <div id="logoPlataforma" class="logoPlataforma" style="position: relative; margin: 0 auto;margin-top: 70px;margin-bottom: 30px; text-align: center;">
                <img src="https://res.cloudinary.com/versus/image/upload/c_scale,h_37,w_535/v1595284283/Assets/Home2.0/m2gkuogdxc3g9u4hxis8.png" alt="Plataforma Esports"></div>
            <div id="tituloDivider" class="tituloDivider" style="position: relative;display: block; margin: 0 auto;width: 440px;height: 1px;background: #fb2062;"></div>
            </div>
            
            <div id="cardMail" class="cardMail" style=" position: relative; width: 560px; height: 560px; margin: 0.25vh auto; margin-top: 22px; background-color: #212433; border-radius: 6px;
            box-shadow: 0 0 50px 0 rgba(251, 32, 98, 0.25); border: solid 2px #fb2062; background-color: #212433; text-align: center;">
            <p id="titulo" class="titulo" style="position: relative; display: block; margin: center; padding-top: 22px;
            font-family: 'Roboto'; font-size: 31px; font-weight: bold; text-align: center; color: #FFFFFF; 
            font-stretch: normal; font-style: normal; line-height: 3.5; margin-left: 10px; letter-spacing: normal; background: none;" 
            > ¡ Muchas gracias ${userInfo.name} !</p>
            <div>
            <p id="msjBienvenida" class="msjBienvenida" style="position: relative; display: block; color: #FFFFFF; margin: auto;
            text-align: justify; margin-left: 15px;margin-right: 15px ; margin-bottom: 32px; font-family: 'Roboto'; font-size: 22.5px; 
            font-weight: normal; font-stretch: normal; font-style: normal; line-height: 1.7; letter-spacing: normal; background: none;"> 
                Plataforma Esport tomara muy en cuenta su mensaje.
                Sabemos que tanto usted como a nosotros nos interesa mucho el mundo Esport por eso
                probablemente nos comunicaremos con usted si su mensaje es de provecho para la comunidad.                   
            </p>
            <p id="message" class="message" style="position: relative; display: block; color: #FFFFFF; margin: 0 auto;text-align: center; margin-left: 10px ; margin-bottom: 32px;
            font-family: 'Roboto'; font-size: 22.5px; font-weight: normal; font-stretch: normal; font-style: normal; line-height: 1.7; 
            letter-spacing: normal; background: none;">                 
            Le deseamos una excelente semana.</p>
            </div>
            <a href="https://www.plataformaesports.com/#/" style="width: 190px; padding-left: 0.35vh ; margin-left: 10px ; margin: 0.25vh auto; height: 14px; font-family: Roboto; font-size: 16px; font-weight: 500;
            font-stretch: normal; font-style: normal; line-height: 1.29; letter-spacing: normal; display: block; text-align: center;color: #fb2062 ;
            text-decoration: none;background: none;">www.plataformaesports.com</a>
            </div>            
            </div>           
        </body>`;
    //mail de agradecimiento
    const info2 = await transporter.sendMail({
      from: "'Plataforma Esports' versusgamingcode@gmail.com",
      to: mailValue,
      subject: 'Plataforma Esports le agradece por su colaboración.', // Subject line
      html: contentHTML2,
    });
  }
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
  const info = await transporter.sendMail({
    from: "'Plataforma Esports' versusgamingcode@gmail.com",
    to: 'versusgamingcode@gmail.com',
    subject: 'Message directo de un Usuario', // Subject line
    html: contentHTML,
  });

  res.json({
    message:
      '¡Muchas Gracias! \n Pronto leera su mensaje y se tomara en cuenta. \n Lo esperamos pronto en Plataforma Esports',
  });
});

// - - - - - - - - - - GET
router.get('/access/:token', async (req, res) => {
  var { token } = req.params;
  const organizerInfo = await Organizer.findOne(
    { token: token },
    { createdAt: 0, updatedAt: 0 }
  );
  console.log(organizerInfo, 'aprovado');

  if (organizerInfo !== null) {
    res.json(organizerInfo);
  } else {
    res.json({
      alert:
        'Ho ho, Error! \n Intente nuevamente si persiste el error por favor, hable con su supervisor por este error estaremos muy pendiente por si necesita ayuda.',
    });
  }
});
router.get('/createToken/:IDO', async (req, res) => {
  const token = randomToken(8);

  await Organizer.findByIdAndUpdate(
    IDO,
    {
      token: token,
    },
    { returnNewDocument: true, new: true },
    (err, doc) => {
      if (err) {
        console.log('Something wrong when updating data!');
        res.json(
          'Es posible que el Torneo ya finalizo porfavor actualice o vuelva a ingresar con su usuario.'
        );
      } else {
        const tMain = doc.tMain;
        console.log(tMain, `este es tMain`);
        return res.json(tMain);
      }
    }
  );
});

module.exports = router;
