const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  password: String
}, {
  timestamps: true,
  versionKey: false
})  

module.exports = model('users', userSchema);