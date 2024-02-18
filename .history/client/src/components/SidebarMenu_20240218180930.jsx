import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../css/SidebarMenu.css';
import poweruplogo from "../assets/images/poweruplogo.png";

const navigationItems = [
  { to: '/home', icon: 'bi-house', label: 'Home' },
  { to: '/articles', icon: 'bi-file-richtext-fill', label: 'Articles' },
  { to: '/bmi-calculator', icon: 'bi-table', label: 'BMI Calculator' },
  { to: '/bmr-calculator', icon: 'bi-table', label: 'BMR Calculator' },
  { to: '/tdee-calculator', icon: 'bi-table', label: 'TDEE Calculator' },
  { to: '/calories-calculator', icon: 'bi-table', label: 'Calories Calculator' },
];

const SidebarMenu = () => {
  const navigate = useNavigate();
  const userObject = JSON.parse(localStorage.getItem("currentUser"));
  console.log(userObject);
  const logout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const renderNavItem = ({ to, icon, label }) => (
    <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0" key={to}>
      <NavLink to={to} className={({ isActive }) => isActive ? "nav-link text-white fs-5 navLinkActive" : "nav-link text-white fs-5"} aria-current="page">
        <i className={`bi ${icon}`}></i>
        <span className="ms-3 d-none d-sm-inline">{label}</span>
      </NavLink>
    </li>
  );

  return (
    <div className="container-fluid">
      <div className="column">
        <div className="custom-bg-color custom-border bg-gradient col-auto col-md-2 min-vh-100 d-flex justify-content-between flex-column">
          <div>
            <img alt="PowerUp Logo" className="img-fluid p-3" src={poweruplogo} />
            <hr className="text-secondary d-none d-sm-block" />
            <ul className="nav nav-pills flex-column mt-3 mt-sm-0">
              {navigationItems.map(renderNavItem)}
            </ul>
          </div>
          <UserMenu userObject={userObject} onLogout={logout} />
        </div>
      </div>
    </div>
  );
};

export default SidebarMenu;

const UserMenu = ({ userObject, onLogout }) => {
  const navigate = useNavigate();
  const username = userObject ? userObject.username : 'User';

  const handleProfileClick = (path) => {
    navigate(path);
  };

  // Prevent default action to avoid navigating to "#" which scrolls the page to the top
  const preventDefault = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bg-light d-flex justify-content-between flex-column dropdown open">
      <a 
        href="#" 
        className="text-decoration-none text-dark dropdown-toggle p-3" 
        id="triggerId" 
        data-bs-toggle="dropdown" 
        aria-haspopup="true" 
        aria-expanded="false"
        onClick={preventDefault} // Add this to prevent default action
      >
        <i className="bi bi-person-circle"></i>
        <span className="ms-2 d-none d-sm-inline">{username}</span>
      </a>
      <div className="dropdown-menu" aria-labelledby="triggerId">
        <button onClick={() => handleProfileClick(`/profile/${username}`)} className="dropdown-item">Profile</button>
        <button onClick={() => handleProfileClick(`/settings/${username}`)} className="dropdown-item">Settings</button>
        <button onClick={onLogout} className="dropdown-item">Log out</button>
      </div>
    </div>
  );
};
