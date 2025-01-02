import React from 'react';
import './Footer.css'; // Assurez-vous d'importer le fichier CSS pour le style (ou le nom de fichier approprié)



function Footer() {
    return (
        <div>
            <footer className="footer">
                <div className="footer-container">
                    {/* Logo et texte */}
                    <div className="footer-logo">
                        <img src="./imagess/logo.png" alt="Logo" className="logo" /> {/* Remplacez "logo.png" par le chemin de votre logo */}
                        <p className="footer-description">
                            Nous sommes une entreprise passionnée par la création de solutions innovantes. Suivez-nous sur nos réseaux sociaux pour plus d'informations.
                        </p>
                    </div>

                    {/* Réseaux sociaux */}
                    <div className="footer-socials">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <i class="fa-brands fa-facebook"></i>
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <i className="fa-brands fa-instagram"></i>
                        </a>
                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <i className="fa-brands fa-linkedin"></i>
                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <i className="fa-brands fa-twitter"></i>
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Footer;

