import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context';

const Logout = () => {
  const navigate = useNavigate();
  const { setUserData } = useContext(UserContext);

  const handleLogout = () => {
    // Remove the JWT token from localStorage
    localStorage.removeItem('jwt');

    // Clear the user data from context
    setUserData(null);

    // Redirect to the login page
    navigate('/login');
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
