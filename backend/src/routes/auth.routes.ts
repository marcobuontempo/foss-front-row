import express from 'express';
import { login, register } from '@controllers/auth.controllers';

const router = express.Router();

// User login
router.post('/login', login);

// User registration
router.post('/register', register);

export default router;