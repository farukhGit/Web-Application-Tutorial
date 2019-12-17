const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);
router.use('/users', require('./users'));    //this route tells to handle /user requests from users.js route

//for any further routes
//router.use('/routerName', require('./routerFile'))

//module.exports.actionName = function(req, res){}
// export to be available to main index.js
module.exports = router;