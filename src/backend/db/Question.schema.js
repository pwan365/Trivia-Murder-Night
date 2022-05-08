import mongoose, {HydratedDocument, Schema} from 'mongoose';
import {ICategory} from "./Category.schema";

export interface IQuestion {
    _id: Schema.ObjectId;
    name: string;
    answers: Schema.Types.ObjectId[];
    category: Schema.Types.ObjectId;
}

const QuestionSchema = new Schema({
    _id: {
        type: Schema.ObjectId,
        auto: true
    },
    name:{
        type: String,
        required: true,
        default: ""
    },

    answers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Answer'
        }
    ],
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }
});

export type QuestionDocument = HydratedDocument<IQuestion>;

export const Question = mongoose.model('Question', QuestionSchema);