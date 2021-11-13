import React from "react";
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "./Contact.css";
import { ToastContainer, toast } from "react-toastify";

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data);

    fetch("http://localhost:4000/queries", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("Thank you, we will get back to you soon");
          reset();
        }
      });
  };
  return (
    <div id="contact" className="mt-5">
      <div className="bg">
        <h2 className="mb-4 text-light">Have a Question? Just Ask</h2>
        <Container>
          <div className="bg-2">
            <form
              className="d-flex flex-column form "
              onSubmit={handleSubmit(onSubmit)}
            >
              <textarea
                type="text"
                placeholder="Ask your question"
                className="my-2 p-4"
                {...register("question", { required: true })}
              />
              {errors.question && (
                <span className="text-light">This field is required</span>
              )}
              <input
                type="email"
                placeholder="Email"
                className="custom-form my-2"
                {...register("email", { required: true, min: 0, max: 5 })}
              />
              {errors.email && (
                <span className="text-light">
                  Minimum rating can be 0 and maximum is 5
                </span>
              )}

              <input className="my-2" type="submit" />
              <ToastContainer />
            </form>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Contact;
