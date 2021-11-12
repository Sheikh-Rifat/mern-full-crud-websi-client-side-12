import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { NavLink, useRouteMatch, Switch, Route } from "react-router-dom";
import useFirebase from "../../../hooks/useFirebase";
import AddProduct from "../AddProduct/AddProduct";
import CheckOut from "../CheckOut/CheckOut";
import MakeAdmin from "../MakeAdmin/MakeAdmin";
import ManageOrders from "../ManageOrders/ManageOrders";
import ManageProducts from "../ManageProducts/ManageProducts";
import Review from "../Review/Review";
import UserOrders from "../UserOrders/UserOrders";
import "./DashBoard.css";
const DashBoard = () => {
  const { user } = useFirebase();
  let { path, url } = useRouteMatch();
  return (
    <div className="dashboard-section">
      <h2 className="my-4">User Dashboard of {user.displayName}</h2>
      <div className="bg-secondary">
        <Container>
          <Row>
            <Col
              className=" bg-black text-light rounded my-2 py-3"
              sm={3}
              md={3}
            >
              <div className="dashboard ">
                <h4 className="border-bottom">Dashboard</h4>
                <ul className="my-3 text-start">
                  <NavLink to={`${url}`}>
                    <li className="my-4"> My Orders</li>
                  </NavLink>

                  <NavLink to={`${url}/manageOrders`}>
                    <li className="my-4">Manage Orders</li>
                  </NavLink>

                  <NavLink to={`${url}/manageProducts`}>
                    <li className="my-4">Manage Products</li>
                  </NavLink>

                  <NavLink to={`${url}/addProduct`}>
                    <li className="my-4">Add a Product</li>
                  </NavLink>

                  <NavLink to={`${url}/makeAdmin`}>
                    <li className="my-4">Make admin</li>
                  </NavLink>

                  <NavLink to={`${url}/review`}>
                    <li className="my-4"> Add a Review</li>
                  </NavLink>

                  <NavLink to={`${url}/checkOut`}>
                    <li className="my-4">Check Out</li>
                  </NavLink>
                </ul>
              </div>
            </Col>
            <Col sm={9} md={9}>
              <div className="dashboard-details text-light rounded my-2 py-3">
                <Switch>
                  <Route exact path={`${path}/checkOut`}>
                    <CheckOut></CheckOut>
                  </Route>
                  <Route exact path={`${path}`}>
                    <UserOrders></UserOrders>
                  </Route>
                  <Route exact path={`${path}/manageOrders`}>
                    <ManageOrders></ManageOrders>
                  </Route>
                  <Route exact path={`${path}/manageProducts`}>
                    <ManageProducts></ManageProducts>
                  </Route>
                  <Route exact path={`${path}/addProduct`}>
                    <AddProduct></AddProduct>
                  </Route>
                  <Route exact path={`${path}/makeAdmin`}>
                    <MakeAdmin></MakeAdmin>
                  </Route>
                  <Route exact path={`${path}/review`}>
                    <Review></Review>
                  </Route>
                </Switch>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default DashBoard;
