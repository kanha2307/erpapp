const OrderModel = require("../models/Order");
const ProductModel = require("../models/Product");

const createOrder = async (req,res)=>{
    const { userId, productId, paymentType, name, email, address, phone } = req.body;
    try {
        const product = await ProductModel.findById(productId)
        if (!product) return res.status(404).json({ error: "Product not found" });

        const newOrder = OrderModel.create({
            userId,
            productId,
            paymentType,
            name,
            email,
            address,
            phone,
            totalPrice: product.price,
        })
        await orderSchema.save()
        res.status(201).json({ message: "Order created successfully", order });
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
}

module.exports = {createOrder}