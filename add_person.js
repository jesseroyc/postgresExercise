require('dotenv').config();
const args = process.argv;

const ENV           = process.env.ENV || 'development';
const PORT          = process.env.PORT || 8080;
const knexConfig    = require('./knexfile');
const knex          = require('knex')(knexConfig[ENV]);
const morgan        = require('morgan');
const knexLogger    = require('knex-logger');
const express       = require('express');

const app           = express();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));


let newFamousPeople = { id        : 4, 
		                first_name: "Elon", 
	                     last_name: "Musk",
	                     birthdate: "June 28, 1971"};

knex('famous_people').insert(newFamousPeople)
                     .finally(function() {
  knex.destroy();
});