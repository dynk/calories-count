const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/meals');
const { isAdmin } = require('../../middlewares/authenticate');

router.get('/', isAdmin, ctrl.get);
router.post('/', isAdmin, ctrl.post);
router.patch('/:id', isAdmin, ctrl.patch);
router.delete('/:id', isAdmin, ctrl.destroy);


module.exports = router;
