import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import productRoutes from "./routes/products.js";
import userRoutes from "./routes/users.js";
import categoryRoutes from "./routes/category.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const x =()=>{
    console.log("hello");
}

app.use("/products", productRoutes);
app.use("/user", userRoutes);
app.use("/categories",categoryRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`MongoDB Connected and server running on port: ${PORT}`);
    })
  )
  .catch((err) => {
    console.log(err.message);
  });

mongoose.set("useFindAndModify", false);
