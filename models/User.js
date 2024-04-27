const mongoose = require("mongoose")

const usersignup = new mongoose.Schema({
  name: {
        type: String,
        required: true
      },
      gender: {
        type: String,
        required:true,
        enum: ['male', 'female', 'others']
      },
      dateofbirth: {
        type: String, //Date
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
      contact: {
          type: String,
          required: true,
          unique:true
        },
    });

const user = mongoose.model('User', usersignup);  //(collectionName,schema name,)

module.exports = user;