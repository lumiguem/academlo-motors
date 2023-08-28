const express = require('express');
const userController = require('./../controllers/user.controller');

const validationMiddleware = require('../middlewares/validationMiddleware');
const userMiddleware = require('../middlewares/userMiddleware');
const authMiddleware = require('../middlewares/authMiddleware')
const router = express.Router();

router
  .route('/')
  .get(authMiddleware.protect, userController.findAllUser)
  .post(validationMiddleware.createUserValidation, userController.createUser);

router.post('/login', userMiddleware.existUserEmail, userController.login);
router.use(authMiddleware.protect)

router
  .use(userMiddleware.existUser)
  .route('/:id')
  .get(userController.findUser)
  .patch(authMiddleware.protectAccountOwner, userController.updateUser)
  .delete(authMiddleware.protectAccountOwner, userController.deleteUser);

module.exports = router;
