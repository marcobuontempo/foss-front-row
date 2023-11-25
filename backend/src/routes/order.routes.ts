import express from 'express';

const router = express.Router();

// Retrieves list of orders
router.get('/', (req, res) => res.send("/orders"));

export default router;