function Footer({ home }) {
    return (
        <footer className="footerContainer">
            <div className="menuContainer">
                <li><a href="http://localhost:3000/">Home</a></li>
                <li><a href="http://localhost:3000/About">About</a></li>
                <li><a href="http://localhost:3000/Services">Services</a></li>
                <li><a href="http://localhost:3000/Team">Team</a></li>
                <li><a href="http://localhost:3000/Contact">Contact</a></li>
            </div>
            <p>Ⓒ 2022 SIKE WEARS | All Rights Reserved</p>
        </footer>
    );
}

export default Footer;