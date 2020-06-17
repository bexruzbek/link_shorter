const { Router } = require('express');
const Link = require('../models/Link');
const router = Router();

//route     GET /t/:id
//@desc     Redirect to link
//private   public
router.get('/:code', async (req, res)=> {
  try {
    const link = await Link.findOne({ code: req.params.code });
    
    if(link){
      link.clicks++;
      await link.save();
      return res.redirect(link.oldLink);
    }

    res.status(404).json({ message: 'Ссылка не найдена'});

  } catch (err) {
    res.status(500).json({ message: 'Ссылка не найдена'});
  }
});

module.exports = router;