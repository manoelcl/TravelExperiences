require("dotenv").config();

const chalk = require("chalk");
const morgan = require("morgan");
const express = require("express");

const { authUser } = require("./middlewares/auth");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("dev"));

//Rutas de User

app.post("/user", createUserController);
app.post("/login", loginUserController);

//Rutas de Recommendations

app.get("/recommendations/:location/:class", listRecommendationsController);
app.get("/recommendations/:id", getRecommendationController);
app.post("/", authUser, postRecommendationController);
app.post("/recommendations/:id", commentRecommendationController);
app.post("/recommendations/:id", voteRecommendationController);
app.delete("/recommendations/id", deleteRecommendationController);

//Middleware 404
app.use((req, res) => {
  res.status(404).send({
    status: "error",
    message: "Not found",
  });
});
//Middleware de gestion de errores
app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.httpStatus || 500).send({
    status: "error",
    message: error.message,
  });
});

app.listen(3000, () => {
  console.log(chalk.green(`app listening in port 3000`));
});
