const mongoose = require('mongoose');

const FaqSchema = mongoose.Schema({
  queries: [
    {
      questions: [
        {
          index: {
            type: Number,
          },
          question: {
            type: String,
          },
        },
      ],
      answers: [
        {
          index: {
            type: Number,
          },
          answer: {
            type: String,
          },
        },
      ],
    },
  ],
});

module.exports = Faq = mongoose.model('faq', FaqSchema);
