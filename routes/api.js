var express = require('express');
var router = express.Router();

/* GET meter listing. */
router.get('/meters', function(req, res, next) {
  res.send(req.services.meters);
});

module.exports = router;
