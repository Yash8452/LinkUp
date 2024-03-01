import { Router } from "express";
import { getChannelPosts, getChannelStats } from "../controllers/dashboard.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/stats/:userId?").get(getChannelStats);
router.route("/posts/:userId?").get(getChannelPosts);

export default router;

