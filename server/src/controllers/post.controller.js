import mongoose, { isValidObjectId } from "mongoose";

import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/Cloudinary.js";
import { extractPublicId } from "cloudinary-build-url";

const getAllPosts = AsyncHandler(async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
  //TODO: get all videos based on query, sort, pagination
  // Define the base query
  let postQuery = {};

  // Apply filters based on the request parameters
  if (query) {
    postQuery = { ...postQuery, title: new RegExp(query, "i") };
  }

  if (userId) {
    if (!isValidObjectId(userId)) {
      throw new ApiError(400, "Invalid userId format");
    }
    postQuery = { ...postQuery, owner: userId };
  }

  // Get the total count of videos matching the query
  const totalPosts = await Post.countDocuments(postQuery);
  // Apply sorting based on sortBy and sortType
  let sortCriteria = {};
  if (sortBy) {
    sortCriteria[sortBy] = sortType === "desc" ? -1 : 1;
  }

  // Retrieve videos based on pagination, query, and sort
  const posts = await Post.find(postQuery)
    .sort(sortCriteria)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  return res
    .status(200)
    .json(new ApiResponse(200, posts, "Posts Fetched Successfully"));
});

const publishAPost = AsyncHandler(async (req, res) => {
  const { title, description, isPublished } = req.body;

  // TODO: get video, upload to cloudinary, create video
  const thumbnailFile = req.files.thumbnail[0];
  //console.log(title, description ,thumbnailFile )
  if (!thumbnailFile) {
    throw new ApiError(400, "thumbnail is required");
  }
  const uploadedThumbnail = await uploadOnCloudinary(thumbnailFile.path);

  if (!uploadedThumbnail) {
    throw new ApiError(500, "Error while uploading files to Cloudinary");
  }

  // Create a new post in the database
  const newPost = await Post.create({
    title,
    description,
    thumbnail: uploadedThumbnail.url,
    isPublished,
    owner: req.user._id,
  });
  console.log(newPost);
  return res
    .status(201)
    .json(new ApiResponse(201, newPost, "Post Uploaded Successfully"));
});

const getPostById = AsyncHandler(async (req, res) => {
  const { postId } = req.params;
  if (!postId?.trim()) {
    throw new ApiError(400, "postId is missing");
  }
  if (!isValidObjectId(postId)) {
    throw new ApiError(400, "Invalid postId format");
  }
  //TODO: get post by id
  // : Retrieve video from the database by its ID and increment the view count
  let post = await Post.findById(postId); // Assuming you're using Mongoose

  // : Handle error cases
  if (!post) {
    throw new ApiError(404, "Post not found");
  }
  //   Increment the view count and save in db
  post.views += 1;
  const view = await post.save({ validateBeforeSave: false });
  if (!view) {
    throw new ApiError(400, "Something went wrong while increasing view");
  }
  // Step 5: Return data in the response

  res.status(200).json({
    success: true,
    data: post,
  });
});

const updatePost = AsyncHandler(async (req, res) => {
  const { postId } = req.params;

  if (!postId?.trim()) {
    throw new ApiError(400, "postId is missing");
  }

  if (!isValidObjectId(postId)) {
    throw new ApiError(400, "Invalid postId format");
  }

  //TODO: update video details like title, description, thumbnail
  const { title, description } = req.body;
  if (!title || !description) {
    throw new ApiError(400, "All Fields are required");
  }
  const thumbnailLocalPath = req.file?.path;
  if (!thumbnailLocalPath) {
    new ApiError(400, "Thumbnai Local File is Missing");
  }
  const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

  if (!thumbnail.url) {
    new ApiError(400, "Error while uploading on cloudinary");
  }

  // Deleting Old Avatar
  const oldPost = await Post.findById(postId);
  const oldThumbnailURL = oldPost.thumbnail;
  if (!oldThumbnailURL) {
    new ApiError(400, "Old Thumbnail not found");
  }
  const tpid = await extractPublicId(oldThumbnailURL);
  console.log(tpid);

  const oldThumbnail = await deleteFromCloudinary(tpid);
  if (!oldThumbnail) {
    new ApiError(400, "Error while deleting from cloudinary");
  }

  const post = await Post.findByIdAndUpdate(
    postId,
    {
      $set: {
        thumbnail: thumbnail.url,
        title,
        description,
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, post, "Post Updated Successfully"));
});

const deletePost = AsyncHandler(async (req, res) => {
  const { postId } = req.params;
  if (!postId?.trim()) {
    throw new ApiError(400, "postId is missing");
  }
  if (!isValidObjectId(postId)) {
    throw new ApiError(400, "Invalid postId format");
  }
  //TODO: delete video
  // Step 1: Retrieve the video post from the database by its ID
  const post = await Post.findById(postId);

  // Step 2: Handle error cases
  if (!post) {
    throw new ApiError(404, "post not found");
  }

  // Step 3: Delete the video post from the database
  await Post.findByIdAndDelete(postId);

  // Step 4:  delete resources from Cloudinary

  const tpid = extractPublicId(post.thumbnail);
  await deleteFromCloudinary(tpid);

  if (!tpid) {
    throw new ApiError(
      500,
      "Error while deleting Thumbnail File from cloudinary"
    );
  }

  // Step 5: Return a success response
  res.status(200).json({
    success: true,
    message: "Post deleted successfully",
  });
});

const togglePublishStatus = AsyncHandler(async (req, res) => {
  const { postId } = req.params;
  if (!postId?.trim()) {
    throw new ApiError(400, "postId is missing");
  }
  if (!isValidObjectId(postId)) {
    throw new ApiError(400, "Invalid postId format");
  }

  const post = await Post.findById(postId);
  post.isPublished = !post.isPublished;
  await post.save();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Status Toggled Successfully"));
});

export {
  getAllPosts,
  publishAPost,
  getPostById,
  updatePost,
  deletePost,
  togglePublishStatus,
};
