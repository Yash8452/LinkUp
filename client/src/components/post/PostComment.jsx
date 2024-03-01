import React, { useState, useEffect } from "react";
// import {
//   deleteComment,
//   getPostComments,
//   updateComment,
// } from "../../api/CommentRequest";

import { MoreHorizontal, Send } from "lucide-react";

import { formatDuration } from "../../helper/dateAndTimeHelper";

// import { getUserById } from "../../api/UserRequests";
import toast from "react-hot-toast";
import { useComments } from "../../context/CommentsContext";
import { useUser } from "../../context/UserContext";

const PostComments = ({ postId, isPostOwner, currentUserId }) => {
  const [users, setUsers] = useState({});
  const [content, setContent] = useState("");
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editCommentId, setEditCommentId] = useState(null); // Track currently editing comment ID
  const { getPostComments, deleteComment, updateComment } = useComments();
  const { getUserById } = useUser();
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getPostComments(postId);
        // console.log("fetched comments", response);
        setComments(response);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [postId, setComments]); // Fetch comments when postId changes

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = {};
        await Promise.all(
          comments.map(async (comment) => {
            const response = await getUserById(comment.owner);
            fetchedUsers[comment.owner] = response.data;
          })
        );
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (comments.length > 0) {
      fetchUsers();
    }
  }, [comments]);

  const handleDelete = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments(comments.filter((comment) => comment._id !== commentId));
      toast.success("comment deleted");
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleEdit = async (commentId) => {
    try {
      await updateComment(commentId, content);
      setComments(
        comments.map((comment) =>
          comment._id === commentId ? { ...comment, content } : comment
        )
      );
      setEditCommentId(null); // Reset editing mode after saving
      toast.success("Comment updated");
      setContent("");
      setInput(null);
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  return (
    <div className="mt-4">
      {comments.length === 0 ? (
        <p className="text-gray-500">No comments</p>
      ) : (
        <ul>
          <h2 className="text-l font-mono mb-2">Comments({comments.length})</h2>
          {comments.map((comment) => (
            <li key={comment._id} className="mb-2">
              <>
                <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
                  <footer className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                        <img
                          className="mr-2 w-6 h-6 rounded-full"
                          src={
                            users[comment.owner] && users[comment.owner].avatar
                          }
                          alt={
                            users[comment.owner] &&
                            users[comment.owner].fullName
                          }
                        />
                        {users[comment.owner] && users[comment.owner].fullName}
                      </p>
                      <p className="text-xs font-thin text-gray-600 dark:text-gray-400">
                        <time dateTime="2022-02-08" title="February 8th, 2022">
                          {formatDuration(comment.createdAt)}
                        </time>
                      </p>
                    </div>
                    <button
                      disabled
                      className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                      type="button"
                    >
                      <MoreHorizontal />
                    </button>
                  </footer>
                  <p className="text-gray-500 dark:text-gray-400">
                    {comment.content}
                  </p>
                  <div className="flex items-center mt-4 space-x-4">
                    {(isPostOwner || currentUserId === comment.owner) && (
                      <>
                        <button
                          className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                          onClick={() => handleDelete(comment._id)}
                        >
                          Delete
                        </button>
                        <button
                          className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                          onClick={() => setInput(comment._id)}
                        >
                          Edit
                        </button>
                      </>
                    )}
                    {input && comment._id === input ? (
                      <>
                        <input
                          name="text"
                          type="text"
                          placeholder="Write a comment..."
                          className="appearance-none w-full mx-2 bg-grey-lighter rounded-full border bg-white h-12 px-2  text-xs"
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                        />
                        <button
                          onClick={() => handleEdit(comment._id)}
                          //disabled={loading || comment.trim() === ""}
                          className="appearance-none flex-1 flex items-center justify-center  text-center text-grey-darker hover:bg-grey-lighter"
                        >
                          {loading ? (
                            "Adding..."
                          ) : (
                            <>
                              <Send size={26} color="#313131" strokeWidth={1} />
                            </>
                          )}
                        </button>
                      </>
                    ) : null}
                  </div>
                </article>
              </>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostComments;
