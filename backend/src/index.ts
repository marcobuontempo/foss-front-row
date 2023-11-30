import express, { Application } from 'express';
import dotenv from 'dotenv';
import mongodb from './utils/mongodb';
import routes from "./routes";
import errorResponseHandler from '@middlewares/errorResponseHandler.middleware';
import { authenticate } from '@middlewares/authentication.middleware';

//for .env File 
dotenv.config();

async function startServer() {
    // Init app
    const app: Application = express();
    const port = process.env.PORT || 8000;

    // Connect to the database
    await mongodb.connect();

    // Pre-Route Middlewares
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