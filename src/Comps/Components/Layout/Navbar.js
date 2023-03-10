import { NavLink } from "react-router-dom";
import Container from "../../UI/Container";
import classes from "./Navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../store";
import { useEffect } from "react";
import { FaLuggageCart } from 'react-icons/fa'

function Navbar() {
  // Lấy dữ liệu người dùng hiện tại, nếu không có thì trả về object rỗng
  let currentUser = localStorage.getItem("USER")
    ? JSON.parse(localStorage.getItem("USER"))
    : {};

  const isLogin = useSelector((state) => state.auth.isLogin);
  const dispatch = useDispatch();

  // Kiểm tra có người dùng đăng nhập chưa khi khởi động lại trình duyệt
  useEffect(() => {
    if (currentUser.name) {
      dispatch(authActions.login(currentUser));
    }
  });

  // Sự kiện logout
  function logoutHandler() {
    dispatch(authActions.logout());
    window.location.replace("/");
  }

  return (
    <Container className={classes.navbar}>
      <nav className="row">
        <div className="col-md-3 d-flex justify-content-md-start justify-content-center">
          <NavLink to="/home" activeClassName={classes.active}>
            Home
          </NavLink>
          <NavLink to="/shop" activeClassName={classes.active}>
            Shop
          </NavLink>
        </div>
        <div className="col-md-6">
          <h4>Boutique</h4>
        </div>

        <div className="col-md-3 d-flex justify-content-md-end justify-content-center">
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            width="192"
            height="192"
            viewBox="0 0 256 256"
          >
            <rect width="256" height="256" fill="none"></rect>
            <path d="M223.9,65.4l-12.2,66.9A24,24,0,0,1,188.1,152H72.1l4.4,24H184a24,24,0,1,1-24,24,23.6,23.6,0,0,1,1.4-8H102.6a23.6,23.6,0,0,1,1.4,8,24,24,0,1,1-42.2-15.6L34.1,32H16a8,8,0,0,1,0-16H34.1A16,16,0,0,1,49.8,29.1L54.7,56H216a7.9,7.9,0,0,1,6.1,2.9A7.7,7.7,0,0,1,223.9,65.4Z"></path>
          </svg> */}
          <span ><FaLuggageCart /></span>
          <NavLink to="/cart" activeClassName={classes.active}>
            Cart
          </NavLink>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="192"
            height="192"
            viewBox="0 0 256 256"
          >
            <rect width="256" height="256" fill="none"></rect>
            <path d="M231.9,212a120.7,120.7,0,0,0-67.1-54.2,72,72,0,1,0-73.6,0A120.7,120.7,0,0,0,24.1,212a7.7,7.7,0,0,0,0,8,7.8,7.8,0,0,0,6.9,4H225a7.8,7.8,0,0,0,6.9-4A7.7,7.7,0,0,0,231.9,212Z"></path>
          </svg>

          {/* Kiểm tra trạng thái login */}
          {!isLogin ? (
            <NavLink to="/login" activeClassName={classes.active}>
              Login
            </NavLink>
          ) : (
            <span className="mt-1">
              {currentUser.name}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#000"
                viewBox="0 0 256 256"
                className={classes.caret}
              >
                <rect width="256" height="256" fill="none"></rect>
                <path d="M215.4,92.9A8,8,0,0,0,208,88H48a8,8,0,0,0-7.4,4.9,8.4,8.4,0,0,0,1.7,8.8l80,80a8.2,8.2,0,0,0,11.4,0l80-80A8.4,8.4,0,0,0,215.4,92.9Z"></path>
              </svg>{" "}
              <span className={classes["btn-out"]} onClick={logoutHandler}>
                (Logout)
              </span>
            </span>
          )}
        </div>
      </nav>
    </Container>
  );
}

export default Navbar;
