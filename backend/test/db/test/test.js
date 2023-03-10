process.env.NODE_ENV = 'test'
const connect = require('../connect.js')
const api = require('../../../src/api/api.js')
const redditModel = require('../../../src/models/reddit.model.js')
const expect = require('chai').expect;
const mongoose = require("mongoose");

const sampleData = 
{
  _id: new mongoose.Types.ObjectId(),
  word: 'Sample word',
  title: 'Sample title',
  ups: 'Sample ups',
  upvote_ratio: 'Sample upvote_ratio',
  thumbnail: 'Sample thumbnail',
  subreddit: 'Sample subreddit',
  created: 'Sample Created'
}


describe('Testing database', () => {

    before((done) => {
      connect
        .connect()
        .then(() => done())
        .catch((err) => done(err));
    });
  
    after((done) => {
      connect
        .close()
        .then(() => done())
        .catch((err) => done(err));
    });

  


    it('DB should have nothing initially', async () => {
        const data = await redditModel.find();
        expect(data).to.eql([]);
    })

   it('Inserts a sample into database', async () => {
   
        await redditModel.create(sampleData)
        const data = await redditModel.find();
        expect(data[0].title).to.eql('Sample title');
    })


    it('deletes the sample from the database', async () => {
   
        await redditModel.deleteOne()
        const data = await redditModel.find();
        expect(data).to.eql([]);
    })


    it('Inserts a post into the database using getRedditPosts and parseRedditData', async () => {
   
        const response = await api.parseRedditData();
        const data = await redditModel.find();
        expect(data).to.not.equal([]);
    })


    })