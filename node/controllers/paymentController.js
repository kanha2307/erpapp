const OrderModel = require("../models/orderSchema");
const Razorpay = require("razorpay");
const crypto = require('crypto')

// const createOrder = async (req,res)=>{
//     const { userId, productId, paymentType, name, email, address, phone } = req.body;
//     try {
//         const product = await ProductModel.findById(productId)
//         if (!product) return res.status(404).json({ error: "Product not found" });

//         const newOrder =await OrderModel.create({
//             userId,
//             productId,
//             paymentType,
//             name,
//             email,
//             address,
//             phone,
//             totalPrice: product.price,
//         })
//         await newOrder.save()
//         res.status(201).json({ message: "Order created successfully", order:newOrder });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


const createPaymentOrder = async (req, res) => {
  const { userId, productId, paymentType, name, email, address, phone, totalPrice } = req.body;

  try {
    if (paymentType === "card") {
      const razorpayOrder = await razorpay.orders.create({
        amount: totalPrice * 100, 
        currency: "INR",
      });

      const newOrder = new OrderModel({
        userId,
        productId,
        paymentType,
        name,
        email,
        address,
        phone,
        totalPrice,
        razorpayOrderId: razorpayOrder.id,
      });

      await newOrder.save();
      res.json({ orderId: razorpayOrder.id, message: "Order created successfully!" });
    } else {
      // Handle Cash on Delivery
      const newOrder = new OrderModel({
        userId,
        productId,
        paymentType,
        name,
        email,
        address,
        phone,
        totalPrice,
        status: "Confirmed",
      });

      await newOrder.save();
      res.json({ message: "Order placed successfully with Cash on Delivery!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


const verifyPayment =  async (req, res) => {
  const { orderId, razorpayPaymentId, razorpaySignature } = req.body;


  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(orderId + "|" + razorpayPaymentId)
    .digest("hex");

  if (generatedSignature === razorpaySignature) {
    await OrderModel.findOneAndUpdate(
      { razorpayOrderId: orderId },
      { status: "Paid", razorpayPaymentId }
    );
    res.json({ message: "Payment verified successfully!" });
  } else {
    res.status(400).json({ error: "Invalid signature, payment verification failed!" });
  }
}
module.exports = { createPaymentOrder,verifyPayment };  