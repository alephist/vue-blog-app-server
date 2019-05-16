const mongoose = require('mongoose');
const Joi = require('joi');
const Schema = mongoose.Schema;

function validateComment(comment) {
  const schema = {
    content: Joi.string()
      .trim()
      .min(5)
      .required()
  };

  return Joi.validate(comment, schema);
}

const commentSchema = new Schema({
  content: {
    type: String,
    minlength: 5,
    trim: true,
    required: true
  },
  author: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports.validateComment = validateComment;
module.exports.Comment = Comment;
