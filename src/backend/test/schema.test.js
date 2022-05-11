import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import {Answer} from '../schemas/Answer.schema';
import {Category} from '../schemas/Category.schema';
import {Question} from '../schemas/Question.schema';

let mongod;

const answer1 = {
    _id: new mongoose.Types.ObjectId('000000000000000000000001'),
    context: "1",
    correct: false
};

const answer2 = {
    _id: new mongoose.Types.ObjectId('000000000000000000000002'),
    context: "2",
    correct: false
};

const answer3 = {
    _id: new mongoose.Types.ObjectId('000000000000000000000003'),
    context: "3",
    correct: true
};

const answers = [answer1, answer2, answer3];


beforeAll(async () => {

    mongod = await MongoMemoryServer.create();
    const connectionString = mongod.getUri();
    await mongoose.connect(connectionString, { useNewUrlParser: true });

});


beforeEach(async () => {

    // Drop existing collections
    await mongoose.connection.db.dropDatabase();
    const coll = await mongoose.connection.db.createCollection('answers');
    await coll.insertMany(answers);
});


afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});


it('gets answers', async () => {

    const answersFromDb = await Answer.find();
    expect(answersFromDb).toBeTruthy();
    expect(answersFromDb.length).toBe(3);

    expect(answersFromDb[0].context).toBe("1");
    expect(answersFromDb[0].correct).toBe(false);

    expect(answersFromDb[1].context).toBe("2");
    expect(answersFromDb[1].correct).toBe(false);

    expect(breakfastsFromDb[2].context).toBe("3");
    expect(breakfastsFromDb[2].correct).toBe(true);
});

it('gets a single answer', async () => {
    const answer = await Answer.findById('000000000000000000000002');
    expect(answer.context).toBe("2");
    expect(answer.correct).toBe(false);
});