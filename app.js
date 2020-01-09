const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts')
const db = require('./config/mongoose');

// used for sessin cookie and authentication
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const cookieParser = require('cookie-parser');
const port = 8000;  //default website port : 80



app.use(express.urlencoded());
app.use(cookieParser());
app.use(expressLayouts);





//extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//create link to static files
app.use(express.static('./assets'));
app.use(passport.initialize());
//use express router
//all requests go to this route
app.use('/', require('./routes/index'));

//set the view engine as ejs
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name : 'codeial',
    //todo : change secret before deployment in production mode
    secret : 'SECRETTEXT',
    saveUninitialized : false,
    resave : false,
    cookie :{
        maxAge : (1000 * 60 * 100)
    }
}));


app.use(passport.session);


app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port ${port}`);
});