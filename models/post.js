const mongoose = require('mongoose');
const Joi = require('joi');
const Schema = mongoose.Schema;

function validatePost(post) {
  const schema = {
    title: Joi.string()
      .trim()
      .min(5)
      .required(),
    content: Joi.string()
      .trim()
      .min(5)
      .required()
  };

  return Joi.validate(post, schema);
}

const postSchema = new Schema({
  title: {
    type: String,
    minlength: 5,
    trim: true,
    required: true
  },
  content: {
    type: String,
    minlength: 5,
    trim: true,
    required: true
  },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  author: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Post = mongoose.model('Post', postSchema);

module.exports.validatePost = validatePost;
module.exports.Post = Post;
