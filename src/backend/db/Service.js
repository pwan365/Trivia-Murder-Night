import mongoose from 'mongoose';

import {Question} from "./Question.schema";
import {Category} from "./Category.schema";
import type {QuestionDocument} from "./Question.schema";
import type {AnswerDocument} from "./Answer.schema";
import type {CategoryDocument} from "./Category.schema";



export async function findQuestionById(id: mongoose.Types.ObjectId): Promise<QuestionDocument>{
    return await Question.findById(id).exec();
}

export async function findQuestionByName(name: string): Promise<QuestionDocument>{
    return await Question.findOne({name: name}).exec();
}

export async function findAnswersOfQuestionById(id: mongoose.Types.ObjectId): Promise<AnswerDocument>{
    return await Question.findById(id).populate('answers').exec();
}

export async function findQuestionsOfCategoryById(id: mongoose.Types.ObjectId): Promise<QuestionDocument>{
    return await Category.findById(id).populate('questions').exec();
}

export async function findCategories(): Promise<CategoryDocument>{
    return await Category.find().exec();
}
