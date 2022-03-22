const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const commentsByPostID = {};
app.use(bodyParser.json());

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostID[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
  const commentID = randomBytes(4).toString('hex');
  const { content } = req.body;

  const postID = req.params.id;
  const comments = commentsByPostID[postID] || [];

  comments.push({ id: commentID, content });

  commentsByPostID[postID] = comments;
  res.status(201).send(comments);
});

app.listen(4002, () => {
  console.log('listening on 4002');
});
