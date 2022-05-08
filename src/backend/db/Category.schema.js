import mongoose, { Schema } from "mongoose";

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

export const Category = mongoose.model('CategorySchema', CategorySchema);
