import Pokemon from '../models/pokemon.js';
import {Op} from 'sequelize';

const pokemonRepository = {
  async getPokemonById (id) {
    try {
      return await Pokemon.findOne ({where: {id}});
    } catch (error) {
      console.error ('Error al obtener el Pokemon:', error);
      throw error;
    }
  },

  async searchPokemonByTerm (term, page, limit) {
    try {
      const cleanedTerm = term
        .toLowerCase ()
        .replace (/[^a-zA-Z0-9\s]/g, '')
        .split (' ');

      const keywords = cleanedTerm.filter (
        word => word !== '' && word !== 'y' && word !== 'o'
      );

      const searchConditions = keywords.map (keyword => ({
        [Op.or]: [
          {name: {[Op.iLike]: `%${keyword}%`}},
          {type: {[Op.iLike]: `%${keyword}%`}},
          {skill: {[Op.iLike]: `%${keyword}%`}},
        ],
      }));
      const totalCount = await Pokemon.count ({
        where: {
          [Op.or]: searchConditions,
        },
      });
      const totalPages = Math.ceil (totalCount / limit);

      const result = await Pokemon.findAll ({
        where: {
          [Op.or]: searchConditions,
        },
        limit: limit,
        offset: page,
        order: [['name', 'ASC']],
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      });

      return {
        pokemon: result,
        total: totalCount,
        page: page,
        totalPages: totalPages,
      };
    } catch (error) {
      console.error ('Error al obtener el Pokemon:', error);
      throw error;
    }
  },
};

export default pokemonRepository;
