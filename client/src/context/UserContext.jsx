import React, { createContext, useContext, useEffect, useState } from "react";
import * as userApi from "../api/UserRequests"; // Import user-related API functions
import { logoutUser } from "../helper/authHelper";
import { useNavigate } from "react-router-dom";

// Step 1: Create the Context
const UserContext = createContext();

// Step 2: Create a Provider Component
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const[user,setUser] = useState(null)
  const navigate = useNavigate();
  

  // Step 3: Implement State Management
  // useEffect(() => {
  //   const fetchCurrentUser = async () => {
  //     try {
  //       const response = await userApi.getCurrentUser();
  //       console.log("FEtch user",response)
  //       setCurrentUser(response);
  //     } catch (error) {
  //       console.error('Error fetching current user:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchCurrentUser();
  // }, []);

  const fetchCurrentUser = async () => {
    try {
      const response = await userApi.getCurrentUser();
      console.log("FEtch user", response);
      setCurrentUser(response);
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };
  const updateUserDetails = async (formData) => {
    try {
      const response = await userApi.updateUserDetails(formData);
      setCurrentUser(response.data.updatedUser);
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  const changePassword = async (formData) => {
    try {
      await userApi.changePassword(formData);
      // Optionally handle success
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  const getAllUsers = async () => {
    try {
      const response = await userApi.getAllUser();
      return response.data.users;
    } catch (error) {
      console.error("Error fetching all users:", error);
      return [];
    }
  };
  const getUserById = async(userId)=>{
    try {
      const response = await userApi.getUserById(userId)
      return response.data
    } catch (error) {
      console.error("Error fetching user by Id",error)
    }
  }

  const logOut = async () => {
    try {
      await userApi.logOut();
      setCurrentUser(null);
      logoutUser();
      navigate("/auth");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Step 4: Export the Context
  return (
    <UserContext.Provider
      value={{
        user,
        currentUser,
        loading,
        updateUserDetails,
        fetchCurrentUser,
        changePassword,
        getAllUsers,
        getUserById,
        logOut,

      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Step 5: Create a custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};
