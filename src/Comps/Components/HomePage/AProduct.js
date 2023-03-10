import { useSelector, useDispatch } from "react-redux";
import { popupActions } from "../../../store/index";
import { convertNumberToString } from "../../Hooks/utils";

import classes from "./AProduct.module.css";
import Popup from "./Popup";

function AProduct(props) {
  let contents = <p>No product found!</p>;

  // Lấy 8 sản phẩm đầu tiên
  const items = props.items.slice(0, 8);

  const popup = useSelector((state) => state.popup.popupShow);
  const data = useSelector((state) => state.popup.data);
  const dispatch = useDispatch();

  // Hàm sử lý sự kiện click vào sản phẩm.
  function clickProductHandler(id) {
    // Hiển thị popup
    dispatch(
      popupActions.show(
        props.items.filter((e) => {
          return e._id.$oid.includes(id);
        })[0]
      )
    );
  }

  // render danh sách sản phẩm
  if (items.length > 0) {
    contents = (
      <div className="d-flex flex-wrap justify-content-md-between justify-content-center">
        {items.map((e) => (
          <div
            key={e._id.$oid}
            className={`text-center ${classes.product}`}
            onClick={() => clickProductHandler(e._id.$oid)}
          >
            <img src={e.img1} alt="" className="img-fluid"></img>
            <div>
              <p className={classes.title}>{e.name}</p>
              <p className={classes.price}>
                {convertNumberToString(e.price)} VND
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (props.error) {
    contents = "Something was wrong!";
  }

  if (props.loading) {
    contents = "Loading...";
  }

  return (
    <div>
      {contents}

      <Popup
        show={popup}
        onHide={() => dispatch(popupActions.hide())}
        data={data}
      />
    </div>
  );
}

export default AProduct;
