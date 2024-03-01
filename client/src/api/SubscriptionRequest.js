import API from "./auth";

export const getUserFollowers = (userId) => API.get(`/api/v1/subscriptions/c/${userId}`);
export const toggleSubscription = (userId) => API.post(`/api/v1/subscriptions/c/${userId}`);
export const getUserFollowing=(userId)=>API.get(`/api/v1/subscriptions/u/${userId}`)