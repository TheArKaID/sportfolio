"use strict";

const models = require('../models/index');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const schemaValidation = Joi.object().keys({
    user_id: Joi.string().guid({version:'uuidv4'}).required(),
    portfolio_id: Joi.string().guid({version:'uuidv4'}),
    token: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
    project: Joi.string().required(),
    description: Joi.string().required()
});
const schemaDelete = Joi.object().keys({
    user_id: Joi.string().guid({version:'uuidv4'}).required(),
    portfolio_id: Joi.string().guid({version:'uuidv4'}),
    token: Joi.alternatives().try(Joi.string(), Joi.number()).required()
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
                    'error': 'Data Unavailable'
                })
            }
        } catch (error) {
            res.status(500).json({
                'status': '500',
                'message': 'Service Unavailable',
                'error': error
            })
        }
    },
    post: async function (req, res, next) {
        const {project, description, token} = req.body;
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
    },
    put: async function (req, res, next) {
        let data = req.body;

        try {
            res.set({
                'Content-Type': 'application/json'
            })
            // Get ID
            var decoded_id = null;
            
            // validate token
            if(data.token) {
                jwt.verify(data.token, '@Sportfolio@', async (err, decoded) => {
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
    
            // validate data schema
            const {error, value} = schemaValidation.validate(req.body);
    
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
            
            let portfolio = await models.portfolios.findByPk(data.portfolio_id);
            // Check if Portfolio is correct
            if(!portfolio) {
                res.status(400).json({
                    'status': 400,
                    'message': 'Error',
                    'error': {
                        'field': 'portfolio_id',
                        'key': 'portfolio_id.incorrect',
                        'message': 'Your Portfolio ID was Incorrect'
                    }
                });
                res.end();
            }
            portfolio.project = data.project;
            portfolio.description = data.description;
            await portfolio.save();

            res.status(200).json({
                'status': 200,
                'message': 'Success',
                'response': {
                    'Project Name': portfolio.project,
                    'message': 'Your Project Updated Succesfully'
                }
            })
            res.end();
        } catch (error) {
            res.status(500).json({
                'status': '500',
                'message': 'Server Unavailable',
                'error': error
            });
        }
    },
    delete: async function (req, res, next) {
        let data = req.body;

        try {
            res.set({
                'Content-Type': 'application/json'
            })
            // Get ID
            var decoded_id = null;
            
            // validate token
            if(data.token) {
                jwt.verify(data.token, '@Sportfolio@', async (err, decoded) => {
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
    
            // validate data schema
            const {error, value} = schemaDelete.validate(req.body);
    
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
            
            let portfolio = await models.portfolios.findByPk(data.portfolio_id);
            // Check if Portfolio is correct
            if(!portfolio) {
                res.status(400).json({
                    'status': 400,
                    'message': 'Error',
                    'error': {
                        'field': 'portfolio_id',
                        'key': 'portfolio_id.incorrect',
                        'message': 'Your Portfolio ID was Incorrect'
                    }
                });
                res.end();
            }
            
            await portfolio.destroy();

            res.status(200).json({
                'status': 200,
                'message': 'Success',
                'response': {
                    'Project Name': data.project,
                    'message': 'Project Deleted'
                }
            })
            res.end();
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