const express = require('express');
const app = express();
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');

const POSTS = {};

app.use(bodyParser.json());

app.get('/posts', (req, res) => {
  res.send(POSTS);
});

app.post('/posts', (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  POSTS[id] = { id, title };

  res.status(201).send(POSTS[id]);
});

app.listen('4001', () => {
  console.log('listening on 4001');
});
