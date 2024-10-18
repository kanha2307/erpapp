const ProductModel = require("../models/productSchema.js");

const createProducts = async (req, res) => {
  try {
    const { name, description, price, category, stock, coordinates } = req.body;
    if(!req.file){
      return res.status(400).json({message:'Image file is required'})
    }

    const imageUrl = `/uploads/${req.file.filename}`
    const newProduct = await ProductModel.create({
      name,
      description,
      price,
      category,
      image:imageUrl,
      stock,
      owner: req.user.id,
      location: {
        type: "Point",
        coordinates,
      },
    });

    res.status(201).json(newProduct)
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
};


const getProductsByRadius = async (req, res) => {
    try {
        const {latitude,longitude,radius} = req.query

        const products = await ProductModel.find({
            location:{
                $geoWithin:{
                    $centerSphere:[[longitude,latitude],radius/6278.1]
                }
            }
        })
        res.status(200).json(products)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};
const getProductsByOwner = async (req, res) => {
    try {
        const products = await  ProductModel.find({owner:user.id})
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
};

module.exports = { getProductsByRadius, createProducts, getProductsByOwner };
