import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import securityMiddleware from './middleware/security';
import errorHandler from './middleware/error';

import apiRouter from './routes/index';

const app: Application = express();

// Middleware
app.use(compression());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.NODE_ENV === 'development' ? true : 'https://coderushapp.netlify.app',
    credentials: true,
  })
);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(...securityMiddleware);

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/v1', apiRouter);

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found' });
});

export default app;
