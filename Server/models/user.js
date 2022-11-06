import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  cart: [{id:{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }, qty: { type: Number, required: true }}],
  id: String,
});

export default mongoose.model("User", userSchema);
