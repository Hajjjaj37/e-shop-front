import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getCookie } from '../../../utils/Cookies';

function Settings() {
  const [user, setUser] = useState({});
    const [token, setToken] = useState();
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    address: "",
    password: "",
    image: ""
  });

  const [newAdminData, setNewAdminData] = useState({
    username: "",
    name: "",
    email: "",
    password: ""
  });

  const Afficher = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/user", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data)
    setUser(data);
  };
  const getStats = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/stats", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data.data?.recent_sales);
  };

  
  useEffect(() => {
    const token = getCookie("token");
    Afficher();
    setToken(token);
    getStats();
  }, [token])

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleNewAdminInputChange = (e) => {
    const { name, value } = e.target;
    setNewAdminData({
      ...newAdminData,
      [name]: value
    });
  };

  const handleSaveChanges =  async (e) => {
    e.preventDefault();

    const formDataObject = new FormData();
    formDataObject.append("username", formData.username);
    formDataObject.append("name", formData.name);
    formDataObject.append("email", formData.email);
    formDataObject.append("address", formData.address);
    formDataObject.append("password", formData.password);
    formDataObject.append("image", formData.image);

    try {
      const response = await fetch("", {
        method: "POST",
        headers: {
          Accept: "application/json"
        },
        body: formDataObject,
      });

      if (response.ok) {
        console.log("Modification réussie");
        toast.success("Modification réussie")
        Afficher(); 
      } else {
        console.error("Erreur lors de l'envoi des données");
        toast.error("Erreur lors de l'envoi des données")
      }
    } catch (error) {
      console.error("Erreur de réseau ou serveur", error);
      toast.error("Erreur de réseau ou serveur")
    }
  };

  const handleCreateAdmin = async () => {

    const newAdminData = {
      username: formData.username,
      name: formData.name,
      email: formData.email,
      address: formData.address,
      password: formData.password,
      image: formData.image
    };

    try {
      const response = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newAdminData)
      });

      if (response.ok) {
        console.log("Admin créé avec succès");
        toast.success("Admin créé avec succès")
        Afficher(); 
      } else {
        console.error("Erreur lors de la création de l'admin");
        toast.error("Erreur lors de la création de l'admin")
      }
    } catch (error) {
      console.error("Erreur de réseau ou serveur", error);
      toast.error("Erreur de réseau ou serveur")
    
    }
  };

  return (
    <div className="content">
      <main>
        <div className="erreurprofil">
          <div className="profile-cardprofil">
            {/* Image en haut */}
            <img
              src={`http://localhost:8000/profil/${user.image}`}
              alt="Profile"
              className="profile-photoprofil"
            />
            {/* Informations utilisateur en dessous */}
            <div className="profile-headerprofil">
              <div><strong>Username:</strong> {user?.username}</div>
              <div><strong>First Name:</strong> {user?.name}</div>
              <div><strong>Email:</strong> {user?.email}</div>
              <div><strong>Address:</strong> {user?.adresse}</div>
            </div>

            <div className="buttonprofil">
              {/* Boutons pour ouvrir les modals */}
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                data-bs-whatever="@mdo"
              >
                Modifier
              </button>

              {/* Modal for Editing User Info */}
              <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Update Information
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <form>
                        <div className="mb-3">
                          <label htmlFor="username" className="form-label">Username</label>
                          <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="name" className="form-label">First Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="email" className="form-label">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="address" className="form-label">Address</label>
                          <input
                            type="text"
                            className="form-control"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="password" className="form-label">Password</label>
                          <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="image" className="form-label">Profile Image :</label>
                          <input
                            type="file"
                            id="image"
                            name="image"
                            className="form-control"
                            onChange={handleInputChange}
                            accept="image/*"
                          />
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleSaveChanges}
                      >
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Button for Create New Admin */}


              {/* Modal for Creating New Admin */}
              <div
                className="modal fade"
                id="createAdminModal"
                tabIndex="-1"
                aria-labelledby="createAdminModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="createAdminModalLabel">
                        Create New Admin
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <form>
                        <div className="mb-3">
                          <label htmlFor="newAdminUsername" className="form-label">Username</label>
                          <input
                            type="text"
                            className="form-control"
                            id="newAdminUsername"
                            name="username"
                            value={newAdminData.username}
                            onChange={handleNewAdminInputChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="newAdminName" className="form-label">Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="newAdminName"
                            name="name"
                            value={newAdminData.name}
                            onChange={handleNewAdminInputChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="newAdminEmail" className="form-label">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            id="newAdminEmail"
                            name="email"
                            value={newAdminData.email}
                            onChange={handleNewAdminInputChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="newAdminPassword" className="form-label">Password</label>
                          <input
                            type="password"
                            className="form-control"
                            id="newAdminPassword"
                            name="password"
                            value={newAdminData.password}
                            onChange={handleNewAdminInputChange}
                          />
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={handleCreateAdmin}
                      >
                        Create Admin
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-footerprofil">
              <button
                type="button"
                className="btn btn-success"
                data-bs-toggle="modal"
                data-bs-target="#createAdminModal"
              >
                Create New Admin
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Settings;
