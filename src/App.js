import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import AppBar from "./components/Header/AppBar/AppBar";
import Home from "./components/Home/Home";
import Register from "./components/Login/Register/Register";
import AllProducts from "./components/Main/Products/AllProducts/AllProducts";
import NotFound from "./components/NotFound/NotFound";
import ProductDetails from "./components/Private/ProductDetails/ProductDetails";
import AuthProvider from "./contexts/AuthProvider/AuthProvider";
import Login from "./components/Login/Login/Login";
import PrivateRoute from "./components/Private/PrivateRoute/PrivateRoute";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <AppBar />
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route path="/home">
              <Home></Home>
            </Route>
            <Route path="/allProducts">
              <AllProducts></AllProducts>
            </Route>
            <PrivateRoute path="/productDetails/:id">
              <ProductDetails></ProductDetails>
            </PrivateRoute>
            <Route path="/register">
              <Register></Register>
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="*">
              <NotFound></NotFound>
            </Route>
          </Switch>
          <Footer />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
