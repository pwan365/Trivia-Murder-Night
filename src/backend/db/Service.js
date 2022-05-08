import mongoose from 'mongoose';

import {Question} from "./Question.schema";
import {Answer} from "./Answer.schema";
import {Category} from "./Category.schema";

export async function findQuestionById(id: mongoose.Types.ObjectId){
    return await Question.findById(id).exec();
}

export async function findQuestionByName(name: string){
    return await Question.findOne({name: name}).exec();
}

export async function findAnswersOfQuestionById(id: mongoose.Types.ObjectId){
    return await Question.findById(id).populate('answers').exec();
}

export async function findQuestionsOfCategoryById(id: mongoose.Types.ObjectId){
    return await Category.findById(id).populate('questions').exec();
}

export async function findCategories(){
    return await Category.find().exec();
}
