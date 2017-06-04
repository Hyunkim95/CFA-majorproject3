const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BeatSchema = new Schema({
  title:{
    type: String,
    required: [true, 'Title field is required']
  },
  price:{
    type: Number,
    required: [true, 'Price field is required']
  },
  file: {
    type: Buffer,
    contentType: String
  }
})

module.exports = mongoose.model('Beat', BeatSchema);
