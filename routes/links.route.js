const {Router} = require('express');
const Link = require('../models/Link');
const config = require('config');
const shortid = require('shortid');
const auth = require('../middleware/auth');
const router = Router();

//route     /api/links/generate
//@desc     POST to generate short link
//access    private
router.post('/generate', auth, async (req, res) => {
  try {
    const baseUrl = config.get('baseUrl');

    const code = shortid.generate();

    const { oldLink } = req.body;

    const existing = await Link.findOne({ oldLink });

    if(existing){
      res.json({ link: existing });
    }

    const newLink = baseUrl + '/t/' + code;

    const shortLink = new Link({
      oldLink, code, newLink, owner: req.user.id
    });

    const link = await shortLink.save();

    res.json(link);

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error"});
  }
});

//route     /api/links
//@desc     GET to all links
//access    private
router.get('/', auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.id }); 
    res.json(links);
  } catch (err) {
    res.status(500).json({ message: "Что то пошло не так" });
  }
});

//route     /api/links/:id
//@desc     GET to detail link
//access    private
router.get('/:id', auth, async (req, res) => {
  try {
    const link = await Link.find(req.params.id); 
    res.json(link);
  } catch (err) {
    res.status(500).json({ message: "Что то пошло не так" });
  }
});

module.exports = router;