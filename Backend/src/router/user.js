import { Router } from "express";
const router = Router();
import { Login, Signup } from "../controller/user.js";
import { signUpValidationRule } from "../validation/signupValidation.js";
import { validate } from "../validation/validate.js";

router.post("/add", signUpValidationRule(), validate, Signup);

router.post("/login", Login);

export default router;
