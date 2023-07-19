import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import asyncError from 'express-async-errors';
import rateLimit from 'express-rate-limit';
import session from 'express-session';
import helmet from 'helmet';

import { APP_HOST, APP_PORT, RATE_LIMIT, SECRET_KEY } from '@env';

import { APIError } from '~/helpers';
import errorHandler from '~/middlewares/errorHandler';
import isMaintenance from '~/middlewares/isMaintenance';
import v1Route from '~/routes/v1';

const app = express();

app.use(helmet());
app.use(cors());

app.use(rateLimit({ max: Number(RATE_LIMIT), windowMs: 15 * 60 * 1000 }));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.text({ type: 'text/plain' }));
app.use(
  session({
    secret: SECRET_KEY,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 * 2 },
    resave: true,
    saveUninitialized: true,
  })
);

app.use(isMaintenance);

app.use(v1Route);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  throw new APIError('Not found', 404);
});

app.use(errorHandler);

app.listen(Number(APP_PORT), APP_HOST, () => {
  console.log(`Server is running on http://${APP_HOST}:${APP_PORT}`);
});

export default app;
