import {Router} from 'express';
import pokemonController from '../controllers/pokemonController.js';

const router = Router ();

router.get ('/seed', pokemonController.seed);
router.get ('/all', pokemonController.getAllPokemon);
router.get ('/search', pokemonController.searchPokemons);
router.get ('/:id', pokemonController.getByIdPokemon);

export default router;
