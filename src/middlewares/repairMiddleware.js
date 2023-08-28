const catchAsync = require('../utils/catchAsync');
const Repair = require('../models/repair.model');
const AppError = require('../utils/appError');

exports.existRepair = catchAsync(async (req, res, next) => {

    const { id } = req.params;
    const repair = await Repair.findOne({
        where: {
            id,
            status: 'pending',
        },
    });



    if (!repair) {
        return next(new AppError(`Appointment repair with id ${id} not found`, 404))

    }

    req.repair = repair;
    next();
});