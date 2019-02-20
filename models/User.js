let mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)
// var crypto = require('crypto')
const bcrypt = require('bcrypt')

var UserSchema = new mongoose.Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  email: { type: String, required: true }
})

UserSchema.path('password').validate((password) => { return password.length >= 6 },
  'The password must be of minimum length 6 characters.')

UserSchema.pre('save', async function (next) {
  let user = this

  if (user.isModified('password') || user.isNew) {
    let hashPwd = await bcrypt.hash(user.password, 12)
    user.password = hashPwd
  }
  next()
})

UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

const User = mongoose.model('User', UserSchema)

module.exports = User
