import mongoose, { isValidObjectId } from "mongoose";
import { Comment } from "../models/comment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

const getPostComments = AsyncHandler(async (req, res) => {
  //TODO: get all comments for a video
  const { postId } = req.params;
  const { page = 1, limit = 10 } = req.query;
  if (!postId?.trim()) {
    throw new ApiError(400, "postId is missing");
  }
  if (!isValidObjectId(postId)) {
    throw new ApiError(400, "Invalid postId format");
  }
  //find comment in db
  // const comments = await Comment.find({ post: postId });
  //  // Find comments in db
   const commentsPromise = Comment.find({ post: postId })
   .skip((page - 1) * limit)
   .limit(limit)
   .exec();
 
 // Count total number of comments
 const totalCommentsPromise = Comment.countDocuments({ post: postId }).exec();

 // Execute both promises concurrently
 const [comments, totalComments] = await Promise.all([commentsPromise, totalCommentsPromise]);


  return res
    .status(200)
    .json(new ApiResponse(200, comments, "Comments Fetched Successfully"));
});

const addComment = AsyncHandler(async (req, res) => {
  // TODO: add a comment to a video
  // Step 1: Retrieve post ID and comment content
  const { content } = req.body;
  const { postId } = req.params;
  //console.log(postId)
  // Step 2: Handle error cases
  if (!postId?.trim()) {
    throw new ApiError(400, "Post ID is missing");
  }
  if (!content?.trim()) {
    throw new ApiError(400, "Comment content is missing");
  }
  try {
    // Step 3: Create a new comment object
    const newComment = new Comment({
      content,
      post: postId,
      owner: req.user ? req.user._id : null, // Assuming user ID is available in req.user
    });

    // Step 4: Save the new comment to the database
    await newComment.save();

    // Step 5: Return a success response with the newly created comment
    res
      .status(201)
      .json(new ApiResponse(201, newComment, "Comment added successfully"));
  } catch (error) {
    // Handle any database-related errors
    console.error("Error while adding comment:", error);
    throw new ApiError(500, "Internal server error");
  }
});

const updateComment = AsyncHandler(async (req, res) => {
  // TODO: update a comment
  const { content } = req.body;
  const { commentId } = req.params;
  if (!commentId?.trim()) {
    throw new ApiError(400, "CommentId is missing");
  }
  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "Invalid CommentId format");
  }

  const updatedComment = await Comment.findByIdAndUpdate(
    commentId,
    {
      $set: {
        content,
      },
    },
    { new: true }
  );
  if (!updatedComment)
    throw new ApiError(400, "Something went wrong while updating comment");
  return res
    .status(200)
    .json(new ApiResponse(200, updatedComment, "Comment is updated"));
});

const deleteComment = AsyncHandler(async (req, res) => {
  // TODO: delete a comment
  const { commentId } = req.params;
  if (!commentId?.trim()) {
    throw new ApiError(400, "CommentId missing");
  }
  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "Invalid CommentId format");
  }

  const comment = await Comment.findByIdAndDelete(commentId);

  if (!comment) {
    throw new ApiError(400, "Something went wrong while deleting comment");
  } else {
    return res
      .status(200)
      .json(new ApiResponse(200, null, "Comment deleted successfully"));
  }
});

export { getPostComments, addComment, updateComment, deleteComment };
