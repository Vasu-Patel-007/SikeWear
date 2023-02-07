import { Suspense, useEffect } from "react";
import NavBar from "../components/Navbar";
import ModelRenderer from "../components/shoe_one_model"
import { Canvas } from '@react-three/fiber'
import { Stage } from '@react-three/drei'
import { OrbitControls } from "@react-three/drei";
import { useLocation } from 'react-router-dom';
import { useState } from "react";

import '../App.css'


function Shoe_one() {

  const location = useLocation();

  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("cart"))); //replace [] to clear


  useEffect(() => {
    if (localStorage.getItem("cart") == null) {
      setCartItems([]);
    }
  }, [])
  const addtoCart = (info) => {
    setCartItems((prev) => [info, ...prev])
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }

  return (
    <div>
      <NavBar />
      <div className="shoeHeaderContainer">
        <button className="shoePageAddToCartBtn" onClick={() => addtoCart(location.state.shoeInfo)}>Add to Cart</button>
        <h1 className="shoeHeader">{location.state.shoeInfo.name}</h1>
        <h2>Colors: {location.state.shoeInfo.color}</h2>
        <h2>Size: {location.state.shoeInfo.sizes}</h2>
        <h2 className="pagePrice">${location.state.shoeInfo.price}</h2>
      </div>
      <Canvas className="shoe_background" camera={{ fov: 50, zoom: 1.3, near: 1, far: 1000 }}>
        <OrbitControls enableZoom={false} autoRotate={false} />
        <Suspense fallback={null}>
          <Stage>
            <ModelRenderer />
          </Stage>
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Shoe_one;
