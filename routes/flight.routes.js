const Router = require('express');
const router = new Router();
const flightController = require('../controller/flight.controller')
const authMiddleware = require("../middleware/authMiddleware");


router.post('/',authMiddleware,flightController.createFlight)
router.get('/',authMiddleware,flightController.getFlights)
/*router.get('/:id',authMiddleware,flightController.getOneFlight)
router.post('/:id',authMiddleware,flightController.updateFlight)*/
router.delete('/:id',authMiddleware,flightController.deleteFlight)

module.exports = router
