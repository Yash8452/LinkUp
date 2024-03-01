import { Router } from 'express';
import { deletePost, getAllPosts, getPostById, publishAPost, togglePublishStatus, updatePost } from "../controllers/post.controller.js"
import {verifyIsOwnerForPost, verifyJWT} from "../middlewares/auth.middleware.js"
import {upload} from "../middlewares/multer.middleware.js"

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router
    .route("/")
    .get(getAllPosts)
    .post(
        upload.fields([
            {
                name: "thumbnail",
                maxCount: 1,
            },
            
        ]),
        publishAPost
    );

router
    .route("/:postId")
    .get(getPostById)
    .delete(verifyIsOwnerForPost,deletePost)
    .patch(upload.single("thumbnail"),verifyIsOwnerForPost, updatePost);

router.route("/toggle/publish/:postId").patch(togglePublishStatus);

export default router