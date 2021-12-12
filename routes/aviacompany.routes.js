const Router = require('express');
const router = new Router();
const authMiddleware = require("../middleware/authMiddleware");
const aviacompanyController = require("../controller/aviacompany.controller");
const roleMiddleware = require('../middleware/roleMiddleware')


router.post('/',roleMiddleware('admin'),aviacompanyController.createAviacompany)
router.get('/',authMiddleware,aviacompanyController.getAviacompany)
/*router.get('/:id',authMiddleware,aviacompanyController.getOneAviacompany)*/
router.put('/',roleMiddleware('admin'),aviacompanyController.updateAviacompany)
router.delete('/',roleMiddleware('admin'),aviacompanyController.deleteAviacompany)

module.exports = router;
