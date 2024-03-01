import React, { useContext, useEffect, useState } from "react";
import { useLikes } from "../../context/LikesContext";
import { getLikeCount } from "../../api/LikeRequests";
import { Heart } from "lucide-react";

const LikeButton = ({ postId }) => {
  const { togglePostLike } = useLikes();
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  const fetchLikeCount = async () => {
    try {
      const response = (await getLikeCount(postId)).data.likesCount;
      setCount(response);
    } catch (error) {
      console.error("Error fetching like count:", error);
    }
  };

  useEffect(() => {
    fetchLikeCount();
  }, [postId]);

  const handleLike = async () => {
    setLoading(true);
    try {
      await togglePostLike(postId);
      const response = (await getLikeCount(postId)).data.likesCount;
      setCount(response);
    } catch (error) {
      console.error("Error toggling like:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap justify-center items-center" onClick={handleLike} disabled={loading}>
        <Heart color="red" className="hover:fill-red" />
      {count !== null && <p className="ml-2 text-gray-500">{count}</p>}
    </div>
  );
};

export default LikeButton;
