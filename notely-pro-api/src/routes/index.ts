import { Router } from "express";
import registerRouter from "./auth/register.js";
import loginRouter from "./auth/login.js";
import oAuthRouter from "./auth/oauth-login.js";
import logoutRouter from "./auth/logout.js";
import notesRouter from "./notes/notes.js";

const router: Router = Router();

// Auth routes
router.use("/api/auth/register", registerRouter);
router.use("/api/auth/login", loginRouter);
router.use("/api/auth/oauth", oAuthRouter);
router.use("/api/auth/logout", logoutRouter);

// Notes route
router.use("/api/notes", notesRouter);

export default router;