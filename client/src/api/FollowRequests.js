import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8080" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const getUserFollowing = (userId) =>
  API.post(`/api/v1/subscriptions/u/${userId}`);
export const getUserFollowers = (userId) =>
  API.get(`/api/v1/subscriptions/c/${userId}`);
export const toggleFollow = (userId) =>
  API.post(`/api/v1/subscriptions/c/${userId}`);
