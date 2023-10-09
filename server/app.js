const express = require("express");
const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/v1", (res, req) => {
  console.log("test");
  res.send("hello");
});

const goalRouter = require("./routes/goals.router");
app.use("/api/v1/goal", goalRouter);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
