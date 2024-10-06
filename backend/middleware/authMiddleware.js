import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config ();

const authenticateUser = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token || !token.startsWith ('Bearer ')) {
      throw new Error (
        'Token de autenticación no proporcionado o en formato incorrecto'
      );
    }

    const tokenWithoutBearer = token.slice (7);
    const decodedToken = jwt.verify (
      tokenWithoutBearer,
      process.env.JWT_SECRET
    );

    req.user = decodedToken;
    console.log ('User:', req.user);

    next ();
  } catch (error) {
    console.error ('Error de autenticación:', error.message);

    if (error.name === 'TokenExpiredError') {
      return res.status (401).json ({message: 'El token ha expirado'});
    }

    if (error.name === 'JsonWebTokenError') {
      return res
        .status (401)
        .json ({message: 'Token de autenticación inválido'});
    }

    return res.status (401).json ({message: 'Error de autenticación'});
  }
};

export default authenticateUser;
