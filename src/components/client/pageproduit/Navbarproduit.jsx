import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { getCookie } from '../../../utils/Cookies';
import ThemeSwitcher from '../../ThemeSwitch';
import { useDispatch, useSelector } from 'react-redux';


function Navbarproduit() {
    const [token, setToken] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const cartcount = useSelector((state) => state.cart.length);
    const wisheCount = useSelector((state) => state.wishe.length);
    const [isScrolled, setIsScrolled] = useState(false);

    // useEffect(() => {
    //     const handleScroll = () => {
    //         setIsScrolled(window.scrollY >= 10);
    //     };

    //     window.addEventListener('scroll', handleScroll);
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);

    const logout = async () => {
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


    useEffect(() => {
        const token = getCookie("token");
        setToken(token);
    }, [token])


    return (
        <header className={`header z-99999 py-2 ${isScrolled ? 'position-fixed' : ''}`}>
            <nav className="navbar  navbar-expand-lg navbar-light w-100">
                <div id="navbar" className=''>
                    <a className="d-flex align-items-center" href="#">
                        <img src="/imagess/logo.png" alt="Logo" className="logo me-2" />
                    </a>

                    <div id="menu-bar">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                        </svg>
                    </div>
                    <div id="navbar-links">
                        <ul className='d-flex mb-0 align-items-center justify-content-center'>
                            <li><NavLink to="/"  >Home</NavLink></li>
                            <li><NavLink to="/products" >Products</NavLink></li>
                            <li><NavLink to="/profile">Profile</NavLink></li>
                            <li><NavLink to="/reclamation">reclamation</NavLink></li>
                            <li></li>
                        </ul>
                        <div className="collection-tools" id="navbar-tools">
                            <ThemeSwitcher />
                            <NavLink to="/panier" className="cart-link ms-5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bag" viewBox="0 0 16 16">
                                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
                                </svg>
                                <span>{cartcount}</span>
                            </NavLink>
                            <NavLink to="/wish" className="wishlist-link" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                                </svg>
                                <span>{wisheCount}</span>
                            </NavLink>
                            <NavLink to="/commandes" className="wishlist-link" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cart-check" viewBox="0 0 16 16">
                                    <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z" />
                                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                                </svg>
                                <span className='bg-transparent'></span>
                            </NavLink>

                            <svg onClick={logout} xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" className="bi bi-box-arrow-right ms-2 " style={{ cursor: 'pointer' }} viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                                <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                            </svg>

                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbarproduit
