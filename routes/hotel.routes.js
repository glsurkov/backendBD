const Router = require('express');
const router = new Router();
const authMiddleware = require("../middleware/authMiddleware");
const hotelController = require("../controller/hotel.controller");
const roleMiddleware = require('../middleware/roleMiddleware')
const fileMiddleware = require('../middleware/fileMiddleware')

router.post('/',roleMiddleware('admin'),hotelController.createHotel)
router.get('/',authMiddleware,hotelController.getHotels)
/*router.get('/:id',authMiddleware,hotelController.getOneHotel)*/
router.put('/',roleMiddleware('admin'),hotelController.updateHotels)
router.delete('/',roleMiddleware('admin'),hotelController.deleteHotel)
router.get('/user',authMiddleware,hotelController.fetchUserHotels)
router.post('/upload',authMiddleware,fileMiddleware.single('hotelimage'),hotelController.uploadImage)
/*router.get('/:hotel_id',authMiddleware,hotelController.getHotel)*/
router.get('/images',authMiddleware,hotelController.getImages)
router.get('/image',authMiddleware,hotelController.getImage)
router.delete('/image',roleMiddleware('admin'),hotelController.deleteImage)
router.put('/',hotelController.updateHotel)

module.exports = router;
