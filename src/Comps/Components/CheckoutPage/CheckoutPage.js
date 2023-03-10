import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../../store";
import { convertNumberToString } from "../../Hooks/utils";
import Container from "../../UI/Container";
import DarkButton from "../../UI/DarkButton";
import classes from "./CheckoutPage.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
  full_name: yup.string().required(),
  email: yup.string().required(),
  phone: yup.number().positive().integer().required(),
  address: yup.string().required(),
}).required();

function CheckoutPage() {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const fullName = useRef();
  const [email, updateEmail] = useState('');
  console.log(email)
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const onSubmit = data => console.log(data);
  // const address = useRef();
  // const phone = useRef();

  //  Tải giỏ hàng của người dùng
  useEffect(() => {
    dispatch(cartActions.loadCart(user.name));
    if (!user.name) {
      alert("Cần đăng nhập để đặt hàng!");
      window.location.replace("/");
    }
  }, [dispatch, user]);

  // Kiếm dữ liệu từ redux
  const data = useSelector((state) => state.cart.data);

  // Khai báo biến tổng và tính tổng tiền hàng trong giỏ
  let totalPrice = 0;
  for (let i = 0; i < data.length; i++) {
    totalPrice += data[i].price * data[i].quantity;
  }

  //  Khai báo 1 state để lưu giá trị có lỗi k
  const [errorName, setErrorName] = useState(false)
  const onClickSubmit = () => {
    const valueFullName = fullName.current.value

    !valueFullName ? setErrorName(true) : setErrorName(false)

    //   if (valueFullName === '') {
    //   setErrorName(true)
    // }
    // if (valueFullName) {
    //   setErrorName(false)
    // }
  }
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const checkEmail = email.match(mailformat) ? 1 : 0;

  console.log('check', checkEmail)
  return (
    <Container className={`${classes["checkout"]} mb-5`}>
      <div
        className={`${classes.header} d-flex justify-content-between align-items-center bg-light p-5 mb-5`}
      >
        <h3>CHECK OUT</h3>

        <p>
          <strong className="fw-semibold">HOME / CART /</strong> CHECK OUT
        </p>
      </div>
      <h5>BUILLING DETAIL</h5>

      <div className={`${classes.detail} row`}>
        <form
          className={`${classes.form} d-flex flex-column align-items-start pe-3 col col-md-8`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <label>FULL NAME:</label>
          <input placeholder="Enter Your Full Name Here!" {...register("full_name")} defaultValue="" />
          {errors.full_name && <span>loi nhap ten </span>}
          <label>EMAIL:</label>
          <input placeholder="Enter Your EmailHere!" {...register("email")} defaultValue="" />
          {errors.email && <span>loi nhap email </span>}
          <label>PHONE NUMBER:</label>
          <input placeholder="Enter Your Phone Number Here!" {...register("phone")} defaultValue="" />
          {errors.phone && <span>loi nhap sdt </span>}
          <label>ADDRESS:</label>
          <input placeholder="Enter Your Address Here!" {...register("address")} defaultValue="" />
          {errors.address && <span>loi nhap dia chi </span>}
          {/* {errorName && <p>loi nhap ten </p>} */}
          {/* <label>EMAIL:</label>
          <input
            placeholder="Enter Your Email Here!"
            onChange={(e) => updateEmail(e.target.value)}
            value={email} className={1 ? 'mailok' : 'mailnotok'}></input>
          <div class="valid-feedback">
            Looks good!
          </div> */}

          {/* <label>PHONE NUMBER:</label>
          <input placeholder="Enter Your Phone Number Here!"></input>

          <label>ADDRESS:</label>
          <input placeholder="Enter Your Address Here!"></input> */}


          <DarkButton to="#" onClick={handleSubmit(onSubmit)} className="d-inline mt-3">
            Place order
          </DarkButton>
          {/* <DarkButton to="#" onClick={onClickSubmit} className="d-inline mt-3">
            Place order
          </DarkButton> */}
        </form>

        <div className={`${classes.order} bg-light py-4 px-3 col`}>
          <h5>YOUR ORDER</h5>

          <ul className="list-group list-group-flush bg-light">
            {data.map((item) => (
              <li className="list-group-item bg-light" key={item._id.$oid}>
                <p>{item.name}</p>
                <p>
                  {convertNumberToString(item.price)} VND x {item.quantity}
                </p>
              </li>
            ))}

            <li className="list-group-item d-flex justify-content-between bg-light">
              <p>TOTAL</p>
              <p className="text-dark fs-5">
                {convertNumberToString(totalPrice)} VND
              </p>
            </li>
          </ul>
        </div>
      </div>
    </Container>
  );
}

export default CheckoutPage;
