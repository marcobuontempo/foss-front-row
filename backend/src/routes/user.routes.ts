import express from 'express';
import { updatePassword } from '@controllers/user.controllers';

const router = express.Router();

// Update the password of a specific user (requires authentication)
router.put('/:userid/password', updatePassword);

export default router;