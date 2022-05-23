const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Participant = require('../../models/Participant');

// get all participants
router.get('/:from', async (req, res) => {
  try {
    const from = parseInt(req.params.from);
    let participant = await Participant.find().skip(from).limit(20).sort({
      date: -1,
    });
    res.json(participant);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// add participant
router.post(
  '/',
  [
    check('participantName', 'Name is required').not().isEmpty(),
    check('location', 'Location is required').not().isEmpty(),
    check('units', 'Units is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { participantName, location, units, type, points, selectedDate } =
      req.body;

    const participant = {};
    if (participantName) participant.participantName = participantName;
    if (location) participant.location = location;
    if (units) participant.units = units;
    if (type) participant.type = type;
    if (points) participant.points = points;
    if (selectedDate) {
      participant.selectedDate = selectedDate;
    } else {
      participant.selectedDate = new Date();
    }

    try {
      let participantProfile = new Participant(participant);

      await participantProfile.save();
      return res.json(participantProfile);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

// update participant
router.put(
  '/:participant_id',
  [
    check('participantName', 'Name is required').not().isEmpty(),
    check('location', 'Location is required').not().isEmpty(),
    check('units', 'Units is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { participantName, location, units, type, points, selectedDate } =
      req.body;

    const participant = {};
    if (participantName) participant.participantName = participantName;
    if (location) participant.location = location;
    if (units) participant.units = units;
    if (type) participant.type = type;
    if (points) participant.points = points;
    if (selectedDate) {
      participant.selectedDate = selectedDate;
    } else {
      participant.selectedDate = new Date();
    }

    try {
      const exists = await Participant.findOneAndUpdate(
        { _id: req.params.participant_id },
        { $set: participant },
        { new: true }
      );
      if (!exists) {
        return res.status(400).json({ msg: 'Participant Not Found' });
      }
      res.json(participant);
    } catch (err) {
      if (err.kind == 'ObjectId') {
        return res.status(400).json({ msg: 'Participant Not Found' });
      }
      res.status(500).send('Server Error');
    }
  }
);

// delete participant
router.delete('/:participant_id', async (req, res) => {
  try {
    const participant = await Participant.findById(req.params.participant_id);

    if (!participant) {
      return res.status(404).json({ msg: 'Participant not Found' });
    }
    await participant.remove();
    res.json({ msg: 'Participant removed' });
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Participant not Found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
