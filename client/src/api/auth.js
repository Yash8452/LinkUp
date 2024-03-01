import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

const API = axios.create({ baseURL: apiUrl, withCredentials: true });

// Function to refresh access token using refresh token
const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await API.post("/api/v1/users/refresh-token", {
      refreshToken,
    });
    console.log(response);
    return response.data.accessToken;
  } catch (error) {
    throw new Error("Failed to refresh access token");
  }
};

// Function to get access token from cookies
export const getAccessTokenFromCookies = () => {
  const cookieString = document.cookie;
  if (!cookieString) {
    return null;
  }

  const accessTokenCookie = cookieString
    .split(";")
    .find((cookie) => cookie.trim().startsWith("accessToken="));
  if (!accessTokenCookie) {
    console.log("Access token cookie not found");
    return null;
  }

  const accessToken = accessTokenCookie.split("=")[1];
  console.log("Access token found:", accessToken);
  return accessToken;
};

// Function to get refresh token from cookies
export const getRefreshTokenFromCookies = () => {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("refreshToken="))
    .split("=")[1];
};

// Function to set access token to cookies
export const setAccessTokenToCookies = (accessToken) => {
  document.cookie = `accessToken=${accessToken}; path=/`;
};

// Function to set refresh token to cookies
export const setRefreshTokenToCookies = (refreshToken) => {
  document.cookie = `refreshToken=${refreshToken}; path=/`;
};

// Function to clear tokens from cookies
export const clearTokensFromCookies = () => {
  document.cookie =
    "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
  document.cookie =
    "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
};

// Add a request interceptor
API.interceptors.request.use(
  (config) => {
    const accessToken = getAccessTokenFromCookies();
    //console.log(accessToken)
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = getRefreshTokenFromCookies();
        const newAccessToken = await refreshAccessToken(refreshToken);
        setAccessTokenToCookies(newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return API(originalRequest);
      } catch (refreshError) {
        console.error("Error refreshing access token:", refreshError);
        //clearTokensFromCookies();
        // Redirect to login or handle authentication error
        // You may want to clear cookies or localStorage if refresh fails
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default API;
