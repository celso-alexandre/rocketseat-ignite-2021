// import dotenv from 'dotenv';
import 'reflect-metadata';

import express from 'express';
import { createConnection } from 'typeorm';

import Routes from './routes';

const server = express();

server.use(express.json());

createConnection().then(() => {
  const routes = new Routes();
  server.use(routes.routes);

  // eslint-disable-next-line no-console
  server.listen(3333, () => console.log('Server listening at http://localhost:3333'));
});
