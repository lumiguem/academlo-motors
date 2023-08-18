const express = require('express');
const repairController = require('./../controllers/repair.controller');

// middlewares
const validationMiddleware = require('../middlewares/validationMiddleware');
const repairMiddleware = require('../middlewares/repairMiddleware');
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router();

router.use(authMiddleware.protect)

router
  .route('/')
  .get(authMiddleware.restrictTo('employee'), repairController.getRepair)
  .post(validationMiddleware.createRepairValidation, repairController.createRepair);

router
  .use('/:id', repairMiddleware.existRepair)
  .use(authMiddleware.restrictTo('employee'))
  .route('/:id')
  .get(repairController.getOneRepair)
  .patch(validationMiddleware.updateRepairValidation, repairController.updateStatus)
  .delete(repairController.cancelRepair);

module.exports = router;
