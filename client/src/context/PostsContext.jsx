import React, { createContext, useState, useContext } from "react";
import  * as postApi from "../api/PostRequests";

// Step 1: Create the Context
const PostsContext = createContext();

// Step 2: Create a Provider Component
export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");


  const fetchPosts = async () => {
    try {
      const response = await postApi.getAllPosts();
      setPosts(response);
    } catch (error) {
      console.log("Error Fetching Posts:", error);
      setError(error.message);
    }
  };
  const addPost = async (newPost) => {
    try {
      const response = await postApi.uploadPost(newPost);
      //console.log("Posted",response)
      setPosts([...posts, response]);
    } catch (error) {
      console.log("Uploading Post Error:", error);
      setError(error.message);
    }
  };

  // Delete a post
  const deletePost = async (postId) => {
    try {
      await postApi.deletePost(postId);
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.log("Error deleting a post:", error);
      setError(error.message);
    }
  };

  // Update a post
  const updatePost = async (postId, updatedPostData) => {
    try {
      await postApi.updatePost(postId, updatedPostData);
      setPosts(
        posts.map((post) =>
          post.id === postId ? { ...post, ...updatedPostData } : post
        )
      );
    } catch (error) {
      console.log("Error updating a post:", error);
      setError(error.message);
    }
  };

  // Step 4: Export the Context
  return (
    <PostsContext.Provider
      value={{ posts, addPost, fetchPosts, deletePost, updatePost }}
    >
      {children}
    </PostsContext.Provider>
  );
};

// Custom hook to use the PostsContext
export const usePosts = () => {
  return useContext(PostsContext);
};
