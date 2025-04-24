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
      <div className="container-fluid ps-5" style={{ marginLeft: '80px', backgroundColor: '#151515' }}>
        <NavLink className="navbar-brand me-5" style={{ marginRight: '400px' }} to="/home">
          <img src={Logo} alt="Logo" style={{ height: '55px' }} /> 
        </NavLink>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav d-flex gap-4">
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
                <FaUserCircle size={20} /> My Space
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
