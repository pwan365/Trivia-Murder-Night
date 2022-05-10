import mongoose from 'mongoose';
import express from 'express';
import {categories, questions, answers} from "./example-data";


import {Answer} from "./schemas/Answer.schema";
import {Question} from "./schemas/Question.schema";
import {Category} from "./schemas/Category.schema";


const app = express();
const port = 4200;

app.use(express.json());

import routes from './routes';
app.use('/', routes);

conectDb().then(() =>
        app.listen(
            port, () => console.log(`App server listening on port ${port}!`)
        )
);

async function conectDb(){
    await mongoose.connect('mongodb://localhost:27017/game');
    console.log("Connected");
    await addExampleData();
}



async function addExampleData(){
    for (let i = 0; i < categories.length; i++){
        let ques = []
        for (let j = 0; j < questions[i].length; j++){
            let answs = [];
            for (let z = 0; z < answers[i][j].length; z++){
                const dbAnsw = new Answer({context: answers[i][j][z][0], correct: answers[i][j][z][1]});
                answs.push(dbAnsw);
                await dbAnsw.save();
            }
            const dbQues = new Question({name: questions[i][j], answers: answs});
            ques.push(dbQues);
            await dbQues.save();
        }
        const dbCate = new Category({name: categories[i], questions:ques});
        await dbCate.save();
    }
}
