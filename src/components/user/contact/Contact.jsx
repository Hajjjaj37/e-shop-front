import React from 'react';
import './Contact.css'

const Contact = () => {
  return (
    <div className="contactwrap">
      <div className="contactin">
        <h1>Contact Info</h1>
        <h2><i className="fa-solid fa-phone"></i> Phone</h2>
        <p>0649630997</p>
        <h2><i className="fa-solid fa-envelope"></i> Email</h2>
        <p>mohammedhajjaj2003@gmail.com</p>
        <h2><i className="fa-solid fa-location-dot"></i> Address</h2>
        <p>Casablanca Sidi El Bernoussi, Bloc 41</p>
        <ul>
          <li><a href=""><i className="fa-brands fa-facebook"></i></a></li>
          <li><a href=""><i className="fa-brands fa-square-instagram"></i></a></li>
          <li><a href=""><i className="fa-brands fa-twitter"></i></a></li>
          <li><a href=""><i className="fa-brands fa-google"></i></a></li>
        </ul>
      </div>

      <div className="contactin">
        <h1>Contact Us</h1>
        <form action="">
          <input type="text" placeholder="Nom" className="contactin-input" />
          <input type="text" placeholder="Prénom" className="contactin-input" />
          <input type="email" placeholder="Email" className="contactin-input" />
          <textarea placeholder="Message" className="contactin-textarea"></textarea>
          <input type="submit" value="Submit" className="contactin-btn" />
        </form>
      </div>

      <div className="contactin">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3322.8461024937315!2d-7.51628042553874!3d33.60929734099143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cb7761504ca7%3A0x8ae9a4549808e8b3!2sRue%2041%2C%20Casablanca%2020250!5e0!3m2!1sfr!2sma!4v1733761928388!5m2!1sfr!2sma" 
          width="100%" 
          height="auto" 
          style={{ border: '0' }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
    </div>
  );
};

export default Contact;

