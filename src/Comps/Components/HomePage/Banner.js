import Container from "../../UI/Container";
import DarkButton from "../../UI/DarkButton";
import classes from "./Banner.module.css";
import {} from "react-router-dom";

function Banner() {
  return (
    <Container className={classes.banner}>
      <img src="./Resource/banner1.jpg" alt="..." />
      <div>
        <p>NEW INSPIRATION 2020</p>
        <h2>20% OFF ON NEW SEASON</h2>
        <DarkButton className={classes["btn-banner"]} to="/shop">
          Browse collections
        </DarkButton>
      </div>
    </Container>
  );
}

export default Banner;
