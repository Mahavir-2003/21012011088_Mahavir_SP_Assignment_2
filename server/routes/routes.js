const express = require('express');
const { MenuController, orderController } = require('../controllers');

const router = express.Router();

router.get('/api/menu', MenuController.getMenu);
router.post("/api/order/:tableNumber" , orderController.createOrder);
router.post("/api/complete/:table", orderController.orderPayment);
router.get("/api/order/orders", orderController.getOrder);

module.exports = router;