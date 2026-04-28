const Router = require('koa-router');
const { login, signup } = require('../controllers/auth.controller');

const router = new Router();

router.post('/login', login);
router.post('/signup', signup);

module.exports = router;