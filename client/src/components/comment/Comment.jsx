import React, { useState } from "react";
// import { addComment } from "../../api/CommentRequest";
import { Send } from "lucide-react";
import toast from "react-hot-toast";
import { useComments } from "../../context/CommentsContext";

const Comment = ({ postId, user }) => {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const { setComments, addComment } = useComments();

  // Function to handle the submission of the comment
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Make API request to submit the comment
      const response = await addComment(postId, { content: comment });
      setComments((prevComments) => [...prevComments, response]);
      toast.success("Comment added");
      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <img
        className="w-8 h-8 rounded-full"
        src={user.avatar}
        alt={user.fullName}
      />
      <input
        name="text"
        type="text"
        placeholder="Write a comment..."
        className="appearance-none w-full mx-2 bg-grey-lighter rounded-full border bg-white h-12 px-2  text-xs"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        disabled={loading || comment.trim() === ""}
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
  );
};

export default Comment;
