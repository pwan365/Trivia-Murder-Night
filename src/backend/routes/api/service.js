import express from 'express';
import * as Service from '../../db/Service';
import { StatusCodes } from 'http-status-codes';

const router = express.Router();

router.get('/categories', async (req, res) =>{
    res.status(StatusCodes.OK).json(await Service.findCategories());
});

router.get('/question', async (req, res) =>{
    const Question = await Service.findQuestionByName(req.body.name);
    res.status(StatusCodes.OK).json(Question);
});

router.get('/questions', async (req, res) =>{
    const questions = await Service.findQuestionsOfCategoryByName(req.body.name);
    res.status(StatusCodes.OK).json(questions);
})

export default router;
