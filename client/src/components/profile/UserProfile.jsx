import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { getCurrentUser, getUserById } from "../../api/UserRequests";
import { useParams } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { getPosts, getStats } from "../../api/DashboardRequests";
import Subscription from "../subscribe/Subscription";
import { useAuth } from "../../context/AuthContext";

const UserProfile = () => {
  const { userId } = useParams(); // Access the userId parameter from the URL
  const { user } = useAuth();

  const current = user;

  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [posts, setPosts] = useState();
  const [stats, setStats] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserById(userId);
        setUserProfile(userData.data.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }

      try {
        const postsData = (await getPosts(userId)).data;
        if (postsData.data) setPosts(postsData.data);
      } catch (error) {
        console.error("Error fetching user's posts:", error);
      }

      try {
        const statsData = (await getStats(userId)).data;
        console.log(statsData);
        if (statsData.data) setStats(statsData.data);
      } catch (error) {
        console.error("Error fetching user's stats:", error);
      }

      setLoading(false);
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>; // Render loading indicator
  }
  return (
    <>
      <Layout user={current}>
        <div>
          {/* <div className="bg-cover h-112">
          <img
            src="https://yt3.ggpht.com/HR5bTyedjHyoOd9h2zty2OAqZ3MFM6T7_R48jhdd2rQE2aSPHOD2B-ibdv-yLSTy4_AAF6XdoCk=w2560-fcrop64=1,00005a57ffffa5a8-nd-c0xffffffff-rj-k-no"
            alt="banner"
          />
        </div> */}
          <div className="-mt-1 bg-grey-lighter">
            <div className="container mx-auto">
              <div className="flex justify-between items-center py-4 ">
                <div className="flex items-center">
                  <img
                    className="w-24 h-24 rounded-full"
                    src={userProfile.avatar}
                    alt="channel_logo"
                  />
                  <div className="ml-6">
                    <div className="text-2xl font-normal flex items-center">
                      <span className="mr-2">{userProfile.fullName}</span>
                    </div>
                    {/* <p className="mt-2 font-hairline text-sm">
                      126,014 subscribers
                    </p> */}
                    <div className="flex flex-col mt-2 font-hairline justify-center items-center text-sm">
                      <table className="text-center">
                        <tbody>
                          <tr>
                            <td>posts</td>
                            <td className="px-4">followers</td>
                            <td>following</td>
                          </tr>
                          <tr>
                            <td>{stats.totalPosts}</td>
                            <td className="px-4">{stats.totalSubscribers}</td>
                            <td>9*</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="text-grey-dark">
                  {current._id && current._id != userProfile._id ? (
                    <>
                      <button className="appearance-none px-3 py-2 bg-grey-light uppercase text-grey-darker text-sm mr-4">
                        <Subscription userId={userId} />
                      </button>
                    </>
                  ) : null}
                </div>
              </div>
              <div className="px-16">
                <ul className="list-reset flex"></ul>
              </div>
            </div>
          </div>
          <div className="container mx-auto flex">
            <div className="w-3/4 mx-16 py-6">
              <div className="border-b pb-8">
                <div className="flex">
                  {Array.isArray(posts) && posts.length === 0 ? (
                    <h1>No posts yet!</h1>
                  ) : (
                    <>
                      <ul>
                        {posts?.map((post) => (
                          <li key={post._id}>
                            <div className="bg-white rounded-lg md:w-1/2 shadow-lg">
                              <img
                                src={post.thumbnail}
                                alt="Sea"
                                className="rounded-t-lg"
                              />
                              <div className="p-6">
                                <p className="mb-2 text-gray-700">
                                  {post.title}
                                </p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="w-1/4 py-6">
              <div className="border-b">
                <p className="text-grey-darker uppercase text-sm mb-6">
                  Other channels I like
                </p>
                <ul className="list-reset">
                  <li className="mb-6">
                    <span className="flex items-center mb-2">
                      <img
                        className="w-6 h-6 rounded-full"
                        src="https://yt3.ggpht.com/-E0Ej_rdX5Ic/AAAAAAAAAAI/AAAAAAAAAAA/kskO1deXSNs/s88-c-k-no-mo-rj-c0xffffff/photo.jpg"
                      />
                      <span className="ml-2">Wes Bos</span>
                    </span>
                    <button className="appearance-none p-2 bg-grey-light uppercase text-grey-darker text-xs mr-4">
                      Subscribe
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default UserProfile;
