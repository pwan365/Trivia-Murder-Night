import mongoose from 'mongoose';
import express from 'express';



// import {Answer} from "./db/Answer.schema";
// import {Question} from "./db/Question.schema";
import {Category} from "./db/Category.schema";


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
    const categories = ["SE701", "SE750", "SE754"];

    // const questions = ["What is the course's name?", "Is this class bad?", "Is Angular better than React?"];
    //
    // const answers = ["701", "750", "754", "Bad", "Good"];

    for (let category of categories){
        const dbCate = new Category({name: category});
        await dbCate.save();
        console.log(`_id = ${dbCate._id}, name = ${dbCate.name}`);
    }
}
