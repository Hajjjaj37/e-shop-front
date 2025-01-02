import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styledashbord.css';
import { getCookie } from '../../../utils/Cookies';
import { useDispatch } from 'react-redux';


function Navbarproduit() {
  const [activeLink, setActiveLink] = useState();
  const navigate = useNavigate();
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);
  const [token, setToken] = useState();
  const [user, setUser] = useState();
  const toggleSidebar = () => {
    setIsSidebarClosed(!isSidebarClosed); // Toggle sidebar state
    if (!isSidebarClosed) {
      document.getElementsByClassName('content')[1].style.left = "55px";
      document.getElementsByClassName('content')[1].style.width = "calc(100% - 25px)";
    } else {
      document.getElementsByClassName('content')[1].style.left = "230px";
      document.getElementsByClassName('content')[1].style.width = "calc(100% - 230px)";
    }
  };
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = savedTheme === 'dark';
    setIsDarkTheme(prefersDark);
    document.body.classList.toggle('dark', prefersDark);

    // Event listener for theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.checked = prefersDark;
    themeToggle.addEventListener('change', handleThemeChange);

    // Cleanup event listener on component unmount
    return () => {
      themeToggle.removeEventListener('change', handleThemeChange);
    };
  }, []);
  const handleThemeChange = (event) => {
    const isDark = event.target.checked;
    setIsDarkTheme(isDark);
    document.body.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  };

  const dispatch = useDispatch();

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName); // Set the clicked link as active
  };

  const handleLogout = async () => {
    await fetch("http://127.0.0.1:8000/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });
    document.cookie = "token=null; path=/; Secure;";
    document.cookie = "role=null;"
    dispatch({ type: "SET_ROLE", payload: "user" })
    navigate("/")
  }

  const Afficher = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/user", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setUser(data.image)
  };

  useEffect(() => {
    const token = getCookie("token");
    setToken(token);
    Afficher();
  }, [token])
  return (
    <div>
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarClosed ? 'close' : ''}`}>
        <a href="#" className="logo">
          <i className="bx fa-solid fa-house"></i>
          <div className="logo-name"><span>stylish</span>door</div>
        </a>
        <ul className={`side-menu ${isSidebarClosed ? 'p-0' : ''}`}>
          <li className={activeLink === 'dashboard' ? 'active' : ''}><NavLink to="/" onClick={() => handleLinkClick("dashboard")}><i className='bx fa-brands fa-windows'></i>{!isSidebarClosed && 'Dashboard' }</NavLink></li>
          <li className={activeLink === 'categorie' ? 'active' : ''}><NavLink to="/categorie" onClick={() => handleLinkClick("categorie")}><i className='bx fa-solid fa-tags'></i>{!isSidebarClosed && 'categorie' }</NavLink></li>
          <li className={activeLink === 'analytics' ? 'active' : ''}><NavLink to="r/" onClick={() => handleLinkClick("analytics")}><i className='bx fa-solid fa-chart-line'></i>Analytics</NavLink></li>
          <li className={activeLink === 'commandes' ? 'active' : ''}><NavLink to="/commandes" onClick={() => handleLinkClick("commandes")}><i className='bx fa-solid fa-cart-shopping'></i>Commandes</NavLink></li>
          <li className={activeLink === 'tickets' ? 'active' : ''}><NavLink to="/addproduct" onClick={() => handleLinkClick("tickets")}><i className='bx fa-solid fa-ticket'></i>{!isSidebarClosed && 'produit' }</NavLink></li>
          <li className={activeLink === 'users' ? 'active' : ''}><NavLink to="/userproduit" onClick={() => handleLinkClick("users")}><i className='bx fa-solid fa-user'></i>{!isSidebarClosed && 'Users' }</NavLink></li>
          <li className={activeLink === 'settings' ? 'active' : ''}><NavLink to="/settings" onClick={() => handleLinkClick("settings")}><i className='bx fa-solid fa-gears' ></i>{!isSidebarClosed && 'Settings' }</NavLink></li>
        </ul>
        <ul className={`side-menu ${isSidebarClosed ? 'p-0' : ''}`}>

          <li>
            <button onClick={handleLogout} className="logout">
              <i className='bx fa-solid fa-right-from-bracket'></i>
              {!isSidebarClosed && 'Logout'}
            </button>
          </li>
        </ul>
      </div>
      {/* End of Sidebar */}

      {/* Main Content */}
      <div className="content">
        {/* Navbar */}
        <nav>
          <i className='bx fa-solid fa-bars' onClick={toggleSidebar}></i>
          <form action="#">
            <div className="form-input">
              <input type="search" placeholder="Search..." />
              <button className="search-btn" type="submit"><i className='bx fa-solid fa-magnifying-glass'></i></button>
            </div>
          </form>
          <input type="checkbox" id="theme-toggle" hidden />
          <label htmlFor="theme-toggle" className="theme-toggle"></label>
          <a href="#" className="notif">
            <i className='bx fa-solid fa-message'></i>
            <span className="count">12</span>
          </a>
          <a href="#" className="profile">
            <img src={`http://localhost:8000/profil/${user}`} alt="profile" />
          </a>
        </nav>
        {/* End of Navbar */}
      </div>
    </div>
  )
}

export default Navbarproduit
