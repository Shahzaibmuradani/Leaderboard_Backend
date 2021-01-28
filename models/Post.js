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
  faqs: [
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
      questions: {
        q1: {
          type: String,
        },
        q2: {
          type: String,
        },
        q3: {
          type: String,
        },
      },
      answers: {
        a1: {
          type: String,
        },
        a2: {
          type: String,
        },
        a3: {
          type: String,
        },
      },
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
