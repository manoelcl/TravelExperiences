const { getRecommendationbyID } = require("../db/db");

//ALL RECOMMENDATIONS
const listRecommendationsController = async (req, res, next) => {
  try {
    // Dos parametros en la misma busqueda
    const [location] = req.params;
    res.send({
      status: "error",
      message: "Not implemented",
    });
  } catch (error) {
    next(error);
  }
};
//SINGLE RECOMMENDATION - Hecho
const getRecommendationController = async (req, res, next) => {
  try {
    const [id] = req.params;

    const recomendation = await getRecommendationbyID(id);
    res.send({
      status: "ok",
      message: "Recommendation",
    });
  } catch (error) {
    next(error);
  }
};
//CREATE RECOMMENDATION - Login necesario
const postRecommendationController = async (req, res, next) => {
  try {
    res.send({
      status: "ok",
      message: "Recommendation Create",
    });
  } catch (error) {
    next(error);
  }
};
//CREATE COMMENT
const commentRecommendationController = async (req, res, next) => {
  try {
    res.send({
      status: "error",
      message: "Not implemented",
    });
  } catch (error) {
    next(error);
  }
};
//VOTE RECOMMENDATION
const voteRecommendationController = async (req, res, next) => {
  try {
    res.send({
      status: "error",
      message: "Not implemented",
    });
  } catch (error) {
    next(error);
  }
};
//DELETE RECOMMENDATION
const deleteRecommendationController = async (req, res, next) => {
  try {
    res.send({
      status: "error",
      message: "Not implemented",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listRecommendationsController,
  getRecommendationController,
  postRecommendationController,
  voteRecommendationController,
  commentRecommendationController,
  deleteRecommendationController,
};
