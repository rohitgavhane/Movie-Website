import React from 'react';
import { NavLink } from 'react-router-dom';
import { GoHomeFill } from "react-icons/go";
import { MdLocalMovies } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";

import Logo from '../assets/Logo.png'; // 🟡 Adjust the path as needed
function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#151515', borderBottom: '1.8px solid #3C0753' }}>
      <div className="container-fluid px-4" style={{ backgroundColor: '#151515' }}>
        
        {/* Logo */}
        <NavLink className="navbar-brand" to="/home">
          <img src={Logo} alt="Logo" style={{ height: '50px' }} />
        </NavLink>

        {/* Toggle button for mobile */}
        <button className="navbar-toggler text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" style={{ filter: 'invert(1)' }}></span>
        </button>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav d-flex align-items-center gap-3">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center gap-2 ${isActive ? 'text-white' : 'text-secondary'}`
                }
                to="/home"
              >
                <GoHomeFill size={20} /> Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center gap-2 ${isActive ? 'text-white' : 'text-secondary'}`
                }
                to="/movies"
              >
                <MdLocalMovies size={20} /> Movies
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center gap-2 ${isActive ? 'text-white' : 'text-secondary'}`
                }
                to="/categories"
              >
                <BiSolidCategory size={20} /> Movie News
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center gap-2 ${isActive ? 'text-white' : 'text-secondary'}`
                }
                to="/profile"
              >
                <FaUserCircle size={20} /> Blog
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}


export default Navbar;
