import { Router } from "express";
import responseSender from "../../globals/response.global.js";

const router: Router = Router();

router.post("/", (req, res) => {
    res.cookie("refreshToken", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 0,
        expires: new Date(0),
    });

    res.cookie("accessToken", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 0,
        expires: new Date(0),
    });

    responseSender(res, 200, "Logged out successfully", null);
});

export default router;
