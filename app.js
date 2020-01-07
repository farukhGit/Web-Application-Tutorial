const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts')
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const port = 8000;  //default website port : 80

app.use(expressLayouts);

app.use(express.urlencoded());

app.use(cookieParser());

//extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//create link to static files
app.use(express.static('./assets'));

//use express router
//all requests go to this route
app.use('/', require('./routes/index'));

//set the view engine as ejs
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port ${port}`);
});