import routes from '../routes';
import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
import express from 'express';
import request from 'supertest';

let mongod;

const app = express();
app.use('/', routes);

const category1 = {
    _id: new mongoose.Types.ObjectId('000000000000000000000001'),
    name: "1",
}


const category2 = {
    _id: new mongoose.Types.ObjectId('000000000000000000000002'),
    name: "2",
}

const category3 = {
    _id: new mongoose.Types.ObjectId('000000000000000000000003'),
    name: "3",
}



beforeAll(async () => {

    mongod = await MongoMemoryServer.create();
    const connectionString = mongod.getUri();
    await mongoose.connect(connectionString, { useNewUrlParser: true });

});


beforeEach(async () => {

    // Drop existing collections
    await mongoose.connection.db.dropDatabase();
    const coll = await mongoose.connection.db.createCollection('categoryschemas');
    await coll.insert(category1);
    await coll.insert(category2);
    await coll.insert(category3);
});


afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});


describe('GET /api/services/categories', () => {
    it('gets all categories from server', (done) => {
        request(app) 
            .get('/api/services/categories') 
            .send() 
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                const categoriesFromApi = res.body;
                expect(categoriesFromApi).toBeTruthy();
                expect(categoriesFromApi.length).toBe(3);
                expect(categoriesFromApi[0].name).toBe("1");
                expect(categoriesFromApi[0]._id).toBe("000000000000000000000001");
                expect(categoriesFromApi[1].name).toBe("2");
                expect(categoriesFromApi[1]._id).toBe("000000000000000000000002");
                expect(categoriesFromApi[2].name).toBe("3");
                expect(categoriesFromApi[2]._id).toBe("000000000000000000000003");
                return done();
        });
    });
});