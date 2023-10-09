const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
require("dotenv").config();

router.get("/", (req, res) => {
  const query = "SELECT * FROM goals;";

  pool.query(query).then((result) => {
    console.log(result.rows);
    res.send(result.rows);
  });
});

module.exports = router;
