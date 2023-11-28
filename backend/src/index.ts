import express, { Application } from 'express';
import dotenv from 'dotenv';
import mongodb from './utils/mongodb';
import routes from "./routes";

//for .env File 
dotenv.config();

async function startServer() {
    // Init app
    const app: Application = express();
    const port = process.env.PORT || 8000;

    // Connect to the database
    await mongodb.connect();

    // Middleware to parse JSON in request body
    app.use(express.json());

    // Routes
    app.use(routes);

    // Error Handler
    app.use()

    // Start server
    const server = app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

// Invoke function to start server
startServer().catch(console.error);