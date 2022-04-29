const { generateError } = require("../helpers");
const {
  getRecommendationByID,
  listRecommendations,
  postRecommendation,
  voteRecommendation,
  commentRecommendation,
} = require("../db/recommendationsDB");

//ALL RECOMMENDATIONS
const listRecommendationsController = async (req, res, next) => {
  try {
    // Dos parametros en la misma busqueda
    const { location, classId, order } = req.query;

    const recommendationsList = await listRecommendations(
      location,
      classId,
      order
    );

    res.send({
      status: "ok",
      message: recommendationsList,
    });
  } catch (error) {
    next(error);
  }
};

//SINGLE RECOMMENDATION - Hecho
const getRecommendationController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const recommendation = await getRecommendationByID(id);
    res.send({
      status: "ok",
      message: recommendation,
    });
  } catch (error) {
    next(error);
  }
};

//CREATE RECOMMENDATION - Login necesario
const postRecommendationController = async (req, res, next) => {
  try {
    const { title, clase, location, abstract, content, photo } = req.body;

    const idRecommendation = await postRecommendation(
      req.auth.id,
      title,
      clase,
      location,
      abstract,
      content,
      photo
    );

    res.statusCode = 201;
    res.setHeader("Content-Location", `/entries/${idRecommendation}`);
    res.send({
      status: "ok",
      message: "Entrada creada correctamente.",
    });
  } catch (error) {
    next(error);
  }
};

//CREATE COMMENT
const commentRecommendationController = async (req, res, next) => {
  try {
    try {
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

//VOTE RECOMMENDATION
const voteRecommendationController = async (req, res, next) => {
  try {
    const { idRecommendation } = req.params;
    const { rating } = req.query;
    const idUser = req.auth.id;
    console.log(idRecommendation, rating, idUser);
    const [vote] = voteRecommendation(idUser, idRecommendation, rating);
    res.send({
      status: "ok",
      message: vote,
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
