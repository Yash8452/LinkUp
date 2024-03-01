import React from "react";
import { useAuth } from "../../context/AuthContext";
import { LogOut, Search, Settings } from "lucide-react";
import SearchBar from "../search/SearchBar";
import { Link } from "react-router-dom";

const Header = ({ user }) => {
  const { handleLogout } = useAuth();
  return (
    <>
      <header className="bg-red-500 sticky top-0 z-10">
        <div className="container mx-auto">
          <div className="flex items-center py-2 mx-24">
            <div className="w-1/2">
              <div className="flex items-center">
                <div className="cursor-pointer mr-1">
                  <Link to={`/`}>
                    <span className="text-white font-bold">LinkUp</span>
                  </Link>
                </div>
                <div className="w-full relative flex justify-end items-center">
                  <SearchBar />
                </div>
              </div>
            </div>
            <div className="w-1/2 flex items-center justify-end text-xs font-bold">
              <div className="mr-4 space-x-4 no-underline flex items-center">
                {/* <span className="text-white ml-1">
                  Welcome, {user.fullName}
                </span> */}
                <img className="h-6 w-6 rounded-full" src={user.avatar} />
              </div>
              <Link to={`/account`}>
                <div className="px-4 flex space-x-2">
                  <Settings color="white" />
                </div>
              </Link>
              <button
                className="appearance-none border-l border-grey-darkest pl-3"
                onClick={handleLogout}
              >
                <LogOut color="white" />
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
