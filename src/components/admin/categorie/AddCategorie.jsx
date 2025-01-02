import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getCookie } from '../../../utils/Cookies';

const AddCategorie = () => {
    const [token, setToken] = useState();
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category_id: "",
  });

  const [category, setCategory] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObject = new FormData();
    formDataObject.append("name", formData.name);
    formDataObject.append("description", formData.description);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/category", {
        method: "POST",
        headers: {
          Accept: "application/json",
        "Authorization": `Bearer ${token}`
      
        },
        body: formDataObject,
      });

      if (response.ok) {
        console.log("categorie ajouté avec succès");
        toast.success("categorie ajouté avec succès")
        Afficher(); // Mettre à jour la liste des produits
      } else {
        console.error("Erreur lors de l'ajout du produit");
        toast.error("Erreur lors de l'ajout du produit")
      }
    } catch (error) {
      console.error("Erreur de réseau ou serveur", error);
    }
  };

  const Afficher = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/category");
    const data = await response.json();
    setCategory(data?.data);
  };

  const Supprimer = async (id) => {
    const confirmSuppression = window.confirm("Supprimer le produit ?");
    if (confirmSuppression) {
      const response = await fetch(`http://127.0.0.1:8000/api/category/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Produit supprimé avec succès");
        toast.success("Produit supprimé avec succès")
        Afficher();
      } else {
        toast.error("Erreur lors de la suppression du produit")
        console.error("Erreur lors de la suppression du produit");
      }
    }
  };

  useEffect(() => {
    Afficher();


  }, []);

    useEffect(() => {
      const token = getCookie("token");
      setToken(token);
    }, [token])

  return (
    <div className="content">
      <main>
        <div className="left">
          <div className="header">
            <div className="w-100 d-flex justify-content-center m-2 align-items-center">

              <button
                type="button"
                className="btn btn-primary "
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                style={{
                  backgroundColor: "#007bff",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Ajouter une Categorie
              </button>
            </div>
          </div>
          <div className="mx-5">
            <table
              className="table table-striped table-bordered"
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nom</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {category?.map((product, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>
                      <button
                        style={{
                          marginRight: "5px",
                          backgroundColor: "#f44336",
                          color: "white",
                          border: "none",
                          padding: "5px 10px",
                          cursor: "pointer",
                        }}
                        onClick={() => Supprimer(product.id)}
                      >
                        Supprimer
                      </button>
                      <button
                        style={{
                          marginRight: "5px",
                          backgroundColor: "#4CAF50",
                          color: "white",
                          border: "none",
                          padding: "5px 10px",
                          cursor: "pointer",
                        }}
                      >
                        Éditer
                      </button>
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>

          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Ajouter un categorie
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Nom :</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">Description :</label>
                      <textarea
                        id="description"
                        name="description"
                        className="form-control"
                        value={formData.description}
                        onChange={handleChange}
                        required
                      />
                    </div>

                  </div>
                  <div className="modal-footer">
                    <div className="d-flex justify-content-end">
                      <button type="submit" className="btn btn-primary">Soumettre</button>
                    </div>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Fermer
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default AddCategorie;

