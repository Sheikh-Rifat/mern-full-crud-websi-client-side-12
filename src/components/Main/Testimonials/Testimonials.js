import React, { useEffect, useState } from "react";
import { Card, Col, Container } from "react-bootstrap";
import Slider from "react-slick";
import "./Testimonial.css";
import ReactStars from "react-rating-stars-component";

const Testimonials = () => {
  let settings = {
    dots: true,
    infinite: false,
    speed: 500,

    slidesToShow: 1,
    slidesToScroll: 1,
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
    fetch("http://localhost:4000/reviews")
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
            <Col key={review._id}>
              <Card>
                <Card.Header>{review.name}</Card.Header>
                <Card.Body>
                  <Card.Text>{review.review}</Card.Text>
                  <Card.Text>
                    Rating out of 5 :
                    <ReactStars
                      count={5}
                      edit={false}
                      size={30}
                      value={parseInt(review.rating)}
                    />
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Slider>
      </Container>
    </div>
  );
};

export default Testimonials;
