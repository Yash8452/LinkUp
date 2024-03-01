import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { useUser } from "../../context/UserContext";
import { Heart, Image, MessageCircle, Users } from "lucide-react";
import { getPosts, getStats } from "../../api/DashboardRequests";
import { useAuth } from "../../context/AuthContext";

const AccountDetails = () => {
  const { user } = useAuth();
  console.log("user form auth", user);

  const [isOpen, setIsOpen] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [stats, setStats] = useState([]);
  const [posts, setPosts] = useState();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const fetchData = await getStats();
        setStats(fetchData.data);
        console.log("stats", stats);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
      try {
        const postsData = (await getPosts(user._id)).data;
        if (postsData.data) setPosts(postsData.data);
      } catch (error) {
        console.error("Error fetching user's posts:", error);
      }
    };
    fetchStats();
  }, []);
  const handleEdit = () => {};
  const handlePassword = () => {};
  return (
    <Layout user={user}>
      <>
        <div className="md:flex  ">
          <>
            <div className="flex flex-col">
              <div className="flex justify-between items-center bg-gray-100 py-4">
                <div className="flex items-center p-1">
                  <img
                    className="w-12 h-12 md:w-24 md:h-24  rounded-full"
                    src={user.avatar}
                    alt="channel_logo"
                  />
                  <div className="ml-6">
                    <div className=" font-normal sm:text-lg flex flex-col items-center">
                      <span className="mr-2">{user.username}</span>
                      <span className="mr-2 font-thin">{user.fullName}</span>
                    </div>
                  </div>
                </div>
              </div>
              <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <div className="relative bg-white pt-0 px-4 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
                  <dt>
                    <div className="absolute bg-red-500 rounded-md p-3">
                      {/* Heroicon name: outline/users */}
                      <Users color="white" />
                    </div>
                    <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                      Total Subscribers
                    </p>
                  </dt>
                  <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                    <p className="text-2xl font-semibold text-gray-900">
                      {stats.totalSubscribers}
                    </p>
                  </dd>
                </div>
                <div className="relative bg-white pt-5 px-4 pb-2 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
                  <dt>
                    <div className="absolute bg-red-500 rounded-md p-3">
                      {/* Heroicon name: outline/users */}
                      <Image color="white" />
                    </div>
                    <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                      Total Posts
                    </p>
                  </dt>
                  <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                    <p className="text-2xl font-semibold text-gray-900">
                      {stats.totalPosts}
                    </p>
                  </dd>
                </div>
                <div className="relative bg-white pt-5 px-4 pb-2 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
                  <dt>
                    <div className="absolute bg-red-500 rounded-md p-3">
                      {/* Heroicon name: outline/users */}
                      <Heart color="white" />
                    </div>
                    <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                      Total Likes
                    </p>
                  </dt>
                  <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                    <p className="text-2xl font-semibold text-gray-900">
                      {stats.totalLikes}
                    </p>
                  </dd>
                </div>
              </dl>
              <button className="mt-4 text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                Acccount settings
              </button>
              <div>
                <form className="m-4 center mx-auto">
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="email"
                      name="floating_email"
                      id="floating_email"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
                      placeholder=""
                      required
                    />
                    <label
                      htmlFor="floating_email"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Full Name
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="email"
                      name="floating_email"
                      id="floating_email"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
                      placeholder=""
                      required
                    />
                    <label
                      htmlFor="floating_email"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Email address
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Update the account
                  </button>
                </form>
                <form className="m-4 center mx-auto">
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="password"
                      name="floating_email"
                      id="floating_email"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
                      placeholder=""
                      required
                      autoComplete="new-password"
                    />
                    <label
                      htmlFor="floating_email"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Old Password
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="password"
                      name="floating_email"
                      id="floating_email"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
                      placeholder=""
                      required
                      autoComplete="new-password"
                    />
                    <label
                      htmlFor="floating_email"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      New Password
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Change Password
                  </button>
                </form>
              </div>
              <div className="border-b pb-8">
                <div className="flex">
                  {Array.isArray(posts) && posts.length === 0 ? (
                    <h1>No posts yet!</h1>
                  ) : (
                    <>
                      <ul>
                        {posts?.map((post) => (
                          <li key={post._id}>
                            <div className="w-[300px] h-[300px] flex flex-col justify-center  bg-white rounded-lg  shadow-lg">
                              <img 
                                src={post.thumbnail}
                                alt="Sea"
                                className="p-2 h-48 w-full rounded-t-lg"
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
          </>
        </div>
      </>
    </Layout>
  );
};

export default AccountDetails;

// <div className="container mx-auto">
// <h1 className="text-3xl font-bold mb-4">User Dashboard</h1>
// {user && (
//   <div>
//     <h2 className="text-xl font-semibold mb-2">User Details</h2>
//     <div className="mb-4">
//       <p><strong>Name:</strong> {user.name}</p>
//       <p><strong>Email:</strong> {user.email}</p>
//       {/* Add more user details as needed */}
//     </div>
//     {editMode ? (
//       <div>
//         <h2 className="text-xl font-semibold mb-2">Edit User Details</h2>
//         <input
//           type="text"
//           value={newUserData.name}
//           onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
//           className="border border-gray-300 rounded px-3 py-2 mb-2 block w-full"
//           placeholder="Name"
//         />
//         <input
//           type="email"
//           value={newUserData.email}
//           onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
//           className="border border-gray-300 rounded px-3 py-2 mb-2 block w-full"
//           placeholder="Email"
//         />
//         {/* Add more fields for editing */}
//         <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Save</button>
//       </div>
//     ) : (
//       <button onClick={handleEdit} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Edit</button>
//     )}
//     <div>
//       <h2 className="text-xl font-semibold mb-2">Change Password</h2>
//       <input
//         type="password"
//         value={passwordData.currentPassword}
//         onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
//         className="border border-gray-300 rounded px-3 py-2 mb-2 block w-full"
//         placeholder="Current Password"
//       />
//       <input
//         type="password"
//         value={passwordData.newPassword}
//         onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
//         className="border border-gray-300 rounded px-3 py-2 mb-2 block w-full"
//         placeholder="New Password"
//       />
//       <input
//         type="password"
//         value={passwordData.confirmPassword}
//         onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
//         className="border border-gray-300 rounded px-3 py-2 mb-2 block w-full"
//         placeholder="Confirm New Password"
//       />
//       <button onClick={handleChangePassword} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Change Password</button>
//     </div>
//     <div>
//       <h2 className="text-xl font-semibold mb-2">All Posts</h2>
//       <ul>
//         {posts.map(post => (
//           <li key={post.id}>{post.title}</li>
//           // Display other post details as needed
//         ))}
//       </ul>
//     </div>
//   </div>
// )}
// </div>
