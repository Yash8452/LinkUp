import { Router } from "express";
import {
  addComment,
  deleteComment,
  getPostComments,
  updateComment,
} from "../controllers/comment.controller.js";
import {
  verifyIsOwnerForComment,
  verifyJWT,
} from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/:postId").get(getPostComments).post(addComment);
router
  .route("/c/:commentId")
  .delete(verifyIsOwnerForComment, deleteComment)
  .patch(verifyIsOwnerForComment, updateComment);

export default router;
