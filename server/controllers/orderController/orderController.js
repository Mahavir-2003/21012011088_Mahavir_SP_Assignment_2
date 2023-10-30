const Table = require("../../models/table");
const Order = require("../../models/order");

const orderController = {
    async createOrder(req, res, next) {
        const { tableNumber } = req.params;
        const { order } = req.body;
        const table = await Table.findOne({ "number": tableNumber });
        if (table.isAvailable) {
            const updatedTable = await Table.updateOne({ "number": tableNumber }, { "isAvailable": false, "order": order });
            if (updatedTable.acknowledged) {
                const orderTable = await Table.findOne({ "number": tableNumber });
                const completedOrder = {
                    order: orderTable.order,
                    table: orderTable.number,
                    paymentStatus: false
                }
                const savedOrder = await Order.create(completedOrder);
                res.json(savedOrder);
            } else {
                res.status(300).json({ "message": "order not updated" });
            }
        } else {
            res.status(300).json({ "message": "Table is not available" });
        }
    },
    async orderPayment(req, res, next) {
        const { table } = req.params;
        try{
            const updatedTable = await Table.updateOne({ "number": table }, { "isAvailable": true, "order": [] });
            if (updatedTable.acknowledged) {
                const order = await Order.updateOne({ "table": table }, { "paymentStatus": true });
                if (order.acknowledged) {
                    res.json({ "message": "order completed" });
                } else {
                    res.status(300).json({ "message": "order not completed" });
                }
            } else {
                res.status(300).json({ "message": "order not completed" });
            }
        }catch(err){
            console.log(err.message);
            res.status(300).json({"message": "error in completing order"});
        }
    },
    async getOrder(req, res, next) {
        try{
            const orders = await Order.find({});
            res.json(orders);
        }catch(err){
            console.log(err.message);
            res.status(300).json({"message": "error in getting orders"});
        }
    }
}

module.exports = orderController;