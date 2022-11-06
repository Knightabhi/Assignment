import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    name: String,
    product: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }]
});

const Category = mongoose.model("Category", categorySchema);

export default Category;