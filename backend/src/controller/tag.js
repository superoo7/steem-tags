import { Router } from 'express';
import * as sql from 'mssql';

export default () => {
  let api = Router();
  api.get('/:id', (req, res) => {
    res.send('asd');
  });

  return api;
};
