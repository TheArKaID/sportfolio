# Sportfolio a.k.a. Simple Portfolio

Is a simple personal Portfolio API that let you create and save your portfolio.

Built with Express (and express-generator), MySQL, Sequelize and JWT. 

## Feature

- [x] Users (C-R)
- [x] Portfolios (C-R-U-D)
- [ ] Skills

## Installation

1. Clone this repo
> git clone https://github.com/TheArKaID/sportfolio

2. Install all needed package with your package manager (I use NPM)
> npm install

3. Configure your environment details in file .env
> cp "example-rename to .env" ./.env

4. Run Migration with Sequelize
> sequelize db:migrate

5. Run Seeder (Optional, you can use the API to add user manually)
> sequelize db:seed:all

6. Run it!
> npm run server

## Test API

There's a path that you can use for testing the API, '/api-docs'.

### Pagination, Filtering and Sorting

For the GET request, the API will return the datas, total data, current page and total page, and you can control them.

If you want to GET only the data that have a 'word' (in his name or username for Users and title or description for Portfolios), use search query:
> search:string

In example
> localhost/users?search=arka

And you will GET all datas that have (name's or username's / title's or description's) 'arka'.

If you want to GET just a few data each page, use size query:
> size:integer

In example
> localhost/users?size=5

And you will GET only 5 datas in this request.

If you want to GET the other page, not the first, use page query:
> page:integer

In example
> localhost/users?page=2

And you will GET the datas that appear in the page 2.

If you need to sort it by a column, simply add sort parameter
> sort:string

In example
> localhost/users?sort=name

Then the data will be sorted by name. You can use name or username for Users, and project or desc (for description) for Portfolios. Default is createdAt

Another usefull stuff, order parameter for ordering the data,
> order:string

In example
> localhost/users?order=asc

It can be ASC or DESC (no case-sensitive), but default is DESC

However, you can chain all of query string in any order, in example
> localhost/users?search=arka&size=5&page=2&sort=name&order=asc

### Give it a try
[ArKa::Sportfolios](https://sportfolios.arka.web.id/) | 
[ArKa::SportfoliosAPITest](https://sportfolios.arka.web.id/api-docs)