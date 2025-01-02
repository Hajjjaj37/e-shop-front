import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavLink} from 'react-router-dom';
import './Navbar.css'; // Import custom styles for additional customization
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`header ${isScrolled ? 'sticky-top' : 'position-absolute'}`}>
      <nav className="navbar navbar-expand-lg navbar-light w-100">
        <div className="container">
          {/* Logo Section */}
          <a className="d-flex align-items-center" href="#">
            <img src="/imagess/logo.png" alt="Logo" className="logo me-2" />
          </a>

          {/* Toggler Button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="d-flex flex-column flex-lg-row align-items-center gap-3 w-100">
              {/* Navbar Links */}
              <ul className="navbar-nav gap-4 mx-auto mb-3 mb-lg-0">
                <li className="nav-item m-0 text-center">
                  <NavLink to="/page" className="nav-link fw-medium text-center" >Home</NavLink>
                </li>
                <li className="nav-item m-0 text-center">
                  <NavLink to="/pageproduit" className="nav-link fw-medium text-center" >Shop</NavLink>
                </li>
                <li className="nav-item m-0 text-center">
                  <NavLink to="/" className="nav-link fw-medium text-center" href="#">Categories</NavLink>
                </li>
                <li className="nav-item m-0 text-center">
                  <NavLink to="/" className="nav-link fw-medium text-center" href="#">Deals</NavLink>
                </li>
                <li className="nav-item m-0 text-center">
                  <NavLink to="/" className="nav-link fw-medium text-center" href="#">Blog</NavLink>
                </li>
                <li className="nav-item m-0 text-center">
                  <NavLink to="/" className="nav-link fw-medium text-center" href="#">Contact</NavLink>
                </li>
              </ul>
              <NavLink to="/loginpage" className="btn btn-primary text-white grayscale bg-brown fw-medium px-5" href="#">Login</NavLink>
            </div>
          </div>

        </div>
      </nav>
    </header>
  );
}

export default Navbar;
