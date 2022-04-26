require("dotenv").config();

const chalk = require("chalk");
const morgan = require("morgan");
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan("dev"));

app.use((error, req, res, next) => {
  console.error(error);
  res.send({
    status: "error",
    message: error.message,
  });
});

app.listen(port, () => {
  console.log(chalk.green(`app listening in port ${port}`));
});
