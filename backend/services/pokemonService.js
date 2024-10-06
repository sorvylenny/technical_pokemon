import Pokemon from '../models/pokemon.js';
import pokemonRepository from '../repositories/pokemonrepository.js';

const pokemonService = {
  getAllPokemon: async (req, res) => {
    try {
      const {page = 1, limit = 10, order = 'ASC'} = req.query;

      const limitInt = parseInt (limit, 10);
      const offset = (parseInt (page, 10) - 1) * limitInt;

      if (offset < 0) {
        return res
          .status (400)
          .json ({error: 'El número de página no puede ser menor que 1.'});
      }

      const {rows, count} = await Pokemon.findAndCountAll ({
        attributes: ['id', 'name', 'type', 'skill', 'price', 'imageUrl'],
        offset,
        limit: limitInt,
        order: order === 'ASC' ? [['name', 'ASC']] : [['name', 'DESC']],
      });

      return res.json ({
        total: count,
        page: parseInt (page, 10),
        totalPages: Math.ceil (count / limitInt),
        pokemon: rows,
      });
    } catch (error) {
      console.error ('Error al obtener los Pokémon:', error);

      if (!res.headersSent) {
        return res.status (500).json ({error: 'Error al obtener los Pokémon'});
      }
    }
  },

  getByIdPokemon: async (req, res) => {
    const {id} = req.params;
    try {
      const pokemon = await Pokemon.findOne ({
        where: {id},
      });

      if (!pokemon) {
        return res.status (404).json ({error: 'Pokémon no encontrado'});
      }

      return res.json (pokemon);
    } catch (error) {
      console.error ('Error al obtener el Pokémon:', error);
      if (!res.headersSent) {
        return res.status (500).json ({error: 'Error al obtener el Pokémon'});
      }
    }
  },
  searchPokemons: async (req, res) => {
    const {term, page = 1, limit = 10} = req.query;
    const limitInt = parseInt (limit, 10);
    const offset = (parseInt (page, 10) - 1) * limitInt;
    if (offset < 0) {
      return res
        .status (400)
        .json ({error: 'El número de página no puede ser menor que 1.'});
    }
    let result = [];
    try {
      if (term) {
        result = await pokemonRepository.searchPokemonByTerm (
          term,
          offset,
          limitInt
        );
      }
      return res.json (result);
    } catch (error) {
      console.error ('Error al obtener el Pokemon:', error);
    }
  },
};

export default pokemonService;
