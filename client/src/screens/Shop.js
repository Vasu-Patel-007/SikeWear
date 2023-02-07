import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import Dropdown from "../components/Dropdown";
import ShoeContainer from "../components/ShoeContainer";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import shoe from "../images/shoe.png";

function Shop() {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("cart")));

  const addtoCart = (info) => {
    setCartItems((prev) => [info, ...prev])
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }
  async function getShoes() {

    let getInfo = await fetch("/shop/shoes")
    let result = getInfo.json();

    return result;
  }

  useEffect(() => {
    getShoes().then(result => setData(result))
    // localStorage.setItem("cart", '[{"name":"name","price":"price","color":"color","sizes":["size"]}]')
  }, []);

  return (
    <div>
      <NavBar />

      <div className="shopContainer">



        <div className="mainPanelContainer">
          <div className="panel">
            <img src={shoe} alt="image not loading" className="imageShoe" />
          </div>
          <div className="row">
            {!data ? " " : data.map((item) => (<ShoeContainer shoeInfo={item} additems={addtoCart} />))}
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}

export default Shop;