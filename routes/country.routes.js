const Router = require('express');
const router = new Router();
const authMiddleware = require("../middleware/authMiddleware");
const countryController = require("../controller/country.controller");


router.post('/',authMiddleware,countryController.createCountry)
/*router.get('/',authMiddleware,countryController.getCountries)
router.get('/:id',authMiddleware,countryController.getOneCountry)*/
/*router.post('/:id',authMiddleware,countryController.updateCountry)*/
router.delete('/:id',authMiddleware,countryController.deleteCountry)

module.exports = router;
