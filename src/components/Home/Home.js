import React from "react";
import Banner from "../Header/Banner/Banner";
import Contact from "../Main/Contact/Contact";
import Products from "../Main/Products/Products";
import Testimonials from "../Main/Testimonials/Testimonials";

const Home = () => {
  return (
    <div id="home">
      <Banner></Banner>
      <Products></Products>
      <Testimonials></Testimonials>
      <Contact></Contact>
    </div>
  );
};

export default Home;
