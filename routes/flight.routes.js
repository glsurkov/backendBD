const Router = require('express');
const router = new Router();
const flightController = require('../controller/flight.controller')
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware")


router.post('/',roleMiddleware('admin'),flightController.createFlight)
router.get('/',authMiddleware,flightController.getFlights)
/*router.get('/:id',authMiddleware,flightController.getOneFlight)*/
router.put('/',roleMiddleware('admin'),flightController.updateFlight)
router.delete('/',roleMiddleware('admin'),flightController.deleteFlight)
router.get('/user',authMiddleware,flightController.fetchUserFlights)

module.exports = router
