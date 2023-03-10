import Container from "../../UI/Container";
import classes from "./TopProducts.module.css";
import { useState, useEffect } from "react";
import useHttp from "../../Hooks/use-http";
import AProduct from "./AProduct";

function TopProducts() {
  const [data, setData] = useState([]);
  const { error, loading, requestAPI: product } = useHttp();

  // Lây danh sách sản phẩm
  useEffect(() => {
    const getProduct = (data) => {
      setData(data);
    };
    product(getProduct);
  }, [product]);

  return (
    <Container className={`${classes["top-product"]} mt-5`}>
      <div>
        <p>CAREFULLY CREATED COLLECTIONS</p>
        <h4>Browse our categories</h4>
      </div>

      <AProduct items={data} loading={loading} error={error} />
    </Container>
  );
}

export default TopProducts;
