const {Schema, model} = require('mongoose');

const linkSchema = new Schema({
  oldLink: {
    type: String,
    required: true
  },
  newLink: {
    type: String,
    required: true,
    unique: true,
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  clicks: {
    type: Number,
    default: 0
  }
});

module.exports = model('Link', linkSchema);