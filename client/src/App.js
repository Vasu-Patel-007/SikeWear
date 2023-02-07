import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./screens/Home";
import Shop from "./screens/Shop";
import Account from "./screens/Account";
import ShoppingCart from "./screens/shoppingCart"
import NotFound from "./screens/NotFound";
import NewAccount from "./screens/NewAccount"
import ResetPassword from "./screens/ForgotPassword"
import Shoe_one from "./screens/shoe_one"
import UserPage from "./screens/RolePages/UserPage";
import ManufacturerPage from "./screens/RolePages/ManufacturerPage";
import AdminPage from "./screens/RolePages/AdminPage";
import "./App.css";

function App() {
  //checks signin credentials
  const checkCredentials = () => {
    let email = document.getElementById("signinEmail").value; //get email
    let password = document.getElementById("signinPassword").value;//get password

    let emailPassed = false;
    let passwordPassed = false;

    if (email.toString().indexOf("@") >= 0) { //check if email is valid (contains @)
      emailPassed = true;
      document.getElementById("signinEmail").placeholder = "Email";

    }
    else { //invalid email
      document.getElementById("signinEmail").placeholder = "Invalid email address";
      document.getElementById("signinEmail").value = "";
      return false;
    }

    if (password.length > 6) { //check if password is atleast 7 characters long
      passwordPassed = true;
      document.getElementById("signinPassword").placeholder = "Password";
    }
    else { //invalid password
      document.getElementById("signinPassword").placeholder = "must be at least 7 characters";
      document.getElementById("signinPassword").value = "";
      return false;
    }
    return true;
  };
  return (

    <Router>

      <Routes>
        <Route path="/" element={<Home/>}   />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/shoe_one" element={<Shoe_one />} />
        <Route path="/account" element={<Account credentials={checkCredentials} />} />
        <Route path="/shoppingCart" element={<ShoppingCart />} />
        <Route path="/account/newAccount" element={<NewAccount credentials={checkCredentials} />} />
        <Route path="/account/resetPassword" element={<ResetPassword />} />
        <Route path="/UserPage" element={<UserPage />} />
        <Route path="/ManufacturerPage" element={<ManufacturerPage />} />
        <Route path="/AdminPage" element={<AdminPage />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
  );
}

export default App;
