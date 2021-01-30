const mongoose = require('mongoose');

const HelpSchema = mongoose.Schema({
  queries: [
    {
      questions: {
        type: String,
        required: true,
      },
      answers: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = Help = mongoose.model('help', HelpSchema);
