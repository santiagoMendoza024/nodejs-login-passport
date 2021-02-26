const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');
//recibe un usuarip y un callback
passport.serializeUser((user, done)=> {
    done(null, user.id);
});

passport.deserializeUser(async(id, done)=> {
  const user = await User.findById(id);
  done(null, user);
});

//registrar al usuario
passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback : true
}, async (req,email, password, done) => {

    const user = await User.findOne({email: email})
    if(user){
        return done(null, false, req.flash('signupMessage','The user already exist'));
    }else{
        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        await newUser.save();
        done(null, newUser);
    }
}));

//log al usuario
passport.use('local-signin', new LocalStrategy({
    //Lo que recibe para log
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, email, password, done)=>{
    //consulta si exitse el user
    const user = await User.findOne({email: email});
    if(!user){
        return done(null, false, req.flash('signinMessage', 'No user found'));
    }
    if(!user.comparePassword(password)){
        return done(null, false, req.flash('signinMessage','Incorrect  Password'));
    }
    done(null, user);
}));