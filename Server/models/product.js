import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: String,
    description: String,
    price: Number,
   // image: String,
    // category: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;