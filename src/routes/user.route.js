const express = require('express');
const userController = require('./../controllers/user.controller');

const router = express.Router();

router
  .route('/')
  .get(userController.findAllUser)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.findUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
