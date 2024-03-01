import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { Post } from '../models/post.model.js';
import { AsyncHandler } from '../utils/AsyncHandler.js';
import { Comment } from '../models/comment.model.js';

export const verifyJWT = async(req,res,next) =>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if(!token){
            throw new ApiError(401, "Unauthorized Access");
          }
          const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        
          const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
        
          if(!user){
            throw new ApiError(401, "Invalid Access Token");
          }
        
          req.user = user;
          next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Acces Token")
    }
}

export const verifyIsOwnerForPost = AsyncHandler(async (req, res, next) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      throw new ApiError(401, "Post ID Not Found");
    }

    const post = await Post.findById(postId);
    if (!post) {
      throw new ApiError(401, "Post Not Found");
    }

    if (post.owner.toString() !== req.user._id.toString()) {
      throw new ApiError(401, "You are not the owner of this.");
    }
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Post Not Found");
  }
});

export const verifyIsOwnerForComment = AsyncHandler(async (req, res, next) => {
  try {
    const { commentId } = req.params;

    if (!commentId) {
      throw new ApiError(401, "Comment ID Not Found");
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      throw new ApiError(401, "Comment Not Found");
    }

    if (comment.owner.toString() !== req.user._id.toString()) {
      throw new ApiError(401, "You are not the owner of this.");
    }
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Comment Not Found");
  }
});