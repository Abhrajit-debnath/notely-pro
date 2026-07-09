import { Router } from "express";
import { prisma } from "../../config/db/db.js";
import { UserRepository } from "../../repositories/auth.repository.js";
import { RegisterService } from "../../services/auth/auth.service.js";
import { RegisterController } from "../../controllers/auth/auth.controller.js";
import { registerSchema } from "../../schemas/auth/auth.schema.js";
import { validate } from "../../middlewares/validate.middleware.js";

const router: Router = Router();

// Instantiate dependencies
const userRepository = new UserRepository(prisma);
const registerService = new RegisterService(userRepository);
const registerController = new RegisterController(registerService);

// Register route with the middleware and controller method
router.post("/", validate(registerSchema), registerController.registerUser);

export default router;
