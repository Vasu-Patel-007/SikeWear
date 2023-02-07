
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import NavBar from "../components/Navbar";

const ForgotPassword = () => {


    const [email, setEmail] = useState();
    const [res, setResponse] = useState();
    const [newPassword, setPassword] = useState();
    const navigate = useNavigate();

    const sendInfo = () => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, newPassword: newPassword})
        };
        
        fetch("/apiForgotPassword", requestOptions)
            .then(response => response.json())
            .then(data => setResponse(data.message));
    }


    const credentials = () => {
        let email = document.getElementById("signinEmail").value; //get email
        let newPassword = document.getElementById("changePassword").value; // get new password
        if (email.toString().indexOf("@") >= 0) { //check if email contains '@'
            document.getElementById("signinEmail").placeholder = "Email";

        }
        else {
            document.getElementById("signinEmail").placeholder = "Invalid email address";
            document.getElementById("signinEmail").value = "";
            return false;
        }
        return true;
    }
    return (


        <div>
            <NavBar />
            <div className="accountContainer">
                <div className="forgotPasswordModal">
                    <h1 className="signInText">Enter Email</h1>

                    <div className="emailContainer">
                        <input className="signinEmail" id="signinEmail" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="passwordContainer">
                        <input className="changePassword" id="changePassword" placeholder="new password" onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className="signInButtonContainer">
                        <button id = 'reset' className="signinButton" onClick={() => { var result = credentials(); 
                            if (result == true) {
                                sendInfo()
                            } 
                            }}>
                            Reset
                        </button>
                    </div>

                    <div className="resultContainer">
                        <p className="result">{res}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
