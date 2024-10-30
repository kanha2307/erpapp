import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

const ProductDetail = () => {
    const {productId} = useParams()
    const uri = process.env.REACT_APP_URL;
    const [product, setProduct] = useState()
    const [error, seterror] = useState()
    const token = localStorage.getItem('token')
    
    console.log(token)


    useEffect(() => {
        const fetchProduct = async () => {
          try {
            const response = await fetch(`${uri}/product/productbyid/${productId}`,{
                method:'GET',
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            });
            
           console.log(response)
    
          } catch (error) {
            console.error("Error fetching products:", error);
          } 
        };
    
        fetchProduct();
      }, []);
  return (
    <div>
      
    </div>
  )
}

export default ProductDetail
