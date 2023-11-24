import express, { Express, Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import routes from "./routes";

//for .env File 
dotenv.config();

// Init app
const app: Application = express();
const port = process.env.PORT || 8000;

// Middleware to parse JSON in request body
app.use(express.json());

// Routes
app.use(routes);

// Start server
app.listen(port, () => {
    console.log(`Server running... http://localhost:${port}`);
});