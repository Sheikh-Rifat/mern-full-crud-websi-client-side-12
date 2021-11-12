import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [deleteProduct, setDeleteProduct] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/allproducts")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [deleteProduct]);

  // console.log(products);
  const handleCancel = (id) => {
    // console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const url = `http://localhost:4000/allproducts/${id}`;
        fetch(url, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              setDeleteProduct(data);
              toast.success("Product Removed Successfully");
            }
          });
      }
    });
  };

  return (
    <div>
      <h2 className="mb-2">Manage All Products</h2>
      <Table striped bordered hover size="sm" responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Thumbnail</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        {products.map((product, index) => (
          <tbody key={product._id}>
            <tr>
              <td className="text-light">{index + 1}</td>
              <td className="text-light">{product.title}</td>
              <td className="text-light">
                <img
                  src={product.image}
                  alt="product-img"
                  height="70"
                  width="100"
                />
              </td>
              <td className="text-light">${product.price}</td>

              <td>
                <Button
                  onClick={() => handleCancel(product._id)}
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

export default ManageProducts;
