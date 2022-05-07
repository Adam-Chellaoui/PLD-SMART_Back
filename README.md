# Eve's back-end.

Eve's back-end repo of the project: a REST API built with [Express](<(https://expressjs.com)>) using nodeJS. It will do the middle man between the client smartphones requests and the MySql database.
It should take care of authenticating the users, serving contents and protecting restricted content from bad users.

## Running

Clone the repo and then cd inside the directory. Then install the packages with:

`npm install`

Set the .env file as the .env.template. Then run:

`npm run dev`

Will start the development server with hot reloading at port 3000.
Open in your browser:

`localhost:3000`

and you should see a welcome message. :)

## Stack and libraries

For communicating with the mysql server we use the [mysql2 node driver](https://www.npmjs.com/package/mysql2).

For authentication we use [JWT tokens](https://jwt.io/introduction).

We are using password hashing with [bcrypt](https://www.npmjs.com/package/bcrypt) for storing the passwords.

For environment variables we use [dotenv](https://www.npmjs.com/package/dotenv).

## Environment variables

Environment variables are kept inside `.env` file and can be read inside the code by accessing `process.env.ENV_NAME` (to read ENV_NAME).

The .env file is not uploaded to github for security purposes. The secret for the JWT tokens signature and the MySql database password should not be uploaded to the repo and only filled locally during development.

## Code structure

The code directory structure is defined as:

```
root
| .env
│
└───src
│   │   app.js
│   │
│   │
│   └───helpers
│       │   query
│       │   utils
│       │   ...
│   └───middleware
│       │   authenticateToken.js
│       │   authenticateAdmin.js
│       │   ...
│   └───routes
│       │
|       |
|       └───admin
|       |    |  query.js
|       |    |  routes.js
|       |
│       └───event
|       |   |  query.js
|       |   |  routes.js
│       │   ...
│
└───public
    │____images
         |  [imagename].jpg
         |  [imagename].jpg
         |  ...
```

`src/app.js` is the entry of the application and where the server routes definitions are.
Inside the `public/images` directory we store the images used for the events.
(NB: this is a temporary measure, and we shall use a dedicated storage for the images)
We keep all the routing code inside the `src/routes` directory, where each group of routes has its own
folder. Inside it, there is a `query.js` file with all the SQL queries and a `routes.js` with the routes methods.
Inside the `src/middleware` we keep the [middleware functions](https://expressjs.com/en/guide/using-middleware.html). For now they are only authentication middleware.
