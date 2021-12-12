const Router = require('express');
const router = new Router();
const authMiddleware = require("../middleware/authMiddleware");
const bookController = require("../controller/book.controller");
const roleMiddleware = require('../middleware/roleMiddleware')


router.post('/flight',authMiddleware,bookController.bookFlight);
router.post('/hotel',authMiddleware,bookController.bookHotel)


module.exports = router;