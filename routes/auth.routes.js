const Router = require('express');
const router = new Router();
const controller = require('../controller/auth.controller');
const {check} = require('express-validator');
const authMiddleware = require("../middleware/authMiddleware");

router.post('/registration', [
    check('username','Имя пользователя не может быть пустым').notEmpty(),
    check('password','Пароль должен быть больше 4 и меньше 10 символов').isLength({min:4, max:10})
],controller.registration);
router.post('/login',controller.login);
router.get('/users',authMiddleware,controller.getUsers);
router.get('/user',authMiddleware,controller.getUser);

module.exports = router;