import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { UsersRound } from "lucide-react";

const Auth = () => {
  const { handleLogin, handleSignup, error } = useAuth();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    avatar: null,
  });
  const [isLoginForm, setIsLoginForm] = useState(true); // Initially, render login form

  const handleInputChange = (e, formType) => {
    const { name, value } = e.target;
    if (formType === "login") {
      setLoginData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setSignupData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    // const file = e.target.file[0];
    // console.log("file",file)
    setSignupData((prevState) => ({
      ...prevState,
      avatar: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoginForm) {
      handleLogin(loginData);
    } else {
      
      const formDataToSend = new FormData();
      formDataToSend.append('fullName', signupData.fullName);
      formDataToSend.append('email', signupData.email);
      formDataToSend.append('username', signupData.username);
      formDataToSend.append('password', signupData.password);
      formDataToSend.append('avatar', signupData.avatar);
      handleSignup(formDataToSend);
    }
  };

  return (
    <>
      <div className="mx-auto w-full h-screen p-4 bg-red-500 flex">
        <div className="flex mx-auto w-full ">
          <div className="w-2/3  flex justify-center space-x-6 items-center bg-red-500">
            <span className="text-white font-bold text-9xl">LinkUp</span>
            <UsersRound color="white" size={120} />
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className=" bg-white rounded-lg p-4   shadow-2xl">
              <form onSubmit={handleSubmit}>
                {!isLoginForm && (
                  <>
                    <div className="mb-2">
                      <label
                        htmlFor="fullname"
                        className="block mb-2 text-sm font-medium text-gray-600"
                      >
                        Fullname
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={signupData.fullName}
                        onChange={(e) => handleInputChange(e, "signup")}
                        className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                      />
                    </div>
                    <div className="mb-2">
                      <label
                        htmlFor="username"
                        className="block mb-2 text-sm font-medium text-gray-600"
                      >
                        Username
                      </label>
                      <input
                        type="text"
                        name="username"
                        value={signupData.username}
                        onChange={(e) => handleInputChange(e, "signup")}
                        className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                      />
                    </div>
                    <div className="mb-2">
                      <label
                        htmlFor="Profile Pic"
                        className="block mb-2 text-sm font-medium text-gray-600"
                      >
                        Profile Image
                      </label>
                      <input
                        type="file"
                        accept="images/*"
                        id="avatar"
                        name="avatar"
                        onChange={handleFileChange}
                        className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                      />
                    </div>
                  </>
                )}
                <div className="mb-2">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={isLoginForm ? loginData.email : signupData.email}
                    onChange={(e) =>
                      handleInputChange(e, isLoginForm ? "login" : "signup")
                    }
                    className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                  />
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-600"
                  >
                    Password
                  </label>
                  <input
                    type="text"
                    name="password"
                    value={
                      isLoginForm ? loginData.password : signupData.password
                    }
                    onChange={(e) =>
                      handleInputChange(e, isLoginForm ? "login" : "signup")
                    }
                    className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full p-3 mt-4 bg-red-500 text-white rounded shadow"
                >
                  {isLoginForm ? "LogIn" : "SignUp"}
                </button>
                {error && <p className="text-red-500 text-center">{error}</p>}
              </form>
              <div className="flex justify-between w-full p-6 text-sm border-t">
                <p className="font-medium text-gray-500">
                  {" "}
                  {isLoginForm
                    ? "Don't have an account?"
                    : "Already have an account?"}
                  <span
                    className="text-red-500 cursor-pointer"
                    onClick={() => setIsLoginForm(!isLoginForm)}
                  >
                    {" "}
                    {isLoginForm ? "Sign up" : "Login"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
