const { validatePost, Post } = require('../models/post');
const { Comment } = require('../models/comment');

module.exports = {
  async fetchPosts(req, res) {
    try {
      let posts = await Post.find();
      res.send(posts);
    } catch (err) {
      res.status(500).send('Something went wrong...');
    }
  },
  async addPost(req, res) {
    const { error } = validatePost(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    try {
      const { title, content } = req.body;
      let post = await Post.create({ title, content, author: req.user.id });
      res.send(post);
    } catch (err) {
      res.status(500).send('Something went wrong...');
    }
  },
  async fetchPost(req, res) {
    try {
      let post = await Post.findById(req.params.id)
        .populate({
          path: 'comments',
          populate: { path: 'author', select: '-email -password' }
        })
        .populate('author', '-email -password')
        .exec();
      if (!post) {
        return res.status(404).send('Post with the given ID is not found');
      }

      res.send(post);
    } catch (err) {
      res.status(500).send('Something went wrong...');
    }
  },
  async updatePost(req, res) {
    const { error } = validatePost(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    try {
      const { title, content } = req.body;
      let post = await Post.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
      if (!post) {
        return res.status(404).send('Post with the given ID is not found');
      }

      res.send(post);
    } catch (err) {
      res.status(500).send('Something went wrong...');
    }
  },
  async deletePost(req, res) {
    try {
      let post = await Post.findByIdAndRemove(req.params.id);
      if (!post) {
        return res.status(404).send('Post with the given ID is not found');
      }

      if (post.comments.length) {
        post.comments.forEach(async (comment) => {
          await Comment.findByIdAndRemove(comment._id);
        });
      }

      res.send(post);
    } catch (err) {
      res.status(500).send('Something went wrong..');
    }
  }
};
