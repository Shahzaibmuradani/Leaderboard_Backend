const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Faqs = require('../../models/Faqs');
// const Help = require('../../models/Help');

// router.get('/', async (req, res) => {
//   try {
//     const help = await Help.find();
//     if (!help) {
//       return res.status(400).json({ msg: 'There is no help' });
//     }
//     res.json(help);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ msg: 'Server Error' });
//   }
// });

// router.post('/', async (req, res) => {
//   const errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { questions, answers } = req.body;

//   //Build help object
//   const helpField = {};
//   if (questions) helpField.questions = questions;
//   if (answers) helpField.answers = answers;

//   try {
//     //Create
//     const help = new Help({
//       queries: [helpField],
//     });
//     await help.save();
//     res.json(help);
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).send('Server error');
//   }
// });

router.get('/faqs', async (req, res) => {
  try {
    const faqs = await Faqs.find();
    if (!faqs) {
      return res.status(400).json({ msg: 'There is no help' });
    }
    res.json(faqs);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

router.post(
  '/faqs',
  // [
  //   check('questions', 'Question is required').not().isEmpty(),
  //   check('answers', 'Answer is required').not().isEmpty(),
  // ],
  async (req, res) => {
    // const errors = validationResult(req);

    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }
    // console.log(req.body);
    const { questions, answers } = req.body;

    const faq = {
      questions: questions,
      answers: answers,
    };

    try {
      //Create
      const faqs = new Faqs({
        queries: faq,
      });
      await faqs.save();
      res.json(faqs);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
