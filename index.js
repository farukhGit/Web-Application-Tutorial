const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts')
const port = 8000;  //default website port : 80

app.use(expressLayouts);
//extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//create link to static files
app.use(express.static('./assets'));

//use express router
//tells the request to route through routes/index.js
app.use('/', require('./routes/index'));

app.set('view engine', 'ejs');
app.set('views', './views');




app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port ${port}`);
});