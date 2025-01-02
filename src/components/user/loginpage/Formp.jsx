import React, { useState } from "react";
import "./style1.css";
import { Link, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";


const LoginPage = () => {
  const [isLoading , setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    adresse: "",
    email: "",
    password: "",
  });

  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const [profils, setprofils] = useState([]);
  const navigate = useNavigate();

  // Fonction pour gérer les changements dans les champs
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0], // Stocker le fichier sélectionné
      });
    } else {
      setFormData({
        ...formData,
        [name]: value, // Stocker la valeur du champ texte
      });
    }
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Créer un objet FormData pour envoyer les données du formulaire
    const formDataObject = new FormData();
    formDataObject.append("name", formData.name);
    formDataObject.append("email", formData.email);
    formDataObject.append("username", formData.username);
    formDataObject.append("adresse", formData.adresse);
    formDataObject.append("image", formData.image);
    formDataObject.append("password", formData.password);

    try {
      // Envoyer la requête POST avec FormData
      const response = await fetch("http://127.0.0.1:8000/api/registre", {
        method: "POST",
        body: formDataObject, // FormData sans JSON.stringify
        // Ne pas ajouter Content-Type car il est géré par le navigateur
      });

      if (response.status === 200 || response.status === 201) { 
        console.log("user ajouté avec succès");
        toast.success("user ajouté avec succès");
        // Vous pouvez aussi gérer la réponse ici, par exemple en affichant un message de succès
      } else {
        console.error("Erreur lors de l'ajout d'un utilisateur");
        toast.error("Erreur lors de l'ajout d'un utilisateur");
      }
    } catch (error) {
      console.error("Erreur de réseau ou serveur", error);
    }
    setIsLoading(false);
    
  }
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch()
  const handleRegisterClick = () => {
    setIsActive(true);
  };
  const handleLogin = () => {
    setIsActive(false);
  };
  
  const handleLoginClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: login.email,
          password: login.password,
        }),
      });

      const data = await response.json();
      if (response.status === 200) {
        toast.success(data.stat)
        document.cookie = `token=${data.message}; path=/; secure=true`;


        dispatch({type:"SET_ROLE", payload: data.role})

        
        navigate("/");
        
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      console.log(err)
    }finally{

      setIsLoading(false);
    }
    

  };

  return (
    <div className="mee">
      <div className={`container1 ${isActive ? "active" : ""}`} id="container">
        <div className="form-container1 sign-up1">
          <form onSubmit={handleSubmit}>
            <h1 className="text-nowrap">Create Account</h1>

            <input type="text" placeholder="Name" id="name" name="name" value={formData.name} onChange={handleChange} required />
            <input type="email" placeholder="Email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            <input type="text" placeholder="user_name" id="username" name="username" value={formData.username} onChange={handleChange} required />
            <input type="text" placeholder="adresse" id="adresse" name="adresse" value={formData.adresse} onChange={handleChange} required />
            <input type="file" id="image" name="image" onChange={handleChange} required />
            <input type="password" placeholder="Password" id="password" name="password" value={formData.password} onChange={handleChange} required />
            <button type="button" onClick={handleSubmit}>{isLoading ? "Loading..." : "Sign Up"}</button>
          </form>
        </div>
        <div className="form-container1 sign-in1">
          <form>
            <h1>Sign In</h1>
            <input type="email" placeholder="Email" onChange={e => setLogin({ ...login, email: e.target.value })} />
            <input type="password" placeholder="Password" onChange={e => setLogin({ ...login, password: e.target.value })} />
            <a href="#">Forget Your Password?</a>
            <button type="button" onClick={handleLoginClick}>{isLoading ? "Loading..." : "Sign In"}</button>
          </form>
        </div>
        <div className="toggle-container1">
          <div className="toggle1">
            <div className="toggle-panel1 toggle-left1">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of the site features</p>
              <button className="hidden1" id="login" onClick={handleLogin}>
                Sign In
              </button>
            </div>
            <div className="toggle-panel1 toggle-right1">
              <h1>Hello, Friend!</h1>
              <p>Register with your personal details to use all of the site features</p>
              <button className="hidden1" id="register" onClick={handleRegisterClick}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

