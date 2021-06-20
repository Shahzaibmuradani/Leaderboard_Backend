const admin = require('firebase-admin');
const express = require('express');
//var mongoose = require('mongoose');
const router = express.Router();

var serviceAccount = require('../../hearmeout-fea0b-firebase-adminsdk-tjvox-a5158c9583.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

router.post('/send', async (req, res) => {
  console.log('Hello');
  //   console.log(req.body);
  // const message = {
  //   notification: {
  //     title: 'New Post',
  //     body: 'Check event Post',
  //   },
  //   token:
  //     'cks6-lBeQJW5po2pUY_sY1:APA91bGMtpSOVq-Q9ClPORQipnMsEHbeOJzMa7RpO2W846ldOQWSpxiuyKy3uvKc1yrYd5G5khWxyqCR3V6FWGR0cAcANVoQCrShHsToUQ3Tz2SskunQ41LuR8q2yhFUCNRvdpUecFC1',
  // };
  // admin
  //   .messaging()
  //   .send(message)
  //   .then((res) => {
  //     console.log('success', res);
  //   })
  //   .catch((err) => {
  //     err.message;
  //   });
});

module.exports = router;
