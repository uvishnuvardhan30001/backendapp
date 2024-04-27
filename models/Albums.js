const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  name: {
        type: String,
        required: true
      },
 
  file: {
    type: String, //URL
    required: true
  },
});

const album = mongoose.model('Album', albumSchema);

module.exports = album;