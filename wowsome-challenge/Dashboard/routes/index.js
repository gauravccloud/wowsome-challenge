var express = require('express');
var router = express.Router();

var getIndexPage = require('../controllers/index');
var register = require('../controllers/register');
var loginUser = require('../controllers/login');
var user = require('../controllers/userdetails');

var authenticate = require('../middlewares/authenticate');

router.get('/', getIndexPage.getIndexPage);
router.post('/api/v1/auth/register', register.registerUser);
router.post('/api/v1/auth/login', loginUser.login);
router.post('/api/v1/userdetail', authenticate(), user.getUserDetails);
exports.router = router;