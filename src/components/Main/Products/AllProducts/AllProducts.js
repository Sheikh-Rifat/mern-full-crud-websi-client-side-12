import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const AllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  useEffect(() => {
    fetch("https://infinite-ocean-74604.herokuapp.com/allProducts")
      .then((res) => res.json())
      .then((data) => setAllProducts(data));
  }, []);
  return (
    <div className="my-5">
      <h2 className="my-5">Explore all DJI products</h2>
      <Container>
        {allProducts.map((allProduct) => (
          <div key={allProduct._id} className="border rounded my-5">
            <Row className=" my-3">
              <Col sm={12} md={6}>
                <img
                  src={allProduct.image}
                  alt="Productimg"
                  height="200"
                  width="300"
                />
              </Col>
              <Col sm={12} md={6}>
                <h2>{allProduct.title}</h2>
                <p>
                  <small className=" text-center">
                    Starts from ${allProduct.price}
                  </small>
                </p>
                <NavLink to={`/serviceDetails/${allProduct._id}`}>
                  <Button className="mt-3 project-btn">View details</Button>
                </NavLink>
              </Col>
            </Row>
          </div>
        ))}
      </Container>
    </div>
  );
};

export default AllProducts;
