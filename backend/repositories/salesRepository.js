import {fn, Op, col} from 'sequelize';
import models from '../models/associations.js';
const {Order, User, Pokemon, OrderPokemons} = models;

const salesRepository = {
  async createTransaction (payload) {
    try {
      const order = await Order.create ({
        userId: payload.userId,
        totalAmount: payload.totalAmount,
        pokemonsIds: payload.pokemonsIds,
      });

      await order.addPokemons (payload.pokemonsIds);

      return order;
    } catch (error) {
      console.log ('Error al crear la transacción en el repositorio:', error);
      throw new Error ('No se pudo crear la transacción.');
    }
  },
  async getSalesTotalByDateRange (startDate, endDate) {
    try {
      const result = await Order.sum ('totalAmount', {
        where: {
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
        },
      });

      return result || 0;
    } catch (error) {
      console.error (
        'Error al obtener el total de ventas por rango de fechas:',
        error
      );
      throw new Error (
        'No se pudo obtener el total de ventas por rango de fechas.'
      );
    }
  },

  async getPokemonSalesCount (offset = 0, limit = 10) {
    try {
      const results = await OrderPokemons.findAll ({
        attributes: [
          'pokemonId',
          [fn ('COUNT', col ('pokemonId')), 'salesCount'],
        ],
        group: ['pokemonId'],
        order: [[fn ('COUNT', col ('pokemonId')), 'DESC']],
        limit: limit,
        offset: offset,
      });

      const pokemonIds = results.map (result => result.pokemonId);

      const pokemons = await Pokemon.findAll ({
        where: {
          id: pokemonIds,
        },
      });

      return {
        pokemons: pokemons,
        salesCounts: results,
      };
    } catch (error) {
      console.error ('Error al obtener Pokémones más vendidos:', error);
      throw new Error ('No se pudo obtener los Pokémones más vendidos.');
    }
  },
};

export default salesRepository;
