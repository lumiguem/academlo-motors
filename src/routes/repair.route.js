const express = require('express');
const repairController = require('./../controllers/repair.controller');

const router = express.Router();

router
  .route('/')
  .get(repairController.getRepair)
  .post(repairController.createRepair);

router
  .route('/:id')
  .get(repairController.getOneRepair)
  .patch(repairController.updateStatus)
  .delete(repairController.cancelRepair);

module.exports = router;
