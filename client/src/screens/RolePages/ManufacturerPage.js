import React from 'react'
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/Navbar";
import { useState } from 'react';
import { Roles } from '../../constants/roles';

export default function ManufacturerPage() {

  const navigate = useNavigate();

  const [email, setEmail] = useState()
  const [brand, setBrand] = useState()
  const [name, setName] = useState()
  const [size, setSize] = useState()
  const [image, setImage] = useState()
  const [price, setPrice] = useState()
  const [quantity, setQuantity] = useState()
  const [color, setColor] = useState()
  const [response, setResponse] = useState()

  const sendInfo = () => {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ providerEmail: email, brandName: brand, shoeName: name, shoeSize: size, shoeURL: image, price: price, quantity: quantity, color: color })
    };

    fetch("/api/addShoe", requestOptions)
      .then(response => response.json())
      .then(data => setResponse(data.message));
  }
  const clearFields = () => {
    document.getElementsByName("email").item(0).value = ""
    document.getElementsByName("brand_name").item(0).value = ""
    document.getElementsByName("shoe_name").item(0).value = ""
    document.getElementsByName("shoe_size").item(0).value = ""
    document.getElementsByName("shoe_image").item(0).value = ""
    document.getElementsByName("shoe_price").item(0).value = ""
    document.getElementsByName("shoe_quantity").item(0).value = ""
    document.getElementsByName("shoe_color").item(0).value = ""
  }



  return (
    <div>
      <NavBar />



      <div className="shoeInfo">
        <input type="text"  name='email' placeholder='providerEmail' onChange={(e) => setEmail(e.target.value)} />
        <input type="text"  name='brand_name' placeholder='brand name' onChange={(e) => setBrand(e.target.value)} />
        <input type="text" name='shoe_name' placeholder='shoe name' onChange={(e) => setName(e.target.value)} />
        <input type="text" name='shoe_size' placeholder='shoe size' onChange={(e) => setSize(e.target.value)} />
        <input type="text"  name='shoe_image' placeholder="shoe image url" onChange={(e) => setImage(e.target.value)} />
        <input type="text"  name='shoe_price' placeholder='shoe price' onChange={(e) => setPrice(e.target.value)} />
        <input type="text"  name='shoe_quantity' placeholder='quantity' onChange={(e) => setQuantity(e.target.value)} />
        <input type="text"  name='shoe_color' placeholder='color' onChange={(e) => setColor(e.target.value)} />



      </div>

      <button name='submite' onClick={() => sendInfo()}>Submit Shoe </button>
      <button className='addShoe' onClick={() => [navigate("/"), localStorage.setItem(Roles.Manufacturer, false)]}>Sign out</button>

      {response}

    </div>
  )
}
