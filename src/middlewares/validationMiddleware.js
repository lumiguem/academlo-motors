const { validationResult, body } = require('express-validator');

const validateFields = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'error',
            errors: errors.mapped(),
        });
    }

    next();
};

exports.createLoginValidation = [
    body('email').notEmpty().withMessage('email is required').isEmail().withMessage('email must be a correct format'),
    body('password').notEmpty().withMessage('password cannot be null').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long').matches(/\d/).withMessage('Password must include at least one number').matches(/[A-Z]/).withMessage('Password must include at least one capital letter').matches(/[!@#$%&^*(),.?":{}|<>]/).withMessage('password must include at least one special (!@#$%&^*(),.?":{}|<>])'),
    validateFields,
];
exports.createUserValidation = [
    body('name').notEmpty().withMessage('Name cannot be empty '),
    body('email').notEmpty().withMessage('email is required').isEmail().withMessage('email must be a correct format'),
    body('password').notEmpty().withMessage('password cannot be null').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long').matches(/\d/).withMessage('Password must include at least one number').matches(/[A-Z]/).withMessage('Password must include at least one capital letter').matches(/[!@#$%&^*(),.?":{}|<>]/).withMessage('password must include at least one special (!@#$%&^*(),.?":{}|<>])'),
    validateFields,

];

exports.createRepairValidation = [
    body('date').notEmpty().withMessage('Date cannot be null '),
    body('motorNumber').notEmpty().withMessage('motorNumber cannot be null '),
    body('Description').notEmpty().withMessage('Description cannot be null '),
    body('userId').notEmpty().withMessage('userId cannot be null '),
];

exports.updatePasswordValidation = [
    body('currentPassword')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/[a-zA-Z]/)
        .withMessage('Password must have at least 1 letter'),
    body('newPassword')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/[a-zA-Z]/)
        .withMessage('Password must have at least 1 letter'),
    validateFields,
];

exports.updateRepairValidation = [
    body('date').notEmpty().withMessage('Date cannot be null '),
    body('motorNumber').notEmpty().withMessage('motorNumber cannot be null '),
    body('Description').notEmpty().withMessage('Description cannot be null '),
    validateFields,
];

