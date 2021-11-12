import React from "react";
import Banner from "../Header/Banner/Banner";
import Products from "../Main/Products/Products";
import Testimonials from "../Main/Testimonials/Testimonials";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Products></Products>
      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;
