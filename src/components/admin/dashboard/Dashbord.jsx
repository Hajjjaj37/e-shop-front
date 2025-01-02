import React, { useEffect, useState } from 'react';
import '../styledashbord.css';
import Navbarproduit from '../navbar/navbar'; // Ensure the path is correct
import { getCookie } from '../../../utils/Cookies';

const Dashboard1 = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProduits, setTotalProduits] = useState(0);
  const [totalCommand, setTotalCommand] = useState(0);
  const [mostSales, setMostSales] = useState([]);
  const [recentSales, setRecentSales] = useState([]);
  const [token, setToken] = useState(null);

  const fetchToken = () => {
    const cookieToken = getCookie("token");
    setToken(cookieToken);
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
    setTotalUsers(data.data.total_clients);
    setTotalProduits(data.data.total_products);
    setTotalCommand(data.data.total_orders);
    setRecentSales(data.data.recent_sales);
  };


  const getSales = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/orders?page=1", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setMostSales(data?.data?.data);
  };

  useEffect(() => {
    fetchToken();
  }, []);

  useEffect(() => {
    if (token) {
      getStats();
      getSales();
    }
  }, [token]);

  return (
    <>
      {/* Sidebar */}

      {/* Main Content */}
      <div className="content">
        <main>
          <div className="header">
            <div className="left">
              <h1>Dashboard</h1>
            </div>
          </div>

          {/* Insights */}
          <ul className="insights">
            <li>
              <i className="bx fa-solid fa-user"></i>
              <span className="info">
                <h3>{totalUsers}</h3>
                <p>Total Utilisateurs</p>
              </span>
            </li>
            <li>
              <i className="bx fa-solid fa-eye"></i>
              <span className="info">
                <h3>{totalProduits}</h3>
                <p>Total Produits</p>
              </span>
            </li>

            <li>
              <i className="bx fa-solid fa-money-bill"></i>
              <span className="info">
                <h3>{totalCommand}</h3>
                <p>Total commands</p>
              </span>
            </li>
          </ul>
          {/* End of Insights */}

          <div className="bottom-data">
            <div className="orders">
              <div className="header">
                <i className="bx bx-receipt"></i>
                <h3>Les produits Plus Vendue</h3>
                <i className="bx bx-filter"></i>
                <i className="bx bx-search"></i>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Prix </th>
                    <th>categorie</th>
                  </tr>
                </thead>
                <tbody>
                  {mostSales?.slice(1, 3).map((produit) => {
                    return produit?.items?.map((product) => (
                      <tr key={product.id}>
                      <td>{product.product.name}</td>
                      <td>{parseFloat(product.product.price).toFixed(2)}</td>
                      <td>{product.product.category.name}</td>
                    </tr>
                    ))
                    
                  })}
                </tbody>
              </table>
            </div>
            <div className="orders">
              <div className="header">
                <i className="bx bx-receipt"></i>
                <h3>Les dernier vendus</h3>
                <i className="bx bx-filter"></i>
                <i className="bx bx-search"></i>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Prix </th>
                    <th>quantity</th>
                  </tr>
                </thead>
                <tbody>
                {recentSales?.map((produit) => {
                    return produit?.items?.map((product) => (
                      <tr key={product.id}>
                      <td>{product.product_name}</td>
                      <td>{parseFloat(product.price).toFixed(2)}</td>
                      <td>{product.quantity}</td>
                    </tr>
                    ))
                    
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      <script src="/DashbordScript.js"></script>
    </>
  );
};

export default Dashboard1;
