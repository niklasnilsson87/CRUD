let mongoose = require('mongoose')
var crypto = require('crypto')

var UserSchema = new mongoose.Schema({
  username: { type: String, lowercase: true, required: true, match: [/^[a-zA-Z0-9]+$/, 'is invalid'] },
  email: { type: String, lowercase: true, required: true, match: [/\S+@\S+\.\S+/, 'is invalid'] },
  bio: String,
  image: String,
  hash: String,
  salt: String
}, { timestamps: true })

UserSchema.methods.setPassword = (password) => {
  this.salt = crypto.randomBytes(16).toString('hex')
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
}

UserSchema.methods.validPassword = (password) => {
  let hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
  return this.hash === hash
}
const User = mongoose.model('User', UserSchema)

module.exports = User
