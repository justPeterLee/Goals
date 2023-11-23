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

router.post("/task", (req, res) => {
  console.log(req.body);
  const { task, description, date, year, month, day, index } = req.body;
  const query = `
    INSERT INTO "agenda" (task, description, date, year, month, day, time, index)
    VALUES ($1, $2, $3::TIMESTAMPTZ, $4, $5, $6, $7::TIMESTAMPTZ, $8);
  `;

  pool
    .query(query, [task, description, date, year, month, day, date, index])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("ERROR: creating task ", err);
      res.sendStatus(500);
    });
  // res.sendStatus(200);
});
module.exports = router;
