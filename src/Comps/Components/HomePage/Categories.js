import { NavLink, use } from "react-router-dom";
import Container from "../../UI/Container";
import classes from "./Categories.module.css";

function Categories() {
  const category = [
    {
      category: "iphone",
      img: `./Resource/product_1.png`
    },
    {
      category: "mac",
      img: `./Resource/product_2.png`
    },
    {
      category: "ipad",
      img: `./Resource/product_3.png`
    },
    {
      category: "watch",
      img: `./Resource/product_4.png`
    },
    {
      category: "airpods",
      img: `./Resource/product_5.png`
    }
  ];


  return (
    <Container className={`${classes.categories} text-center`}>
      <div>
        <p>CAREFULLY CREATED COLLECTIONS</p>
        <h4>Browse our categories</h4>
      </div>
      <div className="d-flex flex-wrap justify-content-lg-between justify-content-center gap-4">
        {category.map((e) => (
          <NavLink to={`/shop/${e.category}`}>
            <img src={e.img} alt="..." className="img-fluid" />
          </NavLink>
        ))}
      </div>
    </Container>
  );
}
export default Categories;
