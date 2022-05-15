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

const question = {
    _id: new mongoose.Types.ObjectId('000000000000000000000001'),
    name:"1",
    answers: answers
}

const questions = [question]

const category = {
    _id: new mongoose.Types.ObjectId('000000000000000000000001'),
    name: "1",
    questions: questions
}


beforeAll(async () => {

    mongod = await MongoMemoryServer.create();
    const connectionString = mongod.getUri();
    await mongoose.connect(connectionString, { useNewUrlParser: true });

});


beforeEach(async () => {

    // Drop existing collections
    await mongoose.connection.db.dropDatabase();
    const coll1 = await mongoose.connection.db.createCollection('answers');
    const coll2 = await mongoose.connection.db.createCollection('questions');
    const coll3 = await mongoose.connection.db.createCollection('categoryschemas');
    await coll1.insertMany(answers);
    await coll2.insert(question);
    await coll3.insert(category);
});


afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});


it('gets answers, categories and questions', async () => {

    const answersFromDb = await Answer.find();
    const questionsFromDb = await Question.find();
    const categoriesFromDb = await Category.find();
    expect(answersFromDb).toBeTruthy();
    expect(answersFromDb.length).toBe(3);
    expect(questionsFromDb.length).toBe(1);
    expect(categoriesFromDb.length).toBe(1);

    expect(answersFromDb[0].context).toBe("1");
    expect(answersFromDb[0].correct).toBe(false);

    expect(answersFromDb[1].context).toBe("2");
    expect(answersFromDb[1].correct).toBe(false);

    expect(answersFromDb[2].context).toBe("3");
    expect(answersFromDb[2].correct).toBe(true);

    expect(questionsFromDb[0].name).toBe("1");

    expect(categoriesFromDb[0].name).toBe("1");

});

it('gets a single answer, single category, single question', async () => {
    const answer = await Answer.findById('000000000000000000000002');
    expect(answer.context).toBe("2");
    expect(answer.correct).toBe(false);

    const question = await Question.findById('000000000000000000000001');
    expect(question.name).toBe("1");

    const category = await Category.findById('000000000000000000000001');
    expect(category.name).toBe("1");
});