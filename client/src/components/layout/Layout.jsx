import React from "react";
import Header from "../header/Header";

const Layout = ({ children, user }) => {
    
  return (
    <div className="font-sans leading-none bg-grey-lighter mb-8">
      <Header user={user} />
      <div className="container mx-auto">
        <div className="ml-10 mr-10">
          <div className="flex mt-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
