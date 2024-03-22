import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import passport from './configs/passport';
import config from './configs/app';
import apiRoute from './routers/api';
import staticRoute from './routers/static';
import './configs/mongo';

const app = express();

// Using Middleware
app.use(cors({}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

// Frontend Routing
app.use('/', staticRoute);

// Main Routing (it will behind the API)
app.use(`/api/v${config.version}`, apiRoute);

app.listen(config.port, () => {
  console.log('Start TDC App');
  console.log('Backend App Running at Port', config.port);
  console.log('-----------');
});
