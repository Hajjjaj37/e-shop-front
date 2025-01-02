import { Route, Routes } from "react-router-dom";

import LoginPage from "../components/user/loginpage/Formp";
import UserHome from "./Userhome";

export default function User() {
    return (
      <>
          <Routes>
              <Route path="/" element={<UserHome/>}/>
              <Route path="/loginpage" element={<LoginPage/>}/>
          </Routes>
      </>
    );
}  