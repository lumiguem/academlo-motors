const AppError = require('../utils/appError');

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};

const sendErrorProd = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    } else {
        console.error('ERROR 🧨', err);
        res.status(500).json({
            status: 'fail',
            message: 'Something went very wrong!',
        });
    }
};

const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'fail';

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    }

    if (process.env.NODE_ENV === 'production') {
        let error = err;
        if (err.parent?.code === '22001') error = handleCastError22001();
        if (err.parent?.code === '22P02') error = handleCastError22P02();
        if (err.parent?.code === '23505') error = handleCastError23505();
        if (err.name === 'JsonWebTokenError') error = handleJWTError();
        if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();


        sendErrorProd(error, res);
    }
};

module.exports = globalErrorHandler;