import axios from 'axios';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const ProductDetail = () => {
    const uri = process.env.REACT_APP_URL;
    const {productId} = useParams()

    useEffect(()=>{
        const fetchProduct = async()=>{
            const response = await axios.get(`${uri}/product/productbyId/${productId}`)
            
            const data = response.json()
            console.log(data);
            
        }

    },[productId])
  return (
    <div>
      
    </div>
  )
}

export default ProductDetail
