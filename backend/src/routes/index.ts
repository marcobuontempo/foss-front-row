import express from 'express';
import userRoutes from "./user.routes";
import userDetailsRoutes from "./userdetail.routes";
import eventRoutes from "./event.routes";
import ticketRoutes from "./ticket.routes";
import authRoutes from "./auth.routes";
import orderRoutes from "./order.routes";

const router = express.Router();

// Endpoints
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/userdetails', userDetailsRoutes);
router.use('/events/:eventid/tickets', ticketRoutes);
router.use('/events', eventRoutes);
router.use('/orders', orderRoutes);

// Root Endpoint
router.get('/', (req, res) => res.send("/ Endpoint"));

// All Invalid Endpoints
router.use('*', (req, res) => res.send("Invalid Route"));


export default router;