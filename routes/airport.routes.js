const Router = require('express');
const router = new Router();
const airportController = require('../controller/airport.controller');
const authMiddleware = require('../middleware/authMiddleware')

router.post('/',authMiddleware,airportController.createAirport)
router.delete('/:id',authMiddleware,airportController.deleteAirport)
/*router.post('/:id',authMiddleware,airportController.updateAirport)*/

module.exports = router
