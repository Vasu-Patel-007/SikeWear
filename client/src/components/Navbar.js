import { BsBagDash } from "react-icons/bs"
import { Roles } from "../constants/roles";

function NavBar({ home }) {

  const signedInPage = () => {
    if(localStorage.getItem(Roles.User) == "true") {
      return <a href = "http://localhost:3000/UserPage">Account</a>;
    } else if(localStorage.getItem(Roles.Manufacturer) == "true") {
      return <a href = "http://localhost:3000/ManufacturerPage">Account</a>
    } else if(localStorage.getItem(Roles.Admin) == "true") {
      return <a href = "http://localhost:3000/AdminPage">Account</a>
    } else {
      return <a href = "http://localhost:3000/Account">Account</a>
    }
  }


  return (
    <div className="NavContainer">
      <div className="navElements">
        <a href="http://localhost:3000/">Home</a>
        <a href="http://localhost:3000/shop">Shop</a>

        {/*localStorage.getItem("user") == "true" ? <a href = "http://localhost:3000/UserPage">Account</a> : <a href = "http://localhost:3000/Account">Account</a>*/}
        {signedInPage()}
      </div>
      <div className="bagContainer">
        <a href="http://localhost:3000/shoppingCart" className="bag"><BsBagDash /></a>
      </div>


    </div>
  );
}


export default NavBar;
