import { deleteOrder, getAllOrders, getOneOrder } from '@controllers/order.controllers';
import express from 'express';

const router = express.Router();

// Retrieve a list of user orders (requires authentication)
router.get('/', getAllOrders);

// Retrieve details of a specific order (requires authentication)
router.get('/:orderid', getOneOrder);

// Cancel a specific order (requires authentication)
router.delete('/:orderid', deleteOrder);

export default router;