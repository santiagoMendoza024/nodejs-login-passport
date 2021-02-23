//cualquier nombre del archivo routes.js
const express = require('express');
//metodo router devuelve unobjeto
// definir rutas de servidor
const router = express.Router();
const passport = require('passport')

//definir rutas que vamos a utilizar 
router.get('/', (req, res, next) => {
    //req res next manejador de eticiones
    res.render('index');

});
//ventana para llenar form
router.get('/signup',(req, res, next) => {
    res.render('signup');
});
//escucha
router.post('/signup',passport.authenticate('local-signup',{
    successRedirect:'/profile',
    failureRedirect: '/signup',
    passReqToCallback: true
}));
//Login get envias una ventana para ingresar 
router.get('signin', (req, res, next) => {

});
//login aqui se escucha lo que manda el user
router.post('/signin', (req, res, next) =>{

});

//perfil
router.get('/profile', (req,res, next) => {
    res.render('profile');
});


// se exportan las rutas 
module.exports = router;