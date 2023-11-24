import express from 'express';

const router = express.Router();

// Authenticates user
router.get('/login', (req, res) => {
  res.send('Login');
});

// Creates new user
router.post('/register', (req, res) => {
  res.send('Register');
});

export default router;