import { Search } from "lucide-react";
import React, { useState } from "react";
import { getAllUser, getUsers } from "../../api/UserRequests";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async (value) => {
    try {
      const response = await getAllUser();

      const result = response.data.data.filter((data) => {
        return value && data.username.includes(value);
      });

      setUsers(result);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (value) => {
    setSearchTerm(value);
    fetchData(value);
  };

  return (
    <>
      <div className="relative">
        <div className="flex items-center justify-end">
          <input
            className="appearance-none w-full h-6 py-1 px-2 rounded text-sm border"
            value={searchTerm}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Search"
            type="text"
          />

          <span className="flex items-center bg-grey-lightest hover:bg-grey-lighter absolute pin-r pin-y px-4 rounded cursor-pointer">
            <Search size={16} strokeWidth={1} absoluteStrokeWidth />
          </span>
        </div>
        {error && searchTerm && <p>{error}</p>}{" "}
        {/* Display error only when there's an error and a search term */}
        <ul className="z-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute top-full mt-1">
          {
            users.length > 0
              ? users.map((user) => (
                  <Link to={`/user-dashboard/${user._id}`}>
                    <li
                      key={user._id}
                      className="p-2 flex justify-start space-x-2 items-center hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <img
                        src={user.avatar}
                        alt={user.username}
                        className="rounded-full w-10 h-10 bg-cover"
                      />
                      <h4 className="font-light text-sm">{user.username}</h4>
                    </li>
                  </Link>
                ))
              : searchTerm && (
                  <li className="font-light text-sm p-2">No users found</li>
                ) // Only display message when searchTerm is not empty
          }
        </ul>
      </div>
    </>
  );
};

export default SearchBar;
