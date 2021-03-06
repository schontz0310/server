/* eslint-disable no-console */
import 'reflect-metadata';
import 'dotenv/config';
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';
import AppError from '@shared/errors/AppError';

import routes from '@shared/infra/http/routes';

import '@shared/infra/database/typeorm';
import '@shared/container';

initializeTransactionalContext();
patchTypeORMRepositoryWithBaseRepository();
const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log(' ========================================================= ');
  console.log(' =============== Server started on port 3333 ============= ');
  console.log(' ========================================================= ');
});
