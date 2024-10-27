import React from "react";
import { Card, Typography, Image, Badge } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";

const { Meta } = Card;
const { Text, Title } = Typography;

const ProductCard = ({ product }) => {
  const uri = process.env.REACT_APP_URL;

  return (
    <Card
      className=" shadow-lg hover:shadow-xl transition-shadow duration-200 bg-[#98BDFF]"
      style={{
        width: 300,
        margin: "20px",
        borderRadius: "10px",
        border: "1px solid #eaeaea", // Light border for better definition
      }}
      cover={
        <Image
          alt={product.name}
          src={`${uri}${product.image}` || "/path-to-placeholder.jpg"}
          style={{
            height: 200,
            objectFit: "cover",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
        />
      }
    >
      <Meta
        title={<Title level={4} style={{ color: "#333", margin: 0 }}>{product.name}</Title>}
        description={
          <div style={{ padding: "10px" }}>
            <Text type="secondary" style={{ fontWeight: 500 }}>{product.category}</Text>
            <div style={{ marginTop: "10px" }}>
              <Text strong style={{ color: "#4CAF50" }}>Price:</Text> ₹{product.price.toLocaleString()}
            </div>

            <div  style={{ marginTop: "5px" }}>
              <Text>{product.description}</Text>
            </div>
            <div style={{ marginTop: "10px" }}>
              <Text strong>Stock:</Text> {product.stock > 0 ? product.stock : "Out of Stock"}
            </div>
            {product.location && (
              <div style={{ marginTop: "10px", display: "flex", alignItems: "center" }}>
                <EnvironmentOutlined style={{ marginRight: 4, color: "#1890ff" }} />
                <Text>Location Available</Text>
              </div>
            )}
          </div>
        }
      />
      {product.stock > 0 ? (
        <Badge.Ribbon text="In Stock" color="green" placement="end" style={{ fontSize: "14px" }} />
      ) : (
        <Badge.Ribbon text="Out of Stock" color="red" placement="end" style={{ fontSize: "14px" }} />
      )}
    </Card>
  );
};

export default ProductCard;
