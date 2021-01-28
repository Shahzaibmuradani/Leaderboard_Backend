const express = require('express');
const request = require('request');
//const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const ROProfile = require('../../models/ROProfile');
const User = require('../../models/User');
//const Post = require('../../models/Post');

// @route GET api/roprofile/me
// @desc GET current users profile
// @access Private
router.get('/me', auth, async (req, res) => {
  try {
    const roprofile = await ROProfile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);

    if (!roprofile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    res.json(roprofile);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route POST api/roprofile
// @desc Create or Update user profile
// @access Private
router.post(
  '/',
  [auth, [check('bio', 'Bio is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { bio, location, company, facebook, twitter, linkedin } = req.body;

    // Build studentprofile object
    const roprofileFields = {};
    roprofileFields.user = req.user.id;
    if (bio) roprofileFields.bio = bio;
    if (location) roprofileFields.location = location;
    if (company) roprofileFields.company = company;

    // Build social object
    roprofileFields.social = {};
    if (twitter) roprofileFields.social.twitter = twitter;
    if (facebook) roprofileFields.social.facebook = facebook;
    if (linkedin) roprofileFields.social.linkedin = linkedin;
    try {
      let roprofile = await ROProfile.findOne({
        user: req.user.id,
      });
      if (roprofile) {
        //Update
        roprofile = await ROProfile.findOneAndUpdate(
          { user: req.user.id },
          { $set: roprofileFields },
          { new: true }
        );
        return res.json(roprofile);
      }

      //Create
      roprofile = new ROProfile(roprofileFields);
      await roprofile.save();

      return res.json(roprofile);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

router.get('/', async (req, res) => {
  try {
    const roprofiles = await ROProfile.find().populate('user', [
      'name',
      'avatar',
    ]);
    res.json(roprofiles);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/user/:user_id', async (req, res) => {
  try {
    const roprofile = await ROProfile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);
    if (!roprofile) {
      return res.status(400).json({ msg: 'Profile Not Found' });
    }
    res.json(roprofile);
  } catch (err) {
    console.log(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile Not Found' });
    }
    res.status(500).send('Server Error');
  }
});

router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('company', 'Company is required').not().isEmpty(),
      check('from', 'From date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const newExp = {};
    if (title) newExp.title = title;
    if (company) newExp.company = company;
    if (location) newExp.location = location;
    if (from) newExp.from = from;
    if (to) newExp.to = to;
    if (current) newExp.current = current;
    if (description) newExp.description = description;
    try {
      const roprofile = await ROProfile.findOne({
        user: req.user.id,
      });
      roprofile.experience.unshift(newExp);
      await roprofile.save();
      res.json(roprofile);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.put(
  '/experience/:exp_id',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('company', 'Company is required').not().isEmpty(),
      check('from', 'From date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const newExp = {};
    if (title) newExp.title = title;
    if (company) newExp.company = company;
    if (location) newExp.location = location;
    if (from) newExp.from = from;
    if (to) {
      newExp.to = to;
      newExp.current = false;
    }
    if (current) newExp.current = current;
    if (description) newExp.description = description;
    try {
      let exists = await ROProfile.findOne({ user: req.user.id });
      if (exists.experience) {
        exists = await ROProfile.findOneAndUpdate(
          { 'experience._id': req.params.exp_id },
          {
            $set: {
              'experience.$.title': newExp.title,
              'experience.$.company': newExp.company,
              'experience.$.location': newExp.location,
              'experience.$.from': newExp.from,
              'experience.$.to': newExp.to,
              'experience.$.current': newExp.current,
              'experience.$.description': newExp.description,
            },
          },
          { new: true }
        );
        return res.json({ msg: 'Updated' });
      } else {
        return res.status(400).json({ msg: 'Experience Not Found' });
      }
    } catch (err) {
      console.log(err.message);
      if (err.kind == 'ObjectId') {
        return res.status(400).json({ msg: 'Experience Not Found' });
      }
      res.status(500).send('Server Error');
    }
  }
);

router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const roprofile = await ROProfile.findOne({ user: req.user.id });
    const removeindex = roprofile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);
    roprofile.experience.splice(removeindex, 1);
    await roprofile.save();
    res.json(roprofile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.put(
  '/education',
  [
    auth,
    [
      check('institute', 'Institute is required').not().isEmpty(),
      check('degree', 'Degree is required').not().isEmpty(),
      check('fieldofstudy', 'Field of Study is required').not().isEmpty(),
      check('from', 'From date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      institute,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const newEdu = {};
    if (institute) newEdu.institute = institute;
    if (degree) newEdu.degree = degree;
    if (fieldofstudy) newEdu.fieldofstudy = fieldofstudy;
    if (from) newEdu.from = from;
    if (to) newEdu.to = to;
    if (current) newEdu.current = current;
    if (description) newEdu.description = description;
    try {
      const roprofile = await ROProfile.findOne({
        user: req.user.id,
      });
      roprofile.education.unshift(newEdu);
      await roprofile.save();
      res.json(roprofile);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.put(
  '/education/:edu_id',
  [
    auth,
    [
      check('institute', 'Institute is required').not().isEmpty(),
      check('degree', 'Degree is required').not().isEmpty(),
      check('fieldofstudy', 'Field of Study is required').not().isEmpty(),
      check('from', 'From date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      institute,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const newEdu = {};
    if (institute) newEdu.institute = institute;
    if (degree) newEdu.degree = degree;
    if (fieldofstudy) newEdu.fieldofstudy = fieldofstudy;
    if (from) newEdu.from = from;
    if (to) {
      newEdu.to = to;
      newEdu.current = false;
    }
    if (current) newEdu.current = current;
    if (description) newEdu.description = description;
    try {
      let exists = await ROProfile.findOne({ user: req.user.id });
      if (exists.education) {
        exists = await ROProfile.findOneAndUpdate(
          { 'education._id': req.params.edu_id },
          {
            $set: {
              'education.$.institute': newEdu.institute,
              'education.$.degree': newEdu.degree,
              'education.$.fieldofstudy': newEdu.fieldofstudy,
              'education.$.from': newEdu.from,
              'education.$.to': newEdu.to,
              'education.$.current': newEdu.current,
              'education.$.description': newEdu.description,
            },
          },
          { new: true }
        );
        return res.json({ msg: 'Updated' });
      } else {
        return res.status(400).json({ msg: 'Education Not Found' });
      }
    } catch (err) {
      console.log(err.message);
      if (err.kind == 'ObjectId') {
        return res.status(400).json({ msg: 'Education Not Found' });
      }
      res.status(500).send('Server Error');
    }
  }
);

router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const roprofile = await ROProfile.findOne({ user: req.user.id });
    const removeindex = roprofile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);
    roprofile.education.splice(removeindex, 1);
    await roprofile.save();
    res.json(roprofile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
