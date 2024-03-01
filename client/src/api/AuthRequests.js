import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

const API = axios.create({
  baseURL: apiUrl,
});


export const login = async (formData) =>
  API.post("/api/v1/users/login", formData, { withCredentials: true });

export const signup = (formData) => {
  console.log("formdata",formData)
  return API.post("/api/v1/users/register", formData);
};

export const getAllUsers = async () => {
  try {
    const response = await API.get("/api/v1/users/all-users");
    if (response && response.data) {
      // Convert response data to JSON
      const jsonData = response.data;
      console.log("All users:", jsonData.data);
      return jsonData.data; // Return the user data if needed
    } else {
      console.error("No data in response");
      throw new Error("Failed to fetch users: No data in response");
    }
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw error; // Rethrow the error to handle it in the calling code
  }
};
