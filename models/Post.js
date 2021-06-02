const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  post_type: {
    type: String,
    required: true,
  },
  field: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  location: {
    type: String,
  },
  company: {
    type: String,
  },
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  test: [
    {
      questions: [
        {
          index: {
            type: Number,
          },
          text: {
            type: String,
          },
        },
      ],
    },
  ],
  responses: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      email: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      answers: [
        {
          index: {
            type: Number,
          },
          text: {
            type: String,
          },
        },
      ],
    },
  ],
  reviews: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
      remarks: {
        type: Number,
      },
    },
  ],
  isRelevant: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Post = mongoose.model('post', PostSchema);
