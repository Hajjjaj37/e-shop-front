import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import './Client.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS CSS pour les animations

function Client() {
    useEffect(() => {
        if (typeof window !== 'undefined') {
          AOS.init({
            duration: 1500, // Durée de l'animation
            once: true, // Exécute l'animation une seule fois
            easing: 'ease-out-back', // Effet d'animation de sortie
          });
        }
      }, []);

    return (
        <div className='Hajjaj'>
            <h1> les clients</h1>
            {/* Section qui sera affichée au scroll */}
            <div className="halima" data-aos="fade-up" data-aos-duration="2000">
                <div className="box">
                    <span style={{ '--i': 1 }}><img src="./imagess/Aleq.jpg" alt="Image 1" /></span>
                    <span style={{ '--i': 2 }}><img src="./imagess/construction.jpg" alt="Image 2" /></span>
                    <span style={{ '--i': 3 }}><img src="./imagess/dawajine.jpg" alt="Image 3" /></span>
                    <span style={{ '--i': 4 }}><img src="./imagess/redal.jpg" alt="Image 4" /></span>
                    <span style={{ '--i': 5 }}><img src="./imagess/rouandi.jpg" alt="Image 5" /></span>
                    <span style={{ '--i': 6 }}><img src="./imagess/sogea.jpg" alt="Image 6" /></span>
                    <span style={{ '--i': 7 }}><img src="./imagess/solsif.jpg" alt="Image 7" /></span>
                    <span style={{ '--i': 8 }}><img src="./imagess/tracom.png" alt="Image 8" /></span>
                </div>
            </div>
        </div>
    );
}

export default Client;

