import { useRef } from "react";

import classes from "./AuthRegister.module.css";

import { NavLink } from "react-router-dom";
//  Tiêu chí số 8
function Register() {
  // Tạo ref cho mỗi form input
  const fullNameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const phoneRef = useRef();
  const userArr = localStorage.getItem("USER_LIST")
    ? JSON.parse(localStorage.getItem("USER_LIST"))
    : [];

  // Hàm này được gọi khi biểu mẫu được gửi
  function signUpHandle(e) {
    e.preventDefault();
    // Tạo một đối tượng với các giá trị đầu vào của form
    const temp = {
      name: fullNameRef.current.value,
      email: emailRef.current.value,
      pass: passRef.current.value,
      phone: phoneRef.current.value,
    };

    // Kiểm tra xem email đã được dùng tới k
    if (temp.pass.trim().length <= 8) {
      alert('Mật khẩu phải hơn 8 ký tự 🦠');
      passRef.current.focus();
      return
    }
    if (userArr.findIndex((el) => el.email === temp.email) > -1) {
      alert("Email đã được DÙNG!");
      emailRef.current.focus();
      return;
    }

    userArr.push(temp);
    localStorage.setItem("USER_LIST", JSON.stringify(userArr));
    window.location.replace("/login");
  }

  return (
    <div className={`${classes.register} position-relative`}>
      <div className="position-absolute top-50 start-50 translate-middle bg-white text-center p-5 rounded-3 shadow">
        <h3 className="fw-normal text-secondary fst-italic">Sign Up</h3>
        <form
          className={`${classes.form} d-flex flex-column`}
          onSubmit={signUpHandle}
        >
          <input
            type="text"
            placeholder="Full Name"
            ref={fullNameRef}
            required
          />
          <input type="email" placeholder="Email" ref={emailRef} required />
          <input
            type="password"
            placeholder="Password"
            ref={passRef}
            required
          />
          <input
            type="tel"
            placeholder="Phone"
            ref={phoneRef}
            required
            pattern="0[0-9]{3}[0-9]{3}[0-9]{3}"
            maxLength={10}
            title="0 xxx xxx xxx"
          ></input>
          <button className="border-0 text-light mt-4 mb-5 p-3" type="submit">
            SIGN UP
          </button>
        </form>
        <p className="text-secondary fst-italic">
          Login? <NavLink to="/login">Click</NavLink>
        </p>
      </div>
    </div>
  );
}

export default Register;
