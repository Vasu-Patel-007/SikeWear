import React from 'react'
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/Navbar";
import { useState } from 'react';
import {Roles} from '../../constants/roles';

export default function AdminPage({credentials}) {

  const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [newRole, setNewRole] = useState(Roles.User);
    const [res, setResponse] = useState();

    const sendInfo = () => {

        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email, role: newRole })
        };
    
        fetch("/api/updateRole", requestOptions)
          .then(response => response.json())
          .then(data => setResponse(data.message));
      }

  return (
    <div>
      <NavBar />
      <div className='role-change-container'>
      <div className="role-change-title"><b>Change Account Role</b></div>
      <div className="emailContainer" >
            <input className="signinEmail" id="signinEmail" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <select name='role' id='role' onChange={e => setNewRole(e.target.value)}> 
            <option id = "user" value={Roles.User}>User</option>
            <option id = "manufacturer" value={Roles.Manufacturer}>Manufacturer</option>
            <option id = "admin" value={Roles.Admin}>Admin</option>
        </select>

        <div className="signInButtonContainer">
            <button id='submite_data' className="signinButton" onClick={() => {sendInfo()}}>Create</button>
        </div>
        <div className='updated'>
            {res}
        </div>
      </div>
      <button id="sign_out" className='addShoe' onClick={() => [navigate("/"), localStorage.setItem(Roles.Admin, false)]}>Sign out</button>

    </div>
  )
}
