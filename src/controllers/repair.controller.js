const Repair = require('./../models/repair.model');

exports.getRepair = async (req, res) => {
  try {
    const repairs = await Repair.findAll({
      where: {
        status: 'pending',
      },
    });

    return res.status(200).json({
      status: 'success',
      results: repairs.length,
      repairs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
      error,
    });
  }
};
exports.getOneRepair = async (req, res) => {
  try {

    const { repair } = req;

    return res.status(200).json({
      status: 'success',
      repair,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
      error,
    });
  }
};
exports.createRepair = async (req, res) => {
  try {
    const { date, userId, description, motorNumber } = req.body;

    const repair = await Repair.create({ date, userId, description, motorNumber });

    return res.status(201).json({
      status: 'success',
      message: 'Repair scheduled successfully',
      repair,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
      error,
    });
  }
};
exports.updateStatus = async (req, res) => {
  try {
    const { repair } = req;

    await repair.update({ status: 'completed' });

    return res.status(200).json({
      status: 'success',
      message: 'Repair updated successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
      error,
    });
  }
};
exports.cancelRepair = async (req, res) => {
  try {
    const { repair } = req;

    await repair.update({ status: 'cancelled' });

    return res.status(200).json({
      status: 'success',
      message: 'Repair appointment cancelled successfully!',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
      error,
    });
  }
};
