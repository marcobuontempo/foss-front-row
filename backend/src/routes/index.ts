import express from 'express';
import userRoutes from "./user.routes";
import eventRoutes from "./event.routes";
import authRoutes from "./auth.routes";

const router = express.Router();

// Endpoints
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/events', eventRoutes);

// Root Endpoint
router.get('/', (req, res) => res.send("/ Endpoint"));

// All Invalid Endpoints
router.use('*', (req, res) => res.send("Invalid Route"));


export default router;