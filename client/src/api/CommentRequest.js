import API from "./auth";

export const getPostComments = (postId) =>
  API.get(`/api/v1/comments/${postId}`);
export const addComment = (postId, content) =>
  API.post(`/api/v1/comments/${postId}`, content);

export const deleteComment = (commentId) =>
  API.delete(`/api/v1/comments/c/${commentId}`);
export const updateComment = (commentId, content) =>
  API.patch(`/api/v1/comments/c/${commentId}`, content);
