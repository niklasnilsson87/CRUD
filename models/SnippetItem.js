/**
 * Mongoose model UserSchema
 *
 * @author Niklas Nilsson
 * @version 1.0
 */

const mongoose = require('mongoose')

const snippetSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  done: {
    type: Boolean,
    required: true,
    default: false
  },
  userID: {
    type: String
  },
  author: {
    type: String
  }
})

// Creates model
const SnippetItem = mongoose.model('SnippetItem', snippetSchema)

// Exports
module.exports = SnippetItem
