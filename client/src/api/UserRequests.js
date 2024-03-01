import API from "./auth";

export const getCurrentUser = async () => {
  try {
    const response = await API.get(`/api/v1/users/current-user`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log("Eror getting current user", error);
  }
};
export const getUserById = async (userId) => {
  try {
    const response = await API.get(`/api/v1/users/get-userById/${userId}`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log("Eror getting user", error);
  }
};

export const getUsers = async (username) =>
  await API.get(`/api/v1/user/get-user/${username}`);

export const updateUserDetails = (formData) =>
  API.patch(`/api/v1/users/update-account`, formData);
export const changePassword = (formData) =>
  API.post(`/api/v1/users/change-password`, formData);
export const getAllUser = async () => {
  try {
    const response = await API.get("/api/v1/users/all-users");
    return response;
  } catch (error) {
    console.log("Error Fetching All users", error);
  }
};
export const logOut = () =>
  API.post("/api/v1/users/logout", { withCredentials: true });
