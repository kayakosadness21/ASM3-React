import { NavLink } from "react-router-dom";
import classUI from "./DarkButton.module.css";

function DarkButton(props) {
  return (
    <NavLink
      className={`${classUI["btn-dark"]} ${props.className}`}
      to={props.to}
      onClick={props.onClick}
    >
      {props.children}
    </NavLink>
  );
}

export default DarkButton;
