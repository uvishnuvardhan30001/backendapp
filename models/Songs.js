const mongoose = require('mongoose');
const moment = require('moment-timezone');

const songSchema = new mongoose.Schema({
  moviename: {
        type: String,
        required: true
      },
      songname: {
        type: String,
        required: true
      },
      date: {
        type: String,
        default: () => moment().tz('Asia/Kolkata').format('DD-MM-YYYY HH:mm:ss A')
      },
      singers: {
        type: String,
        required: true
      },
      image: {
        type: String,
        required: true
      },
  file: {
    type: String, //URL
    required: true
  }
});

const song = mongoose.model('Song', songSchema);

module.exports = song;