import classes from "./Layout.module.css";
import Footer from "./Footer";
import Navbar from "./Navbar";

function Layout(props) {
  return (
    <div className={classes.body}>
      <Navbar />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
