import express from 'express';
import userRoutes from "./user.routes";
import userDetailsRoutes from "./userdetail.routes";
import eventRoutes from "./event.routes";
import ticketRoutes from "./ticket.routes";
import authRoutes from "./auth.routes";
import orderRoutes from "./order.routes";
import ErrorResponse from '@utils/responses/ErrorResponse';

const router = express.Router();

// Root Endpoint
router.get('/', (req, res) => res.send("/ Endpoint"));

// Public Endpoints
router.use('/auth', authRoutes);

// Authenticated Routes
router.use('/users', userRoutes);
router.use('/userdetails', userDetailsRoutes);
router.use('/events/:eventid/tickets', ticketRoutes);
router.use('/events', eventRoutes);
router.use('/orders', orderRoutes);

// All Invalid Endpoints
router.use('*', (req,res,next) => next(new ErrorResponse(404,"invalid endpoint")));


export default router;