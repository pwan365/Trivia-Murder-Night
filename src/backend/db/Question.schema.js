import mongoose, {Schema} from 'mongoose';

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

export const Question = mongoose.model('Question', QuestionSchema);