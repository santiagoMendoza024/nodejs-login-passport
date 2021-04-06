//modulo para crear el servidor
const express = require('express');
// modulo para crear plantillas
const engine = require('ejs-mate');
//modulo path unir directorios
const path = require('path')
//morgan es para ver las peticiones
const morgan = require('morgan');
//passport
const passport = require('passport');
//
const session = require('express-session');

const flash = require('connect-flash');


//Inicializaciones
const app = express();
require('./database');
require('./passport/local-auth');

//Settings
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
// establecer el motor de plantillas
app.set('view engine','ejs');
//definimos el puerto
app.set('port', process.env.PORT || 4000);

//MIDDLEWARES son funciones que se ejecutan antes de pasar a la rutas
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'mysecretsession',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req,res,next)=>{
  app.locals.signupMessage  = req.flash('signupMessage');
  app.locals.signinMessage = req.flash('signinMessage');
  app.locals.user = req.user; 
  next();
})

//Routes
app.use('/',require('./routes/index'));


// Starting server
app.listen(app.get('port'), () => {
    console.log("Server on Port", app.get('port'));
});