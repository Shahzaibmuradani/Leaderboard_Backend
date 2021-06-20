const admin = require('firebase-admin');
const express = require('express');
//var mongoose = require('mongoose');
const router = express.Router();

var serviceAccount = require('../../hearmeout-fea0b-firebase-adminsdk-tjvox-a5158c9583.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

router.post('/send', async (req, res) => {
  //   console.log(req.body);
  const message = {
    notification: {
      title: 'New Post',
      body: 'Check event Post',
    },
    token: req.body.token,
  };
  admin
    .messaging()
    .send(message)
    .then((res) => {
      console.log('success', res);
    })
    .catch((err) => {
      err.message;
    });
});

module.exports = router;
