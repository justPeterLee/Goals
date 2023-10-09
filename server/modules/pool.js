const pg = require("pg");
let pool;

pool = new pg.Pool({
  host: "localhost",
  port: 5432,
  database: "goals",
});

module.exports = pool;
