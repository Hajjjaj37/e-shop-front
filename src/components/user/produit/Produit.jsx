import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import './Produit.css'; // Assurez-vous de définir votre propre style CSS pour .card, .button, etc.

function Produit() {
  const items = [
    { id: 1, category: "Porte de villa", description: "Description de la porte de villa 1", imageUrl: "./imagess/porte.jpeg" },
    { id: 2, category: "Porte de garage", description: "Description de la porte de garage 1", imageUrl: "https://via.placeholder.com/150" },
    { id: 3, category: "Porte de villa", description: "Description de la porte de villa 2", imageUrl: "https://via.placeholder.com/150" },
    { id: 4, category: "Porte de garage", description: "Description de la porte de garage 2", imageUrl: "https://via.placeholder.com/150" },
    { id: 5, category: "Autre", description: "Description d'une autre porte", imageUrl: "https://via.placeholder.com/150" },
    { id: 6, category: "Autre", description: "Description d'une autre porte", imageUrl: "https://via.placeholder.com/150" }
  ];

  // État pour stocker la catégorie filtrée
  const [filteredCategory, setFilteredCategory] = useState('All');

  // Fonction pour filtrer les items
  const filterItems = (category) => {
    setFilteredCategory(category);
  };

  // Filtrer les éléments en fonction de la catégorie sélectionnée
  const filteredItems = filteredCategory === 'All' ? items : items.filter(item => item.category === filteredCategory);

  return (
    <>
      <div className='container mt-4'>
        <div className='row mb-4'>
          {/* Boutons de filtre */}
          <div className='col-md-12 youness  d-flex justify-content-center gap-5 mt-5'>
            <button onClick={() => filterItems('All')} className="hh btn-lg w-auto"> <span>All</span></button>
            <button onClick={() => filterItems('Porte de villa')} className="hh btn-lg w-auto"> <span>Porte de villa</span> </button>
            <button onClick={() => filterItems('Porte de garage')} className="hh btn-lg w-auto"> <span>Porte de garage</span> </button>
            <button onClick={() => filterItems('Autre')} className="hh btn-lg w-auto"> <span>Autre</span> </button>
          </div>
        </div>

        <div className="row">
          <div className="wrapper1">
            <div className="container my-5">
              <div className="box-area1">
                {/* Boucle à travers les données et création des cartes */}
                {filteredItems.map((card) => (
                  <div className="box1" key={card.id}>
                    <img src={card.imageUrl} alt={card.category} />
                    <div className="overlay1">
                      <h3>{card.category}</h3>
                      <p>{card.description}</p>
                      <a href="#">Book Now</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Produit;


