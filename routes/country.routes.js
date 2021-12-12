const Router = require('express');
const router = new Router();
const authMiddleware = require("../middleware/authMiddleware");
const countryController = require("../controller/country.controller");
const roleMiddleware = require('../middleware/roleMiddleware')


router.post('/',roleMiddleware('admin'),countryController.createCountry)
 router.get('/',authMiddleware,countryController.getCountries)
// router.get('/:id',authMiddleware,countryController.getOneCountry)
router.put('/',roleMiddleware('admin'),countryController.updateCountries)
router.delete('/',roleMiddleware('admin'),countryController.deleteCountry)

module.exports = router;
