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
router.get('/signin', (req, res, next) => {
    res.render('signin');

});
//login aqui se escucha lo que manda el user
router.post('/signin', passport.authenticate('local-signin',{
    successRedirect: '/profile',
    failureRedirect: '/signin',
    passReqToCallback: true
}) ); 
//logout
router.get('/logout',(req, res, next) =>{
    req.logOut();
    res.redirect('/');
});

//verificar autenticacion
router.use((req,res,next) => {
    isAuthenticated(req,res,next);
    next();
});

//perfil
router.get('/profile', (req,res, next) => {
    res.render('profile');
});
//ruta dashboard
router.get('/dashboard', (req,res,next)=>{
    res.render('dashboard');
})

//
function isAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/signin');

}


// se exportan las rutas 
module.exports = router;