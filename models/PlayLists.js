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

const playlist = mongoose.model('Playlist', albumSchema);

module.exports = playlist;