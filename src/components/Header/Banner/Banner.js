import React from "react";
import { Button } from "react-bootstrap";
import "./Banner.css";

const Banner = () => {
  return (
    <div className="banner text-light">
      <h2>Imaging Above Everything</h2>
      <Button className="mt-2" variant="outline-light">
        View Products
      </Button>
    </div>
  );
};

export default Banner;
