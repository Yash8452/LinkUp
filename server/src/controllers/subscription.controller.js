import mongoose, { isValidObjectId } from "mongoose";
import { User } from "../models/user.model.js";
import { Subscription } from "../models/subscription.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

const toggleSubscription = AsyncHandler(async (req, res) => {
    const { channelId } = req.params;

    // Step 1: Retrieve Channel ID
    if (!channelId?.trim()) {
        throw new ApiError(400, "channelId is missing");
    }

    // Step 2: Input Validation
    if (!isValidObjectId(channelId)) {
        throw new ApiError(400, "Invalid channelId format");
    }

    if (channelId.toString() === req.user._id.toString()) {
        throw new ApiError(400, "You cannot subscribe to yourself");
    }

    // Step 3: Check Subscription Status
    const existingSubscriber = await Subscription.findOne({
        channel: channelId,
        subscriber: req.user._id,
    });

    // Step 4: Toggle Subscription
    if (existingSubscriber) {
        // User is already subscribed, unsubscribe
        await Subscription.findByIdAndDelete(existingSubscriber._id);
        return res.status(200).json(new ApiResponse(200, {}, "Unsubscribed Successfully"));
    } else {
        // User is not subscribed, subscribe
        const subscription = await Subscription.create({
            channel: channelId,
            subscriber: req.user._id,
        });

        // Step 5: Handle Response
        const subscribedUser = await Subscription.findById(subscription._id);
        if (!subscribedUser) {
            throw new ApiError(500, "Something went wrong while subscribing");
        }

        return res.status(201).json(new ApiResponse(200, subscribedUser, "Channel Subscribed Successfully!"));
    }
});


// controller to return subscriber list of a channel
const getUserChannelSubscribers = AsyncHandler(async (req, res) => {
  const { channelId } = req.params;

    // Step 1: Validate Channel ID
    if (!channelId?.trim()) {
        throw new ApiError(400, "channelId is missing");
    }
    if (!isValidObjectId(channelId)) {
        throw new ApiError(400, "Invalid channelId format");
    }

    // Step 2: Fetch Subscribers
    const subscribers = await Subscription.find({ channel: channelId });

    // Step 3: Handle No Subscribers
    if (subscribers.length === 0) {
        return res.status(201).json(new ApiResponse(201, [], "No subscribers found for this channel"));
    }

    // Step 4: Return Response
    return res.status(200).json(new ApiResponse(200, subscribers, "Subscribers fetched successfully"));  
 
});

// controller to return channel list to which user has subscribed
const getSubscribedChannels = AsyncHandler(async (req, res) => {
    const { subscriberId } = req.params;

    // Step 1: Validate Subscriber ID
    if (!subscriberId?.trim()) {
        throw new ApiError(400, "subscriberId is missing");
    }
    if (!isValidObjectId(subscriberId)) {
        throw new ApiError(400, "Invalid subscriberId format");
    }

    // Step 2: Fetch Subscribed Channels
    const channels = await Subscription.find({ subscriber: subscriberId });

    // Step 3: Handle No Subscriptions
    if (channels.length === 0) {
        return res.status(201).json(new ApiResponse(201, [], "No subscribed channels found for this user"));
    }

    // Step 4: Return Response
    return res.status(200).json(new ApiResponse(200, channels, "Subscribed channels fetched successfully"));
});

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };
