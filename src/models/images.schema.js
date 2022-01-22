const { Schema, model } = require('mongoose');

const imagesSchema = new Schema({
  imageUrl: String,
  author: String ,
}, {
  timestamps: true,
  versionKey: false
})  

module.exports = model('images', imagesSchema);