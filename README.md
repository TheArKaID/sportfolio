# Sportfolio aka Simple Portfolio

Is a simple personal Portfolio API that let you create and save your portfolio.

Built with Express, MySQL, Sequelize and JWT. 

## Installation

1. Clone this repo
> git clone https://github.com/TheArKaID/sportfolio

2. Install all needed package with your package manager (I use NPM)
> npm install

3. Config your database details in config/config.json
>{
>    "username": "root",
>    "password": "",
>    "database": "sportfolio",
>    "host": "127.0.0.1", // your localhost
>    "dialect": "mysql" // driver depends on database you used
>}

4. Run Migration with Sequelize
>sequelize db:migrate

5. Run Seeder (Optional, you can use the API to add user manually)
>sequelize db:seed:all

6. Run it!
>npm run server