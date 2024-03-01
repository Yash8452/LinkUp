import API from "./auth.js";

  
export const togglePostLike = (id) => API.post(`/api/v1/likes/toggle/v/${id}`);
export const getLikeCount = (id) => API.get(`/api/v1/likes/v/${id}`);
export const toggleCommentLike = (id) => API.post(`/api/v1/likes/toggle/c/${id}`);
export const getLikedPosts = () => API.get(`/api/v1/likes/posts`);