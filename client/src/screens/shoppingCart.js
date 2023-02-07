import { useState, useEffect } from "react";
import NavBar from "../components/Navbar";
import shoes1 from "../images/blackshoes.png"
import CartItems from "./CartItems";


function Home() {

  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("cart")))
  const [price, setPrice] = useState(0)
  const [creditCard, setCreditCard] = useState("")
  const [SSN, setSSN] = useState("")
  const [moYr, setMoYr] = useState("")


  useEffect(() => {
    getPrice();
    if (localStorage.getItem("cart") == null) {
      setCartItems([]);
    }


  }, [cartItems])//cartItems


  const getPrice = () => {
    let total = 0;
    if (cartItems != null) {
      cartItems.map((item) => { total += item.price })
    }
    setPrice(total)
  }

  const deleteItem = (shoe) => {
    let newArr = new Array;
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].name != shoe) {
        newArr[i] = cartItems[i]
      }
    }
    var filtered = newArr.filter((x) => { return x !== undefined })

    localStorage.setItem("cart", JSON.stringify(filtered))
    setCartItems(JSON.parse(localStorage.getItem("cart")))
    console.log(JSON.stringify(localStorage.getItem("cart")))
    getPrice()
  }

  const placeOrder = () => {
    // if (creditCard.length != 16) {
    //   document.getElementById("creditCard").placeOrder = "Invalid Credit Card numbers"
    //   document.getElementById("creditCard").value = ""
    //   document.getElementById("creditCard").style.color = "red"
    // }
    // else {
    //   document.getElementById("creditCard").placeOrder = "CreditCard number"
    //   document.getElementById("creditCard").style.color = "black"
    // }
    // if (SSN.length != 3) {

    // }
    // if (moYr.length != 4) {

    // }
  }

  return (
    <div className="cart-page-container">
      <NavBar />
      <div className="cart-container">
        <div className="cart-title">
          Cart
        </div>

        <div className="cart-tab">
        </div>
        <div className="cart-info">
          <p className="cartSize"> number of items: {cartItems == null ? 0 : cartItems.length} </p>

          {cartItems == null ? " " : cartItems.map((item) => (<CartItems imageURL={shoes1} productName={item.name} productColor={item.color} productSize={item.size} productPrice={item.price} deleteItem={deleteItem} />))}

        </div>
        <h3 className="totalPrice">Total Price:{price}</h3>
        <button className="placeOrderBtn" onClick={() => placeOrder()}>Place Order</button>
      </div>
      <div className="userPaymentInfo">
        <input id="creditCard" type="text" placeholder="Credit Card Number" onChange={(e) => setCreditCard(e.target.value)} />
        <input type="text" placeholder="security number" onChange={(e) => setSSN(e.target.value)} />
        <input type="text" placeholder="mm/yy" onChange={(e) => setMoYr(e.target.value)} />
      </div>
    </div>
  );
}

export default Home;
