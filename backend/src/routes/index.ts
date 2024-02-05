import express from 'express';
import userRoutes from "./user.routes";
import userDetailsRoutes from "./userdetail.routes";
import eventRoutes from "./event.routes";
import ticketRoutes from "./ticket.routes";
import authRoutes from "./auth.routes";
import orderRoutes from "./order.routes";
import ErrorResponse from '@utils/responses/ErrorResponse';
import { authenticate } from '@middlewares/authentication.middleware';
import packagejson from '../../package.json';

const router = express.Router({ mergeParams: true });

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get information about the FOSS Front Row application
 *     description: |
 *       This endpoint provides information about the FOSS Front Row application, including its name, version, author, license, description, and GitHub repository link.
 *     tags:
 *       - General
 *     responses:
 *       '200':
 *         description: Information about the FOSS Front Row application
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: The name of the FOSS Front Row application.
 *                 version:
 *                   type: string
 *                   description: The version of the FOSS Front Row application.
 *                 author:
 *                   type: string
 *                   description: The author of the FOSS Front Row application.
 *                 license:
 *                   type: string
 *                   description: The license under which the FOSS Front Row application is distributed.
 *                 description:
 *                   type: string
 *                   description: A brief description of the FOSS Front Row application.
 *                 github:
 *                   type: string
 *                   format: uri
 *                   description: The link to the FOSS Front Row GitHub repository.
 *       '500':
 *         description: Internal Server Error. Something went wrong during the information retrieval.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
// Root Endpoint
router.get('/', (req, res) => res.send({
  name: "FOSS Front Row",
  version: packagejson.version,
  author: packagejson.author,
  license: packagejson.license,
  description: packagejson.description,
  github: "https://github.com/marcobuontempo/foss-front-row",
}));

// Public Endpoints
router.use('/auth', authRoutes);

// Authenticated Routes
router.use('/users', authenticate, userRoutes);
router.use('/userdetails', authenticate, userDetailsRoutes);
router.use('/events/:eventid/tickets', authenticate, ticketRoutes);
router.use('/events', authenticate, eventRoutes);
router.use('/orders', authenticate, orderRoutes);
router.use('/tickets', authenticate, ticketRoutes);

// All Invalid Endpoints
router.use('*', (req, res, next) => next(new ErrorResponse(404, "invalid endpoint")));


export default router;