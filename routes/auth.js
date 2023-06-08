const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { createUser, connectUser, renewJWT } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

router.post('/new', [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty().isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
], createUser);

router.post('/', [
    check('email', 'Email is required').not().isEmpty().isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
], connectUser);

router.get('/renew', validateJWT, renewJWT);

module.exports = router;