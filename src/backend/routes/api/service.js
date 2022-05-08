import express from 'express';
import * as Service from '../../db/Service';

const router = express.Router();

router.get('/listcategories', (req, res) =>{
    const categories = Service.findCategories().then(r =>{
        console.log(r);
    });
});

router.get('/find', (req, res) =>{
    const question = Service.findQuestionByName(req.body.name).then(r =>{
        console.log(r);
    });
});
