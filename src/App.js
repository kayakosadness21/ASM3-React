import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import Cart from "./Pages/Cart.jsx";
import Checkout from "./Pages/Checkout.jsx";
import Detail from "./Pages/Detail.jsx";
import Home from "./Pages/Home.jsx";
import Login from "./Comps/Components/AuthPage/AuthLogin";
import Register from "./Comps/Components/AuthPage/AuthRegister";
import Shop from "./Pages/Shop.jsx";
import Layout from "./Comps/Components/Layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Layout>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route path="/home" component={Home} />
          <Route path="/shop/:category" component={Shop} />
          <Route path="/detail/:id" component={Detail} />
          <Route path="/cart" component={Cart} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Layout>
      </Switch>
    </BrowserRouter>
  );
}
export default App;
