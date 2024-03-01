import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

const togglePostLike = AsyncHandler(async (req, res) => {
  const { postId } = req.params;
  //TODO: toggle like on video
  if (!postId?.trim()) {
    throw new ApiError(400, "postId missing");
  }
  if (!isValidObjectId(postId)) {
    throw new ApiError(400, "invalid postId format");
  }

  //find if like exists
  const existingLike = await Like.findOne({
    post: postId,
    likedBy: req.user?._id,
  });
  if (existingLike) {
    await Like.findByIdAndDelete(existingLike._id);
    return res
      .status(201)
      .json(new ApiResponse(200, {}, "Like removed from post successfully!"));
  } else {
    const like = await Like.create({
      post: postId,
      likedBy: req.user?._id,
    });

    const likedVideo = await Like.findById(like._id);

    if (!likedVideo) {
      throw new ApiError(500, "Something went wrong while liking post");
    }

    return res
      .status(201)
      .json(new ApiResponse(200, likedVideo, "post Liked Successfully!"));
  }
});

const toggleCommentLike = AsyncHandler(async (req, res) => {
  const { commentId } = req.params;
  //TODO: toggle like on comment
  if (!commentId) {
    throw new ApiError(400, "commentId is missing");
  }
  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "Invalid commentId format");
  }

  const existingLike = await Like.findOne({
    comment: commentId,
    likedBy: req.user?._id,
  });

  if (existingLike) {
    await Like.findByIdAndDelete(existingLike._id);
    return res
      .status(201)
      .json(
        new ApiResponse(200, {}, "Like removed from comment successfully!")
      );
  } else {
    const like = await Like.create({
      comment: commentId,
      likedBy: req.user?._id,
    });

    const likedComment = await Like.findById(like._id);

    if (!likedComment) {
      throw new ApiError(500, "Something went wrong while liking comment");
    }

    return res
      .status(201)
      .json(new ApiResponse(200, likedComment, "Comment Liked Successfully!"));
  }
});

const getLikedPosts = AsyncHandler(async (req, res) => {
  //TODO: get all liked videos
  console.log(req.user._id);
  const likedPosts = await Like.aggregate([
    {
      $match: {
        likedBy: new mongoose.Types.ObjectId(req.user._id),
      },
    },

    {
      $lookup: {
        from: "posts",
        localField: "post",
        foreignField: "_id",
        as: "posts",
      },
    },

    {
      $unwind: "$posts",
    },

    {
      $lookup: {
        from: "likes",
        localField: "posts._id",
        foreignField: "post",
        as: "likes",
      },
    },
    {
      $addFields: {
        likesCount: {
          $size: "$likes",
        },
      },
    },
    {
      $project: {
        _id: "$posts._id",
        title: "$posts.title",
        description: "$posts.description",
        thumbnail: "$posts.thumbnail",
        views: "$posts.views",
        owner: "$posts.owner",
        likesCount: "$likesCount",
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, likedPosts, "Liked Posts Fetched Successfully"));
});

//get total likes for a post
const getLikesCount = AsyncHandler(async (req, res) => {
  const postId = req.params.postId; // Assuming postId is passed as a parameter

  try {
    const likesCount = await Like.aggregate([
      {
        $match: {
          post: new mongoose.Types.ObjectId(postId),
        },
      },
      {
        $group: {
          _id: "$post",
          totalLikes: { $sum: 1 }, // Count the number of likes for the specific post
        },
      },
    ]);

    if (likesCount.length === 0) {
      return res.status(200).json({ likesCount: 0 });
    }

    res.status(200).json({ likesCount: likesCount[0].totalLikes });
  } catch (error) {
    console.error("Error getting likes count:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export { toggleCommentLike, togglePostLike, getLikedPosts, getLikesCount };
