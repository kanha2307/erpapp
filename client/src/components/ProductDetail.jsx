import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SideMenu from "./SideMenu";
import { useDispatch } from "react-redux";
import { closeMenu } from "../redux/menuSlice";
import { message, Space } from "antd";

const ProductDetail = () => {
  const { productId } = useParams();
  const uri = process.env.REACT_APP_URL;
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [check, setcheck] = useState(true)
  const navigate = useNavigate()
  
  
  // const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

  // Function to fetch the real address from latitude and longitude
  // const fetchAddress = async (latitude, longitude) => {
  //   try {
  //     const response = await axios.get(
  //       `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`
  //     );

  //     console.log(response.data.status)
  //     if (response.data.status === 'OK') {
  //       // Get the formatted address from the API response
  //       const realAddress = response.data.results[0].formatted_address;
  //       console.log("realAddress",realAddress)
  //       setAddress(realAddress);
  //     } else {
  //       setAddress('Address not found');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching address:', error);
  //     setAddress('Error fetching address');
  //   }
  // };

  dispatch(closeMenu());
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${uri}/product/productbyid/${productId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Uncomment if API requires token
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch product: ${response.statusText}`);
        }

        const data = await response.json();
        setProduct(data);


        // if (data.location) {
        //   const { coordinates } = data.location;
        //   const [longitude, latitude] = coordinates;
        //   console.log("latlong",latitude,longitude)
        // fetchAddress(latitude, longitude);  // Fetch the real address using reverse geocoding
        // }
      } catch (error) {
        console.error("Error fetching product:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, uri, token,check]);

  

  const addtoCart = async ()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    const response = await fetch(`${uri}/product/addtocart`,{
      method:'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id:user.id,productId }),
    })
    const data =await response.json()
    console.log(data)
    console.log("prod",productId)
    console.log("useid",user.id)
    message.success('Product added to Wish list');
    setcheck(false)

  }
  const removefromcart = async ()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    const response = await fetch(`${uri}/product/removefromcart`,{
      method:'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id:user.id,productId }),
    })
    const data =await response.json()
    console.log(data)
    

      message.success('Product removed from Wish list');
      setcheck(true)
    

  }

  const handleBuyNow = (e) => {
    e.preventDefault()
    // navigate("/checkout", { state: { product } });
  };


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>No product data available.</p>;

  return (
    <div className="w-full  min-h-screen flex gap-0 md:gap-10  bg-[#F4F4F4] ">
      <SideMenu />

      <div className="max-w-screen-lg mx-auto  bg-white shadow-lg   rounded-none md:rounded-3xl px-12 md:px-16 py-8  md:m-8 flex flex-col md:flex-row items-center gap-4 md:gap-16">
        <img
          src={`${uri}${product.image}`}
          alt={product.name}
          className="size-96 object-cover rounded-3xl mb-6 shadow-lg"
        />

        <div className="">
          <h1 className="text-5xl  text-start text-gray-900 mb-2">
            {product.name}
          </h1>
          <h1 className="text-xl uppercase">
            BY <span className=" text-[#1565C0]">{product.owner.name}</span>
          </h1>
          <div className="flex gap-16 mt-4 items-center text-gray-800">
            <div className="text-xl ">
              <span className="text-3xl text-green-500">₹{product.price}</span>
            </div>
            <div className="bg-gray-100 px-4 py-2 rounded-full text-sm  text-gray-700">
              {product.category}
            </div>
          </div>
          <div className="text-lg text-[#B5B7C0]   py-2 border-b-[1.2px] border-gray-400">
            <span className="block mt-2 font-light text-sm ">
              {product.description}
            </span>
          </div>

          <div className="text-md mt-2 text-[#29B6F6] text-right text">
              <span className="">Stock left:</span> {product.stock}
          </div>

          <div className="text-lg mt-3">
            <div className="bg-[#EEEEEE] flex rounded-lg items-center p-4 gap-4">
              <div className="uppercase h-14 w-14 rounded-full flex items-center justify-center text-lg bg-[#DFDFDF] text-[#29B6F6]">{product.owner.name[0]}</div> 
              {product.owner ? (
                <div className="text-sm flex flex-col justify-between ">
                  <h1 className="uppercase">Name: <span className="text-[#1565C0]">{product.owner.name}</span></h1>
                
                  <div className="flex items-start mt-2 gap-0 md:gap-10 flex-col md:flex-row  text-[#1565C0]">


                  <p>{product.owner.email}</p>
                  <p> {product.owner.phone}</p>
                  </div>
                </div>
              ) : (
                <span>No owner details available</span>
              )}
            </div>
          </div>

          <div className="text-md mt-4 text-[#7D7D7D]">
            <p>
              Address: <span className="">{address ? address : "Address not available"}</span>,
            </p>
          </div>

          <div className="flex justify-between items-center mt-4 gap-4">
           

            <button onClick={check ? addtoCart : removefromcart} className="px-6 py-3 w-full bg-[#FFBF00] text-white rounded-lg hover:bg-yellow-600 transition duration-200 ease-in-out">
              {check ? "add" : "remove "}
            </button>
        
            <button onClick={handleBuyNow} className="px-6 py-3 w-full bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 ease-in-out">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
