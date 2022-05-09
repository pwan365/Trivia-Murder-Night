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

    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },

    answers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Answer'
        }
    ]
});

export const Question = mongoose.model('Question', QuestionSchema);