import React from "react";
import { useForm } from "react-hook-form";
import useFirebase from "../../../hooks/useFirebase";
import { ToastContainer, toast } from "react-toastify";

const AddProduct = () => {
  const { user } = useFirebase();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.email = user.email;
    data.name = user.displayName;
    // console.log(data);

    fetch("https://infinite-ocean-74604.herokuapp.com/newProducts", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("Product created successfully");
          reset();
        }
      });
  };
  return (
    <div>
      <h2>Add Product</h2>
      <form
        className="d-flex flex-column form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          placeholder="Product Name"
          className="my-2"
          {...register("title", { required: true })}
        />
        {errors.title && (
          <span className="text-light">This field is required</span>
        )}
        <input
          type="text"
          placeholder="Image/Thumbnail Url"
          className="my-2"
          {...register("image", { required: true })}
        />
        {errors.title && (
          <span className="text-light">This field is required</span>
        )}
        <textarea
          type="text"
          placeholder="Description"
          className="my-2"
          {...register("description")}
        />

        <input
          type="number"
          placeholder="Price"
          className="my-2"
          {...register("price", { required: true })}
        />
        {errors.price && (
          <span className="text-light">This field is required</span>
        )}

        <input className="my-2" type="submit" />
        <ToastContainer />
      </form>
    </div>
  );
};

export default AddProduct;
