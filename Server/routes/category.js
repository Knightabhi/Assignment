import express from "express";
import { getCategory,getCategoryId } from "../controllers/category.js";
import Category from "../models/category.js";

const router = express.Router();

router.get("/", getCategory);
router.get("/product", getCategoryId);

export default router;