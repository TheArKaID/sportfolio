var express = require('express');
var router = express.Router();

const controllers = require('../controllers/PortfolioController');

router.get('/', async (req, res, next) => controllers.get(req, res, next));
router.post('/', async (req, res, next) => controllers.post(req, res, next));
router.put('/', async (req, res, next) => controllers.put(req, res, next));
router.delete('/', async (req, res, next) => controllers.delete(req, res, next));

module.exports = router;