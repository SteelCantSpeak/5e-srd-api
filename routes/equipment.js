var express = require('express');
var router = express.Router();
var utility = require('./utility');
var Model = require('../models/equipment');

router.use('/weapons', require('./equipment-routes/weapons'));
router.use('/armor', require('./equipment-routes/armor'));
router.use('/gear', require('./equipment-routes/gear'));
router.use('/mounts', require('./equipment-routes/mounts'));
router.use('/tools', require('./equipment-routes/tools'));

router
.get('/', (req,res) => {

  Model.find((err,data) => {
    if (err) {
      res.send(err);
    }
  }).sort( { index: 'asc'} ).exec( (err, data) => {
    if (err) {
      res.send(err);
    }
    res.status(200).json(utility.NamedAPIResource(data));
  });
});



router
.get('/:index', (req,res) => {
 // return spcific document
    Model.findOne( { index: parseInt(req.params.index) }, (err,data) => {
      if (err) {
        res.send(err);
      }
      res.status(200).json(data);
    })
});

module.exports = router;