import { WebSocketServer, WebSocket } from 'ws';
import { Server } from 'http';
import jwt from 'jsonwebtoken';
import { prisma } from '../../db/client.js';

interface AuthenticatedWebSocket extends WebSocket {
  userId: string;
  isAlive: boolean;
}

export class WebSocketService {
  private wss: WebSocketServer;
  private clients: Map<string, AuthenticatedWebSocket[]> = new Map(); // userId -> sockets[]

  constructor(server: Server) {
    this.wss = new WebSocketServer({ server, path: '/ws' });
    this.setup();
  }

  private setup() {
    this.wss.on('connection', async (ws: WebSocket, req) => {
      try {
        // Extract token from query string
        const url = new URL(req.url || '', `http://${req.headers.host}`);
        const token = url.searchParams.get('token');

        if (!token) {
          ws.close(1008, 'Token required');
          return;
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret') as { id: string };
        const userId = decoded.id;

        // Attach user info to socket
        const authWs = ws as AuthenticatedWebSocket;
        authWs.userId = userId;
        authWs.isAlive = true;

        // Register client
        this.addClient(userId, authWs);

        // Setup ping-pong for heartbeat
        authWs.on('pong', () => {
          authWs.isAlive = true;
        });

        // Handle messages (if needed for client-sent events via WS, though we use REST for sending)
        authWs.on('message', (data) => {
          // Handle incoming WS messages if necessary
        });

        // Handle disconnect
        authWs.on('close', () => {
          this.removeClient(userId, authWs);
        });

      } catch (error) {
        console.error('WebSocket connection error:', error);
        ws.close(1008, 'Authentication failed');
      }
    });

    // Heartbeat interval
    setInterval(() => {
      this.wss.clients.forEach((ws) => {
        const authWs = ws as AuthenticatedWebSocket;
        if (!authWs.isAlive) return authWs.terminate();
        
        authWs.isAlive = false;
        authWs.ping();
      });
    }, 30000);
  }

  private addClient(userId: string, ws: AuthenticatedWebSocket) {
    const userSockets = this.clients.get(userId) || [];
    userSockets.push(ws);
    this.clients.set(userId, userSockets);
  }

  private removeClient(userId: string, ws: AuthenticatedWebSocket) {
    const userSockets = this.clients.get(userId);
    if (userSockets) {
      const updatedSockets = userSockets.filter(socket => socket !== ws);
      if (updatedSockets.length === 0) {
        this.clients.delete(userId);
      } else {
        this.clients.set(userId, updatedSockets);
      }
    }
  }

  /**
   * Send a message to a specific user
   */
  public sendToUser(userId: string, type: string, payload: any) {
    const userSockets = this.clients.get(userId);
    if (userSockets) {
      const message = JSON.stringify({ type, payload });
      userSockets.forEach(ws => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(message);
        }
      });
    }
  }

  /**
   * Broadcast a message to multiple users
   */
  public broadcast(userIds: string[], type: string, payload: any) {
    userIds.forEach(userId => this.sendToUser(userId, type, payload));
  }
}

// Singleton instance holder (will be initialized in index.ts)
export let webSocketService: WebSocketService | null = null;

export const initWebSocket = (server: Server) => {
  webSocketService = new WebSocketService(server);
  return webSocketService;
};
