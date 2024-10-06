import userRepository from '../repositories/userRepository.js';
import pokemonRepository from '../repositories/pokemonrepository.js';
import salesRepository from '../repositories/salesRepository.js';
import moment from 'moment';
import nodeMailerService from './mailerService.js';
const salesService = {
  createTransaction: async (req, res) => {
    const {userId, pokemonsIds} = req.body;

    try {
      const user = await userRepository.getUserById (userId);
      if (!user) {
        return res.status (400).json ({message: 'El usuario no existe'});
      }

      const pokemonsArray = await Promise.all (
        pokemonsIds.map (async id => {
          const pokemon = await pokemonRepository.getPokemonById (id);
          if (!pokemon) {
            throw new Error (`Pokémon con ID ${id} no encontrado.`);
          }
          return pokemon;
        })
      );

      const totalAmount = pokemonsArray.reduce ((total, pokemon) => {
        return total + (pokemon.price || 0);
      }, 0);

      const payload = {
        userId: user.id,
        pokemonsIds: pokemonsIds,
        totalAmount: totalAmount,
      };

      const newTransaction = await salesRepository.createTransaction (payload);

      nodeMailerService.sendEmail (newTransaction);

      return res.status (200).json ({
        message: 'Transacción creada exitosamente',
        transaction: newTransaction,
      });
    } catch (error) {
      console.error ('Error en la transacción:', error);
      return res.status (400).json ({error: error.message});
    }
  },

  getDailySalesTotal: async (req, res) => {
    try {
      const today = moment ().startOf ('day').toISOString ();
      const tomorrow = moment (today).add (1, 'days').toISOString ();
      const totalDailySales = await salesRepository.getSalesTotalByDateRange (
        today,
        tomorrow
      );

      return res.status (200).json ({totalDailySales});
    } catch (error) {
      console.error ('Error al obtener ventas diarias:', error);
      return res.status (400).json ({error: error.message});
    }
  },

  getMonthlySalesTotal: async (req, res) => {
    try {
      const startOfMonth = moment ().startOf ('month').toISOString ();
      const endOfMonth = moment ().endOf ('month').toISOString ();

      const totalMonthlySales = await salesRepository.getSalesTotalByDateRange (
        startOfMonth,
        endOfMonth
      );

      return res.status (200).json ({totalMonthlySales});
    } catch (error) {
      console.error ('Error al obtener ventas mensuales:', error);
      return res.status (400).json ({error: error.message});
    }
  },

  getTopSellingPokemons: async (req, res) => {
    const {page, limit} = req.query;

    const limitInt = parseInt (limit, 10);
    const offset = (parseInt (page, 10) - 1) * limitInt;
    if (offset < 0) {
      return res
        .status (400)
        .json ({error: 'El número de página no puede ser menor que 1.'});
    }

    try {
      const pokemonSales = await salesRepository.getPokemonSalesCount (
        offset,
        limitInt
      );

      return res.status (200).json ({pokemonSales});
    } catch (error) {
      console.error ('Error al obtener Pokémones más vendidos:', error);
      return res.status (400).json ({error: error.message});
    }
  },
};

export default salesService;
