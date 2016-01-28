var express = require('express');
var router = express.Router();

/* GET meter listing. */
router.get('/meters', function(req, res, next) {
  res.send(req.meters);
});

module.exports = router;
