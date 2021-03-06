const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Posts
router.get('/', async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});


// Add Posts
router.post('/', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    disappearTime: req.body.disappearTime,
    disappearPlace: req.body.disappearPlace,
    race: req.body.race,
    color: req.body.color,
    age: req.body.age,
    name: req.body.name,
    info: req.body.info,
    // imgUrl: req.body.imgUrl,
    createdAt: new Date()
  });
  res.status(201).send();
})


// Delete Post
router.delete('/:id', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send();
});


async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect
  ('mongodb+srv://adam:adam@cluster0.doni8.mongodb.net/mevn?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  return client.db('vue_express').collection('posts');
}


module.exports = router;
