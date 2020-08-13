const express = require('express');
const dbHelper = require('../models/dbHelper');

const router = express.Router();
const Sequelize = dbHelper.sequelize;
const Protocol = dbHelper.protocol;
const { Op } = Sequelize;

router.get('/', async (req, res) => {
  res.render('index', { layout: false });
});

router.post('/', async (req, res, next) => {
  try {
    let { content } = req.body;
    content = content.split(' ');
    const protocols = await Protocol.findAll({
      where: {
        [Op.and]: content.map((c) => ({ TITLE: { [Op.like]: `%${c}%` } }))
        ,
      },
    });
    res.send(protocols);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
