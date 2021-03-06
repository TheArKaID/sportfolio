require('dotenv').config();
var url = process.env.API_URL ? `${process.env.API_URL}` : `http://localhost`;
var apiUrl = process.env.API_PORT ? `${url}:${process.env.API_PORT}` : url;
module.exports = 
{
    "openapi": "3.0.1",
    "info": {
        "title": "Sportfolio",
        "description": "Sportfolio API Documentation",
        "version": "0.2.0"
    },
    "servers": [
        {
            "url": `${apiUrl}`
        }
    ],
    "tags": [
        {
            "name": "GET",
            "description": "for Reading Data"
        },
        {
            "name": "POST",
            "description": "for Inserting Data"
        },
        {
            "name": "PUT",
            "description": "for Updating Data"
        },
        {
            "name": "DELETE",
            "description": "for Deleteing Data"
        }
    ],
    "paths": {
        "/users/": {
            "get": {
                "description": "Get All Users Data",
                "parameters": [
                    {
                        "name": "search",
                        "in": "query",
                        "required": false,
                        "description": "Search Users by name or username",
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "page",
                        "in": "query",
                        "required": false,
                        "description": "Page of the data. The First and Default is 0",
                        "schema": {
                            "type": "integer"
                        }
                    },
                    {
                        "name": "size",
                        "in": "query",
                        "required": false,
                        "description": "How many data you want per page. Default is 3",
                        "schema": {
                            "type": "integer"
                        }
                    },
                    {
                        "name": "sort",
                        "in": "query",
                        "required": false,
                        "description": "Sort the data by name or username. Default is createdAt",
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "order",
                        "in": "query",
                        "required": false,
                        "description": "The data order of the result. Pass ASC or DESC. Default is DESC",
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "tags": [
                    "GET"
                ],
                "responses": {
                    "200": {
                        "description": "Success",
                        "content": {
                            "application/json; charset=utf-8": {
                                "examples": {
                                    "response": {
                                        "value": {
                                            "status": 200,
                                            "message": "Success",
                                            "response": {
                                                "id": "181121c5-d80c-4f6a-aa54-0ae823d828de",
                                                "name": "arifia",
                                                "username": "theaasdq1",
                                                "createdAt": "2020-12-04T07:11:02.000Z"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "204": {
                        "description": "Unavailable",
                        "content": {
                            "application/json; charset=utf-8": {
                                "examples": {
                                    "response": {
                                        "value": {
                                            "status": 204,
                                            "message": "Unavailable",
                                            "error": "Data Unavailable"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "servers": [
                    {
                        "url": `${apiUrl}`
                    }
                ]
            },
            "post": {
                "description": "Create a User",
                "tags": [
                    "POST"
                ],
                "requestBody": {
                    "content": {
                        "application/json;": {
                            "schema": {
                                "$ref": "#/components/users/schemas/body/post"
                            },
                            "examples": {
                                "Body Request": {
                                    "value": {
                                        "name": "Arifia",
                                        "username": "thearka",
                                        "password": "Ak123456"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Success",
                        "content": {
                            "application/json; charset=utf-8": {
                                "examples": {
                                    "response": {
                                        "value": {
                                            "status": 200,
                                            "message": "Success",
                                            "response": {
                                                "name": "Arifia",
                                                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRhNDA2NGIzLTcxZDEtNDgzNS1hZTUxLTIzOWE1OTIwN2NjMSIsImlhdCI6MTYwNzA2NTg2Mn0.fUo1c4UNwgV3zmR6Ph5XdywuQ4jhON4UnevwQK-pCsc"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "content": {
                            "application/json; charset=utf-8": {
                                "examples": {
                                    "response": {
                                        "value": {
                                            "status": 400,
                                            "message": "Failed",
                                            "error": {
                                                "field": "username",
                                                "key": "username.unique",
                                                "message": "Username Already Taken"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Server Error",
                        "content": {
                            "application/json; charset=utf-8": {
                                "examples": {
                                    "response": {
                                        "value": {
                                            "status": "500",
                                            "message": "Service Unavailable",
                                            "error": {}
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "servers": [
                    {
                        "url": `${apiUrl}`
                    }
                ]
            },
            "servers": [
                {
                    "url": `${apiUrl}`
                }
            ]
        },
        "/portfolios/": {
            "get": {
                "description": "Get All Portfolios Data",
                "parameters": [
                    {
                        "name": "search",
                        "in": "query",
                        "required": false,
                        "description": "Search Portfolio by title or description",
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "page",
                        "in": "query",
                        "required": false,
                        "description": "Page of the data. The First and Default is 0",
                        "schema": {
                            "type": "integer"
                        }
                    },
                    {
                        "name": "size",
                        "in": "query",
                        "required": false,
                        "description": "How many data you want per page. Default is 3",
                        "schema": {
                            "type": "integer"
                        }
                    },
                    {
                        "name": "sort",
                        "in": "query",
                        "required": false,
                        "description": "Sort the data by project or desc (for description). Default is createdAt",
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "order",
                        "in": "query",
                        "required": false,
                        "description": "The data order of the result. Pass ASC or DESC. Default is DESC",
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "tags": [
                    "GET"
                ],
                "responses": {
                    "200": {
                        "description": "Success",
                        "content": {
                            "application/json; charset=utf-8": {
                                "examples": {
                                    "response": {
                                        "value": {
                                            "status": 200,
                                            "message": "Success",
                                            "response": [
                                                {
                                                    "id": "0c290623-7108-458d-8b28-9eb0487aca6f",
                                                    "user_id": "d640ab8b-276f-428d-bbf4-ee6b96a1d6f5",
                                                    "project": "sportfolio",
                                                    "description": "User, Portfolio, Skill",
                                                    "createdAt": "2020-12-04T00:50:12.000Z",
                                                    "updatedAt": "2020-12-04T00:50:12.000Z"
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "204": {
                        "description": "Unavailable",
                        "content": {
                            "application/json; charset=utf-8": {
                                "examples": {
                                    "response": {
                                        "value": {
                                            "status": 204,
                                            "message": "Unavailable",
                                            "error": "Data Unavailable"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "servers": [
                    {
                        "url": `${apiUrl}`
                    }
                ]
            },
            "post": {
                "description": "Create a Portfolio",
                "tags": [
                    "POST"
                ],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/portfolios/schemas/body/post"
                            },
                            "examples": {
                                "Body Request": {
                                    "value": {
                                        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRhNDA2NGIzLTcxZDEtNDgzNS1hZTUxLTIzOWE1OTIwN2NjMSIsImlhdCI6MTYwNzA2NTg2Mn0.fUo1c4UNwgV3zmR6Ph5XdywuQ4jhON4UnevwQK-pCsc",
                                        "project": "Portfolio",
                                        "description": "Simple Portfolio API"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Success",
                        "content": {
                            "application/json; charset=utf-8": {
                                "examples": {
                                    "response": {
                                        "value": {
                                            "status": 200,
                                            "message": "Success",
                                            "response": {
                                                "Project Name": "Portfolio",
                                                "message": "Your Project Saved Succesfully"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "204": {
                        "description": "Unavailable",
                        "content": {
                            "application/json; charset=utf-8": {
                                "examples": {
                                    "response": {
                                        "value": {
                                            "status": 204,
                                            "message": "Unavailable",
                                            "error": "Data Unavailable"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "content": {
                            "application/json; charset=utf-8": {
                                "examples": {
                                    "response": {
                                        "value": {
                                            "status": 400,
                                            "message": "Error",
                                            "errors": {
                                                "field": "token",
                                                "key": "token.invalid",
                                                "messgae": "Your Token was Wrong"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Server Error",
                        "content": {
                            "application/json; charset=utf-8": {
                                "examples": {
                                    "response": {
                                        "value": {
                                            "status": "500",
                                            "message": "Service Unavailable",
                                            "error": {}
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "servers": [
                    {
                        "url": `${apiUrl}`
                    }
                ]
            },
            "put": {
                "description": "Updating a Portfolio",
                "tags": [
                    "PUT"
                ],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/portfolios/schemas/body/put"
                            },
                            "examples": {
                                "Body Request": {
                                    "value": {
                                        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRhNDA2NGIzLTcxZDEtNDgzNS1hZTUxLTIzOWE1OTIwN2NjMSIsImlhdCI6MTYwNzA2NTg2Mn0.fUo1c4UNwgV3zmR6Ph5XdywuQ4jhON4UnevwQK-pCsc",
                                        "portfolio_id": "47220d47-7fde-457c-a850-d65292fc8eb8",
                                        "project": "Portfolio 2",
                                        "description": "Simple Portfolio API's"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Success",
                        "content": {
                            "application/json; charset=utf-8": {
                                "examples": {
                                    "response": {
                                        "value": {
                                            "status": 200,
                                            "message": "Success",
                                            "response": {}
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "content": {
                            "application/json; charset=utf-8": {
                                "examples": {
                                    "token": {
                                        "value": {
                                            "status": 400,
                                            "message": "Error",
                                            "errors": {
                                                "field": "token",
                                                "key": "token.invalid",
                                                "messgae": "Your Token was Wrong"
                                            }
                                        }
                                    },
                                    "portfolio": {
                                        "value": {
                                            "status": 400,
                                            "message": "Error",
                                            "error": {
                                                "field": "portfolio_id",
                                                "key": "portfolio_id.incorrect",
                                                "message": "Your Portfolio ID was Incorrect"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Server Error",
                        "content": {
                            "application/json; charset=utf-8": {
                                "examples": {
                                    "response": {
                                        "value": {
                                            "status": "500",
                                            "message": "Service Unavailable",
                                            "error": {}
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "servers": [
                    {
                        "url": `${apiUrl}`
                    }
                ]
            },
            "delete": {
                "description": "Deleting a Portfolio",
                "tags": [
                    "DELETE"
                ],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/portfolios/schemas/body/delete"
                            },
                            "examples": {
                                "Body Request": {
                                    "value": {
                                        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRhNDA2NGIzLTcxZDEtNDgzNS1hZTUxLTIzOWE1OTIwN2NjMSIsImlhdCI6MTYwNzA2NTg2Mn0.fUo1c4UNwgV3zmR6Ph5XdywuQ4jhON4UnevwQK-pCsc",
                                        "portfolio_id": "47220d47-7fde-457c-a850-d65292fc8eb8"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Success",
                        "content": {
                            "application/json; charset=utf-8": {
                                "examples": {
                                    "response": {
                                        "value": {
                                            "status": 200,
                                            "message": "Success",
                                            "response": {
                                                "Project Name": "Portfolio",
                                                "message": "Project Deleted"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "content": {
                            "application/json; charset=utf-8": {
                                "examples": {
                                    "token": {
                                        "value": {
                                            "status": 400,
                                            "message": "Error",
                                            "error": {
                                                "field": "token",
                                                "key": "token.invalid",
                                                "messgae": "Your Token was Wrong"
                                            }
                                        }
                                    },
                                    "porfolio_id": {
                                        "value": {
                                            "status": 400,
                                            "message": "Error",
                                            "error": {
                                                "field": "portfolio_id",
                                                "key": "portfolio_id.incorrect",
                                                "message": "Your Portfolio ID was Incorrect"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Server Error",
                        "content": {
                            "application/json; charset=utf-8": {
                                "examples": {
                                    "response": {
                                        "value": {
                                            "status": "500",
                                            "message": "Service Unavailable",
                                            "error": {}
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "servers": [
                    {
                        "url": `${apiUrl}`
                    }
                ]
            },
            "servers": [
                {
                    "url": `${apiUrl}`
                }
            ]
        }
    },
    "components": {
        "users": {
            "schemas": {
                "body": {
                    "post": {
                        "type": "object",
                        "properties": {
                            "name": {
                                "type": "string"
                            },
                            "username": {
                                "type": "string"
                            },
                            "password": {
                                "type": "string"
                            }
                        }
                    }
                }
            }
        },
        "portfolios": {
            "schemas": {
                "body": {
                    "post": {
                        "type": "object",
                        "properties": {
                            "token": {
                                "type": "string"
                            },
                            "project": {
                                "type": "string"
                            },
                            "description": {
                                "type": "string"
                            }
                        }
                    },
                    "put": {
                        "type": "object",
                        "properties": {
                            "token": {
                                "type": "string"
                            },
                            "portfolio_id": {
                                "type": "string"
                            },
                            "project": {
                                "type": "string"
                            },
                            "description": {
                                "type": "string"
                            }
                        }
                    },
                    "delete": {
                        "type": "object",
                        "properties": {
                            "token": {
                                "type": "string"
                            },
                            "portfolio_id": {
                                "type": "string"
                            }
                        }
                    }
                }
            }
        }
    }
}