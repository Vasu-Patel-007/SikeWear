import React from 'react'
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/Navbar";
import { useState } from 'react';
import ManufacturerPage from './ManufacturerPage';
import { Roles } from '../../constants/roles';

export default function UserPage() {

  const navigate = useNavigate();

  return (
    <div>
      <NavBar />
      <div>User Page!</div>
      <button className='addShoe' name="sign_out" onClick={() => [navigate("/"), localStorage.setItem(Roles.User, false)]}>Sign out</button>

    </div>
  )
}
