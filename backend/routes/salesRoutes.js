import {Router} from 'express';
import salesController from '../controllers/salesController.js';
import authenticateUser from '../middleware/authMiddleware.js';

const router = Router ();
router.post ('', authenticateUser, salesController.createTransaction);
router.get (
  '/daily-sales',
  authenticateUser,
  salesController.getDailySalesTotal
);
router.get (
  '/monthly-sales',
  authenticateUser,
  salesController.getMonthlySalesTotal
);
router.get (
  '/top-selling-pokemons',
  authenticateUser,
  salesController.getTopSellingPokemons
);

export default router;
