import { Router } from "express";
import { signUp, login } from "../controllers/AuthControllers.js";

const authRoutes = Router();

authRoutes.post("/signup", signUp);
authRoutes.post("/login", login);
export default authRoutes;
