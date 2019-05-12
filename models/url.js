const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = new Schema({
  id: Number,
  url: {
    type: String,
    lowercase: true
  }
});

module.exports = Url = mongoose.model('url', urlSchema);