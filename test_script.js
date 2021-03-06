const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect( (err) => {
  if (err) {
    return console.error("Connection Error", err);
  }

  // execute a query on our database
  client.query('SELECT $1::text as name', [args[2]], function (err, result) {
    if (err) {
      return console.error("error running query", err);
    }


    // just print the result to the console
    console.log(`Found 1 person(s) by the name "${args[2]}":\n 
        ${result.rows[0].first_name} ${result.rows[0].last_name}, born '${result.rows[0].birthdate}'`;

    // disconnect the client
    client.end();
  });
});