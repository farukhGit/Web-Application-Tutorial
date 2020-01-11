const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;  //default website port : 80

const expressLayouts = require('express-ejs-layouts')
const db = require('./config/mongoose');

// used for session cookie and authentication
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

app.use(express.urlencoded());
app.use(cookieParser());
//create link to static files
app.use(express.static('./assets'));

app.use(expressLayouts);
//extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


//set the view engine as ejs
app.set('view engine', 'ejs');
app.set('views', './views');                                                

app.use(session({
    name : 'codeial',
    secret : 'secretsomething',
    saveUninitialized : false,  
    resave : false, 
    cookie :{
        maxAge : (1000 * 60 * 10)
    }
}));

app.use(passport.initialize()); 
app.use(passport.session());

//use express router
//all requests go to this route
app.use('/', require('./routes/index'));

app.use(passport.setAuthenticatedUser);



app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port ${port}`);
});