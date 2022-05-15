import {Question} from "./Question.schema";
import {Category} from "./Category.schema";



export async function findQuestionById(id){
    return await Question.findById(id).exec();
}

export async function findQuestionByName(name) {
    return await Question.findOne({ name: name }).populate('answers').exec();
}

export async function findQuestionsOfCategoryById(id){
    return await Category.findById(id).populate('questions').exec();
}

export async function findQuestionsOfCategoryByName(name){
    return await Category.findOne({name: name}).populate('questions').exec();
}

export async function findRandomQuestionOfCategory(name){
    const category = await findQuestionsOfCategoryByName(name);
    const questionName = category.questions[Math.floor(Math.random() * category.questions.length)].name;
    return await findQuestionByName(questionName);
}

export async function findCategories(){
    return await Category.find().exec();
}
