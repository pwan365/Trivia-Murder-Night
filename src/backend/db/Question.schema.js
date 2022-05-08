import mongoose, {Schema} from 'mongoose';

// Category Schema
const QuestionSchema = new Schema({
    _id: {
        type: Schema.ObjectId,
        auto: true
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

export const Question = mongoose.model('Question', QuestionSchema);