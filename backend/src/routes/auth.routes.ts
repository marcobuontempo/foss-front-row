import express from 'express';
import { register, login, logout } from '@controllers/auth.controllers';

const router = express.Router({ mergeParams: true });

// User registration
router.post('/register', register);

// User login
router.post('/login', login);

// User logout
router.delete('/logout', logout);

export default router;