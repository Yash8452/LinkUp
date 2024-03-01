// import React, { useEffect, useState } from "react";
// import { getAllUsers } from "../api/AuthRequests";

// const Test = () => {
//   const [users, setUsers] = useState([]);
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const userData = await getAllUsers();
//         setUsers(userData);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };

//     fetchUsers();
//   }, []);
//   return (
//     <>
//       <h1 className="bg-red-400 text-center">No Of Users : {users.length} </h1>
//     </>
//   );
// };

// export default Test;

// import { Camera } from 'lucide-react';

// // Usage
// const App = () => {
//   return <Camera color="red" size={48} />;
// };

// export default App;
