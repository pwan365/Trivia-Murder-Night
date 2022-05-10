import mongoose, {Schema} from 'mongoose';

const AnswerSchema = new Schema({
    _id: {
        type: Schema.ObjectId,
        auto: true
    },

    context:  {
        type: String,
        required: true,
        default: ""
    },

    question: {
        type: Schema.Types.ObjectId,
        ref: 'Question'
    },

    correct: {
        type: Boolean,
        required: true,
        default: false
    }
});

export const Answer = mongoose.model('Answer', AnswerSchema);