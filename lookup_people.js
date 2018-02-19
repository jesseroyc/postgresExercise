const pg = require("pg");
const settings = require("./settings"); // settings.json
const args = process.argv;

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

console.log("Searching...");

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(`SELECT * FROM famous_people WHERE first_name = '${args[2]}';`, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }

    console.log(`Found 1 person(s) by the name "${args[2]}":\n 
        ${result.rows[0].first_name} ${result.rows[0].last_name}, born "${result.rows[0].birthdate}"`);
    
    client.end();
  });
});