import express from 'express';
import * as Service from '../../schemas/Service';
import { StatusCodes } from 'http-status-codes';

const router = express.Router();

router.get('/categories', async (req, res) =>{
    res.status(StatusCodes.OK).json(await Service.findCategories());
});

export default router;
