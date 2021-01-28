const mongoose = require('mongoose');

const InterestSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  field: {
    type: String,
    required: true,
  },
});

module.exports = Interest = mongoose.model('interest', InterestSchema);
