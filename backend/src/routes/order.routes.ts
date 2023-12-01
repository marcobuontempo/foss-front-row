import { deleteOrder, getAllOrders, getOneOrder } from '@controllers/order.controllers';
import { isAdmin } from '@utils/auth/isAdmin';
import { isOrderOwner } from '@utils/auth/isOrderOwner';
import express from 'express';

const router = express.Router({ mergeParams: true });

// Retrieve a list of user orders (requires authentication)
router.get('/', isAdmin, getAllOrders);

// Retrieve details of a specific order (requires authentication)
router.get('/:orderid', isOrderOwner, getOneOrder);

// Cancel a specific order (requires authentication)
router.delete('/:orderid', isOrderOwner, deleteOrder);

export default router;