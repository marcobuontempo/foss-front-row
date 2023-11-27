import express from 'express';
import { getAllUserDetails, getOneUserDetails, updateUserDetails } from '@controllers/userdetail.controllers';

const router = express.Router();

// Retrieve a list of users (requires admin)
router.get('/', getAllUserDetails);

// Retrieve details of a specific user (requires authentication)
router.get('/:userid', getOneUserDetails);

// Update the details of a specific user (requires authentication)
router.put('/:userid', updateUserDetails)

export default router;