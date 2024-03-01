import React from "react";

import "./App.css";
import { Auth} from "./components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext.jsx";
import { PostsProvider } from "./context/PostsContext.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { LikesProvider } from "./context/LikesContext.jsx";
import { CommentsProvider } from "./context/CommentsContext.jsx";
import HomeContainer from "./components/HomeContainer.jsx";
import UserProfile from "./components/profile/UserProfile.jsx";
import AccountDetails from "./components/profile/AccountDetails.jsx";

function App() {
  return (
    // <div className="h-screen w-full flex flex-wrap content-between bg-gray-200">
    //   <div className="w-full block">
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <PostsProvider>
            <LikesProvider>
              <CommentsProvider>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <PrivateRoute>
                        <HomeContainer />
                      </PrivateRoute>
                    }
                  />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/user-dashboard/:userId" element={<UserProfile />} />
                  <Route path="/account" element={<AccountDetails />} />
                </Routes>
              </CommentsProvider>
            </LikesProvider>
          </PostsProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
    //   </div>
    // </div>
  );
}

export default App;
