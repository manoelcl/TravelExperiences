const bcrypt = require("bcrypt");

const { generateError } = require("../helpers");
const { getConnection } = require("./db");

//CREATE USER IN DATABASE ( REVISAR ROLE)
const createUser = async (email, password, username, role) => {
  let connection;

  try {
    connection = await getConnection();

    //Comprobamos que no esta registrado ( Revisar mismo username)

    const [user] = await connection.query(
      `
            SELECT id FROM user WHERE email = ? 
        `,
      [email]
    );
    if (user.length > 0) {
      throw generateError("Ese email ya esta registrado, 409");
    }
    //Encriptamos password
    const passwordHash = await bcrypt.hash(password, 8);
    console.log(role);
    //Creamos el usuario
    const newUser = await connection.query(
      `
      INSERT INTO user (email, password, username, role) VALUES (?,?,?,?)
    `,
      [email, passwordHash, username, role]
    );
    //Nos devuelve el id
    return newUser.insertId;
  } finally {
    if (connection) connection.release();
  }
};

//Devuelve la info de un usuario - Para el login

const getUserByEmail = async (email) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `SELECT * FROM user WHERE email=?`,
      [email]
    );

    if (result.length === 0) {
      throw generateError(" No hay ningun usuario con ese id", 404);
    }

    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  createUser,
  getUserByEmail,
};
