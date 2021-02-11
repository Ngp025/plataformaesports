// ---------------------------    Index Back en versus
//DOTENV
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
// Local Functions
// Importar FrameWorks: Express, Morgan, Path
const cors = require('cors'); // Cors se conecta con los edpoints de facebook o mejor dicho facilita la conexion
const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const multer = require('multer'); //lector visual
const {
  automaticProcess,
  changeTimePerInstance,
} = require('../backend/server-functions/automaticProcessTest.js');

// Importamos las referencias a la Base de dato
require('../backend/database');

// Llamada a constante de express
const app = express();

// SETTINGS
app.set('port', process.env.PORT || 4000); // el || es una segunda opcion solo de emergencia por si no lee .env

//Para la terminal (Middlerware)
app.use(morgan('dev'));

// Middlewares (funciones que se ejecutan antes de las rutas)
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.text());

// Configurando https
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    if (req.headers.host === 'app-fifa.herokuapp.com') {
      // make express use your custom domain name instead of heroku's default
      return res.redirect(301, 'https://www.your-domain-name.com');
    }
    if (req.headers['x-forwarded-proto'] !== 'https') {
      // the instructions to perform redirection will be located here
      return res.redirect('https://' + req.headers.host + req.url);
    } else {
      // if https is already being used, we simply move on to the next phase in the app's logic cycle
      return next();
    }
  } else {
    return next();
  }
});

// initialize session middleware
const sessionMiddleware = session({
  secret: 'random secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
});

// Middlewares de Express que nos permiten enrutar y poder realizar peticiones HTTP (GET, POST, PUT, DELETE)
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false })); //(false) asi no entiendo imagenes pesadas
app.use(sessionMiddleware);

// STATICS FILES (HTML estáticos, JS, CSS,...)
app.use(express.static(path.join(__dirname, 'public')));

//Files
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/uploads'), // ubicacion
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + path.extname(file.originalname)); //para que sea singular cada imagen le coloco el nombre del minuo
  },
});
app.use(multer({ storage }).single('image')); //determinando imagen

// Routes
// - - - - USSERS
app.use('/users', require('../backend/routes/users/users.routes'));
app.use('/organizer', require('../backend/routes/users/usersOrganizer.routes'));
app.use('/teams', require('../backend/routes/users/teams.routes'));
// - - - -  TOURNAMENTS
app.use(
  '/api/tournaments',
  require('../backend/routes/tournaments/tournament.routes')
);
app.use(
  '/api/organizer',
  require('../backend/routes/tournaments/organizer.routes')
);
// - - - - APIS
app.use('/api/games', require('../backend/routes/api.routes'));

// Starting server
const server = app.listen(app.get('port'), () => {
  console.log(`Server on port ${process.env.PORT}`);
});
/*
var intervalBreak = [false]
socketIo(server)

if(intervalBreak[0] === false){
  intervalBreak.pop()
  intervalBreak.push(true)*/
//setInterval(() => automaticProcess(), 15000);
//}
// Auto Start Tournaments - esta funcion debe correr solo de manera local por la cantida de fetch que puede llegar a usar

//socketIoProcess()
//setInterval(() => changeTimePerInstance(), 5000)
//30000 cada 30 seg
//600000 cada 10 min
//900000 cada 15 min */
