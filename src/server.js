// src/server.js
import express from 'express';
import 'dotenv/config';
import cors from 'cors';

import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

import notesRoutes from './routes/notesRoutes.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

await connectMongoDB();

app.use(logger);
app.use(express.json());
app.use(cors());

// ROUTES

app.use(notesRoutes);

app.get('/test-error', () => {
  throw new Error('Simulated server error');
});

// MIDDLEWARES - errorhandling

app.use(notFoundHandler);

app.use(errorHandler);

// RUN

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
