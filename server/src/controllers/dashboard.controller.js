import mongoose from "mongoose";
import { Post } from "../models/post.model.js";
import { Subscription } from "../models/subscription.model.js";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

const getChannelStats = AsyncHandler(async (req, res) => {
  // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.
  let userStats;

  if (req.params.userId) {
    userStats = req.params.userId;
    // console.log("Params",req.params.userId)
  } else if(req.user){
    // console.log("Jwt",req.user._id)
    userStats = req.user._id;
  }

  const totalPostViews = await Post.aggregate([
    { $match: { owner: new mongoose.Types.ObjectId(userStats) } },
    { $group: { _id: null, totalViews: { $sum: "$views" } } },
  ]);

  const totalSubscribers = await Subscription.countDocuments({
    channel: userStats,
  });

  const totalPosts = await Post.countDocuments({ owner: userStats });

  const totalLikes = await Like.countDocuments({
    post: { $in: await Post.find({ owner: userStats }, "_id") },
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { totalPostViews, totalSubscribers, totalPosts, totalLikes },
        "Channel Stats Fetched Successfully"
      )
    );
});

const getChannelPosts = AsyncHandler(async (req, res) => {
  // TODO: Get all the videos uploaded by the channel
  // TODO: Get all the videos uploaded by the channel
  // const posts = await Post.find({
  //   owner : req.user._id || req.params.userId
  // })

  let owner;

  if (req.params.userId) {
    owner = req.params.userId;
    // console.log("Params",req.params.userId)
  } else if(req.user){
    // console.log("Jwt",req.user._id)
    owner = req.user._id;
  }

  const posts = await Post.find({ owner });


  if(!posts){
    throw new ApiError(500, "Something went wrong while fetching videos of user");
  }

  return res
  .status(200)
  .json(new ApiResponse(200, posts, "Videos of Channel Fetched Successfully"));
});

export { getChannelStats, getChannelPosts };
