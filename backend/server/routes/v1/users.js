const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/users');
const { authenticate, isUserAdminOrAdmin } = require('../../middlewares/authenticate');

router.get('/', isUserAdminOrAdmin, ctrl.get);
router.post('/', ctrl.post);
router.post('/login', ctrl.login);
router.patch('/:id', authenticate, ctrl.patch);
router.delete('/:id', authenticate, ctrl.destroy);
router.get('/:id/meals', authenticate, ctrl.getMeals);
router.post('/:id/meals', authenticate, ctrl.postMeals);
router.delete('/:id/meals/:mealId', authenticate, ctrl.destroyMeal);
router.patch('/:id/meals/:mealId', authenticate, ctrl.patchMeal);
router.get('/:id/meals/:mealId', authenticate, ctrl.getMealById);
router.get('/:id', authenticate, ctrl.getById);

module.exports = router;
