import { Router } from "express";
import { prisma } from "../../config/db/db.js";
import { UserRepository } from "../../repositories/auth.repository.js";
import { OAuthService } from "../../services/auth/oAuth.service.js";
import { OAuthController } from "../../controllers/auth/oAuth.controller.js";

const router: Router = Router();

// Instantiate dependencies
const userRepository = new UserRepository(prisma);
const oauthService = new OAuthService(userRepository);
const oauthController = new OAuthController(oauthService);

// oAuth route with the controller method
router.post("/", oauthController.oauthLogin);

export default router;
