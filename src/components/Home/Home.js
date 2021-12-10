import React from "react";
import Banner from "../Header/Banner/Banner";
import Contact from "../Main/Contact/Contact";
import Products from "../Main/Products/Products";
import Testimonials from "../Main/Testimonials/Testimonials";
import Newsletter from "../Newsletter/Newsletter";

const Home = () => {
  document.title = "DJI Drone A-12";
  return (
    <div id="home">
      <Banner></Banner>
      <Products></Products>
      <Testimonials></Testimonials>
      {/* <Contact></Contact> */}
      <Newsletter />
    </div>
  );
};

export default Home;
