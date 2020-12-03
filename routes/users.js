var express = require('express');
var router = express.Router();

const UserController = require('../controllers/UserController');

router.get('/', (req, res, next) => UserController.get(res, req, next));
router.post('/', (req, res, next) => UserController.post(res,req,next))

module.exports = router;