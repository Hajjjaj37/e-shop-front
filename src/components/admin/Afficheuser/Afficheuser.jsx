import React, { useEffect, useState } from "react";
import './Afficheuser.css';
import { getCookie } from '../../../utils/Cookies';

function Afficheuser() {


  const [users, setUsers] = useState([]);
  const [token, setToken] = useState();



  // Fonction pour gérer la soumission du formulaire


  const Afficher = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/users", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });
    const data = await response.json();
    setUsers(data.data);
  };

  const Supprimer = async (id) => {
    let confirmSuppression = alert("supprimer le produit");
    if (!confirmSuppression) {

      const response = await fetch(`http://127.0.0.1:8000/api/users/${id}`, {
        method: "DELETE",
         headers:{
            "Authorization": `Bearer ${token}`,
         },
      });

      if (response.ok) {
        console.log("success")
      }

    } else {
      console.log("annuler")
    }
  }

  useEffect(() => {
    const token = getCookie("token");
    setToken(token);
    Afficher();

  }, [token])





  return (
    <div className="content">
      <main>
        <div className=''>
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Nom</th>
                <th>email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((product, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={`http://127.0.0.1:8000/user/${product.image}`}
                      alt={product.name}
                      style={{ width: "100px", height: "auto" }}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.email}</td>
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

                    
                    <div className="">

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

export default Afficheuser
