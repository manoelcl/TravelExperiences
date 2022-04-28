require("dotenv").config();

const chalk = require("chalk");
const morgan = require("morgan");
const express = require("express");

const { authUser } = require("./middlewares/auth");
const { createUserController } = require("./controllers/user");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("dev"));

//Rutas de User

app.post("/users", createUserController);
app.post("/users/login", loginUserController);

//Rutas de Recommendations

app.get("/recommendations", listRecommendationsController);
app.get("/recommendations/:id", getRecommendationController);

//Private paths
app.post("/recommendations", authUser, postRecommendationController);
app.post(
  "/recommendations/:idRecommendation/comment",
  authUser,
  commentRecommendationController
);
app.post(
  "/recommendations/:idRecommendation/vote",
  authUser,
  voteRecommendationController
);
app.delete(
  "/recommendations/:idRecommendation",
  authUser,
  deleteRecommendationController
);

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
