import authService from '../services/authService.js';

const authController = {
  login: async (req, res) => {
    await authService.login (req, res);
  },
  register: async (req, res) => {
    await authService.register (req, res);
  },
};

export default authController;
