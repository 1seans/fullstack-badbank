import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../context';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', onScroll);


    return () => window.removeEventListener('scroll', onScroll);
  }, []);



  const handleLogout = () => {
    requ.session.destory();
    setUserData(null); // Clear the user data in context
    navigate('/login'); // Redirect to the login page
  };


  return (
    <nav className={scrolled ? 'scrolled' : ''} bg="light" expand="lg">
      <div className="container-fluid">
        <div className='nav-menu'>
          <Link className={`navbar-brand ${activeLink === '/home' && 'active'}`} onClick={() => setActiveLink('/home')} to="/home">Home</Link>
          <Link className={`navbar-brand ${activeLink === '/deposit' && 'active'}`} onClick={() => setActiveLink('/deposit')} to="/deposit">Deposit</Link>
          <Link className={`navbar-brand ${activeLink === '/withdraw' && 'active'}`} onClick={() => setActiveLink('/withdraw')} to="/withdraw">Withdrawal</Link>
          <Link className={`navbar-brand ${activeLink === '/createaccount' && 'active'}`} onClick={() => setActiveLink('/createaccount')} to="/createaccount">Create Account</Link>
          <Link className={`navbar-brand ${activeLink === '/transaction' && 'active'}`} onClick={() => setActiveLink('/transaction')} to="/transaction">Transaction</Link>
          {userData ? (
            <Link className={`navbar-brand ${activeLink === '/logout' && 'active'}`} onClick={handleLogout} to='/login'>
              Logout
            </Link>
          ) : (
            <Link className={`navbar-brand ${activeLink === '/login' && 'active'}`} onClick={() => setActiveLink('/login')} to="/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;