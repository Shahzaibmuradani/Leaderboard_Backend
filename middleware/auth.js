const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // console.log('is it coming here');
  // Get token from header
  const token = req.header('x-auth-token');
  // console.log(req, 'token');
  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;
    //console.log('before next');
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
