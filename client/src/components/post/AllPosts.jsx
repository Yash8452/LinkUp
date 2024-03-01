import React, { useState, useEffect } from "react";
import {
  Heart,
  MessageCircleMore,
  MoreHorizontal,
  Send,
  Share,
  XCircle,
} from "lucide-react";

import { usePosts } from "../../context/PostsContext";
import LikeButton from "../like/LikeButton";
import Comment from "../comment/Comment";
import PostComments from "./PostComment";
import { getUserById } from "../../api/UserRequests";
import { Link } from "react-router-dom";
import { formatDuration } from "../../helper/dateAndTimeHelper";

const AllPosts = ({ user }) => {
  const { posts, fetchPosts } = usePosts();
  const [commentOpen, setCommentOpen] = useState(false);
  const toggleCommentSection = () => {
    setCommentOpen(!commentOpen);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const [postOwners, setPostOwners] = useState({}); // State to store post owners' details
  useEffect(() => {
    // Fetch user details for post owners
    const fetchPostOwners = async () => {
      try {
        const uniqueOwnerIds = [...new Set(posts.map((post) => post.owner))];
        const ownersDetails = {};
        await Promise.all(
          uniqueOwnerIds.map(async (ownerId) => {
            const response = await getUserById(ownerId);
            // console.log(response.data.data);
            ownersDetails[ownerId] = response.data.data;
          })
        );
        setPostOwners(ownersDetails);
      } catch (error) {
        console.error("Error fetching post owners:", error);
      }
    };

    fetchPostOwners();
  }, [posts]);

  return (
    <>
      {posts.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post._id}>
              <>
                <div className="bg-white shadow mt-4 p-3 pb-0">
                  <div className="flex justify-end">
                    <button className="">
                      <MoreHorizontal
                        size={16}
                        color="#313131"
                        strokeWidth={1}
                      />
                    </button>
                  </div>
                  <div className="flex items-center">
                    <div>
                      <img
                        className="w-10  h-10 rounded-full"
                        src={postOwners[post.owner]?.avatar}
                      />
                    </div>
                    <div className="ml-2">
                      <Link to={`/user-dashboard/${post.owner}`}>
                        <h5>
                          {postOwners[post.owner]?.username || "Username"}
                        </h5>
                      </Link>

                      <p className="text-xs font-thin  text-grey mt-1">
                        <span className="cursor-pointer hover:underline">
                          {formatDuration(post.createdAt)}
                        </span>
                      </p>
                    </div>
                  </div>

                  <h5 className="text-sm font-normal my-3">{post.title}</h5>
                  <div className="border">
                    <img src={post.thumbnail} />
                  </div>
                  <div className="flex py-1">
                    <button className="appearance-none flex-1 flex items-center justify-center py-2 text-center text-red hover:bg-grey-lighter">
                      {/* <Heart color="red" />
                      <span className="ml-2 text-gray-500">{}</span> */}
                      <LikeButton postId={post._id} />
                    </button>
                    <button
                      onClick={toggleCommentSection}
                      className="appearance-none flex-1 flex items-center justify-center py-2 text-center text-grey-darker hover:bg-grey-lighter"
                    >
                      {commentOpen ? <XCircle /> : <MessageCircleMore />}
                    </button>
                    {/* <button className="appearance-none flex-1 flex items-center justify-center py-2 text-center text-grey-darker hover:bg-grey-lighter">
                      <Share />
                    </button> */}
                  </div>
                  <div className="bg-grey-lighter flex space-x-2 p-2 -mx-3 border">
                    <Heart color="red" size={16} />
                    <span className="text-xs text-blue cursor-pointer hover:underline">
                      You, Abu Talha Khan and 139 others*
                    </span>
                  </div>
                  <div className="bg-grey-lighter flex items-center flex-between py-3 mx-1 p-2">
                    <Comment postId={post._id} user={user} />
                  </div>

                  {commentOpen && (
                    <>
                      <div className="bg-grey-lighter py-3 -mx-3 p-2">
                        <PostComments
                          postId={post._id}
                          currentUserId={user._id}
                          isPostOwner={post.owner}
                        />
                      </div>
                    </>
                  )}
                </div>
              </>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default AllPosts;
