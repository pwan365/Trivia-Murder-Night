
import mongoose from 'mongoose';
import {Answer} from "./db/Answer.schema";
import {Question} from "./db/Question.schema";
import {Category} from "./db/Category.schema";

app().then(r => {});

async function app(){
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
