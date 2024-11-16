import { Router } from "express";
import { signUp } from "../controllers/AuthControllers";

const authRoutes = Router();

authRoutes.post("/signup", signUp);
export default authRoutes;
