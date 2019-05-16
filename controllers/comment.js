const { validateComment, Comment } = require('../models/comment');
const { Post } = require('../models/post');

module.exports = {
  async addComment(req, res) {
    const { error } = validateComment(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    try {
      let post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).send('Post with the given ID is not found');
      }

      let comment = await Comment.create({ content: req.body.content, author: req.user.id });
      post.comments.push(comment);
      post.save();

      res.send(comment);
    } catch (err) {
      res.status(500).send('Something went wrong...');
    }
  },
  async updateComment(req, res) {
    const { error } = validateComment(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    try {
      let post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).send('Post with the given ID is not found');
      }

      let comment = await Comment.findByIdAndUpdate(req.params.commentId, { content: req.body.content }, { new: true });
      if (!comment) {
        return res.status(404).send('Comment with the given ID is not found');
      }

      res.send(comment);
    } catch (err) {
      res.status(500).send('Something went wrong...');
    }
  },
  async deleteComment(req, res) {
    try {
      let post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).send('Post with the given ID is not found');
      }

      let comment = await Comment.findByIdAndRemove(req.params.commentId);
      if (!comment) {
        return res.status(404).send('Comment with the given ID is not found');
      }

      let commentIdx = post.comments.indexOf(comment);
      post.comments.splice(commentIdx, 1);
      post.save();

      res.send(comment);
    } catch (err) {
      res.status(500).send('Something went wrong...');
    }
  }
};
