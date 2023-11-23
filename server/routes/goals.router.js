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
  console.log(req.body.date);
  const { task, description, date, index } = req.body;
  const query = `
    INSERT INTO "task" (title, description, date, index)
    VALUES ($1, $2, $3::timestamp without time zone, $4)
  `;

  // pool
  //   .query(query, [task, description, date, index])
  //   .then((result) => {
  //     res.sendStatus(201);
  //   })
  //   .catch((err) => {
  //     console.log("ERROR: creating task ", err);
  //     res.sendStatus(500);
  //   });
  res.sendStatus(200);
});
module.exports = router;
