import express from 'express';
import userController from '../controllers/user.controllers';

const router = express.Router();

// Retrieves list of users
router.get('/', userController.getAllUsers);

export default router;