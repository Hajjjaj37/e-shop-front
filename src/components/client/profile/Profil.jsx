import React, { useEffect, useState } from "react";
import './Profil.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getCookie } from '../../../utils/Cookies';
import axios from "axios";

const Profile = () => {
    const [token, setToken] = useState();
    const [user, setUser] = useState({});
    const [photo, setPhoto] = useState();
    const [success, setSuccess] = useState();
    const [editUser, setEditUser] = useState({
      name: "",
      email: "",
      username: "",
      phone: "",
      image: photo
    });

  
  const Afficher = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/user", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setUser(data);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
          `http://localhost:8000/api/users/${user.id}`,
          {
            username: editUser.username,
            email: editUser.email,
            phone: editUser.phone,
            image: photo,
            name: editUser.name
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`, // Make sure `token` is correctly defined
            }
          }
      );

      if (response.status === 200) {
        console.log("User updated successfully:", response.data);
      }
    } catch (error) {
      console.error("Error updating user:", error.response?.data || error.message);
    }
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1];
        setPhoto(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

      useEffect(() => {
        Afficher();
        const tokenFromAPI = getCookie("token");
        setToken(tokenFromAPI);
      }, [token]);
  return (
    <div className="min-vh-80 d-flex align-items-center top-0 start-0 w-100  justify-content-center">
      <div className="profile-cardprofil">
        {/* Image en haut */}
        <img
          src={`http://localhost:8000/storage/${user.image}`}
          alt="Profile"
          className="profile-photoprofil"
        />
        {/* Informations utilisateur en dessous */}
        <div className="profile-headerprofil">
          <div><strong>Name:</strong> {user.name}</div>
          <div><strong>First Name:</strong> {user.name}</div>
          <div><strong>Email:</strong> {user.email}</div>
          <div><strong>Address:</strong> {user.adresse}</div>
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
            Open modal
          </button>

          {/* Modal */}
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
                    Editer Information
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleUpdate}>
                    {/* Champ 1 */}
                    <div className="mb-3">
                      <label
                          htmlFor="recipient-name"
                          className="col-form-label"
                      >
                        Name:
                      </label>
                      <input
                          type="text"
                          className="form-control"
                          id="recipient-name"
                          onChange={e => setEditUser({...editUser, name: e.target.value})}
                      />
                    </div>

                    <input type={"file"} name={"image"} onChange={handleFileChange} />


                    {/* Champ 3 */}
                    <div className="mb-3">
                      <label htmlFor="phone-number" className="col-form-label">
                        Email:
                      </label>
                      <input
                          type="tel"
                          className="form-control"
                          id="phone-number"
                          onChange={e => setEditUser({...editUser, email: e.target.value})}
                      />
                    </div>


                    {/* Champ 5 */}
                    <div className="mb-3">
                      <label htmlFor="city" className="col-form-label">
                        Phone:
                      </label>
                      <input
                          type="text"
                          className="form-control"
                          id="city"
                          onChange={e => setEditUser({...editUser, phone: e.target.value})}
                      />
                    </div>

                    {/* Champ 6 */}
                    <div className="mb-3">
                      <label htmlFor="occupation" className="col-form-label">
                        username:
                      </label>
                      <input
                          type="text"
                          className="form-control"
                          id="occupation"
                          onChange={e => setEditUser({...editUser, username: e.target.value})}
                      />
                    </div>
                    <div className="modal-footer">
                      <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Save changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-footerprofil">
          <div>Additional Info or Buttons</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
