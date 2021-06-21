const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const StudentProfile = require('../../models/StudentProfile');
const Interest = require('../../models/Interest');
const User = require('../../models/User');

// @route GET api/studentprofile/me
// @desc GET current users profile
// @access Private
router.get('/me', auth, async (req, res) => {
  try {
    const studentprofile = await StudentProfile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);
    if (!studentprofile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    res.json(studentprofile);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route POST api/studentprofile
// @desc Create or Update user profile
// @access Private
router.post(
  '/',
  [
    auth,
    [
      check('skills', 'Skills is required').not().isEmpty(),
      check('field', 'Field is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      bio,
      skills,
      field,
      location,
      company,
      facebook,
      twitter,
      linkedin,
    } = req.body;

    //Build interest object
    const interestfield = {};
    interestfield.user = req.user.id;
    if (field) interestfield.field = field;

    // Build studentprofile object
    const studentprofileFields = {};
    studentprofileFields.user = req.user.id;
    if (bio) studentprofileFields.bio = bio;
    if (skills) {
      studentprofileFields.skills = skills
        .split(',')
        .map((skill) => skill.trim());
    }
    if (field) studentprofileFields.field = field;
    if (location) studentprofileFields.location = location;
    if (company) studentprofileFields.company = company;
    // Build social object
    studentprofileFields.social = {};
    if (twitter) studentprofileFields.social.twitter = twitter;
    if (facebook) studentprofileFields.social.facebook = facebook;
    if (linkedin) studentprofileFields.social.linkedin = linkedin;
    try {
      let studentprofile = await StudentProfile.findOne({
        user: req.user.id,
      });
      const user = await User.findById(req.user.id);
      if (studentprofile) {
        if (user.status === 'Student') {
          //   //Update
          interestfield.email = user.email;
          await Interest.findOneAndUpdate(
            { user: req.user.id },
            { $set: interestfield },
            { new: true }
          );
          studentprofile = await StudentProfile.findOneAndUpdate(
            { user: req.user.id },
            { $set: studentprofileFields },
            { new: true }
          );
          return res.json(studentprofile);
        } else {
          //Update
          studentprofile = await StudentProfile.findOneAndUpdate(
            { user: req.user.id },
            { $set: studentprofileFields },
            { new: true }
          );
          return res.json(studentprofile);
        }
      }
      //Create
      if (user.status === 'Student') {
        console.log(user.email);
        interestfield.email = user.email;
        studentprofile = new StudentProfile(studentprofileFields);
        const interest = new Interest(interestfield);

        await interest.save();
        await studentprofile.save();
        return res.json(studentprofile);
      } else {
        studentprofile = new StudentProfile(studentprofileFields);
        await studentprofile.save();
        return res.json(studentprofile);
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route GET api/studentprofile
// @desc Get all profiles
// @access Public

router.get('/', async (req, res) => {
  try {
    const studentprofiles = await StudentProfile.find().populate('user', [
      'name',
      'avatar',
    ]);
    res.json(studentprofiles);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/user/:user_id', async (req, res) => {
  try {
    const studentprofile = await StudentProfile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);
    if (!studentprofile) {
      return res.status(400).json({ msg: 'Profile Not Found' });
    }
    res.json(studentprofile);
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

    const { title, company, location, from, to, current, description } =
      req.body;

    const newExp = {};
    if (title) newExp.title = title;
    if (company) newExp.company = company;
    if (location) newExp.location = location;
    if (from) newExp.from = from;
    if (to) newExp.to = to;
    if (current) newExp.current = current;
    if (description) newExp.description = description;
    try {
      const studentprofile = await StudentProfile.findOne({
        user: req.user.id,
      });
      studentprofile.experience.unshift(newExp);
      await studentprofile.save();
      res.json(studentprofile);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.get('/experience/:exp_id', auth, async (req, res) => {
  try {
    let exists = await StudentProfile.findOne({ user: req.user.id });
    if (exists.experience) {
      exists = await StudentProfile.findOne({
        'experience._id': req.params.exp_id,
      }).select({ experience: 1 });
      return res.json(exists);
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
});

router.get('/education/:edu_id', auth, async (req, res) => {
  try {
    let exists = await StudentProfile.findOne({ user: req.user.id });
    if (exists.education) {
      exists = await StudentProfile.findOne({
        'education._id': req.params.edu_id,
      }).select({ education: 1 });
      return res.json(exists);
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
});

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
    const { title, company, location, from, to, current, description } =
      req.body;

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
      let exists = await StudentProfile.findOne({ user: req.user.id });
      if (exists.experience) {
        exists = await StudentProfile.findOneAndUpdate(
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
    const studentprofile = await StudentProfile.findOne({ user: req.user.id });
    const removeindex = studentprofile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);
    studentprofile.experience.splice(removeindex, 1);
    await studentprofile.save();
    res.json(studentprofile);
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

    const { institute, degree, fieldofstudy, from, to, current, description } =
      req.body;

    const newEdu = {};
    if (institute) newEdu.institute = institute;
    if (degree) newEdu.degree = degree;
    if (fieldofstudy) newEdu.fieldofstudy = fieldofstudy;
    if (from) newEdu.from = from;
    if (to) newEdu.to = to;
    if (current) newEdu.current = current;
    if (description) newEdu.description = description;
    try {
      const studentprofile = await StudentProfile.findOne({
        user: req.user.id,
      });
      studentprofile.education.unshift(newEdu);
      await studentprofile.save();
      res.json(studentprofile);
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
    const { institute, degree, fieldofstudy, from, to, current, description } =
      req.body;

    const newEdu = {};
    if (institute) newEdu.institute = institute;
    if (degree) newEdu.degree = degree;
    if (fieldofstudy) newEdu.fieldofstudy = fieldofstudy;
    if (from) newEdu.from = from;
    if (to) newEdu.to = to;
    if (current) {
      newEdu.current = current;
      newEdu.to = '';
    }
    if (description) newEdu.description = description;
    try {
      let exists = await StudentProfile.findOne({ user: req.user.id });
      if (exists.education) {
        exists = await StudentProfile.findOneAndUpdate(
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
    const studentprofile = await StudentProfile.findOne({ user: req.user.id });
    const removeindex = studentprofile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);
    studentprofile.education.splice(removeindex, 1);
    await studentprofile.save();
    res.json(studentprofile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// router.delete('/', auth, async (req, res) => {
//   try {
//     await Post.deleteMany({ user: req.user.user_id });
//     await Profile.findOneAndRemove({ user: req.user.id });
//     await User.findOneAndRemove({ _id: req.user.id });
//     res.json('User deleted');
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).send('Server Error');
//   }
// });

module.exports = router;
