import { BsBagDash } from "react-icons/bs"
import { useEffect, useState } from "react"
//npm install react-icons --save

function Dropdown({ info, additems }) {

  return (
    <div className="panelRise">
      <p className="name">{info.name}</p>
      <p className="price">${info.price}.00</p>
      <p className="sizes">{info.sizes}</p>
      <div className="btnContainer">
        <button className="addToCartBtn" onClick={() => { additems(info) }}><BsBagDash /></button>
      </div>
    </div>
  );
}


export default Dropdown;
