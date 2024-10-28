const ProductModel = require("../models/productSchema.js");

const createProducts = async (req, res) => {
  try {
    const { name, description, price, category, stock, longitude,latitude } = req.body;
    if(!req.file){
      return res.status(400).json({message:'Image file is required'})
    }

    const imageUrl = req.file
      ? `/uploads/${req.file.filename}`
      : "/uploads/default-avatar.png";
    coordinates = [ parseFloat(latitude),parseFloat(longitude)];
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
        if(!products){
          return res.status(400).json({message:'No Product found'})
        }
        res.status(200).json(products)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};
const getProductsByOwner = async (req, res) => {
    try {
        const products = await  ProductModel.find({owner:req.user.id})
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
};

const deleteProducts = async (req,res)=>{
    try {
      const {id} = req.query
      const product = await ProductModel.findByIdAndDelete(id)
      if(!product){
        return res.status(400).json({message:'No Product found'})
      }
      res.status(200).json({message:'Product deleted successfuly'})

    } catch (error) {
      res.status(500).json({message:error.message})
    }
}

const getAllProducts = async(req,res)=>{
  try {
    const products = await ProductModel.find()
  if(!products){
    return res.status(400).json({message:'No Product found'})
  }
  res.status(200).json(products)
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

module.exports = { getProductsByRadius, createProducts, getProductsByOwner,deleteProducts,getAllProducts };
