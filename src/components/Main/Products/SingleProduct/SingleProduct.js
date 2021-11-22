import React from "react";
import { Button, Card, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const SingleProduct = ({ product }) => {
  const { title, image, price, _id } = product;
  return (
    <div data-aos="fade-down">
      <Col className="reviewContainer border-0">
        <Card className="h-100 service">
          <Card.Img variant="top" src={image} height="400" />
          <Card.Body className="custom-card">
            <div className="d-flex  justify-content-between">
              <Card.Title>
                {" "}
                <h4> {title}</h4>
              </Card.Title>
              <Card.Text>
                {" "}
                <p>
                  <strong>Starts from ${price}</strong>
                </p>{" "}
              </Card.Text>
            </div>
            <NavLink to={`/productDetails/${_id}`}>
              <Button className="mt-3 project-btn">View details</Button>
            </NavLink>
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
};

export default SingleProduct;
