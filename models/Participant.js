const mongoose = require('mongoose');

const ParticipantSchema = new mongoose.Schema({
  participantName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  units: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  points: {
    type: String,
  },
  selectedDate: {
    type: Date,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Participant = mongoose.model('participant', ParticipantSchema);
