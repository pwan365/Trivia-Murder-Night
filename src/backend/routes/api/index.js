import express from 'express';

const router = express.Router();

import services from './service';
router.use('/services', services);

export default router;