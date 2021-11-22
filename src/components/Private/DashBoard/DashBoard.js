import React from "react";
import { Col, Container, Nav, Row } from "react-bootstrap";
import { NavLink, useRouteMatch, Switch, Route } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import AddProduct from "../AddProduct/AddProduct";
import AdminRoute from "../AdminRoute/AdminRoute";
import CheckOut from "../CheckOut/CheckOut";
import MakeAdmin from "../MakeAdmin/MakeAdmin";
import ManageOrders from "../ManageOrders/ManageOrders";
import ManageProducts from "../ManageProducts/ManageProducts";
import Review from "../Review/Review";
import UserOrders from "../UserOrders/UserOrders";
import "./DashBoard.css";
const DashBoard = () => {
  document.title = "DJI / Dashboard";
  const { user, admin } = useAuth();
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
                <Nav>
                  <ul className="my-3 text-start">
                    {!admin && (
                      <Nav.Link as={NavLink} to={`${url}`}>
                        <li className="my-4"> My Orders</li>
                      </Nav.Link>
                    )}

                    {admin && (
                      <div>
                        <Nav.Link as={NavLink} to={`${url}`}>
                          <li className="my-4">Manage Orders</li>
                        </Nav.Link>

                        <Nav.Link as={NavLink} to={`${url}/manageProducts`}>
                          <li className="my-4">Manage Products</li>
                        </Nav.Link>

                        <Nav.Link as={NavLink} to={`${url}/addProduct`}>
                          <li className="my-4">Add a Product</li>
                        </Nav.Link>

                        <Nav.Link as={NavLink} to={`${url}/makeAdmin`}>
                          Make admin
                        </Nav.Link>
                      </div>
                    )}

                    {!admin && (
                      <div>
                        <Nav.Link as={NavLink} to={`${url}/review`}>
                          <li className="my-4"> Add a Review</li>
                        </Nav.Link>

                        <Nav.Link as={NavLink} to={`${url}/checkOut`}>
                          <li className="my-4">Check Out</li>
                        </Nav.Link>
                      </div>
                    )}
                  </ul>
                </Nav>
              </div>
            </Col>
            <Col sm={9} md={9}>
              <div className="dashboard-details text-light rounded my-2 py-3">
                <Switch>
                  <Route exact path={`${path}/checkOut`}>
                    <CheckOut></CheckOut>
                  </Route>
                  {!admin && (
                    <Route exact path={`${path}`}>
                      <UserOrders></UserOrders>
                    </Route>
                  )}
                  {admin && (
                    <AdminRoute exact path={`${path}`}>
                      <ManageOrders></ManageOrders>
                    </AdminRoute>
                  )}
                  {admin && (
                    <AdminRoute exact path={`${path}/manageProducts`}>
                      <ManageProducts></ManageProducts>
                    </AdminRoute>
                  )}
                  {admin && (
                    <AdminRoute exact path={`${path}/addProduct`}>
                      <AddProduct></AddProduct>
                    </AdminRoute>
                  )}
                  {admin && (
                    <AdminRoute exact path={`${path}/makeAdmin`}>
                      <MakeAdmin></MakeAdmin>
                    </AdminRoute>
                  )}
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
