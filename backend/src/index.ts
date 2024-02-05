import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import mongodb from './utils/database/mongodb';
import routes from "./routes";
import errorResponseHandler from '@middlewares/errorResponseHandler.middleware';

// For .env File 
dotenv.config();

// CORS Options
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

// Wrapper for starting server
async function startServer() {
  // Init app
  const app: Application = express();
  const port = process.env.PORT || 8000;

  // Init Helmet Security
  app.use(helmet()); 

  // Connect to the database
  await mongodb.connect();

  // Pre-Route Middlewares
  app.use(cors(corsOptions));               // Enable CORS for all routes
  app.use(cookieParser());                  // Parse cookies in requests
  app.use(express.json());                  // Parse JSON in request body

  // Routes
  app.use(routes);                          // Global routes handler

  // Post-Route Middlewares
  app.use(errorResponseHandler);            // Handles errors and sends appropriate response

  // Start server
  const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

// Invoke function to start server
startServer().catch(console.error);