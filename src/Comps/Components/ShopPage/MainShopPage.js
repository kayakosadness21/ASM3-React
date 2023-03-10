import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import useHttp from "../../Hooks/use-http";
import Container from "../../UI/Container";
import classes from "./MainShopPage.module.css";
import ProductList from "./ProductList";

function MainShopPage() {
  const history = useHistory();
  const params = useParams();

  const [data, setData] = useState([]);
  const { error, loading, requestAPI: product } = useHttp();

  useEffect(() => {
    const getProduct = (data) => {
      setData(data);
    };
    product(getProduct);
  }, [product]);

  function clickCategoryHandler(category) {
    history.push(`/shop/${category}`)
  }

  return (
    <Container>
      <div
        className={`${classes.header} d-flex justify-content-between align-items-center bg-light p-5`}
      >
        <h3>Shop</h3>
        <p>shop</p>
      </div>
      <div className={`${classes.subnav} row m-0 mt-5`}>
        <ul className="col-md-3">
          <h4>categories</h4>
          <li className={`${classes.titleCategory} bg-dark text-light`}>
            Apple
          </li>
          <li
            onClick={() => clickCategoryHandler("all")}
            className={`${params.category === "all" ? classes.active : ""}`}
          >
            All
          </li>
          <li className={`${classes.titleCategory} bg-secondary bg-opacity-25`}>
            Iphone & Mac
          </li>
          <li
            onClick={() => clickCategoryHandler("iphone")}
            className={`${params.category === "iphone" ? classes.active : ""}`}
          >
            IPhone
          </li>
          <li
            onClick={() => clickCategoryHandler("ipad")}
            className={`${params.category === "ipad" ? classes.active : ""}`}
          >

          </li>
          <li
            onClick={() => clickCategoryHandler("mac")}
            className={`${params.category === "mac" ? classes.active : ""}`}
          >
            Macbook
          </li>
          <li className={`${classes.titleCategory} bg-secondary bg-opacity-25`}>
            Wireless
          </li>
          <li
            onClick={() => clickCategoryHandler("airpods")}
            className={`${params.category === "airpods" ? classes.active : ""}`}
          >
            Airpod
          </li>
          <li
            onClick={() => clickCategoryHandler("watch")}
            className={`${params.category === "watch" ? classes.active : ""}`}
          >
            Watch
          </li>

        </ul>

        <ProductList
          items={data}
          error={error}
          loading={loading}
          className="col-md-9"
          category={params.category}
        ></ProductList>
      </div>
    </Container>
  );
}

export default MainShopPage;
