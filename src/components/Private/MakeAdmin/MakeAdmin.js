import React from "react";
import { useForm } from "react-hook-form";
import useFirebase from "../../../hooks/useFirebase";

const MakeAdmin = () => {
  const { user } = useFirebase();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <h2>Make Admin</h2>
      <form className="d-flex flex-column" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Enter email"
          className="my-2"
          {...register("adminEmail", { required: true })}
        />
        {errors.title && (
          <span className="text-light">This field is required</span>
        )}

        <input className="my-2" type="submit" value="Make Admin" />
      </form>
    </div>
  );
};

export default MakeAdmin;
