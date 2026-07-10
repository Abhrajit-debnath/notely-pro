import { Router } from "express";
import registerRouter from "./auth/register.js";
import loginRouter from "./auth/login.js";

const router: Router = Router();

router.use("/api/auth/register", registerRouter);
router.use("/api/auth/login", loginRouter);

export default router;