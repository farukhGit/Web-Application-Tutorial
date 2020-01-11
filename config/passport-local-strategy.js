const passport =  require('passport');
const LocalStrategy = require('passport-local').Strategy;


const User = require('../models/user');


// authentication using passport
passport.use(new LocalStrategy({    
        usernameField : 'email'
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
    done (null, user.id);   //stores the user id in the cookie (ecncrypted)
});

// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('error in finding user ---> passport'); 
            return done(err);
        }
        return done(null, user);
    });
});


// check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    // if the user is signed in , then pass the req to next function
    if(req.isAuthenticated()){
        return next();
    }

    //if user is not signed in 
    return res.redirect('/users/sign-in');
};

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // req.user contains the current user from session cookie
        // we're sending it to the locals on the views
        res.locals.user = req.user;
    }

    next();
}


module.exports = passport;