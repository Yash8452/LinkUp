// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import { loginUser, logoutUser, getUser } from "../helper/authHelper.js";
import { login, signup } from "../api/AuthRequests.js";
import { useNavigate } from "react-router-dom";
import { logOut } from "../api/UserRequests.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // When component mounts, try to retrieve user data from storage
        const storedUser = await getUser();
        // console.log("Stored User", storedUser);
        if (
          storedUser &&
          storedUser.data &&
          storedUser.data.data &&
          storedUser.data.data.user
        ) {
          setUser(storedUser.data.data.user);
        }
      } catch (err) {
        console.log("Error retrieving user data: " + err.message);
      }
    };

    fetchUserData();
  }, []);

  const handleLogin = async (loginData) => {
    try {
      const response = await login(loginData);
      loginUser(response);
      setUser(response);
      navigate("/");
    } catch (error) {
      console.error("Login Error:", error);
      setError(error.message);
    }
  };

  const handleSignup = async (signupData) => {
    try {
      const response = await signup(signupData);
      setUser(response);
      navigate("/");
    } catch (error) {
      console.error("Signup Error:", error);
      setError(error.message);
    }
  };

  const handleLogout = async () => {
    await logOut();
    logoutUser();
    setUser(null);
    navigate("/auth");
  };

  return (
    <AuthContext.Provider
      value={{ user, error, handleLogin, handleSignup, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
