import { Router } from "express";
import { prisma } from "../../config/db/db.js";
import { UserRepository } from "../../repositories/auth.repository.js";
import { LoginService } from "../../services/auth/auth.service.js";
import { LoginController } from "../../controllers/auth/auth.controller.js";
import { loginSchema } from "../../schemas/auth/auth.schema.js";
import { validate } from "../../middlewares/validate.middleware.js";

const router: Router = Router();

// Instantiate dependencies
const userRepository = new UserRepository(prisma);
const loginService = new LoginService(userRepository);
const loginController = new LoginController(loginService);

// Register route with the middleware and controller method
router.post("/", validate(loginSchema), loginController.loginUser);

export default router;
