import {Question} from "./Question.schema";
import {Category} from "./Category.schema";



export async function findQuestionById(id){
    return await Question.findById(id).exec();
}

export async function findQuestionByName(name){
    return await Question.findOne({name: name}).exec();
}

export async function findAnswersOfQuestionById(id){
    return await Question.findById(id).populate('answers').exec();
}

export async function findQuestionsOfCategoryById(id){
    return await Category.findById(id).populate('questions').exec();
}

export async function findQuestionsOfCategoryByName(name){
    return await Category.findOne({name: name}).populate('questions').exec();
}

export async function findCategories(){
    return await Category.find().exec();
}
