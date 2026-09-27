// src/server.js
import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { errors } from "celebrate";
import cookieParser from "cookie-parser";



import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

import authRoutes from './routes/authRoutes.js';
import notesRoutes from './routes/notesRoutes.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

await connectMongoDB();

app.use(logger);
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// ROUTES

app.use(authRoutes);
app.use(notesRoutes);

// MIDDLEWARES - errorhandling

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

// RUN

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
