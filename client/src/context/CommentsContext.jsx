import React, { createContext, useContext, useState } from "react";
import * as commentApi from "../api/CommentRequest";
import toast from "react-hot-toast";

// Step 1: Create the Context
const CommentsContext = createContext();

// Step 2: Create a Provider Component
export const CommentsProvider = ({ children }) => {
  // Step 3: Implement State Management
  // const [comment, setComment] = useState("");
  const [comments,setComments] = useState([])

  const getPostComments = async (postId) => {
    try {
      const response = await commentApi.getPostComments(postId);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching post comments:", error);
    }
  };

  const addComment = async (postId, content) => {
    try {
      const response = await commentApi.addComment(postId, content);
      setComments((prevComments) => [...prevComments, response.data.data]);
      toast.success("Comment added");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const response = await commentApi.deleteComment(commentId);
      console.log(response)
      return response;
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const updateComment = async (commentId, updatedContent) => {
    try {
      const response = await commentApi.updateComment(
        commentId,
        updatedContent
      );
      console.log("comm cont",response)
      setComments(
        comments.map((comment) =>
          comment.id === commentId ? response.data.content : comment
        )
      );
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  // Step 4: Export
  return (
    <CommentsContext.Provider
      value={{
        getPostComments,addComment,comments,setComments,deleteComment,updateComment
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
};

// Step 5: Create a custom hook to use the LikesContext
export const useComments = () => {
  return useContext(CommentsContext);
};
