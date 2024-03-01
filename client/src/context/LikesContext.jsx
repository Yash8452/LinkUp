import React, { createContext, useContext, useEffect, useState } from "react";
import * as likeApi from "../api/LikeRequests";

// Step 1: Create the Context
const LikesContext = createContext();

// Step 2: Create a Provider Component
export const LikesProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [likedPosts, setLikedPosts] = useState([]);
  const [likeCount, setLikeCount] = useState(0);

  // Step 3: Implement State Management
  const togglePostLike = async (postId) => {
    setLoading(true);
    try {
      const response = await likeApi.togglePostLike(postId);
      console.log("Toggle like", response);
      if (response.data.success === true) {
        console.log(response);
        // Update like count after toggling like
        // const newLikeCount = likedPosts.includes(postId)
        //   ? likeCount - 1
        //   : likeCount + 1;
        // setLikeCount(newLikeCount);

        // // Update likedPosts array based on toggling like
        // if (likedPosts.includes(postId)) {
        //   setLikedPosts(likedPosts.filter((id) => id !== postId));
        // } else {
        //   setLikedPosts([...likedPosts, postId]);
        // }
      } else {
        console.error("Failed to toggle like");
      }
    } catch (error) {
      console.error("Failed to toggle like:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLikeCount = async (postId) => {
    
    try {
      const response = (await likeApi.getLikeCount(postId)).data.likesCount;
      console.log("Count", response);
      setLikeCount(response);
      //Logging the updated state using the state updater function
      // setLikeCount((prevCount) => {
      //   console.log("Updated Like Count:", prevCount);
      //   return prevCount;
      // });
      //setLikeCount(prevCount)
      
    } catch (error) {
      console.error("Error fetching like count:", error);
    }
  };

  // const fetchLikedPosts = async () => {
  //   try {
  //     const likedPosts = await likeApi.fetchLikedPosts();
  //     // Update likes state with fetched liked posts
  //     setLikes(
  //       likedPosts.reduce((acc, postId) => {
  //         acc[postId] = true;
  //         return acc;
  //       }, {})
  //     );
  //   } catch (error) {
  //     console.error("Error fetching liked posts:", error);
  //   }
  // };

  const toggleCommentLike = async (commentId) => {
    try {
      await likeApi.toggleCommentLike(commentId);
      // Optionally, update state if needed
    } catch (error) {
      console.error("Error toggling comment like:", error);
    }
  };

  // Step 4: Export
  return (
    <LikesContext.Provider
      value={{
        likeCount,
        setLikeCount,
        togglePostLike,
        fetchLikeCount,
        // fetchLikedPosts,
        toggleCommentLike,
      }}
    >
      {children}
    </LikesContext.Provider>
  );
};

// Step 5: Create a custom hook to use the LikesContext
export const useLikes = () => {
  return useContext(LikesContext);
};
