import API from "./auth";

export const getAllPosts = async() => {
  
  try {
    const response = await API.get('/api/v1/posts/', { withCredentials: true });
    if (response && response.data) {
      // Convert response data to JSON
      const jsonData = response.data;
      return jsonData.data; // Return the user data if needed
    } else {
      console.error("No data in response");
      throw new Error("Failed to fetch posts: No data in response");
    }
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    throw error; // Rethrow the error to handle it in the calling code
  }
};
export const uploadPost = formData => API.post('/api/v1/posts/', formData, { withCredentials: true });
export const getPostById = postId => API.get(`/api/v1/posts/${postId}`);
export const deletePost = postId => API.delete(`/api/v1/posts/${postId}`);
export const updatePost = (postId, updatedData) => API.patch(`/api/v1/posts/${postId}`, updatedData);

