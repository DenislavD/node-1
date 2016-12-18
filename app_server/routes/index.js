//dependencies
var express = require('express');
var router = express.Router();
var ctrlOthers = require('../controllers/others');

/* Angular container page */
router.get('/', ctrlOthers.angularApp);

//exposed context
module.exports = router;
