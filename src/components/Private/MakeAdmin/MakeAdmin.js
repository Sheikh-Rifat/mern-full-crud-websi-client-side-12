import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { ToastContainer, toast } from "react-toastify";
import { Table } from "react-bootstrap";

const MakeAdmin = () => {
  const [admins, setAdmins] = useState([]);
  const [adminReload, setAdminReload] = useState(false);

  useEffect(() => {
    fetch("https://enigmatic-taiga-27234.herokuapp.com/admins")
      .then((res) => res.json())
      .then((data) => {
        setAdmins(data);
      });
  }, [adminReload]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log(email);
    fetch("https://enigmatic-taiga-27234.herokuapp.com/users/admin", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          setAdminReload(data);
          toast.success("User has been granted admin access");
          reset();
        }
      });
  };
  return (
    <div>
      <h2>Make Admin</h2>
      <form className="d-flex flex-column" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Enter email"
          className="my-2"
          {...register("email", { required: true })}
        />
        {errors.adminEmail && (
          <span className="text-light">This field is required</span>
        )}

        <input className="my-2" type="submit" value="Make Admin" />
        <ToastContainer />
      </form>

      <h2 className="mt-5 my-2">Admin List</h2>
      <Table striped bordered hover size="sm" responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        {admins.map((admin, index) => (
          <tbody key={admin._id}>
            <tr>
              <td className="text-light">{index + 1}</td>
              <td className="text-light">{admin.displayName}</td>

              <td className="text-light">{admin.email}</td>
            </tr>
          </tbody>
        ))}
      </Table>
    </div>
  );
};

export default MakeAdmin;
