const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
// const auth = require('../../middleware/auth');
// const User = require('../../models/User');
const Help = require('../../models/Help');

router.get('/', async (req, res) => {
  try {
    const help = await Help.find();
    if (!help) {
      return res.status(400).json({ msg: 'There is no help' });
    }
    res.json(help);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

router.post(
  '/',
  [
    check('questions', 'Question is required').not().isEmpty(),
    check('answers', 'Answer is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { questions, answers } = req.body;

    //Build help object
    const helpField = {};
    if (questions) helpField.questions = questions;
    if (answers) helpField.answers = answers;

    try {
      //Create
      const help = await new Help({
        queries: [helpField],
      });
      await help.save();
      res.json(help);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
