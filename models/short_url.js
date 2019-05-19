const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shortUrlSchema = new Schema({
  short_url: Number,
  original_url: {
    type: String,
    lowercase: true
  }
});

module.exports = short_url = mongoose.model('short_url', shortUrlSchema);