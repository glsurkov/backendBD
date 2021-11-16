const Router = require('express');
const router = new Router();
const authMiddleware = require("../middleware/authMiddleware");
const hotelController = require("../controller/hotel.controller");


router.post('/',authMiddleware,hotelController.createHotel)
router.get('/',authMiddleware,hotelController.getHotels)
/*router.get('/:id',authMiddleware,hotelController.getOneHotel)*/
/*router.post('/:id',authMiddleware,hotelController.updateHotel)*/
router.delete('/:id',authMiddleware,hotelController.deleteHotel)

module.exports = router;
