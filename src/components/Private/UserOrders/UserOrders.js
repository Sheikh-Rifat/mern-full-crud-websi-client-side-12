import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import useAuth from "../../../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const UserOrders = () => {
  const [userOrders, setUserOrders] = useState([]);
  const [deleteOrder, setDeleteOrder] = useState(false);
  const { user } = useAuth();
  // console.log(user);
  useEffect(() => {
    const url = `https://enigmatic-taiga-27234.herokuapp.com/userOrders?email=${user.email}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setUserOrders(data);
        console.log(data);
      });
  }, [deleteOrder, user.email]);

  const handleCancel = (id) => {
    // console.log(id);
    // const proceed = window.confirm("Are you sure to cancel this order?");

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete order!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://enigmatic-taiga-27234.herokuapp.com/userOrders/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log(data);
            if (data.deletedCount) {
              toast.success("Order Removed");
              setDeleteOrder(data);
            }
          });
      }
    });
  };

  return (
    <div>
      <h2 className="mb-2">My Orders</h2>
      <Table striped bordered hover size="sm" responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Contact No.</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        {userOrders.map((order, index) => (
          <tbody key={order._id}>
            <tr>
              <td className="text-light">{index + 1}</td>
              <td className="text-light">{order.name}</td>
              <td className="text-light">{order.email}</td>
              <td className="text-light">{order.address}</td>
              <td className="text-light">{order.contact}</td>
              <td className="text-light">{order.title}</td>
              <td className="text-light">{order.price}</td>
              <td className="text-light">{order.status}</td>
              <td>
                {order.paymnet ? (
                  "Paid"
                ) : (
                  <Link to={`/dashboard/checkOut/${order._id}`}>
                    <Button className="btn btn-primary mx-2 mb-3"> Pay</Button>
                  </Link>
                )}

                <Button
                  onClick={() => handleCancel(order._id)}
                  className="btn btn-warning mx-2"
                >
                  {" "}
                  Remove
                </Button>
                <ToastContainer />
              </td>
            </tr>
          </tbody>
        ))}
      </Table>
    </div>
  );
};

export default UserOrders;
