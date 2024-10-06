import seedService from '../seed/seedService.js';
import pokemonService from '../services/pokemonService.js';

const pokemonController = {
  seed: async (req, res) => {
    await seedService.executedSeed ();
    res.sendStatus (200);
  },

  getAllPokemon: async (req, res) => {
    await pokemonService.getAllPokemon (req, res);
  },

  getByIdPokemon: async (req, res) => {
    await pokemonService.getByIdPokemon (req, res);
  },

  searchPokemons: async (req, res) => {
    await pokemonService.searchPokemons (req, res);
  },
};

export default pokemonController;
