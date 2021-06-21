const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const E_Post = require('../../models/E_Post');
const Post = require('../../models/Post');
const User = require('../../models/User');

// get all posts
router.get('/all', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({
      date: -1,
    });
    const eventPosts = await E_Post.find().sort({
      data: -1,
    });
    const allpost = eventPosts.concat(posts);
    res.json(allpost);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/job', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({
      date: -1,
    });
    res.json(posts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// get all posts
router.get('/event', auth, async (req, res) => {
  try {
    const posts = await E_Post.find().sort({
      date: -1,
    });
    res.json(posts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/job/:id', auth, async (req, res) => {
  try {
    const posts = await Post.findById(req.params.id).sort({
      date: -1,
    });
    console.log(posts);
    res.json(posts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// get all posts by review
router.get('/job/review', auth, async (req, res) => {
  try {
    const posts = await Post.find({ 'reviews.remarks': { $gte: 5 } }).sort({
      date: -1,
    });
    //   .select({ reviews: 1 });
    // let sum = 0;
    // posts.forEach((element) => (sum = sum + parseFloat(element.remarks)));
    // console.log(sum);
    res.json(posts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/relevant', auth, async (req, res) => {
  try {
    const jobPosts = await Post.find({ isRelevant: false }).sort({
      date: -1,
    });
    const eventPosts = await E_Post.find({ isRelevant: false }).sort({
      date: -1,
    });
    const allpost = eventPosts.concat(jobPosts);
    res.json(allpost);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.put('/job/relevant/:id', auth, async (req, res) => {
  try {
    const updatedJob = await Post.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          isRelevant: true,
        },
      },
      { new: true }
    );

    await updatedJob.save();
    res.json(updatedJob);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.put('/event/relevant/:id', auth, async (req, res) => {
  try {
    const updatedEvent = await E_Post.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          isRelevant: true,
        },
      },
      { new: true }
    );

    await updatedEvent.save();
    res.json(updatedEvent);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// get post by Id
router.get('/job/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not Found' });
    }
    res.json(post);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not Found' });
    }
    res.status(500).send('Server Error');
  }
});

// get post by Id
router.get('/user/job', auth, async (req, res) => {
  try {
    const post = await Post.find({ user: req.user.id });
    if (!post) {
      return res.status(404).json({ msg: 'Post not Found' });
    }
    res.json(post);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/user/event', auth, async (req, res) => {
  try {
    const post = await E_Post.find({ user: req.user.id });

    if (!post) {
      return res.status(404).json({ msg: 'Post not Found' });
    }
    res.json(post);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// get post by Id
router.get('/event/:id', auth, async (req, res) => {
  try {
    const post = await E_Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not Found' });
    }
    res.json(post);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not Found' });
    }
    res.status(500).send('Server Error');
  }
});

//post
router.post(
  '/job',
  [
    auth,
    check('text', 'Text is required').not().isEmpty(),
    check('field', 'Field is required').not().isEmpty(),
    check('skills', 'Skill is required').not().isEmpty(),
    check('location', 'Location is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      post_type,
      field,
      text,
      location,
      company,
      email,
      skills,
      questions,
    } = req.body;

    try {
      const newPost = {};
      const user = await User.findById(req.user.id).select('-password');
      newPost.user = req.user.id;
      newPost.name = user.name;
      newPost.avatar = user.avatar;
      newPost.post_type = post_type;
      newPost.text = text;
      if (skills) {
        newPost.skills = skills.split(',').map((skill) => skill.trim());
      }
      if (field) newPost.field = field;
      if (location) newPost.location = location;
      if (company) newPost.company = company;
      if (email) newPost.email = email;
      if (questions.length > 0) {
        newPost.test = {};
        newPost.test.questions = questions;
      }

      const jobPost = new Post(newPost);

      const post = await jobPost.save();
      const interest = await Post.aggregate([
        {
          $match: {
            field: field,
          },
        },
        {
          $lookup: {
            from: 'interests',
            localField: 'field',
            foreignField: 'field',
            as: 'interest',
          },
        },
        {
          $unwind: '$interest',
        },
        {
          $group: { _id: { email: '$interest.email' } },
        },
        {
          $project: {
            _id: 0,
            emails: '$_id.email',
          },
        },
      ]);
      res.json([post, interest]);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.post(
  '/event',
  [
    auth,
    check('text', 'Text is required').not().isEmpty(),
    check('field', 'Field is required').not().isEmpty(),
    check('location', 'Location is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { post_type, field, text, location, company, email } = req.body;

    console.log(req.body);
    try {
      let newPost;
      const user = await User.findById(req.user.id).select('-password');
      newPost = new E_Post({
        user: req.user.id,
        name: user.name,
        avatar: user.avatar,
        post_type: post_type,
        field: field,
        text: text,
        email: email,
        company: company,
        location: location,
      });
      const post = await newPost.save();
      const interest = await E_Post.aggregate([
        {
          $match: {
            field: field,
          },
        },
        {
          $lookup: {
            from: 'interests',
            localField: 'field',
            foreignField: 'field',
            as: 'interest',
          },
        },
        {
          $unwind: '$interest',
        },
        {
          $group: { _id: { email: '$interest.email' } },
        },
        {
          $project: {
            _id: 0,
            emails: '$_id.email',
          },
        },
      ]);
      res.json([post, interest]);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//add review
router.put(
  '/job/review/:id',
  [auth, check('remarks', 'Remarks are required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { remarks } = req.body;
    const reviews = {};
    try {
      if (remarks) {
        reviews.user = req.user.id;
        reviews.remarks = remarks;
      }

      const post = await Post.findById(req.params.id);
      if (
        post.reviews.filter((review) => review.user.toString() === req.user.id)
          .length > 0
      ) {
        return res.status(400).json({ msg: 'Your Review already added' });
      }
      post.reviews.unshift(reviews);
      await post.save();

      res.json(post.reviews);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//answer test
router.put('/test/:postId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const responses = {
      user: req.user.id,
      name: user.name,
      avatar: user.avatar,
      email: user.email,
      answers: req.body,
    };

    const post = await Post.findOne({
      _id: req.params.postId,
    });
    post.responses.unshift(responses);
    await post.save();
    res.json(post);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// router.put(
//   '/:id',
//   [auth, check('text', 'Text is required').not().isEmpty()],
//   async (req, res) => {
//     try {
//       const post = await Post.findById(req.params.id);

//       if (!post) {
//         return res.status(404).json({ msg: 'Post not Found' });
//       }

//       if (post.user.toString() !== req.user.id) {
//         return res.status(401).json({ msg: 'User not authorized' });
//       }
//       const { text } = req.body;
//       const newPost = {};
//       if (text) newPost.text = text;

//       const updatedpost = await Post.findOneAndUpdate(
//         { _id: req.params.id },
//         { $set: newPost },
//         { new: true }
//       );
//       return res.json(updatedpost);
//     } catch (err) {
//       console.log(err.message);
//       if (err.kind === 'ObjectId') {
//         return res.status(404).json({ msg: 'Post not Found' });
//       }
//       res.status(500).send('Server Error');
//     }
//   }
// );

router.delete('/job/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not Found' });
    }

    // if (post.user.toString() !== req.user.id) {
    //   return res.status(401).json({ msg: 'User not authorized' });
    // }

    await post.remove();
    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not Found' });
    }
    res.status(500).send('Server Error');
  }
});

router.delete('/event/:id', auth, async (req, res) => {
  try {
    const post = await E_Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not Found' });
    }

    // if (post.user.toString() !== req.user.id) {
    //   return res.status(401).json({ msg: 'User not authorized' });
    // }

    await post.remove();
    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not Found' });
    }
    res.status(500).send('Server Error');
  }
});

//like job post
router.put('/job/like/:id', auth, async (req, res) => {
  try {
    console.log(req.params.id);
    console.log(req.user.id);
    const post = await Post.findById(req.params.id);
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: 'Post already liked' });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//unlike job post
router.put('/job/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }
    const removeIndex = await post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);
    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//like event post
router.put('/event/like/:id', auth, async (req, res) => {
  try {
    const post = await E_Post.findById(req.params.id);
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: 'Post already liked' });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//unlike event post
router.put('/event/unlike/:id', auth, async (req, res) => {
  try {
    const post = await E_Post.findById(req.params.id);
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }
    const removeIndex = await post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);
    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//add job post
router.post(
  '/job/comment/:id',
  [auth, check('text', 'Text is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newComment);
      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Sever Error');
    }
  }
);

//update job post
router.put(
  '/job/comment/:id/:comment_id',
  [auth, check('text', 'Text is required').not().isEmpty()],
  async (req, res) => {
    try {
      let post = await Post.findById(req.params.id);
      const comment = post.comments.find(
        (comment) => comment.id === req.params.comment_id
      );

      if (!comment) {
        return res.status(404).json({ msg: 'Comment not found' });
      }

      if (comment.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }

      const { text } = req.body;
      const newComment = {};
      if (text) newComment.text = text;

      post = await Post.findOneAndUpdate(
        { 'comments._id': req.params.comment_id },
        {
          $set: {
            'comments.$.text': newComment.text,
          },
        },
        { new: true }
      );
      res.json(post.comments);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//add event post
router.post(
  '/event/comment/:id',
  [auth, check('text', 'Text is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      console.log('Welcome');
      const user = await User.findById(req.user.id).select('-password');
      const post = await E_Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newComment);
      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Sever Error');
    }
  }
);

//update event post
router.put(
  '/event/comment/:id/:comment_id',
  [auth, check('text', 'Text is required').not().isEmpty()],
  async (req, res) => {
    try {
      let post = await E_Post.findById(req.params.id);

      const comment = post.comments.find(
        (comment) => comment.id === req.params.comment_id
      );
      if (!comment) {
        return res.status(404).json({ msg: 'Comment not found' });
      }

      if (comment.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }

      const { text } = req.body;
      const newComment = {};
      if (text) newComment.text = text;

      post = await E_Post.findOneAndUpdate(
        { 'comments._id': req.params.comment_id },
        {
          $set: {
            'comments.$.text': newComment.text,
          },
        },
        { new: true }
      );
      res.json(post.comments);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//delete job comment
router.delete('/job/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    if (!comment) {
      return res.status(404).json({ msg: 'Comment not found' });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    const removeIndex = await post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);
    post.comments.splice(removeIndex, 1);
    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//delete event comment
router.delete('/event/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await E_Post.findById(req.params.id);
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    if (!comment) {
      return res.status(404).json({ msg: 'Comment not found' });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    const removeIndex = await post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);
    post.comments.splice(removeIndex, 1);
    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
