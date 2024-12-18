// import React, { useState } from "react";
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';

// const PaymentPage = () => {
//   const uri = process.env.REACT_APP_URL;
//   const [paymentMethod, setPaymentMethod] = useState("card");
//   const location = useLocation();
//   const { product } = location.state;
//   const razorpay_key = process.env.REACT_RAZORPAY_KEY_ID;
//   const [userData, setUserData] = useState({
//     name: "",
//     email: "",
//     address: "",
//     phone: "",
//   });

//   const handleInputChange = (e) => {
//     setUserData({ ...userData, [e.target.name]: e.target.value });
//   };

//   const handlePaymentSubmit = async (e) => {
//     const userId = JSON.parse(localStorage.getItem("user")).id;
//     e.preventDefault();
//     const orderData = {
//       userId,
//       productId: product._id,
//       paymentType: paymentMethod,
//       name: userData.name,
//       email: userData.email,
//       address: userData.address,
//       phone: userData.phone,
//       totalPrice: product.price,
//     };

//     if (paymentMethod === 'card') {
//       try {
//         // Step 1: Create order with backend to get Razorpay order ID
//         const response = await axios.post(`${uri}/payment/create-order`, orderData);
//         const { orderId } = response.data;

//         // Step 2: Open Razorpay checkout with received order ID
//         openRazorpayCheckout(orderId);
//       } catch (error) {
//         console.error("Error creating Razorpay order:", error);
//       }
//     } else {
//       // Handle Cash on Delivery order
//       try {
//         const response = await axios.post(`${uri}/payment/create-order`, orderData);
//         alert(response.data.message);
//       } catch (error) {
//         console.error("Error placing Cash on Delivery order:", error);
//       }
//     }
//   };

//   const openRazorpayCheckout = (orderId) => {
//     if(window.Razorpay){
//       const options = {
//         key: razorpay_key, // Your Razorpay key
//         amount: product.price * 100, // Amount in paise
//         currency: "INR", // Currency code
//         name: "FIND IT",
//         order_id: orderId,
//         handler: (response) => handlePaymentSuccess(response),
//         prefill: {
//           name: userData.name,
//           email: userData.email,
//           contact: userData.phone,
//         },
//         theme: {
//           color: "#FFBF00",
//         },
//       }
  
//       const razorpay = new window.Razorpay(options);
//       razorpay.open();
//     }else {
//       console.error("Razorpay script not loaded.");
//     }
//   };

//   const handlePaymentSuccess = async (response) => {
//     const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

//     const verificationData = {
//       orderId: razorpay_order_id,
//       razorpayPaymentId: razorpay_payment_id,
//       razorpaySignature: razorpay_signature,
//     };

//     try {
//       // Step 3: Verify payment with backend
//       const verifyResponse = await axios.post(`${uri}/payment/verify-payment`, verificationData);
//       alert(verifyResponse.data.message);
//     } catch (error) {
//       console.error("Error verifying payment:", error);
//       alert("Payment verification failed!");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center min-h-screen bg-[#F4F4F4] justify-center p-4">
//       <div className="bg-white rounded-2xl p-8 md:p-16 max-w-lg w-full mx-4 md:mx-auto my-12">
//         <h2 className="text-3xl text-center text-gray-800 font-semibold mb-6">Complete Your Purchase</h2>

//         <form onSubmit={handlePaymentSubmit} className="space-y-4">
//           <div className="space-y-2">
//             <label htmlFor="name" className="text-gray-700">Full Name</label>
//             <input
//               type="text"
//               name="name"
//               value={userData.name}
//               onChange={handleInputChange}
//               required
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1565C0]"
//             />
//           </div>

//           <div className="space-y-2">
//             <label htmlFor="email" className="text-gray-700">Email Address</label>
//             <input
//               type="email"
//               name="email"
//               value={userData.email}
//               onChange={handleInputChange}
//               required
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1565C0]"
//             />
//           </div>

//           <div className="space-y-2">
//             <label htmlFor="address" className="text-gray-700">Address</label>
//             <textarea
//               name="address"
//               value={userData.address}
//               onChange={handleInputChange}
//               required
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1565C0]"
//               rows="3"
//             />
//           </div>

//           <div className="space-y-2">
//             <label htmlFor="phone" className="text-gray-700">Phone Number</label>
//             <input
//               type="tel"
//               name="phone"
//               value={userData.phone}
//               onChange={handleInputChange}
//               required
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1565C0]"
//             />
//           </div>

//           <div className="space-y-2">
//             <label className="text-gray-700">Payment Method</label>
//             <div className="flex gap-4">
//               <label className="flex items-center gap-2 text-gray-700">
//                 <input
//                   type="radio"
//                   name="paymentMethod"
//                   value="card"
//                   checked={paymentMethod === "card"}
//                   onChange={() => setPaymentMethod("card")}
//                   className="focus:ring-[#1565C0]"
//                 />
//                 Credit/Debit Card
//               </label>
//               <label className="flex items-center gap-2 text-gray-700">
//                 <input
//                   type="radio"
//                   name="paymentMethod"
//                   value="cod"
//                   checked={paymentMethod === "cod"}
//                   onChange={() => setPaymentMethod("cod")}
//                   className="focus:ring-[#1565C0]"
//                 />
//                 Cash on Delivery
//               </label>
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full py-3 bg-[#FFBF00] text-white rounded-lg font-semibold hover:bg-yellow-600 transition duration-200"
//           >
//             {paymentMethod === "card" ? "Pay Now" : "Place Order"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PaymentPage;
