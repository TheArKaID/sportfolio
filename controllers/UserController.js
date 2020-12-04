"use strict";

const bcrypt = require('bcrypt');
const models = require('../models/index');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const userSchema = Joi.object().keys({
    name: Joi.string().min(1).max(50).alphanum().required(),
    username: Joi.string().min(5).max(20).alphanum().required(),
    password: Joi.string().min(8).max(20).required()
});

let controllers = {
    get: async function(res, req, next){
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
                'status': 204,
                'message': 'Unavailable',
                'errors': 'Data Unavailable'
              })
            }
        } catch (error) {
            res.status(500).json({
              'message': 'Server Error. Try again later.'
            })
        }
    },
    post: async function(res, req, next){
        const {name, username, password} = req.body;
        const data = req.body;
      
        try {
          res.set({
            'Content-Type': 'application/json'
          })
        
          const {error, value} = userSchema.validate(data);
          
          if(error) {
            res.status(400).json({
              'status': 400,
              'message': 'Error',
              'error': {
                'field': error.details[0].path[0],
                'key': error.details[0].path[0]+'.'+error.details[0].type,
                'message': error.details[0].message
              }
            });
            res.end();
          }
      
          // Check Username Taken
          const users = await models.users.findAll({
            where: {
              username: username
            },
            attributes: ['id']
          });
          
          if(users.length!=0) {
            res.status(400).json({
              'status': 400,
              'message': 'Failed',
              'error': {
                "field": "username",
                "key": "username.unique",
                "message": "Username Already Taken"
              }
            });
            res.end()
          }
      
          let newUser = await models.users.create({
            name: name,
            username: username,
            password: await hash(password)
          })
          var token = jwt.sign({ 
            id: newUser.id
          }, '@Sportfolio@');
          
          res.status(200).json({
            'status': '200',
            'message': 'Success',
            'response': {
              'name': name,
              'token': token
            },
            'value': value
          });
      
        } catch (err) {
          res.status(500).json({
            'status': '500',
            'message': 'Service Unavailable',
            'error': err
          });
        }
        
        res.end();
    }
}

async function hash(password) {
    const salt = await bcrypt.genSalt(10);
    const passwprdHash = await bcrypt.hash(password, salt);  
    return passwprdHash;
}

module.exports = controllers;