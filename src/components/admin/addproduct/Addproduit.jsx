import React, { useEffect, useState } from "react";
import { getCookie } from "../../../utils/Cookies";

const ProductForm = () => {
  const [token, setToken] = useState();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    category_id: "",
    price: "", // Change "prix" to "price"
    quantite: "",
    image: "",
  });

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObject = new FormData();
    formDataObject.append("name", formData.name);
    if (formData.image) {
      formDataObject.append("image", formData.image);
    }
    formDataObject.append("description", formData.description);
    formDataObject.append("category_id", formData.category_id);
    formDataObject.append("price", formData.price); // Ensure correct name here
    formDataObject.append("quantite", formData.quantite);
    try {
      const url = isEditing
        ? `http://127.0.0.1:8000/api/products/${formData.id}`
        : "http://127.0.0.1:8000/api/products";
      const method = isEditing ? "PUT" : "POST";
        
      const response = await fetch(url, {
        method: method,
        headers: {
          Accept: "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: formDataObject,
      });

      if (response.ok) {
        console.log(isEditing ? "Produit mis à jour avec succès" : "Produit ajouté avec succès");
        Afficher();
        setIsEditing(false);
        /*setFormData({
          id: "",
          name: "",
          description: "",
          category_id: "",
          price: "", // Reset price field correctly
          quantite: "",
          image: "",
        });*/
      } else {
        console.error("Erreur lors de l'ajout ou de la mise à jour du produit");
      }
    } catch (error) {
      console.error("Erreur de réseau ou serveur", error);
    }
  };

  const Afficher = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/products", {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setProducts(data);
  };

  const Supprimer = async (id) => {
    const confirmSuppression = window.confirm("Supprimer le produit ?");
    if (confirmSuppression) {
      const response = await fetch(`http://127.0.0.1:8000/api/products/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log("Produit supprimé avec succès");
        Afficher();
      } else {
        console.error("Erreur lors de la suppression du produit");
      }
    }
  };

  const Edit = (product) => {
    setIsEditing(true);
    setFormData({
      id: product.id,
      name: product.name,
      description: product.description,
      category_id: product.category_id,
      price: product.price, // Update the price field correctly
      quantite: product.stock,
      image: "",
    });
  };

  useEffect(() => {
    Afficher();

    const afficherCategory = async () => {
      const response = await fetch("http://127.0.0.1:8000/api/category");
      const data = await response.json();
      setCategory(data?.data);
    };

    afficherCategory();
  }, []);

  useEffect(() => {
    const token = getCookie("token");
    setToken(token);
  }, [token]);

  return (
    <div className="content">
      <main>
        <div className="w-100 d-flex justify-content-center m-2 align-items-center">
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            style={{
              backgroundColor: "#007bff",
              color: "white",
              padding: "10px 20px",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => {
              setIsEditing(false);
              setFormData({
                id: "",
                name: "",
                description: "",
                category_id: "",
                price: "", // Reset price field
                quantite: "",
                image: "",
              });
            }}
          >
            Ajouter un Produit
          </button>
        </div>
        <div className="mx-5">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Nom</th>
                <th>Image</th>
                <th>Description</th>
                <th>Catégorie</th>
                <th>Prix</th>
                <th>Quantité</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products?.data?.data?.map((product, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>
                    <img
                      src={`${product.image}`}
                      alt={product.name}
                      style={{ width: "100px", height: "auto" }}
                    />
                  </td>
                  <td>{product.description}</td>
                  <td>{product.category.name}</td>
                  <td>{product.price}€</td>
                  <td>{product.stock}</td>
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
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => Edit(product)}
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
                  {isEditing ? "Modifier le Produit" : "Ajouter un Produit"}
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
                  <div className="mb-3">
                    <label htmlFor="category_id" className="form-label">Catégorie :</label>
                    <select
                      id="category_id"
                      name="category_id"
                      className="form-select"
                      value={formData.category_id}
                      onChange={handleChange}
                      required
                    >
                      {category.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="price" className="form-label">Prix :</label>
                    <input
                      type="number"
                      id="price"
                      name="price" // Ensure it's "price" and not "prix"
                      className="form-control"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="quantite" className="form-label">Quantité :</label>
                    <input
                      type="number"
                      id="quantite"
                      name="quantite"
                      className="form-control"
                      value={formData.quantite}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image :</label>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      className="form-control"
                      onChange={handleChange}
                      accept="image/*"
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
      </main>
    </div>
  );
};

export default ProductForm;
