import React, { useState } from "react";
import { usePosts } from "../../context/PostsContext";

const UploadPost = ({ user }) => {
  const [postData, setPostData] = useState({
    title: "",
    thumbnail: null,
    isPublished: true,
  });
  const { addPost } = usePosts();

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };
  //image preview
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    //console.log(file);
    setPostData((prevState) => ({
      ...prevState,
      thumbnail: file,
    }));
    setSelectedFile(file);
    // Read the file and create a data URL representation
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", postData.title);
      formDataToSend.append("thumbnail", postData.thumbnail);
      formDataToSend.append("isPublished", postData.isPublished);
      await addPost(formDataToSend);
      // Clear form data and image preview after successful upload
      setPostData({
        title: "",
        thumbnail: null,
        isPublished: true,
      });
      setImagePreview(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-white shadow">
        <form onSubmit={handleSubmit}>
          <div className="px-3 pt-4 pb-2">
            <div className="flex items-center border-b pb-3">
              <img
                alt={user.fullName}
                className="block w-10 h-10 rounded-full"
                src={user.avatar}
              />
              <input
                placeholder="What's on your mind?"
                className="flex h-10 w-full border-none px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none  disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                id="title"
                name="title"
                value={postData.title}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="px-3 pb-2 border-b flex items-center list-reset font-bold text-xs text-grey-lighter">
            {selectedFile != null ? (
              <>
                <div>
                  <img
                    className="object-cover"
                    src={imagePreview}
                    alt="Preview"
                  />
                </div>
                <button
                  onClick={() => {
                    setSelectedFile(null);
                    setImagePreview(null);
                  }}
                  className="p-2 text-gray-600 rounded-full cursor-pointer"
                >
                  Close
                </button>
              </>
            ) : (
              <>
                <label className="p-2 text-gray-600   rounded-full mr-4 cursor-pointer ">
                  Photo/Video
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                <label className="p-2 text-gray-600 rounded-full mr-4 cursor-not-allowed opacity-50">
                  Mood/Activity*
                  <input type="file" className="hidden" disabled />
                </label>
              </>
            )}
          </div>
          <div className="flex justify-end p-3 text-xs">
            <select
              id="status"
              value={postData.isPublished ? true : false}
              onChange={handleChange}
              className="border p-2 rounded mr-4 flex items-center text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
            >
              <option value="true">Public</option>
              <option value="false">Private</option>
            </select>
            <button
              type="submit"
              className="bg-red-500 py-2 px-6 text-white rounded hover:bg-blue-light"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UploadPost;
