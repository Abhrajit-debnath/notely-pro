import { Router } from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { registerSchema } from "../schemas/auth/auth.schema.js";

// import type {Router as RouterType} from "express"

const router:Router = Router();


router.use("api/auth/register",validate(registerSchema),)
