import React, { useEffect, useState } from "react";

import Header from "./header/Header";
import { getCurrentUser } from "../api/UserRequests";
import Profile from "./profile/Profile";
import UploadPost from "./post/UploadPost";
import AllPosts from "./post/AllPosts";
import Layout from "./layout/Layout";
import RightContainer from "./rightContainer/RightContainer";
import { useAuth } from "../context/AuthContext";
import { Toaster } from "react-hot-toast";

const HomeContainer = () => {
  const { user } = useAuth();
  // console.log("user in home", user);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]); // Run only when user changes

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Layout user={user}>
        <div className="flex justify-center mx-auto">
          <Toaster />
          <div className="w-2/12  fixed left-12 ">
            {/* <Profile user={user} /> */}
          </div>
          <div className="w-full">
            <UploadPost user={user} />
            <AllPosts user={user} />
          </div>
          {/* <div className="w-2/12 h-[90vh] fixed right-12 bg-white p-4 rounded-lg shadow-2xl">
            
          </div> 
          */}
        </div>
      </Layout>
    </>
  );
};

export default HomeContainer;
