'use strict'

const mongoose = require('mongoose')

const toDoItemSchema = new mongoose.Schema({
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
  }
})

const ToDoItem = mongoose.model('ToDoItem', toDoItemSchema)

module.exports = ToDoItem
