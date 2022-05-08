import mongoose, {Schema, HydratedDocument} from 'mongoose';

export interface IAnswer {
    _id: Schema.ObjectId;
    context: string;
    question: Schema.Types.ObjectId;
    correct: boolean;
}
const AnswerSchema = new Schema<IAnswer>({
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


export type AnswerDocument = HydratedDocument<IAnswer>;

export const Answer = mongoose.model('Answer', AnswerSchema);