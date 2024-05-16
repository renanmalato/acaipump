const Orders = require("../models/Orders");
const Product = require("../models/Product");

module.exports = {
    getOrdersWithProducts: async (req, res) => {
        const userId = req.user.id;
      
        try {
            const userOrders = await Orders.find({ userId });
            const populatedOrders = await Promise.all(userOrders.map(async order => {
                const product = await Product.findById(order.productId);
                return { ...order._doc, product };
            }));
          
            res.status(200).json(populatedOrders);
        } catch (error) {
            res.status(500).json({ message: "Failed to get user orders with products" });
        }
    }
}
