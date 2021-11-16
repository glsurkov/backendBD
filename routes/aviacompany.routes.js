const Router = require('express');
const router = new Router();
const authMiddleware = require("../middleware/authMiddleware");
const aviacompanyController = require("../controller/aviacompany.controller");


router.post('/',authMiddleware,aviacompanyController.createAviacompany)
/*router.get('/',authMiddleware,aviacompanyController.getAviacompany)
router.get('/:id',authMiddleware,aviacompanyController.getOneAviacompany)*/
/*router.post('/:id',authMiddleware,aviacompanyController.updateAviacompany)*/
router.delete('/:id',authMiddleware,aviacompanyController.deleteAviacompany)

module.exports = router;
