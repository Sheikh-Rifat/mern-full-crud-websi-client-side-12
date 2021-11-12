import React from "react";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import notFound from "../../images/undraw_Page_not_found_re_e9o6.png";

const NotFound = () => {
  return (
    <div className="text-center">
      <div className="mt-3">
        <img src={notFound} alt="notFound" className="img-fluid" />
        <h2>The page Your'e looking for, is not found.</h2>
      </div>
      <NavLink to="/home">
        <Button className="btn btn-primary">Go back</Button>
      </NavLink>
    </div>
  );
};

export default NotFound;
