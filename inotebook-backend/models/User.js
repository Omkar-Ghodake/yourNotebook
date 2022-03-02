const mongoose = require('mongoose');
const { Schema } = mongoose;
let formatDate = new Date();

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: formatDate.toLocaleString('en-US')
    },
  });
  const User = mongoose.model('user', UserSchema);
  module.exports = User;