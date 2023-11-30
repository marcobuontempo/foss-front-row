import express from 'express';
import { login, register } from '@controllers/auth.controllers';

const router = express.Router({ mergeParams: true });

// User registration
router.post('/register', register);

// User login
router.post('/login', login);

export default router;