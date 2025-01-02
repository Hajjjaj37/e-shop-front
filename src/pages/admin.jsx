import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbarproduit from "../components/admin/navbar/navbar";
import Dashboard1 from "../components/admin/dashboard/Dashbord";
import ProductForm from '../components/admin/addproduct/Addproduit';
import Afficheuser from "../components/admin/Afficheuser/Afficheuser";
import AddCategorie from "../components/admin/categorie/AddCategorie";
import Settings from "../components/admin/setting/Setting";
import AdminCommandes from "../components/admin/Commandes/Commandes";



export default function Admin() {
  return (
    <>
        <Navbarproduit/>
        <Routes>
            <Route path="/userproduit" element={<Afficheuser />}/>
            <Route path="/" element={<Dashboard1/>}/>
            <Route path="/addproduct" element={<ProductForm />}/>
            <Route path="/Settings" element={<Settings />}/>
            <Route path="/commandes" element={<AdminCommandes />}/>
            <Route path="/categorie" element={<AddCategorie />}/>
        </Routes>
    </>
  );
}