
import { useEffect, useState } from 'react';
import './App.css';
import { getCookie } from './utils/Cookies';
import User from './pages/user';
import Admin from './pages/admin';
import { useDispatch, useSelector } from 'react-redux';
import Client from './components/user/Clients/Client';
import ClientWeb from './pages/Client';
import { Toaster } from 'react-hot-toast';
import Loading from './components/Loading';

function App() {

  const role = useSelector((state) => state.role)

  const dispatch = useDispatch()
  const getUser = async () => {
    try {
      const token = getCookie("token"); // Ensure you specify the correct cookie key
      const response = await fetch("http://localhost:8000/api/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        document.cookie = `role=${data.roles}; path=/; secure=true`;
        console.log(response);
        dispatch({type: "SET_USER_ID", payload: data.id})
        dispatch({ type: "SET_ROLE", payload: data.roles })
      } else {
        console.error("Failed to fetch user role");
        dispatch({ type: "SET_ROLE", payload: "user" })

      }
    } catch (error) {
      console.error("Error fetching user:", error);
      dispatch({ type: "SET_ROLE", payload: "user" })
    }
  };

  useEffect(() => {
    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = savedTheme === 'dark';
    
    document.body.classList.toggle('dark', prefersDark);

   

   
  }, []);
 


  useEffect(() => {
    getUser();
    console.log(role);
  }, [role]); // Dependency array is empty to avoid infinite loop

  if (role == "") {
    return <Loading/>
  }
  return (
    <>
      <Toaster />
      {role === "user" && (<User></User>)}
      {role === "admin" && (<Admin />)}
      {role === "client" && (<ClientWeb />)}
    </>
  );
}

export default App;
