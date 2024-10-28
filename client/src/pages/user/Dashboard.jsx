import React, { useEffect, useState } from "react";
import { Input, Layout, Menu, List, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import ProductCard from "../../components/ProductCard";

import SideMenu from "../../components/SideMenu";
import { IoCloseSharp, IoMenu } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../../redux/menuSlice";

const { Header, Sider, Content } = Layout;

const ShopDashboard = () => {
  const dispatch = useDispatch()
  const isOpen = useSelector((state)=>state.menu.isOpen)
  const user = JSON.parse(localStorage.getItem('user'));
  const [products, setProducts] = useState([]); // Initializing with an empty array
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state
  console.log("local user",user)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/product/getall");
        
        const data = response.data

        setProducts(data); 

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
    <div className="flex h-screen bg-[#F4F4F4] ">
    <SideMenu role={user.role} name={user.name}/>

    <main className="flex-1 p-6">
      <div className="flex justify-between items-center mb-4">
      <button onClick={() => dispatch(toggleMenu())}>
          {isOpen?  <IoMenu/> : <IoCloseSharp/> }
        </button>
        <h1 className="text-xl font-normal">Hello {user.name}👋🏼</h1>
        <Input.Search
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/3"
        />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard product={product}/>
        ))}
      </div>
    </main>
  </div>
  );
};

export default ShopDashboard;
