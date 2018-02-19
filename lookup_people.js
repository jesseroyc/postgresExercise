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

//REFACTORED PERSON LOOKUP
knex('famous_people').where({ first_name: args[2] })
                     .select('*')
                     .then(function(result) {
        
if (!result || !result[0])  {
  console.log("FAMOUS PERSON WAS NOT FOUND")
} else {
  console.log("FAMOUS PERSON FOUND\n");
  console.log(`Found 1 person(s) by the name "${args[2]}":\n 
               ${result[0].first_name} ${result[0].last_name}, born "${result[0].birthdate}"`);
}

  }).catch(function(error) {
    console.log(error);
});