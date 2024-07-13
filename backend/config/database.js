import mongoose from 'mongoose';
import 'dotenv/config';

const MONGODB_URI = process.env.MONGODB_URI || '';

export function initializeDatabase() {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(MONGODB_URI)
      .then(() => {
        console.log('Connected to MongoDB');
        resolve();
      })
      .catch((error) => {
        console.error(`DB error: ${error}`);
        reject();
      });
  });
}
