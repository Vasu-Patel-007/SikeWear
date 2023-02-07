import NavBar from "../components/Navbar";
import { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {Roles} from "../constants/roles";
import ManufacturerPage from './RolePages/ManufacturerPage';
const Account = ({ credentials}) => {


 

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [res, setResponse] = useState("");
  const[signedIn,setSignIn] = useState(false);


 

  const sendInfo = () => {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password })
    };

    fetch("/apiPost", requestOptions)
      .then(response => response.json())
      .then(data => setResponse(data.message));
  }

  const navigateToRolePage = ()  =>{
    if(res === Roles.User) {
      //UserPage(email,password);
      navigate("/UserPage");
      localStorage.setItem(Roles.User,true);
      return;
    } else if(res === Roles.Manufacturer) {
      navigate("/ManufacturerPage");
      localStorage.setItem(Roles.Manufacturer, true);
      return;
    } else if(res === Roles.Admin) {
      navigate("/AdminPage");
      localStorage.setItem(Roles.Admin, true);
      return;
    } else {
      return res;
    }
  }


  return (
    <div>
      <NavBar signin = {signedIn}/>

      <div className="accountContainer">
        <div className="centerfocus-signin">

          <h1 className="signInText">Welcome back</h1>

          <div className="emailContainer">
            <input id="signinEmail" className="signinEmail" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="passwordContainer">
            <input id="signinPassword" className="signinPassword" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className="signInButtonContainer">
            <button id = "submite" className="signinButton" onClick={() => { var result = credentials(); if (result == true) sendInfo() }}>Sign in</button>
          </div>


          <div className="newAccount">
            <a href="http://localhost:3000/account/newAccount" class="createAccountButton">no account? </a>
            <a href="http://localhost:3000/account/resetPassword" className="forgotPasswordButton">forgot password?</a>
          </div>
          <div className="resultContainer">
            <div className="result"> {navigateToRolePage()} </div>
          </div>
        </div>
      </div>
      

    </div>
  );
}
export default Account;
