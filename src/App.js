import "./App.css";
// import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
// import { Navigate } from "react-router-dom";
import { useEffect } from "react";

import Signin from "./containers/Signin/index";
import Signup from "./containers/Signup/index";
import Home from "./containers/Home";

import { getAllCategory, addCategory, getInitialData } from "./actions";

import PrivateRoute from "./components/HOC/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedin } from "./actions";
import { Product } from "./containers/product";
import { Order } from "./containers/orders";
import { About } from "./containers/about";
import Category from "./containers/category";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedin());
    }
    if (auth.authenticate) {
      dispatch(getInitialData());
    }
  }, [auth.authenticate]);

  return (
    <div className="App">
      <Routes>
        {/* <PrivateRoute path="/" exact element={<Home />} /> */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/about"
          element={
            <PrivateRoute>
              <About />
            </PrivateRoute>
          }
        />
        <Route
          path="/product"
          element={
            <PrivateRoute>
              <Product></Product>
            </PrivateRoute>
          }
        />
        <Route
          path="/order"
          element={
            <PrivateRoute>
              <Order></Order>
            </PrivateRoute>
          }
        />
        <Route
          path="/category"
          element={
            <PrivateRoute>
              <Category></Category>
            </PrivateRoute>
          }
        />
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
