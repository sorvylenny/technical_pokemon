import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import validator from 'validator';
import User from '../models/user.js';

dotenv.config ();

const authService = {
  register: async (req, res) => {
    const {fullName, email, phone, password, address, role} = req.body;

    try {
      if (!validator.isEmail (email)) {
        return res
          .status (400)
          .json ({message: 'El formato de email es inválido'});
      }

      if (password.length < 6) {
        return res
          .status (400)
          .json ({message: 'La contraseña debe tener al menos 6 caracteres'});
      }

      if (
        !fullName ||
        !validator.isAlpha (fullName.replace (/\s+/g, ''), 'es-ES')
      ) {
        return res
          .status (400)
          .json ({message: 'El nombre no debe contener caracteres especiales'});
      }

      const phoneRegex = /^\+57\d{10}$/;
      if (!phoneRegex.test (phone)) {
        return res
          .status (400)
          .json ({message: 'El número de teléfono no es válido para Colombia'});
      }

      const existingUser = await User.findOne ({where: {email}});
      if (existingUser) {
        return res.status (400).json ({message: 'El usuario ya existe'});
      }

      const hashedPassword = await bcrypt.hash (password, 10);
      const newUser = await User.create ({
        fullName,
        email,
        phone,
        password: hashedPassword,
        address,
        role,
      });

      const token = jwt.sign (
        {userId: newUser.id, role: newUser.role},
        process.env.JWT_SECRET || 'secretKey',
        {expiresIn: '1h'}
      );

      res.status (201).json ({
        message: 'Usuario creado exitosamente',
        user: {
          id: newUser.id,
          fullName: newUser.fullName,
          email: newUser.email,
          phone: newUser.phone,
          address: newUser.address,
          role: newUser.role,
        },
        token,
      });
    } catch (error) {
      console.error ('Error en el registro:', error.message);
      res.status (400).json ({message: 'Ha ocurrido un error en el servidor'});
    }
  },

  login: async (req, res) => {
    let {email, password} = req.body;

    email = email.toLowerCase ();
    try {
      if (!validator.isEmail (email)) {
        return res
          .status (400)
          .json ({message: 'El formato de email es inválido'});
      }

      const user = await User.findOne ({where: {email}});

      if (!user) {
        return res.status (401).json ({
          message: 'El nombre de usuario o la contraseña son incorrectos',
        });
      }

      if (user.isActive === false) {
        return res
          .status (403)
          .json ({message: 'El usuario no se encuentra activo'});
      }

      const isPasswordValid = await bcrypt.compare (password, user.password);
      if (!isPasswordValid) {
        return res.status (401).json ({
          message: 'El nombre de usuario o la contraseña son incorrectos',
        });
      }

      const signedUser = {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        isActive: user.isActive,
        role: user.role,
      };

      const token = jwt.sign (
        {userId: user.id, email: user.email},
        process.env.JWT_SECRET,
        {expiresIn: '1h'}
      );

      res.status (200).json ({user: signedUser, token: token});
    } catch (error) {
      console.error ('Error en el inicio de sesión:', error.message);
      res.status (500).json ({message: 'Ha ocurrido un error en el servidor'});
    }
  },
};

export default authService;
