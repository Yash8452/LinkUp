import React from "react";
import { Github, MailCheck, Rss, User } from "lucide-react";

const Profile = ({ user }) => {
  return (
    <>
      <div >
        <div className="relative bg-white mr-4 p-4 rounded-lg shadow-2xl">
          <div>Intro</div>
          <div className="text-center border-b py-4 text-xs">
            Life is simple
          </div>
          {user ? (
            <>
              <ul className="list-reset text-xs pt-4">
                <li className="flex items-center py-1 space-x-4">
                  <User />
                  <span>{user._id}</span>
                </li>
                <li className="flex items-center py-1 space-x-4">
                  <User />
                  <span>{user.username}</span>
                </li>
                <li className="flex items-center py-1 space-x-4">
                  <MailCheck />
                  <span>{user.email}</span>
                </li>
                <li className="flex items-center py-1 space-x-4">
                  <Rss />
                  <span>Posts - 99</span>
                </li>
                <li className="flex items-center py-1 space-x-4">
                  <User />
                  <span>Followers - 99</span>
                </li>
                <li className="flex items-center py-1 space-x-4">
                  <User />
                  <span>Following - 99</span>
                </li>
              </ul>
              <div className="flex flex-col items-center justify-center border-t py-3">
                <a
                  href=""
                  target="_blank"
                  className="appearance-none p-2 border text-xs text-grey-darker rounded hover:border-black mb-2"
                >
                  <Github />
                </a>
              </div>
            </>
          ) : (
            <>LOADING...</>
          )}
        </div>
        <div className="rounded-lg shadow-2xl bg-white mt-4 shadow mr-4">
          <div className="p-4">
            <h5 className="font-normal hover:underline text-base">
              Featured Albums
            </h5>
          </div>
        </div>
        <div className="rounded-lg shadow-2xl bg-white mt-4 shadow mr-4">
          <div className="relative p-4">
            <h5 className="font-normal hover:underline text-base">
              Did You Know
            </h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
