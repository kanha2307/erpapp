import React, { useEffect, useState } from 'react'
import ProductCard from '../../components/ProductCard';
import SideMenu from '../../components/SideMenu';
import { useSelector } from 'react-redux';

const Wishlist = () => {
  const uri = process.env.REACT_APP_URL;
  const userId = JSON.parse(localStorage.getItem('user')).id
  const [savedProducts, setsavedProducts] = useState([])
  const isOpen = useSelector((state)=>state.menu.isOpen)
 

  const fetchlist = async ()=>{
    
    try {
      const response = await fetch(`${uri}/api/wish/${userId}`,{
        method:"GET",
      })
      const data = await response.json();
      console.log(data)
        setsavedProducts(data.cartItems);
    } catch (error) {
      console.error("Error fetching products",error)
    }
  }

  useEffect(()=>{
      fetchlist()
  },[])

  return (
    <div className="flex  items-start relative z-10 h-screen bg-[#F4F4F4]  ">
      <SideMenu/>
      <div className='flex-1 p-6 '>

    <h2 className='text-md md:text-xl font-normal ml-10'>My Wish List</h2>
    {savedProducts?.length > 0 ? (
      <div className={`grid grid-cols-2  ${isOpen ? "md:grid-cols-4" : "md:grid-cols-5" }`}>
        {savedProducts.map((product) => (
          <ProductCard product={product}/>
        ))}
      </div>
    ) : (
      <p>No saved products found.</p>
    )}
    </div>
  </div>
  )
}

export default Wishlist
