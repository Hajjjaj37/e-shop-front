import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import './About.css'; // Pour le CSS personnalisé
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS CSS pour les animations

function About() {
  // Initialisation de AOS lorsque le composant se monte
  useEffect(() => {
    AOS.init({ duration: 1500 }); // Durée de l'animation
  }, []);

  return (
    <div className="container my-5">
      <div className="row">
        {/* Colonne 1: Titre, Paragraphe et Bouton */}
        <div className="col-lg-6 mt-5" data-aos="fade-up">
          <h2 className="about-title">About Us</h2>
          <p className="about-text">
            We are a passionate team dedicated to delivering the best services for you. Our mission is to provide quality and affordable solutions tailored to your needs.
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius illo ipsam voluptatibus autem odit eveniet ut repellat, recusandae quis? Sapiente, ullam voluptas! Quos magni voluptatibus nobis eveniet odio similique eaque?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat animi nesciunt molestiae numquam! Mollitia temporibus maiores sapiente distinctio doloremque enim itaque officia sit, quia eos quam ea delectus voluptatibus necessitatibus!
          </p>
          <button className=""> reservation</button>
        </div>

        {/* Colonne 2: Image */}
        <div className="col-lg-6" data-aos="fade-left">
          <img 
            src="./imagess/porte.jpeg" 
            alt="About" 
            className="img-fluid rounded shadow"
          />
        </div>
      </div>
    </div>
  );
}

export default About;
