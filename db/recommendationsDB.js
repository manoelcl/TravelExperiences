const bcrypt = require("bcrypt");
const { generateError } = require("../helpers");
const { getConnection } = require("./db");

// Devuelve la info de una Recommendations

const getRecommendationByID = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `SELECT * FROM recommendation WHERE id=?`,
      [id]
    );

    if (result.length === 0) {
      throw generateError(" No hay ninguna recommendations con esa id", 404);
    }

    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

const listRecommendations = async (location, classId, order) => {
  let connection;

  try {
    connection = await getConnection();

    let queryString = `SELECT r.title, r.abstract, r.id, AVG(v.rating) AS average FROM recommendation r JOIN vote v ON r.id=v.id_recommendation`;
    let queryArray = [];
    if (location && classId) {
      queryString = queryString + ` WHERE r.location=? AND r.class=?`;
      queryArray.push(location, classId);
    } else {
      if (location) {
        queryString = queryString + ` WHERE r.location=?`;
        queryArray.push(location);
      } else if (classId) {
        queryString = queryString + ` WHERE r.class=?`;
        queryArray.push(classId);
      }
    }

    queryString = queryString + ` GROUP BY r.id`;

    if (order) {
      if (order.toUpperCase() === "ASC") {
        queryString = queryString + ` ORDER BY average ASC`;
      } else {
        queryString = queryString + ` ORDER BY average DESC`;
      }
    }

    const [result] = await connection.query(queryString, queryArray);

    if (result.length === 0) {
      throw generateError("No hay ninguna recommendations con esa id", 404);
    }

    return result;
  } finally {
    if (connection) connection.release();
  }
};

//Creamos una recomendacion

const postRecommendation = async (
  tittle,
  clase,
  location,
  abstract,
  content,
  image = ""
) => {
  let connection;

  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `
    INSERT INTO recommendation (tittle, class, location, abstract, content, image ='') 
    VALUES (?,?,?,?,?,?)
    `,
      [tittle, clase, location, abstract, content, image]
    );
    return result.insertRecommendation;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  getRecommendationByID,
  listRecommendations,
  postRecommendation,
};
