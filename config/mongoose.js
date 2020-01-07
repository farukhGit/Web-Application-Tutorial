const mongoose = require('mongoose');

//define the path and name of the database
mongoose.connect('mongodb://localhost/codeial_devlopment_db', { useNewUrlParser : true, useUnifiedTopology : true});

//access variable to database
const db = mongoose.connection; 

//error in accessing the database
db.on('error', console.error.bind(console, 'error connecting to mongodb')); 

//access variable successfully connected to the database
db.once('open', ()=>{       
    console.log('connected to database :: MongoDB');
});

//export the database access variable to be used in other files
module.exports = db;