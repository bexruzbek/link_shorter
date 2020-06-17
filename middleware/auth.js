const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next){
  //Get token from header
  const token = req.header('x-auth-token');

  //check if not token
  if(!token) {
    return res.status(401).json({ msg: 'Нету токена, авторизация не пройдена' });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;

  } catch (err) {
    res.status(401).json({ msg: 'Токен не валидный' });
  }
  next();
};