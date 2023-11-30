import express from 'express';
import { deleteUser, updatePassword } from '@controllers/user.controllers';
import { isCurrentAuthUser } from '@utils/auth/isCurrentAuthUser';
import { isAdmin } from '@utils/auth/isAdmin';

const router = express.Router({ mergeParams: true });

// Update the password of a specific user (requires authentication)
router.put('/:userid/password', isCurrentAuthUser, updatePassword);

// Delete the details of a specific user (requires admin)
router.delete('/:userid', isAdmin, deleteUser);

export default router;