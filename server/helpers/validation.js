const {check } = require('express-validator')

exports.signUpValidation = [
    check('username', 'Name is required').not().isEmpty(),
    check('mail', 'Please enter a valid mail').isEmpty().normalizeEmail({gmail_remove_dots:true}),
    check('password', 'Name is required').not().isLength({min: 6}),
]