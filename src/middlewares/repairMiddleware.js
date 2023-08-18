const catchAsync = require('../utils/catchAsync');
const Repair = require('../models/repair.model');

exports.existRepair = catchAsync(async (req, res, next) => {

    const { id } = req.params;
    const repair = await Repair.findOne({
        where: {
            id,
            status: 'pending',
        },
    });

    if (!repair) {
        return res.status(404).json({
            status: 'error',
            message: `Appointment repair with id ${id} not found`,
        });
    }

    req.repair = repair;
    next();
});