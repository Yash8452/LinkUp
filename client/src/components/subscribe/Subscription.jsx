import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  getUserFollowers,
  getUserFollowing,
  toggleSubscription,
} from "../../api/SubscriptionRequest";

const Subscription = ({ userId }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subCount, setSubCount] = useState(0);

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      try {
        const response = (await getUserFollowing(userId)).data;
        console.log("substatus", response);
        setIsSubscribed(response.data.length);
      } catch (error) {
        console.error("Error fetching subscription status:", error);
      }
    };

    const fetchSubscriberCount = async () => {
      try {
        const response = (await getUserFollowers(userId)).data;
        console.log("count", response.data.length);
        setSubCount(response.data.length);
        console.log("subbbb", subCount);
      } catch (error) {
        console.error("Error fetching subscriber count:", error);
      }
    };

    fetchSubscriptionStatus();
    fetchSubscriberCount();
  }, [userId]);

  const handleToggleSubscription = async () => {
    try {
      if (isSubscribed) {
        // Since there's only a POST method to toggle, you can use it for unsubscribing as well
        await toggleSubscription(userId);
        setIsSubscribed(false);
        setSubCount((prevCount) => prevCount - 1);
      } else {
        await toggleSubscription(userId);
        setIsSubscribed(true);
        setSubCount((prevCount) => prevCount + 1);
      }
    } catch (error) {
      console.error("Error toggling subscription:", error);
    }
  };

  return (
    <button
      onClick={handleToggleSubscription}
      className={`appearance-none px-3 py-2 bg-grey-light uppercase text-grey-darker text-sm mr-4 ${isSubscribed ? 'bg-grey-light text-grey-darker' : 'bg-red-500 text-white'}`}
    >
      {isSubscribed ? "Unsubscribe" : "Subscribe"}{" "}
    </button>
  );
};

export default Subscription;
