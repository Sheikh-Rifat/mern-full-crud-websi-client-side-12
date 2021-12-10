import React from "react";
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
const Newsletter = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data.email);
    fetch("https://enigmatic-taiga-27234.herokuapp.com/newsletter", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.status === "subscribed") {
          toast.success(
            "Thank you, you will now receive all our offers and other related news"
          );
          reset();
        }
      });
  };
  return (
    <div>
      <div id="contact" className="mt-5">
        <div className="bg">
          <h2 className="mb-4 text-light">Sign Up to Our Newsletter</h2>
          <Container>
            <div className="bg-2">
              <form
                className="d-flex flex-column form-contact "
                onSubmit={handleSubmit(onSubmit)}
              >
                <input
                  type="email"
                  placeholder="Email"
                  className="custom-form my-2"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-light">
                    Email is Required for queries!
                  </span>
                )}

                <input className="my-2 p-2 text-white" type="submit" />
              </form>
              <ToastContainer />
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
