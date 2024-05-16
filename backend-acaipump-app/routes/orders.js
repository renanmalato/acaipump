const router = require('express').Router();
const ordersController = require('../controllers/ordersController');
const { verifyToken } = require('../middleware/verifyToken');

router.get("/", verifyToken, ordersController.getOrders);
router.get("/:id", ordersController.getUserOrders);

module.exports = router



// const router = require('express').Router();
// const orderController = require('../controllers/ordersController');


// router.get("/", orderController.getOrders);
// router.get("/:id", orderController.getUserOrders);

// module.exports = router
