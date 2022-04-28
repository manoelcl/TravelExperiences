const bcrypt = require("bcrypt");
const { generateError } = require("../helpers");
const { getConnection } = require("./db");

// Devuelve la info de una Recommendations

const getRecommendationByID = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
SELECT id, id_user, tittle, class, location, abstract, content, photo, creation_date FROM recommendations WHERE id=?
`,
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
    INSERT INTO recommendations (tittle, class, location, abstract, content, image ='') 
    VALUES (?,?,?,?,?,?)
    `,
      [tittle, clase, location, abstract, content, image]
    );
    return result.insertRecommendation;
  } finally {
    if (connection) connection.release();
  }
};

module.export = {
  getRecommendationByID,
  postRecommendation,
};
