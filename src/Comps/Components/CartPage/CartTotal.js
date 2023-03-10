import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../../store";
import { convertNumberToString } from "../../Hooks/utils";
import classes from "./CartTotal.module.css";

function CartTotal() {
  // Lấy user và hàm dispatch từ Redux store
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Tải giỏ hàng của người dùng
  useEffect(() => {
    dispatch(cartActions.loadCart(user.name));
  }, [dispatch, user]);
  const data = useSelector((state) => state.cart.data);

  let totalPrice = 0;

  // Lặp lại từng mặt hàng trong giỏ hàng và thêm (giá * số lượng) của mỗi món hàng vào tổng giá
  for (let i = 0; i < data.length; i++) {
    totalPrice += data[i].price * data[i].quantity;
  }

  return (
    <div
      className={`${classes["cart-total"]} bg-light col p-4 d-flex flex-column gap-3`}
    >
      <h5>CART TOTAL</h5>

      <div className="border-bottom d-flex justify-content-between">
        <strong>SUBTOTAL </strong>
        <p className="mb-0">{convertNumberToString(totalPrice)} VND</p>
      </div>

      <div className="d-flex justify-content-between">
        <strong>TOTAL</strong>
        <p className="fs-5">{convertNumberToString(totalPrice)} VND</p>
      </div>

      <div>
        <input
          type="text"
          placeholder="Enter your coupon"
          className="p-2 w-100"
        ></input>
        <button className="p-2 w-100">Apply coupon</button>
      </div>
    </div>
  );
}

export default CartTotal;
