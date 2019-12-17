const express = require('express');
const app = express();
const port = 8000;  //default website port : 80

//use express router
//tells the request to route through routes/index.js
app.use('/', require('./routes/index'));

app.use('view engine', 'ejs');
app.set('views', './views')




app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port ${port}`);
});