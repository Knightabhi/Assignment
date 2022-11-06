import express from "express";
import auth from "../middleware/auth.js";
import { signin, signup ,getUser,allUsers } from "../controllers/user.js";

const router = express.Router();

router.get("/",auth,getUser);
router.get("/all", allUsers);
router.post("/signin", signin);
router.post("/signup", signup);

export default router;