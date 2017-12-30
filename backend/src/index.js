import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import routes from './routes';

let app = express();

app.server = http.createServer(app);

// middleware
const whitelist = ['http://example.com', 'http://example.com'];
const corsOptions =
  process.env.NODE_ENV === 'development'
    ? {
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        methods: 'GET,PUT,POST,DELETE'
      }
    : {
        origin: function(origin, callback) {
          if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
          } else {
            callback(new Error('Not allowed by CORS'));
          }
        },
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        methods: 'GET,PUT,POST,DELETE'
      };

app.use(cors());
app.use(morgan('combined'));
app.use(
  bodyParser.json({
    // limit: '10kb'
  })
);

// api routes v1
app.use('/v1', routes);

app.server.listen(8800);
console.log(`Running on port ${app.server.address().port}`);

export default app;
