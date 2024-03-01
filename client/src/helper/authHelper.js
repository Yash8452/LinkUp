
// Function to store user data in local storage
export const loginUser = (userData) => {
  localStorage.setItem('userData', JSON.stringify(userData));
};

// Function to retrieve user data from local storage
export const getUser = () => {
  const userData = localStorage.getItem('userData');
  // console.log("getuser",JSON.parse(userData))
  return userData ? JSON.parse(userData) : null;
};

// Function to clear user data from local storage
export const logoutUser = () => {
  localStorage.removeItem('userData');
};
