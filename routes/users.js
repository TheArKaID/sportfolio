var express = require('express');
var router = express.Router();
var validator = require('validator');
const bcrypt = require('bcrypt');
const models = require('../models/index');

router.get('/', async (req, res, next) => {
  const users = await models.users.findAll({
    attributes: {exclude: ['password', 'createdAt', 'updatedAt']},
  });

  try {
    res.set({
      'Content-Type': 'application/json'
    })
    if(users.length!==0) {
      res.json({
        'status': 200,
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

router.post('/', async (req, res, next) => {
  const {name, username, password} = req.query;

  try {
    res.set({
      'Content-Type': 'application/json'
    })
  
    var errors = [];
    // Name Section
    if(name) {
      // Empty Check
      validator.isEmpty(name) ? errors.push({
        "field": "name",
        "key": "name.required",
        "message": "Name is Required"
      }) : false;
      // Lenght Min
      !validator.isByteLength(name, {min:1, max:50}) ? errors.push({
        "field": "name",
        "key": "name.length",
        "message": "Name must in 8 to 50 range"
      }) : false;
      // Alphanumeric Only
      !validator.isAlphanumeric(name) ? errors.push({
        "field": "name",
        "key": "name.type",
        "message": "Name must in alphanumeric type only"
      }) : false;
    } else {
      errors.push({
        "field": "name",
        "key": "name.required",
        "message": "Name is Required"
      })
    }

    // Username Section
    if(username) {
      // Empty Check
      validator.isEmpty(username) ? errors.push({
        "field": "username",
        "key": "username.required",
        "message": "Name is Required"
      }) : false;
      // Lenght Min
      !validator.isByteLength(username, {min:5, max:20}) ? errors.push({
        "field": "username",
        "key": "username.length",
        "message": "Name must in 5 to 20 range"
      }) : false;
      // Alphanumeric Only
      !validator.isAlphanumeric(username) ? errors.push({
        "field": "username",
        "key": "username.type",
        "message": "Name must in alphanumeric type only"
      }) : false;
    } else {
      errors.push({
        "field": "username",
        "key": "username.required",
        "message": "Name is Required"
      })
    }

    // Password Section
    if(password) {
      // Empty Check
      validator.isEmpty(password) ? errors.push({
        "field": "password",
        "key": "password.required",
        "message": "Name is Required"
      }) : false;
      // Lenght Min
      !validator.isByteLength(password, {min:8, max:20}) ? errors.push({
        "field": "password",
        "key": "password.length",
        "message": "Name must in 8 to 20 range"
      }) : false;
    } else {
      errors.push({
        "field": "password",
        "key": "password.required",
        "message": "Name is Required"
      });
    }

    if(errors.length!=0) {
      res.status(400).json({
        'status': '400',
        'message': 'Bad Request',
        'errors': errors
      });
      res.end();
    }
  
    await models.users.create({
      name: name,
      username: username,
      password: await hash(password)
    })
    
    res.status(200).json({
      'status': '200',
      'message': 'Success',
      'response': {
        'name': name,
        'username': username,
        'a': errors
      }
    });
  } catch (err) {
    res.status(500).json({
      'status': '500',
      'message': 'Server Unavailable',
      'response': err
    });
  }
  
  res.end();
})

async function hash(password) {
  const salt = await bcrypt.genSalt(10);
  const passwprdHash = await bcrypt.hash(password, salt);  
console.log(passwprdHash);
  return passwprdHash;
}
module.exports = router;