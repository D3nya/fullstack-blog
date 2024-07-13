import express from 'express';
import http from 'http';
import 'dotenv/config';
import morgan from 'morgan';
import {
  UserRouter,
  PostRouter,
  UploadsRouter,
  CommentRouter,
  TagRouter,
} from '../routes/index.js';
import { uploadsPath } from '../utils/index.js';

const PORT = process.env.PORT || 8000;

let httpServer;

export function initializeServer() {
  return new Promise((resolve, reject) => {
    const app = express();

    httpServer = http.createServer(app);

    app.use(morgan('combined'));
    app.use(express.json());

    app.use('/uploads', express.static(uploadsPath));
    app.use('/users', UserRouter);
    app.use('/posts', PostRouter);
    app.use('/tags', TagRouter);
    app.use('/comments', CommentRouter);
    app.use('/uploads', UploadsRouter);

    httpServer
      .listen(PORT)
      .on('listening', () => {
        console.log(`Web server listening on localhost:${PORT}`);

        resolve();
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

export function close() {
  return new Promise((resolve, reject) => {
    httpServer.close((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
}
