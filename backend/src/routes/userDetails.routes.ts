import express from 'express';
import userDetailsController from '../controllers/userDetails.controllers';

const router = express.Router();

// Retrieves list of users
router.get('/', userDetailsController.getAllUserDetails);

export default router;