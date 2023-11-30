import express from 'express';
import { getAllUserDetails, getOneUserDetails, updateUserDetails } from '@controllers/userdetail.controllers';
import { isAdmin } from '@utils/auth/isAdmin';
import { isCurrentAuthUser } from '@utils/auth/isCurrentAuthUser';

const router = express.Router({ mergeParams: true });

// Retrieve a list of users (requires admin)
router.get('/', isAdmin, getAllUserDetails);

// Retrieve details of a specific user (requires authentication)
router.get('/:userid', isCurrentAuthUser, getOneUserDetails);

// Update the details of a specific user (requires authentication)
router.put('/:userid', isCurrentAuthUser, updateUserDetails)

export default router;