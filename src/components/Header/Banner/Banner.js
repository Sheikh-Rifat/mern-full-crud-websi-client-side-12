import React from "react";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./Banner.css";

const Banner = () => {
  return (
    <div className="banner text-light">
      <h2>Imaging Above Everything</h2>
      <NavLink to="/allProducts">
        <Button className="mt-2" variant="outline-light">
          View Products
        </Button>
      </NavLink>
    </div>
  );
};

export default Banner;
