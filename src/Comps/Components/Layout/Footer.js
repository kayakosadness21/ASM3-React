import { NavLink } from "react-router-dom";
import Container from "../../UI/Container";
import ChatPopup from "../ChatPopup/ChatPopup";
import classes from "./Footer.module.css";

function Footer() {
  return (
    <div className={`${classes.footer}`}>
      <ChatPopup />
      <Container className="d-flex justify-content-between">
        <div>
          <h5>Customer services</h5>
          <ul>
            <li>
              <NavLink to="#">Help & Contact Us</NavLink>
            </li>
            <li>
              <NavLink to="#">Return & Refunds</NavLink>
            </li>
            <li>
              <NavLink to="#">Online Store</NavLink>
            </li>
            <li>
              <NavLink to="#">Terms & Conditions</NavLink>
            </li>
          </ul>
        </div>
        <div>
          <h5>Company</h5>
          <ul>
            <li>
              <NavLink to="#">What We Do</NavLink>
            </li>
            <li>
              <NavLink to="#">Available Services</NavLink>
            </li>
            <li>
              <NavLink to="#">Lastest Posts</NavLink>
            </li>
            <li>
              <NavLink to="#">FAQs</NavLink>
            </li>
          </ul>
        </div>
        <div>
          <h5>Social Media</h5>
          <ul>
            <li>
              <NavLink to="#">Twitter</NavLink>
            </li>
            <li>
              <NavLink to="#">Instagram</NavLink>
            </li>
            <li>
              <NavLink to="#">Facebook</NavLink>
            </li>
            <li>
              <NavLink to="#">Pinterest</NavLink>
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
}

export default Footer;
