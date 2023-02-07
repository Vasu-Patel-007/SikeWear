import React from 'react'
import Dropdown from './Dropdown'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function ShoeContainer({ shoeInfo, additems }) {
  const navigate = useNavigate();


  return (
    <div className="item" onClick={() => navigate("/shop/shoe_one", { state: { shoeInfo } })} >
      <Dropdown info={shoeInfo} additems={additems} />

      <img src={shoeInfo.image} />
    </div>
  )
}
