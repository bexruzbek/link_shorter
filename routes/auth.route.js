const {Router} = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const User = require('../models/User');
const router = Router();


//@desc     GET api/auth
//@method   GET
//access    Private
router.get('/login', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@desc     POST login page
//@method   POST
//access    Public
router.post('/login', [
  check('email', 'Email не может быть пустым').normalizeEmail().isEmail(),
  check('password', 'Парол должен быть минимум из 6 символов').exists()
], async (req, res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });

    if(!user){
      return res.status(400).json({ message: "Такой пользователь не существует" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
      return res.status(400).json({ message: "Данные не совпали" });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    const token = jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: '3h'},
      (err, token) => {
        if(err) throw err;
        res.status(200).json({ token, id: user.id });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});


//@desc     POST register page
//@route    POST /api/auth/register
//access    Public
router.post('/register', [
  check('email', "Email является обязательным полем").isEmail(),
  check('name', "Вы должны указать свое имя").not().isEmpty(),
  check('password', "Пароль должен быть минимум из 6 символов").isLength({ min: 6 })
], async (req, res)=> {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, name, password } = req.body;
  
  try {
    let user = await User.findOne({ email });

    if(user) {
      return res.status(400).json({ message: "Такой пользовател уже есть в базе" });
    }

    user = new User({
      email,
      name,
      password
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.status(201).json({ message: "Вы успешно зарегистрировались. Теперь можете войти используя свой логин и пароль"});
    
  } catch (err) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

module.exports = router;