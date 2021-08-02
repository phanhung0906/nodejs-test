var express = require('express');
var router = express.Router();
const User = require("../model/User")

/* GET users listing. */
router.get('/', async  function(req, res, next) {
  let user = await User.find()
  console.log(user)
  res.render('user', { books: user })
});

module.exports = router;
