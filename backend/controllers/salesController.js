import salesService from '../services/salesService.js';

const salesController = {
  createTransaction: async (req, res) => {
    await salesService.createTransaction (req, res);
  },

  getDailySalesTotal: async (req, res) => {
    await salesService.getDailySalesTotal (req, res);
  },

  getMonthlySalesTotal: async (req, res) => {
    await salesService.getMonthlySalesTotal (req, res);
  },

  getTopSellingPokemons: async (req, res) => {
    await salesService.getTopSellingPokemons (req, res);
  },
};

export default salesController;
