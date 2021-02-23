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

    const user = User.findOne({email: email})
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