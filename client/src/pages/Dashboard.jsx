import React, { useEffect, useState } from "react";
import { Input, Layout, Menu, List, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import ProductCard from "../components/ProductCard";

import SideMenu from "../components/SideMenu";

const { Header, Sider, Content } = Layout;

const ShopDashboard = () => {
  const [products, setProducts] = useState([]); // Initializing with an empty array
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/product/getall");
        
        const data = response.data
        console.log(data)
        setProducts(data); 
        console.log(products)
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-[#F9FBFF] ">
    <SideMenu/>

    <main className="flex-1 p-6">
      <div className="flex justify-between items-center mb-4">
        <Input.Search
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/3"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard product={product}/>
        ))}
      </div>
    </main>
  </div>
  );
};

export default ShopDashboard;
