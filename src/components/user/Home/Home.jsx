import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';


import './Home.css'; // Assurez-vous de définir le CSS pour le style

// Liste des images de fond
const backgrounds = [
  './imagess/image1.jpg',  // Chemin de l'image locale
  './imagess/image11.jpg', // URL externe
  './imagess/image3.jpg',  // Chemin de l'image locale
  './imagess/image4.jpg',
];

function BackgroundChanger() {
  const [currentBackground, setCurrentBackground] = useState(backgrounds[0]);

  // Fonction pour changer l'image de fond de manière cyclique
  const changeBackground = (direction) => {
    setCurrentBackground((prevBackground) => {
      const currentIndex = backgrounds.indexOf(prevBackground);
      let nextIndex = currentIndex + direction;

      if (nextIndex < 0) {
        nextIndex = backgrounds.length - 1; // Si on est au début, on va à la dernière image
      } else if (nextIndex >= backgrounds.length) {
        nextIndex = 0; // Si on est à la fin, on retourne à la première image
      }

      return backgrounds[nextIndex];
    });
  };

  // Effet pour changer l'image toutes les 5 secondes
  useEffect(() => {
    const intervalId = setInterval(() => {
      changeBackground(1);  // Changer l'image vers la suivante automatiquement
    }, 9000);

    // Nettoyage de l'intervalle lorsque le composant est démonté
    return () => clearInterval(intervalId);
  }, [currentBackground]);

  return (
    <div
      className="background-container"
      style={{
        backgroundImage: `url(${currentBackground})`,
        filter: 'grayscale(50%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '600px',
      }}
    >
       <div className='navv'>
            <Navbar></Navbar>
       </div>
      <div className="content1">
        <h1>Welcome to My Website</h1>
        <p>
          This is a sample paragraph that remains fixed while the background image
          changes every 5 seconds.
        </p>
        <div className='reservation'>
            <a href="" >reservation</a>
        </div>
        <div className="buttons">
          {/* Bouton précédent */}
          <button onClick={() => changeBackground(-1)} className='button1'>
            
          </button>

          {/* Bouton suivant */}
          <button onClick={() => changeBackground(1)} className='button2'>
            
          </button>
        </div>
      </div>
    </div>
  );
}

export default BackgroundChanger;




