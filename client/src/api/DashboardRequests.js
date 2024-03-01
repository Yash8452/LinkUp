import API from "./auth";

// export const getStats = () => API.get(`/api/v1/dashboard/stats}`);

export const getPosts = (userId) => {
  const url = userId ? `/api/v1/dashboard/posts/${userId}` : '/api/v1/dashboard/posts';
  return API.get(url);
}
export const getStats = (userId) => {
  const url = userId ? `/api/v1/dashboard/stats/${userId}` : '/api/v1/dashboard/stats';
  return API.get(url);
}