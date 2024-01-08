import { deleteOrder, getAllOrders, getOneOrder, getUserOrders } from '@controllers/order.controllers';
import { isAdmin } from '@utils/auth/isAdmin';
import { isCurrentAuthUser } from '@utils/auth/isCurrentAuthUser';
import { isOrderOwner } from '@utils/auth/isOrderOwner';
import express from 'express';

const router = express.Router({ mergeParams: true });

// Retrieve a list of all orders (requires admin)
router.get('/', isAdmin, getAllOrders);

// Retrieve a list of specific user orders (requires authentication)
router.get('/user/:userid', isCurrentAuthUser, getUserOrders);

// Retrieve details of a specific order (requires authentication)
router.get('/:orderid', isOrderOwner, getOneOrder);

// Cancel a specific order (requires authentication)
router.delete('/:orderid', isOrderOwner, deleteOrder);

export default router;