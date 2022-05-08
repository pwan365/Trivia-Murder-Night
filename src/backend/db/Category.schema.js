import mongoose, {HydratedDocument, Schema} from "mongoose";
import {IAnswer} from "./Answer.schema";

export interface ICategory {
    _id: Schema.ObjectId;
    name: string;
    questions: Schema.Types.ObjectId[];
}

// Category Schema
const CategorySchema = new Schema({
    _id: {
        type: Schema.ObjectId,
        auto: true
    },
    name: {
        type: String,
        required: true,
        default: ""
    },
    questions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Question'
        }
    ]
});

export type CategoryDocument = HydratedDocument<ICategory>;

export const Category = mongoose.model('CategorySchema', CategorySchema);
