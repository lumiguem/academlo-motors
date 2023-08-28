const catchAsync = require('../utils/catchAsync');
const Repair = require('./../models/repair.model');

exports.getRepair = catchAsync(async (req, res) => {
  const repairs = await Repair.findAll({
    where: {
      status: ['pending', 'completed'],
    },
    include: [
      {
        model: User,
        attributes: ['id', 'name', 'email']
      }

    ]
  });

  return res.status(200).json({
    status: 'success',
    results: repairs.length,
    repairs,
  });

});
exports.getOneRepair = catchAsync(async (req, res) => {
  const { repair } = req;

  return res.status(200).json({
    status: 'success',
    repair,
  });

});
exports.createRepair = catchAsync(async (req, res) => {
  const { date, userId, description, motorNumber } = req.body;

  const repair = await Repair.create({ date, userId, description, motorNumber });

  return res.status(201).json({
    status: 'success',
    message: 'Repair scheduled successfully',
    repair,
  });
});
exports.updateStatus = catchAsync(async (req, res) => {
  const { repair } = req;

  await repair.update({ status: 'completed' });

  return res.status(200).json({
    status: 'success',
    message: 'Repair updated successfully',
  });

});
exports.cancelRepair = catchAsync(async (req, res) => {
  const { repair } = req;

  await repair.update({ status: 'cancelled' });

  return res.status(200).json({
    status: 'success',
    message: 'Repair appointment cancelled successfully!',
  });
});
