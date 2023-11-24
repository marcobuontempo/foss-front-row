import express from 'express';

const router = express.Router();

// Retrieve a list of events
router.get('/', (req, res) => {
  res.send('List of events');
});

export default router;