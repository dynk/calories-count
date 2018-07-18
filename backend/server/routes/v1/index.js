const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/meals', require('./meals'));

module.exports = exports = router;
