import React from "react";
import { Card, Typography, Image, Badge, Space, Dropdown } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import { FiShoppingCart } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const { Meta } = Card;
const { Text, Title } = Typography;

const items = [
  {
    key: '1',
    label: (
      <Link to="/user/cart">
        Add to Cart
      </Link>
    ),
  },]
const ProductCard = ({ product }) => {

  const uri = process.env.REACT_APP_URL;
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    // <Card
    //   className=" shadow-lg hover:shadow-xl transition-shadow duration-200 bg-[#98BDFF]"
    //   style={{
    //     width: 300,
    //     margin: "20px",
    //     borderRadius: "10px",
    //     border: "1px solid #eaeaea", // Light border for better definition
    //   }}
    //   cover={
    //     <Image
    //       alt={product.name}
    //       src={`${uri}${product.image}` || "/path-to-placeholder.jpg"}
    //       style={{
    //         height: 200,
    //         objectFit: "cover",
    //         borderTopLeftRadius: "10px",
    //         borderTopRightRadius: "10px",
    //       }}
    //     />
    //   }
    // >
    //   <Meta
    //     title={<Title level={4} style={{ color: "#333", margin: 0 }}>{product.name}</Title>}
    //     description={
    //       <div style={{ padding: "10px" }}>
    //         <Text type="secondary" style={{ fontWeight: 500 }}>{product.category}</Text>
    //         <div style={{ marginTop: "10px" }}>
    //           <Text strong style={{ color: "#4CAF50" }}>Price:</Text> ₹{product.price.toLocaleString()}
    //         </div>

    //         <div  style={{ marginTop: "5px" }}>
    //           <Text>{product.description}</Text>
    //         </div>
    //         <div style={{ marginTop: "10px" }}>
    //           <Text strong>Stock:</Text> {product.stock > 0 ? product.stock : "Out of Stock"}
    //         </div>
    //         {product.location && (
    //           <div style={{ marginTop: "10px", display: "flex", alignItems: "center" }}>
    //             <EnvironmentOutlined style={{ marginRight: 4, color: "#1890ff" }} />
    //             <Text>Location Available</Text>
    //           </div>
    //         )}
    //       </div>
    //     }
    //   />
    //   {product.stock > 0 ? (
    //     <Badge.Ribbon text="In Stock" color="green" placement="end" style={{ fontSize: "14px" }} />
    //   ) : (
    //     <Badge.Ribbon text="Out of Stock" color="red" placement="end" style={{ fontSize: "14px" }} />
    //   )}
    // </Card>
    <div onClick={handleCardClick} className="w-[167px] md:w-64 z-10 hover:shadow-lg cursor-pointer p-3 rounded-xl flex flex-col justify-between   bg-white">
      <img
        className=" h-28 md:h-32 object-cover  rounded-2xl"
        src={`${uri}${product.image}` || "/path-to-placeholder.jpg"}
      />
      <div className="flex items-center mt-4 justify-between">
        <h1 className="font-[nats] text-xl md:text-3xl">{product.name}</h1>
        <h1 className="font-[nats] text-lg md:text-xl text-[#00AC4F]">
          <span className="font-mono text-sm">₹</span>
          {`${product.price}`}
        </h1>
      </div>
      <p className="text-[12px] text-[#B5B7C0]">{product.description}</p>
      <div className="flex mt-3 items-center gap-2">
        <div className="bg-[#F5F5F5] hidden md:block p-2 rounded-md">
          <h1 className="text-[#404B52] text-[12px]">{product.category}</h1>
        </div>
      </div>
      <div className="flex pl-4 mt-3 items-center justify-around">
        <Dropdown menu={{items}} placement="bottomLeft">
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <FiShoppingCart className="text-xl md:text-3xl pointer mr-5" />
            </Space>
          </a>
        </Dropdown>

        <button className="p-2 md:p-4 w-full rounded-full bg-[#FFBF00] hover:bg-yellow-600">
          <h1 className="text-sm">Buy Now</h1>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
