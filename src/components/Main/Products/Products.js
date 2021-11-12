import React, { useEffect, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./Products.css";
import SingleProduct from "./SingleProduct/SingleProduct";

const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  return (
    <section id="products" className="my-5 py-5">
      <h2>Explore DJI Products in Different Fields</h2>

      <div className="products-section my-2 py-3">
        <Container>
          <Row xs={1} md={2} lg={3} className="g-5">
            {products.map((product) => (
              <SingleProduct key={product._id} product={product} />
            ))}
          </Row>
          <NavLink to="/allProducts">
            <Button className="my-3 project-btn">View all Products</Button>
          </NavLink>
        </Container>
      </div>
    </section>
  );
};

export default Products;
