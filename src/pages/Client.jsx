import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbarproduit from "../components/client/pageproduit/Navbarproduit";
import Produit1 from "../components/client/pageproduit/PageProduit";
import Profile from "../components/client/profile/Profil";
import Reclamation from "../components/client/reclamation/Reclamation";
import Wishlist from "../components/client/wishList/Wish"
import Home from "../components/client/Home/Home";  
import Panier from "../components/client/Panier/Panier";
import Produit from "../components/client/Produit/Produit";
import Commandes from "../components/client/commandes/Commandes";

export default function ClientWeb() {
    return (
      <>
          <Navbarproduit />
          <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/reclamation" element={<Reclamation/>}/>
              <Route path="/products" element={<Produit1/>}/>
              <Route path="/product/:id" element={<Produit/>}/>
              <Route path="/profile" element={<Profile />}/>
              <Route path="/panier" element={<Panier />}/>
              <Route path="/commandes" element={<Commandes />}/>
              <Route path="/wish" element={<Wishlist />}/>
          </Routes>
                  {/* <Footer /> */}
        
      </>
    );
  }