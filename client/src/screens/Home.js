import { useEffect } from "react";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import banner from "../movies/banner.mp4";
import all from "../images/all.png";
import men from "../images/men.png";
import women from "../images/women.png";

function Home() {

  return (
    <div>
      <NavBar />
      <video src={banner} autoPlay loop muted playsInline className="back-video"/>
      <div className="homepageContainer">
        <div className="logoContainer">
          <h1>SIKE</h1>
          <h3>WEARS</h3>
          <p className="slogan">We aren't just a shoe brand, we're a meme brand</p>
        </div>
        <div className="categoryContainer">

          <div onClick={() => { window.location.href = "http://localhost:3000/shop" }} className="category">
              <img src={men}/>
              For MEN
          </div>
          <div onClick={() => { window.location.href = "http://localhost:3000/shop" }} className="category">
              <img src={women}/>
              For WOMEN
          </div>
          <div onClick={() => { window.location.href = "http://localhost:3000/shop" }} className="category">
              <img src={all}/>
              For ALL
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;