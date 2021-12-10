import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import useFirebase from "../../../hooks/useFirebase";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { user } = useFirebase();
  const [productDetails, setProductDetails] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const url = `https://enigmatic-taiga-27234.herokuapp.com/productDetails/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setProductDetails(data));
  }, [id]);
  // console.log(productDetails);

  // hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.email = user?.email;
    data.image = productDetails.image;
    data.title = productDetails.title;
    data.price = productDetails.price;
    data.status = "pending";

    fetch("https://enigmatic-taiga-27234.herokuapp.com/userOrders", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        if (data.insertedId) {
          toast.success("Order Confirmed, Please wait for approval");
        }
      });
  };

  return (
    <div className="my-5">
      <h2>Details of product : {[productDetails.title]}</h2>
      <Container>
        <section className="mt-5 mb-5">
          <Row className="mt-5 mb-5">
            {/* image section */}
            <Col sm={12} md={6}>
              <div className="my-5 img-description">
                <img
                  src={productDetails.image}
                  alt="serviceImage"
                  className="img-fluid"
                />
              </div>
            </Col>
            <Col sm={12} md={6}>
              <div className="my-5 text-center">
                <h1 className="title">{productDetails.title}</h1>
                <p className="description">{productDetails.description}</p>

                <p className="text-center px-5 fs-5">
                  price : ${productDetails.price}
                </p>
                <div className="custom-form ">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Label>Name</Form.Label>
                    <input
                      className="mb-2"
                      placeholder={user?.displayName}
                      {...register("name")}
                    />
                    <Form.Label>Address</Form.Label>
                    <input
                      type="address"
                      className="mb-2"
                      placeholder="address"
                      {...register("address")}
                    />
                    <Form.Label>Contact Number</Form.Label>
                    <input
                      type="number"
                      className="mb-2"
                      placeholder="Contact number"
                      {...register("contact", { required: true })}
                    />
                    {errors.contact && <span>This field is required</span>}

                    <input
                      className="project-btn"
                      type="submit"
                      value="Confirm Booking"
                    />
                    <ToastContainer />
                  </form>
                </div>
              </div>
            </Col>
          </Row>
        </section>
      </Container>
    </div>
  );
};

export default ProductDetails;
