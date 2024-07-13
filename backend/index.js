import { initializeDatabase } from './config/database.js';
import { initializeServer, close } from './config/webServer.js';

async function startup() {
  console.log('Starting application');

  try {
    console.log('Initializing web server module');
    await initializeDatabase();
    await initializeServer();
  } catch (error) {
    console.error(err);

    process.exit(1);
  }
}

async function shutdown(error) {
  let err = error;

  console.log('Shutting down');

  try {
    console.log('Closing web server module');

    await close();
  } catch (e) {
    console.log('Encountered error', e);

    err = err || e;
  }

  console.log('Exiting process');

  if (err) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

process.on('SIGTERM', () => {
  console.log('Received SIGTERM');

  shutdown();
});

process.on('SIGINT', () => {
  console.log('Received SIGINT');

  shutdown();
});

process.on('uncaughtException', (err) => {
  console.log('Uncaught exception');
  console.error(err);

  shutdown(err);
});

startup();
