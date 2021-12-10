import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [deleteOrder, setDeleteOrder] = useState(false);
  const [updateOrder, setUpdateOrder] = useState(false);

  useEffect(() => {
    fetch("https://enigmatic-taiga-27234.herokuapp.com/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, [deleteOrder, updateOrder]);

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
        fetch(`https://enigmatic-taiga-27234.herokuapp.com/userorders/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log(data)
            if (data.deletedCount) {
              toast.success("Order Removed");
              setDeleteOrder(data);
            }
          });
      }
    });
  };

  const handleApprove = (id) => {
    const status = { status: "Shipped" };
    const url = `https://enigmatic-taiga-27234.herokuapp.com/orders/${id}`;
    fetch(url, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(status),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        if (data.modifiedCount) {
          toast.success("Order Shipped");
          setUpdateOrder(data);
        }
      });
  };

  return (
    <div>
      <h2>Manage All Orders</h2>
      <Table striped bordered hover size="sm" responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Contact</th>
            <th>status</th>
            <th>Product</th>
            <th>Status Update</th>
            <th>Delete Order</th>
          </tr>
        </thead>
        {orders.map((order, index) => (
          <tbody key={order._id}>
            <tr>
              <td className="text-light">{index + 1}</td>
              <td className="text-light">{order.name}</td>
              <td className="text-light">{order.email}</td>
              <td className="text-light">{order.address}</td>
              <td className="text-light">{order.contact}</td>
              {order.status === "Shipped" ? (
                <td className="text-info">{order.status}</td>
              ) : (
                <td className="text-warning">{order.status}</td>
              )}
              <td className="text-light">{order.title}</td>
              <td>
                {order.status === "Shipped" ? (
                  <Button
                    onClick={() => handleApprove(order._id)}
                    className="btn-light m-2"
                  >
                    Approved
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleApprove(order._id)}
                    className="btn-light m-2"
                  >
                    Approve
                  </Button>
                )}
              </td>
              <td>
                <Button
                  onClick={() => handleCancel(order._id)}
                  className="btn btn-warning m-2"
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

export default ManageOrders;
