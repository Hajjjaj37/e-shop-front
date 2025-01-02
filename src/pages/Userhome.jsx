import Navbar from '../components/user/Navbar/Navbar';
import About from '../components/user/About/About';
import Client from '../components/user/Clients/Client';
import BackgroundChanger from '../components/user/Home/Home';
import Produit from '../components/user/produit/Produit';
import Contact from '../components/user/contact/Contact';
import Footer from '../components/user/footer/Footer';

function UserHome() {
  return (
   <div>
      <div>
     <Navbar></Navbar>
     </div>
     <div>
      <BackgroundChanger></BackgroundChanger>
      </div>
      <div>
      <About></About>
      </div>
      <div>
        <Client></Client>
      </div>
      <div>
        <Produit></Produit>
      </div>
      <div>
        <Contact></Contact>
      </div>
      <div>
        <Footer></Footer>
      </div>
      
   </div>
  );
}

export default UserHome;