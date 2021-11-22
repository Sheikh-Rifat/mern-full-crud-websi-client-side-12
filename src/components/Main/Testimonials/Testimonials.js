import React, { useEffect, useState } from "react";
import { Card, Col, Container } from "react-bootstrap";
import Slider from "react-slick";
import "./Testimonial.css";
import ReactStars from "react-rating-stars-component";
import quotation from "../../../images/quotation.png";

const Testimonials = () => {
  let settings = {
    dots: true,
    infinite: false,
    speed: 500,

    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch("https://infinite-ocean-74604.herokuapp.com/reviews")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      });
  }, []);
  return (
    <div id="reviews" className="my-5 py-3">
      <h2 className="text-uppercase mb-5">User Reviews</h2>

      <Container className="text-start">
        <Slider {...settings}>
          {reviews.map((review) => (
            <Container>
              <div key={review._id} class="reviewContainer">
                <div class="content">
                  <div className="quotation">
                    <img src={quotation} alt="" className="img-fluid" />
                  </div>

                  <div className="review-details pt-4">
                    <h5 class="text-start"> By {review.name}</h5>
                    <h3>{review.review}</h3>
                    <h3>
                      Ratings :{" "}
                      <ReactStars
                        count={5}
                        edit={false}
                        size={30}
                        value={parseInt(review.rating)}
                      />
                    </h3>
                  </div>
                </div>
              </div>
            </Container>
          ))}
        </Slider>
      </Container>
    </div>
  );
};

export default Testimonials;
{
  /* */
}
