import express from 'express';
import { updatePassword } from '@controllers/user.controllers';
import { isCurrentAuthUser } from '@utils/auth/isCurrentAuthUser';

const router = express.Router();

// Update the password of a specific user (requires authentication)
router.put('/:userid/password', isCurrentAuthUser, updatePassword);

export default router;