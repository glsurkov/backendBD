const Router = require('express');
const router = new Router();
const airportController = require('../controller/airport.controller');
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')

router.post('/',roleMiddleware('admin'),airportController.createAirport)
router.delete('/',roleMiddleware('admin'),airportController.deleteAirport)
router.get('/',authMiddleware,airportController.getAirports)
router.put('/',roleMiddleware('admin'),airportController.updateAirport)

module.exports = router
