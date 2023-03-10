import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { cartActions } from "../../../store";
import useHttp from "../../Hooks/use-http";
import { convertNumberToString } from "../../Hooks/utils";
import Container from "../../UI/Container";
import DarkButton from "../../UI/DarkButton";
import Description from "./Description";
import classes from "./ProductDetail.module.css";
import RelatedProduct from "./RelatedProduct";

function ProductDetail() {
  // Các biến trạng thái cho các sản phẩm liên quan, dữ liệu sản phẩm hiện tại và số lượng
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [data, setData] = useState({});
  const [quantity, setQuantity] = useState(1);

  // Lấy ID sản phẩm từ thông số URL
  const param = useParams();

  // Lấy dữ liệu sản phẩm từ API
  const { error, loading, requestAPI: product } = useHttp();
  const [img, setImg] = React.useState()

  // Lấy dữ liệu sản phẩm và category
  useEffect(() => {
    const getProduct = (item) => {
      setData(item[item.findIndex((e) => e._id.$oid === param.id)]);
      const cate =
        item[item.findIndex((e) => e._id.$oid === param.id)].category;
      setRelatedProduct(item.filter((e) => e.category === cate));
    };
    product(getProduct);
    setQuantity(1);
  }, [product, param]);
  function incrementHandler() {
    setQuantity(+quantity + 1);
  }

  useEffect(() => {
    setImg(data.img1)
  }, [data])

  function decrementHandler() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.data);

  // Thêm sản phẩm hiện tại vào giỏ hàng
  function addCarthandler(e, data) {
    // Kiểm tra người dùng đã đăng nhập chưa
    if (!user.isLogin) {
      // Nếu không, hiển thị cảnh báo và ngăn việc gửi biểu mẫu mặc định
      alert("Vui lòng đăng nhập trước!");
      e.preventDefault();
      return;
    } else {
      // Nếu người dùng đã đăng nhập, kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
      if (cart.findIndex((item) => item._id.$oid === data._id.$oid) > -1) {
        // Nếu sản phẩm đã có trong giỏ hàng, hiển thị cảnh báo và ngăn việc gửi biểu mẫu mặc định
        alert("Đã có sản phẩm trong giỏ hàng");
        e.preventDefault();
        return;
      } else {
        // Nếu sản phẩm chưa có trong giỏ hàng thì thêm vào giỏ hàng với số lượng hiện tại
        data = { ...data, quantity: quantity };
        dispatch(cartActions.addCart({ newData: data, userId: user.name }));
      }
    }
  }

  let contents = "";

  const handleImg = (img) => {
    setImg(img)
  }

  if (Boolean(data)) {
    contents = (
      <div className={`${classes["product-detail"]} mt-5`}>
        <div className="d-flex">
          <div className={`${classes["type"]} d-flex flex-column gap-3`}>
            <img onClick={() => handleImg(data.img1)} src={data.img1} alt=""></img>
            <img onClick={() => handleImg(data.img2)} src={data.img2} alt=""></img>
            <img onClick={() => handleImg(data.img3)} src={data.img3} alt=""></img>
            <img onClick={() => handleImg(data.img4)} src={data.img4} alt=""></img>
          </div>
          <img src={img} alt="" className="img-fluid"></img>
          <div className="mx-3">
            <h3>{data.name}</h3>
            <p>{data.price ? convertNumberToString(data.price) : ""} VND</p>
            <p>{data.short_desc}</p>

            <p>
              <strong className="text-dark">CATEGORY:</strong> {data.category}
            </p>
            <div className={`${classes.quality}`}>
              <span className="d-flex justify-content-between">
                <input
                  placeholder="QUANTITY"
                  type="number"
                  min={0}
                  disabled={true}
                ></input>
                <div>
                  <span onClick={decrementHandler}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#333333"
                      viewBox="0 0 256 256"
                    >
                      <rect width="256" height="256" fill="none"></rect>
                      <path d="M163.1,40.6a8.4,8.4,0,0,0-8.8,1.7l-80,80a8.1,8.1,0,0,0,0,11.4l80,80A8.3,8.3,0,0,0,160,216a8.5,8.5,0,0,0,3.1-.6A8,8,0,0,0,168,208V48A8,8,0,0,0,163.1,40.6Z"></path>
                    </svg>
                  </span>
                  {quantity}
                  <span onClick={incrementHandler}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#333333"
                      viewBox="0 0 256 256"
                    >
                      <rect width="256" height="256" fill="none"></rect>
                      <path d="M181.7,122.3l-80-80a8.4,8.4,0,0,0-8.8-1.7A8,8,0,0,0,88,48V208a8,8,0,0,0,4.9,7.4,8.5,8.5,0,0,0,3.1.6,8.3,8.3,0,0,0,5.7-2.3l80-80A8.1,8.1,0,0,0,181.7,122.3Z"></path>
                    </svg>
                  </span>
                </div>
              </span>
              <DarkButton onClick={(e) => addCarthandler(e, data)} to="/cart">
                Add to cart
              </DarkButton>
            </div>
          </div>
        </div>
        <Description desc={data.long_desc} />
        <RelatedProduct related={relatedProduct} id={param.id} />
      </div>
    );
  }

  if (error) {
    contents = <h1 className="text-center pt-5">Không tìm thấy sản phẩm!</h1>;
  }

  if (loading) {
    contents = "Loading...";
  }

  return <Container>{contents}</Container>;
}
export default ProductDetail;
