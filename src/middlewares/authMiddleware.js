const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');

const User = require('../models/user.model');

exports.protect = catchAsync(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        res.status(401).json({
            status: 'error',
            message: 'You are not logged in! Please log in to get access'
        })

    }

    const decoded = await promisify(jwt.verify)(
        token,
        process.env.SECRET_JWT_SEED
    );

    const user = await User.findOne({
        where: {
            id: decoded.id,
            status: 'available',
        },
    });



    if (!user) {
        res.status(401).json({
            status: 'error',
            message: 'You are not logged in! Please log in to get access'
        })
    }

    req.sessionUser = user;
    next();
});

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.sessionUser.role)) {
            res.status(401).json({
                status: 'error',
                message: 'You are not logged in! Please log in to get access'
            })
        }

        next();
    };
};