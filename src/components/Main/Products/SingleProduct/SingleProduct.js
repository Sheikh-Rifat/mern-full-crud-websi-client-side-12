import React from "react";
import { Button, Card, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const SingleProduct = ({ product }) => {
  const { title, image, price, _id } = product;
  return (
    <>
      <Col>
        <Card className="h-100">
          <Card.Img variant="top" src={image} className="img-fluid" />
          <Card.Body>
            <div className="d-flex justify-content-between m">
              <Card.Title>{title}</Card.Title>
              <Card.Text>Starts from ${price}</Card.Text>
            </div>
            <NavLink to={`/productDetails/${_id}`}>
              <Button className="mt-3 project-btn">View details</Button>
            </NavLink>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default SingleProduct;
