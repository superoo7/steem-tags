import express, { Router } from 'express';
import tag from '../controller/tag';
let router = express();

router.use('/tag', tag());

export default router;
