/**
 * NextTern Server Entry Point
 * 
 * Initializes Express server with security, logging, and API routes.
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { checkDatabaseHealth } from './db/index.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// =============================================================================
// MIDDLEWARE
// =============================================================================

// Security headers
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: true, // Allow all origins for mobile development
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Request logging
app.use(morgan('dev'));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// =============================================================================
// HEALTH CHECK
// =============================================================================

app.get('/health', async (req, res) => {
  const dbHealth = await checkDatabaseHealth();
  
  res.status(dbHealth ? 200 : 503).json({
    status: dbHealth ? 'ok' : 'error',
    timestamp: new Date().toISOString(),
    services: {
      database: dbHealth ? 'connected' : 'disconnected',
      server: 'running',
    },
  });
});

// =============================================================================
// ROUTES
// =============================================================================

import apiRouter from './api/routes/index.js';
import { errorHandler } from './api/middleware/error-handler.js';
import { initWebSocket } from './services/chat/websocket.js';

// Mount API routes
app.use('/api/v1', apiRouter);

// Global Error Handler (MUST be last middleware)
app.use(errorHandler);

// =============================================================================
// SERVER START
// =============================================================================

const server = app.listen(PORT, () => {
  console.log(`
🚀 NextTern Server running on port ${PORT}
⭐️ Environment: ${process.env.NODE_ENV}
🔗 URL: http://localhost:${PORT}
  `);
});

// Initialize WebSocket Server
initWebSocket(server);

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

export default app;
