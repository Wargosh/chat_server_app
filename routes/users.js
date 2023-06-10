// path: api/users

const { Router } = require('express');
const router = Router();

const { validateJWT } = require('../middlewares/validate-jwt');
const { getUsers } = require('../controllers/users');

router.get('/', validateJWT, getUsers);

module.exports = router;