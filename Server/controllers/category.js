import Product from "../models/product.js";
import Category from "../models/category.js";

export const getCategory = async (req, res) => {
  try {
    const category = await Category.find();
    res.status(200).json(category);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCategoryId = async (req, res) => {
  try {
    const category = await Category.findById(req.query.id);
    res.status(200).json(category.product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
