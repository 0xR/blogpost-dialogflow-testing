import express from 'express';
import dialogflowMiddleware from './dialogflow-middleware';
import bodyParser from 'body-parser';

export const createServer = () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(dialogflowMiddleware);
  return app;
};
