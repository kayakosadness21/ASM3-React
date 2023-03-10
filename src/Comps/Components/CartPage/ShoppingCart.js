import classes from "./ShoppingCart.module.css";
import { convertNumberToString } from "../../Hooks/utils";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../../store";

function ShoppingCart() {
  const user = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  // Tải giỏ hàng của người dùng
  useEffect(() => {
    dispatch(cartActions.loadCart(user.name));
  }, [dispatch, user]);

  // Lấy dữ liệu giỏ hàng
  const data = useSelector((state) => state.cart.data);

  // Giảm số lượng item
  const decrementHandler = (index) => {
    let updatedData = data.map((item, i) => {
      if (i === index && item.quantity > 1) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    dispatch(
      cartActions.updateCart({ newData: updatedData, userId: user.name })
    );
  };

  // Tăng số lượng item
  const incrementHandler = (index) => {
    let updatedData = data.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    dispatch(
      cartActions.updateCart({ newData: updatedData, userId: user.name })
    );
  };

  // Xóa item
  const removeHandler = (index) => {
    let updatedData = data.filter((item, i) => i !== index);
    dispatch(
      cartActions.updateCart({ newData: updatedData, userId: user.name })
    );
  };

  return (
    <div className=" col col-md-8 p-0 me-4">
      <table
        className={`${classes["shopping-cart"]} table table-borderless text-center`}
      >
        <thead>
          <tr className="bg-light">
            <th scope="col" className="d-none d-sm-block">
              IMAGE
            </th>

            <th scope="col">PRODUCT</th>

            <th scope="col">PRICE</th>

            <th scope="col">QUANTITY</th>

            <th scope="col">TOTAL</th>

            <th scope="col">REMOVE</th>
          </tr>
        </thead>
        <tbody className={classes["list-item"]}>
          {data.map((item, index) => (
            <tr key={item._id.$oid} className="mb-3 align-middle">
              <td className="d-none d-sm-block">
                <img src={item.img1} alt=""></img>
              </td>

              <td className="fw-bold">{item.name}</td>

              <td className="text-secondary fs-6">
                {convertNumberToString(item.price)} VND
              </td>

              <td>
                <span onClick={() => decrementHandler(index)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#333333"
                    viewBox="0 0 256 256"
                  >
                    <rect width="256" height="256" fill="none"></rect>
                    <path d="M163.1,40.6a8.4,8.4,0,0,0-8.8,1.7l-80,80a8.1,8.1,0,0,0,0,11.4l80,80A8.3,8.3,0,0,0,160,216a8.5,8.5,0,0,0,3.1-.6A8,8,0,0,0,168,208V48A8,8,0,0,0,163.1,40.6Z"></path>
                  </svg>
                </span>
                {item.quantity}
                <span onClick={() => incrementHandler(index)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#333333"
                    viewBox="0 0 256 256"
                  >
                    <rect width="256" height="256" fill="none"></rect>
                    <path d="M181.7,122.3l-80-80a8.4,8.4,0,0,0-8.8-1.7A8,8,0,0,0,88,48V208a8,8,0,0,0,4.9,7.4,8.5,8.5,0,0,0,3.1.6,8.3,8.3,0,0,0,5.7-2.3l80-80A8.1,8.1,0,0,0,181.7,122.3Z"></path>
                  </svg>
                </span>
              </td>

              <td className="text-secondary">
                {convertNumberToString(+item.price * item.quantity)} VND
              </td>

              <td>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#333333"
                  viewBox="0 0 256 256"
                  onClick={() => removeHandler(index)}
                >
                  <rect width="256" height="256" fill="none"></rect>
                  <line
                    x1="216"
                    y1="56"
                    x2="40"
                    y2="56"
                    fill="none"
                    stroke="#333333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="12"
                  ></line>
                  <line
                    x1="104"
                    y1="104"
                    x2="104"
                    y2="168"
                    fill="none"
                    stroke="#333333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="12"
                  ></line>
                  <line
                    x1="152"
                    y1="104"
                    x2="152"
                    y2="168"
                    fill="none"
                    stroke="#333333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="12"
                  ></line>
                  <path
                    d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56"
                    fill="none"
                    stroke="#333333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="12"
                  ></path>
                  <path
                    d="M168,56V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V56"
                    fill="none"
                    stroke="#333333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="12"
                  ></path>
                </svg>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="bg-light d-flex justify-content-between p-3">
        <NavLink
          to="/shop"
          className="mt-1 text-secondary text-decoration-none "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#333333"
            viewBox="0 0 256 256"
          >
            <rect width="256" height="256" fill="none"></rect>
            <path d="M224,128a8,8,0,0,1-8,8H120v64a8,8,0,0,1-4.9,7.4,8.5,8.5,0,0,1-3.1.6,8.3,8.3,0,0,1-5.7-2.3l-72-72a8.1,8.1,0,0,1,0-11.4l72-72a8.4,8.4,0,0,1,8.8-1.7A8,8,0,0,1,120,56v64h96A8,8,0,0,1,224,128Z"></path>
          </svg>
          Continue shopping
        </NavLink>

        <NavLink
          to="/checkout"
          className="border border-secondary px-3 py-1 text-secondary text-decoration-none"
        >
          Proceed to checkout
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#333333"
            viewBox="0 0 256 256"
          >
            <rect width="256" height="256" fill="none"></rect>
            <path d="M221.7,133.7l-72,72A8.3,8.3,0,0,1,144,208a8.5,8.5,0,0,1-3.1-.6A8,8,0,0,1,136,200V136H40a8,8,0,0,1,0-16h96V56a8,8,0,0,1,4.9-7.4,8.4,8.4,0,0,1,8.8,1.7l72,72A8.1,8.1,0,0,1,221.7,133.7Z"></path>
          </svg>
        </NavLink>
      </div>
    </div>
  );
}

export default ShoppingCart;
