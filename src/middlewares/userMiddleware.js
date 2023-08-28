const catchAsync = require('../utils/catchAsync');
const User = require('../models/user.model');
const AppError = require('../utils/appError');

exports.existUser = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const user = await User.findOne({
        where: {
            id,
            status: 'available',
        },
    });

    if (!user) {
        return next(new AppError(`User with id ${id} not found`, 404))
    }

    req.user = user;
    next();
});

exports.existUserEmail = catchAsync(async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({
        where: {
            email: email.toLowerCase(),
            status: 'available'
        },
    });
    if (!user) {
        return next(new AppError(`User with email ${email} not found`, 404))
    }
    req.user = user;
    next()
})