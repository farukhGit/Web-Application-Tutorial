const passport =  require('passport');
const LocalStrategy = require('passport-local');


const User = require('../models/user');


// authentication using passport
passport.use(new LocalStrategy({
        usernameField : 'email',
    },
    function(email, password, done){
        // find user and establish the identity
        User.findOne({email: email}, function(err, user){
            if(err){
                console.log('error in finding user ---> passport'); 
                return done(err);
            }

            if(!user || user.password != password){
                console.log('Invalid Username / Password'); 
                return done(null, false);
            }
            
            return done(null, user);
        });
    }
));

// serializing the user to decide which key to be kept in the cookies
passport.serializeUser(function(user, done){
    done (null, user.id);
});

// deserializing the user from the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('error in finding user ---> passport'); 
            return done(err);
        }

        return done(null, user);
    });
});

module.exports = passport;