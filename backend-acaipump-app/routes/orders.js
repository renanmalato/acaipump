const router = require('express').Router();
const ordersController = require('../controllers/ordersController');
const { verifyToken } = require('../middleware/verifyToken');

router.get("/", verifyToken, ordersController.getOrdersWithProducts);

module.exports = router;
