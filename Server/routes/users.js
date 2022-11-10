import express from "express";
import auth from "../middleware/auth.js";
import { signin, signup ,getUser,allUsers,logout} from "../controllers/user.js";

const router = express.Router();

router.get("/",auth,getUser);
router.get("/all", allUsers);
router.get("/logout",logout)
router.post("/signin", signin);
router.post("/signup",auth,signup);

export default router;