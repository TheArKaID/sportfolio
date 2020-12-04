"use strict";

const models = require('../models/index');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const schemaValidation = Joi.object().keys({
    user_id: Joi.string().guid({version:'uuidv4'}).required(),
    token: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
    project: Joi.string().required(),
    description: Joi.string().required()
});

let controllers = {
    get: async function (req, res, next) {
        const portfolios = await models.portfolios.findAll({});

        try {
            res.set({
            'Content-Type': 'application/json'
            })
            if(portfolios.length!==0) {
            res.json({
                'status': 200,
                'message': 'Success',
                'response': portfolios
            })
            } else {
            res.status(200).json({
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
    post: async function (req, res, next) {
        const {project, platform, description, token} = req.body;
        const data = req.body;

        try {
            res.set({
            'Content-Type': 'application/json'
            })
            // Get ID
            var decoded_id = null;
            
            if(token) {
                jwt.verify(token, '@Sportfolio@', async (err, decoded) => {
                    if(err) {
                        res.status(400).json({
                            'status': 400,
                            'message': 'Error',
                            'errors': {
                                'field': 'token',
                                'key': 'token.invalid',
                                'messgae': 'Your Token was Wrong'
                            }
                        });
                        res.end();
                    }
                    decoded_id = decoded.id;
                    let users = await models.users.findAll({
                        where: {
                        id: decoded_id
                        },
                        attributes: ['id']
                    });
                    // check if user id is not exist
                    if(users.length==0) {
                        res.status(400).json({
                        'status': 400,
                        'message': 'Error',
                        'errors': {
                            'field': 'token',
                            'key': 'token.invalid',
                            'messgae': 'Your Token was Wrong'
                        }
                        });
                        res.end();
                    }
                    
                });
                data.user_id = decoded_id;
            }

            const {error, value} = schemaValidation.validate(data);

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
            
            // Create Portfolio
            await models.portfolios.create({
                user_id: decoded_id,
                project: project,
                platform: platform,
                description: description
            });

            res.status(200).json({
                'status': 200,
                'message': 'Success',
                'response': {
                    'Project Name': project,
                    'message': 'Your Project Saved Succesfully'
                }
            });
        } catch (error) {
            res.status(500).json({
            'status': '500',
            'message': 'Server Unavailable',
            'error': error
            });
        }
    }
}

module.exports = controllers;