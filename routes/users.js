var express = require('express');
var router = express.Router();
const models = require('../models/index');

router.get('/', async function(req, res, next) {
  const users = await models.users.findAll({
    attributes: {exclude: ['password', 'createdAt', 'updatedAt']},
  });

  try {
    if(users.length!==0) {
      res.json({
        'status': '200',
        'message': 'Success',
        'data': users
      })
    } else {
      res.json({
        'status': '204',
        'message': 'Unavailable',
        'errors': 'Data Unavailable'
      })
    }
  } catch (error) {
    res.status(500).json({
      'message': 'Server Error. Try again later.'
    })
  }
});

module.exports = router;