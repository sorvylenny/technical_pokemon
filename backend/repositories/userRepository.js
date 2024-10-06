import User from '../models/user.js';

const userRepository = {
  async getUserById (userId) {
    try {
      const user = await User.findOne ({
        where: {id: userId},
        attributes: {exclude: ['password']}, // Excluir el campo de la contraseña
      });

      if (!user) {
        throw new Error ('Usuario no encontrado');
      }

      return user; // Retorna el usuario sin la contraseña
    } catch (error) {
      console.error ('Error al obtener el usuario:', error);
      throw error; // Propaga el error para manejarlo más arriba en la cadena
    }
  },
};

export default userRepository;
