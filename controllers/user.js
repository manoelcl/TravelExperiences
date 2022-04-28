const { generateError } = require("../helpers");
const { createUser, getUserByEmail } = require("../db");

//CREATE USER
const createUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Sustituir por JOI

    if (!email || !password) {
      throw generateError("Rellena los campos correctamente", 400);
    }

    const id = await createUser(email, password);

    res.send({
      status: "ok",
      message: `Has sido registrado correctamente con id: ${id}`,
    });
  } catch (error) {
    next(error);
  }
};

//LOGIN USER
const loginUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw generateError("Rellena los campos correctamente,400");
    }

    //Recojo los datos del usuario

    const user = await getUserByEmail(email);

    //Compruebo que coinciden password

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw generateError("Password incorrecto", 401);
    }

    //Payload del token

    const payload = { id: user.id };

    //Firmo el token

    const toke = jwt.sign(payload, process.env.SECRET, {
      expiresIN: "1d",
    });

    res.send({
      status: "error",
      message: "Not implemented",
    });
  } catch (error) {
    next(error);
  }
};
